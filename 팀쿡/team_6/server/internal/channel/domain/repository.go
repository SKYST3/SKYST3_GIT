package domain

import (
	"context"

	"github.com/jackc/pgx/v5"
	"starrynight.com/server/internal/channel/application/dto"
	"starrynight.com/server/internal/channel/domain/entity"
	channelvo "starrynight.com/server/internal/channel/domain/valueobject"
	sharedvo "starrynight.com/server/internal/shared/valueobject"
)

type ChannelRepository interface {
	WithTx(ctx context.Context, tx pgx.Tx) ChannelRepository

	CreateChannel(ctx context.Context, channel *entity.Channel) (int, error)
	CreateChannelTranslation(ctx context.Context, channelTranslation *entity.ChannelTranslation) (int, error)
	FindChannelTranslationByID(ctx context.Context, id int) (*entity.ChannelTranslation, error)
	FindChannelByID(ctx context.Context, id int) (*entity.Channel, error)
	FindAllChannels(ctx context.Context) ([]*entity.Channel, error)
	FindChannelByPreferredLanguageCode(ctx context.Context, languageCode sharedvo.LanguageCode) (*entity.Channel, error)
	FindChannelsByStatus(ctx context.Context, status channelvo.ChannelStatus) ([]*entity.Channel, error)
	ReadChannelByID(ctx context.Context, id int, languageCode sharedvo.LanguageCode) (*dto.ReadChannelDTO, error)
	ReadAllChannels(ctx context.Context, languageCode sharedvo.LanguageCode) ([]*dto.ReadChannelDTO, error)
	ReadChannelsByStatus(ctx context.Context, status channelvo.ChannelStatus, languageCode sharedvo.LanguageCode) ([]*dto.ReadChannelDTO, error)
	ReadChannelsByPreferredLanguageCode(ctx context.Context, preferredLanguageCode sharedvo.LanguageCode, languageCode sharedvo.LanguageCode) ([]*dto.ReadChannelDTO, error)
	UpdateChannel(ctx context.Context, channel *entity.Channel) error
	DeleteChannel(ctx context.Context, id int) error

	CreateChannelAudioChunk(ctx context.Context, channelAudioChunk *entity.ChannelAudioChunk) (int, error)
	FindChannelAudioChunksByChannelID(ctx context.Context, channelID int) ([]*entity.ChannelAudioChunk, error)
	FindMaxAudioChunkStageByChannelID(ctx context.Context, channelID int) (int, error)
}

type ChannelCache interface {
}
