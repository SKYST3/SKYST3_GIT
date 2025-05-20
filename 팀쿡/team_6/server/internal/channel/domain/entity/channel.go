package entity

import (
	"encoding/json"

	"github.com/jackc/pgx/v5/pgtype"
	channelvo "starrynight.com/server/internal/channel/domain/valueobject"
	sharedvo "starrynight.com/server/internal/shared/valueobject"
)

type Channel struct {
	ID                    int                     `json:"id"`
	Status                channelvo.ChannelStatus `json:"status"`
	PreferredLanguageCode sharedvo.LanguageCode   `json:"preferred_language_code"`
	HostInterface         HostInterface           `json:"host_interface"`
	SpeechInterface       SpeechInterface         `json:"speech_interface"`
	CreatedAt             pgtype.Timestamptz      `json:"created_at"`
}

type ChannelRow struct {
	ID                    int                     `db:"id"`
	Status                channelvo.ChannelStatus `db:"status"`
	PreferredLanguageCode sharedvo.LanguageCode   `db:"preferred_language_code"`
	HostInterface         string                  `db:"host_interface"`
	SpeechInterface       string                  `db:"speech_interface"`
	CreatedAt             pgtype.Timestamptz      `db:"created_at"`
}

func (c *Channel) ToRow() *ChannelRow {
	return &ChannelRow{
		ID:                    c.ID,
		Status:                c.Status,
		PreferredLanguageCode: c.PreferredLanguageCode,
		HostInterface:         c.HostInterface.Stringify(),
		SpeechInterface:       c.SpeechInterface.Stringify(),
		CreatedAt:             c.CreatedAt,
	}
}

func (r *ChannelRow) ToEntity() *Channel {
	hi, err := HostInterfaceFromString(r.HostInterface)
	if err != nil {
		return nil
	}
	si, err := SpeechInterfaceFromString(r.SpeechInterface)
	if err != nil {
		return nil
	}

	return &Channel{
		ID:                    r.ID,
		Status:                r.Status,
		PreferredLanguageCode: r.PreferredLanguageCode,
		HostInterface:         *hi,
		SpeechInterface:       *si,
		CreatedAt:             r.CreatedAt,
	}
}

type ChannelTranslation struct {
	ID           int                   `json:"id"`
	ChannelID    int                   `json:"channel_id"`
	LanguageCode sharedvo.LanguageCode `json:"language_code"`
	Name         string                `json:"name"`
	Description  string                `json:"description"`
}

type ChannelAudioChunk struct {
	ID              int                `json:"id"`
	ChannelID       int                `json:"channel_id"`
	AudioChunkStage int                `json:"audio_chunk_stage"`
	AudioChunkIndex int                `json:"audio_chunk_index"`
	AudioChunkUUID  string             `json:"audio_chunk_uuid"`
	CreatedAt       pgtype.Timestamptz `json:"created_at"`
}

type HostInterface struct {
	Type channelvo.HostType `json:"type"`
}

type SpeechInterface struct {
	Type string `json:"type"`
}

func (h *HostInterface) Stringify() string {
	hiStr, err := json.Marshal(h)
	if err != nil {
		return ""
	}
	return string(hiStr)
}

func (s *SpeechInterface) Stringify() string {
	siStr, err := json.Marshal(s)
	if err != nil {
		return ""
	}
	return string(siStr)
}

func HostInterfaceFromString(s string) (*HostInterface, error) {
	var hi HostInterface
	err := json.Unmarshal([]byte(s), &hi)
	if err != nil {
		return nil, err
	}
	return &hi, nil
}

func SpeechInterfaceFromString(s string) (*SpeechInterface, error) {
	var si SpeechInterface
	err := json.Unmarshal([]byte(s), &si)
	if err != nil {
		return nil, err
	}
	return &si, nil
}
