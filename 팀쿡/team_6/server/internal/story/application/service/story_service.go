package service

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"starrynight.com/server/internal/shared/ai"
	"starrynight.com/server/internal/story/application/dto"
	"starrynight.com/server/internal/story/domain"
	"starrynight.com/server/internal/story/domain/entity"
)

type StoryService interface {
	CreateStory(ctx context.Context, userID int, dto *dto.CreateStoryDTO) (*entity.Story, error)
	CreateStoryReply(ctx context.Context, userID int, dto *dto.CreateStoryReplyDTO) (*entity.StoryReply, error)
	GetStory(ctx context.Context, id int) (*entity.Story, error)
	GetStoryReply(ctx context.Context, id int) (*entity.StoryReply, error)
	GetStories(ctx context.Context) ([]*entity.Story, error)
	GetStoryReplies(ctx context.Context) ([]*entity.StoryReply, error)
	GetStoriesByChannelID(ctx context.Context, channelID int) ([]*entity.Story, error)
	GetStoryRepliesByStoryID(ctx context.Context, storyID int) ([]*entity.StoryReply, error)
	GetStoriesByUserID(ctx context.Context, userID int) ([]*entity.Story, error)
	GetStoryRepliesByUserID(ctx context.Context, userID int) ([]*entity.StoryReply, error)
	DeleteStory(ctx context.Context, id int) error
	DeleteStoryReply(ctx context.Context, id int) error
}

type storyService struct {
	db        *pgxpool.Pool
	storyRepo domain.StoryRepository
}

// NewChannelService creates a new instance of ChannelService.
func NewStoryService(
	dbPool *pgxpool.Pool,
	storyRepo domain.StoryRepository,
) StoryService {
	return &storyService{
		db:        dbPool,
		storyRepo: storyRepo,
	}
}

func (s *storyService) CreateStory(ctx context.Context, userID int, dto *dto.CreateStoryDTO) (*entity.Story, error) {
	story := entity.Story{
		UserID:       userID,
		ChannelID:    dto.ChannelID,
		LanguageCode: dto.LanguageCode,
		Title:        dto.Title,
		Content:      dto.Content,
	}

	id, err := s.storyRepo.CreateStory(ctx, &story)
	if err != nil {
		return nil, err
	}

	fullStory, err := s.storyRepo.FindStoryByID(ctx, id)
	if err != nil {
		return nil, err
	}

	return fullStory, nil
}

func (s *storyService) CreateStoryReply(ctx context.Context, userID int, dto *dto.CreateStoryReplyDTO) (*entity.StoryReply, error) {
	storyReply := entity.StoryReply{
		StoryID: dto.StoryID,
		UserID:  userID,
		Content: dto.Content,
	}

	id, err := s.storyRepo.CreateStoryReply(ctx, &storyReply)
	if err != nil {
		return nil, err
	}

	return s.storyRepo.FindStoryReplyByID(ctx, id)
}

func (s *storyService) GetStory(ctx context.Context, id int) (*entity.Story, error) {
	return s.storyRepo.FindStoryByID(ctx, id)
}

func (s *storyService) GetStoryReply(ctx context.Context, id int) (*entity.StoryReply, error) {
	return s.storyRepo.FindStoryReplyByID(ctx, id)
}

func (s *storyService) GetStories(ctx context.Context) ([]*entity.Story, error) {
	return s.storyRepo.FindAllStories(ctx)
}

func (s *storyService) GetStoryReplies(ctx context.Context) ([]*entity.StoryReply, error) {
	return s.storyRepo.FindAllStoryReplies(ctx)
}

func (s *storyService) GetStoriesByChannelID(ctx context.Context, channelID int) ([]*entity.Story, error) {
	return s.storyRepo.FindStoriesByChannelID(ctx, channelID)
}

func (s *storyService) GetStoryRepliesByStoryID(ctx context.Context, storyID int) ([]*entity.StoryReply, error) {
	return s.storyRepo.FindStoryRepliesByStoryID(ctx, storyID)
}

func (s *storyService) GetStoriesByUserID(ctx context.Context, userID int) ([]*entity.Story, error) {
	return s.storyRepo.FindStoriesByUserID(ctx, userID)
}

func (s *storyService) GetStoryRepliesByUserID(ctx context.Context, userID int) ([]*entity.StoryReply, error) {
	return s.storyRepo.FindStoryRepliesByUserID(ctx, userID)
}

func (s *storyService) DeleteStory(ctx context.Context, id int) error {
	return s.storyRepo.DeleteStory(ctx, id)
}

func (s *storyService) DeleteStoryReply(ctx context.Context, id int) error {
	return s.storyRepo.DeleteStoryReply(ctx, id)
}

func (s *storyService) GenerateContentForStory(ctx context.Context, story *entity.Story) error {
	// Generate content using OpenAI
	err := ai.GenerateAndSetContentForStory(ctx, story)
	if err == nil && story.GeneratedContent != nil {
		_ = s.storyRepo.UpdateGeneratedContent(ctx, story.ID, *story.GeneratedContent)
	}

	return err
}
