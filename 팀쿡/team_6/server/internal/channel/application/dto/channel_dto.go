package dto

import (
	"github.com/jackc/pgx/v5/pgtype"
	channelentity "starrynight.com/server/internal/channel/domain/entity"
	channelvo "starrynight.com/server/internal/channel/domain/valueobject"
	sharedvo "starrynight.com/server/internal/shared/valueobject"
)

type CreateChannelTranslationDTO struct {
	LanguageCode sharedvo.LanguageCode `json:"language_code"`
	Name         string                `json:"name"`
	Description  string                `json:"description"`
}

type CreateChannelDTO struct {
	Status                channelvo.ChannelStatus       `json:"status"`
	PreferredLanguageCode sharedvo.LanguageCode         `json:"preferred_language_code"`
	HostInterface         channelentity.HostInterface   `json:"host_interface"`
	SpeechInterface       channelentity.SpeechInterface `json:"speech_interface"`
	Translations          []CreateChannelTranslationDTO `json:"translations"`
}

type UpdateChannelDTO struct {
	Status                channelvo.ChannelStatus       `json:"status"`
	PreferredLanguageCode sharedvo.LanguageCode         `json:"preferred_language_code"`
	HostInterface         channelentity.HostInterface   `json:"host_interface"`
	SpeechInterface       channelentity.SpeechInterface `json:"speech_interface"`
	Translations          []CreateChannelTranslationDTO `json:"translations"`
}

type ReadChannelDTO struct {
	ID                    int                           `json:"id"`
	Status                channelvo.ChannelStatus       `json:"status"`
	PreferredLanguageCode sharedvo.LanguageCode         `json:"preferred_language_code"`
	HostInterface         channelentity.HostInterface   `json:"host_interface"`
	SpeechInterface       channelentity.SpeechInterface `json:"speech_interface"`
	CreatedAt             pgtype.Timestamptz            `json:"created_at"`
	Name                  string                        `json:"name"`
	Description           string                        `json:"description"`
}

type ReadChannelDTOrow struct {
	ID                    int                     `json:"id"`
	Status                channelvo.ChannelStatus `json:"status"`
	PreferredLanguageCode sharedvo.LanguageCode   `json:"preferred_language_code"`
	HostInterface         string                  `json:"host_interface"`
	SpeechInterface       string                  `json:"speech_interface"`
	CreatedAt             pgtype.Timestamptz      `json:"created_at"`
	Name                  string                  `json:"name"`
	Description           string
}

type ReadAudioChunkDTO struct {
	AudioChunkStage int    `json:"audio_chunk_stage"`
	AudioChunkIndex int    `json:"audio_chunk_index"`
	AudioFileURL    string `json:"audio_file_url"`
}

func (r *ReadChannelDTOrow) ToDTO() (*ReadChannelDTO, error) {
	hostInterface, err := channelentity.HostInterfaceFromString(r.HostInterface)
	if err != nil {
		return nil, err
	}
	speechInterface, err := channelentity.SpeechInterfaceFromString(r.SpeechInterface)
	if err != nil {
		return nil, err
	}

	return &ReadChannelDTO{
		ID:                    r.ID,
		Status:                r.Status,
		PreferredLanguageCode: r.PreferredLanguageCode,
		HostInterface:         *hostInterface,
		SpeechInterface:       *speechInterface,
		CreatedAt:             r.CreatedAt,
		Name:                  r.Name,
		Description:           r.Description,
	}, nil
}
