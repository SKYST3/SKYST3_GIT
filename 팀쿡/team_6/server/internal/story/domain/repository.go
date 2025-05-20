package domain

import (
	"context"

	"github.com/jackc/pgx/v5"
	"starrynight.com/server/internal/story/domain/entity"
)

type StoryRepository interface {
	WithTx(ctx context.Context, tx pgx.Tx) StoryRepository

	CreateStory(ctx context.Context, story *entity.Story) (int, error)
	CreateStoryReply(ctx context.Context, storyReply *entity.StoryReply) (int, error)
	FindStoryByID(ctx context.Context, id int) (*entity.Story, error)
	FindStoryReplyByID(ctx context.Context, id int) (*entity.StoryReply, error)
	FindAllStories(ctx context.Context) ([]*entity.Story, error)
	FindAllStoryReplies(ctx context.Context) ([]*entity.StoryReply, error)
	FindStoriesByChannelID(ctx context.Context, channelID int) ([]*entity.Story, error)
	FindStoryRepliesByStoryID(ctx context.Context, storyID int) ([]*entity.StoryReply, error)
	FindStoriesByUserID(ctx context.Context, userID int) ([]*entity.Story, error)
	FindStoryRepliesByUserID(ctx context.Context, userID int) ([]*entity.StoryReply, error)
	DeleteStory(ctx context.Context, id int) error
	DeleteStoryReply(ctx context.Context, id int) error
	UpdateGeneratedContent(ctx context.Context, storyID int, content string) error

	FindStoriesWithoutGeneratedContentByChannelID(ctx context.Context, channelID int) ([]*entity.Story, error)
}

type StoryCache interface {
}
