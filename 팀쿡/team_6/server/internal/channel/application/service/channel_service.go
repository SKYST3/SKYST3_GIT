package service

import (
	"context"
	"fmt"
	"log"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	channel_dto "starrynight.com/server/internal/channel/application/dto"
	"starrynight.com/server/internal/channel/domain"
	"starrynight.com/server/internal/channel/domain/entity"
	channelvo "starrynight.com/server/internal/channel/domain/valueobject"
	"starrynight.com/server/internal/shared/ai"
	"starrynight.com/server/internal/shared/database/postgres"
	ffmpeg_wrapper "starrynight.com/server/internal/shared/media/ffmpeg-wrapper"
	"starrynight.com/server/internal/shared/storage/minio"
	sharedvo "starrynight.com/server/internal/shared/valueobject"
	story_domain "starrynight.com/server/internal/story/domain"
)

type ChannelService interface {
	CreateChannel(ctx context.Context, dto *channel_dto.CreateChannelDTO) (*entity.Channel, error)
	CreateChannelTranslation(ctx context.Context, channelID int, dto *channel_dto.CreateChannelTranslationDTO) (*entity.ChannelTranslation, error)
	GetChannel(ctx context.Context, id int, languageCode sharedvo.LanguageCode) (*channel_dto.ReadChannelDTO, error)
	ListAllChannels(ctx context.Context, languageCode sharedvo.LanguageCode) ([]*channel_dto.ReadChannelDTO, error)
	ListChannelsByStatus(ctx context.Context, status channelvo.ChannelStatus, languageCode sharedvo.LanguageCode) ([]*channel_dto.ReadChannelDTO, error)
	ListChannelsByPreferredLanguageCode(ctx context.Context, preferredLanguageCode sharedvo.LanguageCode, languageCode sharedvo.LanguageCode) ([]*channel_dto.ReadChannelDTO, error)
	UpdateChannel(ctx context.Context, id int, dto *channel_dto.UpdateChannelDTO) error
	DeleteChannel(ctx context.Context, id int) error
	ListChannelAudioChunks(ctx context.Context, channelID int) ([]*channel_dto.ReadAudioChunkDTO, error)

	GenerateContentForAllChannels(ctx context.Context) error
}

type channelService struct {
	db            *pgxpool.Pool
	channelRepo   domain.ChannelRepository
	storyRepo     story_domain.StoryRepository
	storageClient minio.StorageClient
	ffmpegService ffmpeg_wrapper.FfmpegService
}

// NewChannelService creates a new instance of ChannelService.
func NewChannelService(
	dbPool *pgxpool.Pool,
	channelRepo domain.ChannelRepository,
	storyRepo story_domain.StoryRepository,
	storageClient minio.StorageClient,
	ffmpegService ffmpeg_wrapper.FfmpegService,
) ChannelService {
	return &channelService{
		db:            dbPool,
		channelRepo:   channelRepo,
		storyRepo:     storyRepo,
		storageClient: storageClient,
		ffmpegService: ffmpegService,
	}
}

func (s *channelService) CreateChannel(ctx context.Context, dto *channel_dto.CreateChannelDTO) (*entity.Channel, error) {
	channel := entity.Channel{
		Status:                dto.Status,
		PreferredLanguageCode: dto.PreferredLanguageCode,
		HostInterface:         dto.HostInterface,
		SpeechInterface:       dto.SpeechInterface,
	}

	id, err := s.channelRepo.CreateChannel(ctx, &channel)
	if err != nil {
		return nil, err
	}

	return s.channelRepo.FindChannelByID(ctx, id)
}

func (s *channelService) CreateChannelTranslation(ctx context.Context, channelID int, dto *channel_dto.CreateChannelTranslationDTO) (*entity.ChannelTranslation, error) {
	channelTranslation := entity.ChannelTranslation{
		ChannelID:    channelID,
		LanguageCode: dto.LanguageCode,
		Name:         dto.Name,
		Description:  dto.Description,
	}

	id, err := s.channelRepo.CreateChannelTranslation(ctx, &channelTranslation)
	if err != nil {
		return nil, err
	}

	return s.channelRepo.FindChannelTranslationByID(ctx, id)
}

func (s *channelService) GetChannel(ctx context.Context, id int, languageCode sharedvo.LanguageCode) (*channel_dto.ReadChannelDTO, error) {
	return s.channelRepo.ReadChannelByID(ctx, id, languageCode)
}

func (s *channelService) ListAllChannels(ctx context.Context, languageCode sharedvo.LanguageCode) ([]*channel_dto.ReadChannelDTO, error) {
	return s.channelRepo.ReadAllChannels(ctx, languageCode)
}

func (s *channelService) ListChannelsByStatus(ctx context.Context, status channelvo.ChannelStatus, languageCode sharedvo.LanguageCode) ([]*channel_dto.ReadChannelDTO, error) {
	return s.channelRepo.ReadChannelsByStatus(ctx, status, languageCode)
}

func (s *channelService) ListChannelsByPreferredLanguageCode(ctx context.Context, preferredLanguageCode sharedvo.LanguageCode, languageCode sharedvo.LanguageCode) ([]*channel_dto.ReadChannelDTO, error) {
	return s.channelRepo.ReadChannelsByPreferredLanguageCode(ctx, preferredLanguageCode, languageCode)
}

func (s *channelService) UpdateChannel(ctx context.Context, id int, dto *channel_dto.UpdateChannelDTO) error {
	channel := entity.Channel{
		ID:                    id,
		Status:                dto.Status,
		PreferredLanguageCode: dto.PreferredLanguageCode,
		HostInterface:         dto.HostInterface,
		SpeechInterface:       dto.SpeechInterface,
	}

	return s.channelRepo.UpdateChannel(ctx, &channel)
}

func (s *channelService) DeleteChannel(ctx context.Context, id int) error {
	return s.channelRepo.DeleteChannel(ctx, id)
}

func (s *channelService) ListChannelAudioChunks(ctx context.Context, channelID int) ([]*channel_dto.ReadAudioChunkDTO, error) {
	audioChunks, err := s.channelRepo.FindChannelAudioChunksByChannelID(ctx, channelID)
	if err != nil {
		return nil, err
	}

	audioChunkDTOs := make([]*channel_dto.ReadAudioChunkDTO, 0, len(audioChunks))
	for _, audioChunk := range audioChunks {
		audioChunkDTOs = append(audioChunkDTOs, &channel_dto.ReadAudioChunkDTO{
			AudioChunkStage: audioChunk.AudioChunkStage,
			AudioChunkIndex: audioChunk.AudioChunkIndex,
			AudioFileURL:    channelvo.GetAudioChunkFileURL(audioChunk.AudioChunkUUID),
		})
	}

	return audioChunkDTOs, nil
}

func (s *channelService) GenerateContentForAllChannels(ctx context.Context) error {
	// Get all idle channels
	channels, err := s.channelRepo.FindChannelsByStatus(ctx, channelvo.ChannelStatusIdle)
	if err != nil {
		return err
	}

	log.Printf("Found %d channels to generate content for", len(channels))

	for _, channel := range channels {
		log.Printf("Generating content for channel %d", channel.ID)

		if err := postgres.WithTx(ctx, s.db, func(tx pgx.Tx) error {
			channelRepoWithTx := s.channelRepo.WithTx(ctx, tx)
			storyRepoWithTx := s.storyRepo.WithTx(ctx, tx)

			stories, err := storyRepoWithTx.FindStoriesWithoutGeneratedContentByChannelID(ctx, channel.ID)
			if err != nil {
				return fmt.Errorf("failed to find stories without generated content for channel %d: %w", channel.ID, err)
			}

			for _, story := range stories {
				if err := ai.GenerateAndSetContentForStory(ctx, story); err != nil {
					return fmt.Errorf("failed to generate content for story %d: %w", story.ID, err)
				}

				if err := storyRepoWithTx.UpdateGeneratedContent(ctx, story.ID, *story.GeneratedContent); err != nil {
					return fmt.Errorf("failed to update generated content for story %d: %w", story.ID, err)
				}
			}

			totalText := ai.OpeningMent
			for i, story := range stories {
				totalText += *story.GeneratedContent
				if i != len(stories)-1 {
					totalText += ai.NextMent
				}
			}
			totalText += ai.ClosingMent

			currentChannelAudioChunkStage, err := channelRepoWithTx.FindMaxAudioChunkStageByChannelID(ctx, channel.ID)
			if err != nil {
				return fmt.Errorf("failed to find max audio chunk stage for channel %d: %w", channel.ID, err)
			}

			nextChannelAudioChunkStage := currentChannelAudioChunkStage + 1

			// 1. Generate full audio file from total text
			// audioFilePath := "/home/atlasyang/playground/starrynight/server/mocked_audio.mp3"
			audioFilePath := fmt.Sprintf("/tmp/audio-%d.mp3", channel.ID)
			if err := ai.TTS(ctx, totalText, audioFilePath); err != nil {
				return fmt.Errorf("failed to generate TTS for channel %d: %w", channel.ID, err)
			}

			// 2. Upload full audio file to storage
			if err := s.storageClient.UploadAudioFile(ctx, fmt.Sprintf("audio-%d.mp3", channel.ID), audioFilePath); err != nil {
				return fmt.Errorf("failed to upload full audio file to storage for channel %d: %w", channel.ID, err)
			}

			// 3. Create audio chunks from full audio file and upload to storage
			audioChunkFilePaths, err := s.ffmpegService.SplitAudioFile(ctx, audioFilePath, channelvo.AudioChunkSize, fmt.Sprintf("/tmp/mocked-audio-chunks-%d", channel.ID))
			if err != nil {
				return fmt.Errorf("failed to split audio file for channel %d: %w", channel.ID, err)
			}

			for i, audioChunkFilePath := range audioChunkFilePaths {
				audioChunkUUID := uuid.New().String()
				audioChunkObjectKey := fmt.Sprintf("%s.aac", audioChunkUUID)
				if err := s.storageClient.UploadAudioChunk(ctx, audioChunkObjectKey, audioChunkFilePath); err != nil {
					return fmt.Errorf("failed to upload audio chunk for channel %d: %w", channel.ID, err)
				}

				audioChunk := entity.ChannelAudioChunk{
					ChannelID:       channel.ID,
					AudioChunkStage: nextChannelAudioChunkStage,
					AudioChunkIndex: i,
					AudioChunkUUID:  audioChunkUUID,
				}

				if _, err := channelRepoWithTx.CreateChannelAudioChunk(ctx, &audioChunk); err != nil {
					return fmt.Errorf("failed to create channel audio chunk for channel %d: %w", channel.ID, err)
				}
			}

			// 4. Update channel status to active
			channel.Status = channelvo.ChannelStatusActive
			if err := channelRepoWithTx.UpdateChannel(ctx, channel); err != nil {
				return fmt.Errorf("failed to update channel status for channel %d: %w", channel.ID, err)
			}

			return nil
		}); err != nil {
			log.Printf("Failed to generate content for channel %d: %v", channel.ID, err)
		}
	}

	return nil
}
