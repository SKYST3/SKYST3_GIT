package persistence

import (
	"context"

	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"starrynight.com/server/internal/shared/database/postgres"
	"starrynight.com/server/internal/story/domain"
	"starrynight.com/server/internal/story/domain/entity"
)

type pgStoryRepository struct {
	db postgres.DbExecutor
}

func NewPgStoryRepository(db *pgxpool.Pool) domain.StoryRepository {
	return &pgStoryRepository{db: db}
}

func (r *pgStoryRepository) WithTx(ctx context.Context, tx pgx.Tx) domain.StoryRepository {
	return &pgStoryRepository{db: tx}
}

func (r *pgStoryRepository) CreateStory(ctx context.Context, story *entity.Story) (int, error) {
	query := `
		INSERT INTO stories (user_id, channel_id, language_code, title, content)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
	`

	var id int
	if err := r.db.QueryRow(
		ctx,
		query,
		story.UserID,
		story.ChannelID,
		story.LanguageCode,
		story.Title,
		story.Content,
	).Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *pgStoryRepository) CreateStoryReply(ctx context.Context, storyReply *entity.StoryReply) (int, error) {
	query := `
		INSERT INTO story_replies (story_id, user_id, content)
		VALUES ($1, $2, $3)
		RETURNING id
	`

	var id int
	if err := r.db.QueryRow(
		ctx,
		query,
		storyReply.StoryID,
		storyReply.UserID,
		storyReply.Content,
	).Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *pgStoryRepository) FindStoryByID(ctx context.Context, id int) (*entity.Story, error) {
	query := `
		SELECT id, user_id, channel_id, language_code, title, content, created_at
		FROM stories
		WHERE id = $1
	`

	var story entity.Story
	if err := pgxscan.Get(ctx, r.db, &story, query, id); err != nil {
		return nil, err
	}

	return &story, nil
}

func (r *pgStoryRepository) FindStoryReplyByID(ctx context.Context, id int) (*entity.StoryReply, error) {
	query := `
		SELECT id, story_id, user_id, content, created_at
		FROM story_replies
		WHERE id = $1
	`

	var storyReply entity.StoryReply
	if err := pgxscan.Get(ctx, r.db, &storyReply, query, id); err != nil {
		return nil, err
	}

	return &storyReply, nil
}

func (r *pgStoryRepository) FindAllStories(ctx context.Context) ([]*entity.Story, error) {
	query := `
		SELECT id, user_id, channel_id, language_code, title, content, created_at
		FROM stories
	`

	var stories []*entity.Story
	if err := pgxscan.Select(ctx, r.db, &stories, query); err != nil {
		return nil, err
	}

	return stories, nil
}

func (r *pgStoryRepository) FindAllStoryReplies(ctx context.Context) ([]*entity.StoryReply, error) {
	query := `
		SELECT id, story_id, user_id, content, created_at
		FROM story_replies
	`

	var storyReplies []*entity.StoryReply
	if err := pgxscan.Select(ctx, r.db, &storyReplies, query); err != nil {
		return nil, err
	}

	return storyReplies, nil
}

func (r *pgStoryRepository) FindStoriesByChannelID(ctx context.Context, channelID int) ([]*entity.Story, error) {
	query := `
		SELECT id, user_id, channel_id, language_code, title, content, created_at
		FROM stories
		WHERE channel_id = $1
	`

	var stories []*entity.Story
	if err := pgxscan.Select(ctx, r.db, &stories, query, channelID); err != nil {
		return nil, err
	}

	return stories, nil
}

func (r *pgStoryRepository) FindStoriesWithoutGeneratedContentByChannelID(ctx context.Context, channelID int) ([]*entity.Story, error) {
	query := `
		SELECT id, user_id, channel_id, language_code, title, content, created_at
		FROM stories
		WHERE channel_id = $1 AND generated_content IS NULL
	`

	var stories []*entity.Story
	if err := pgxscan.Select(ctx, r.db, &stories, query, channelID); err != nil {
		return nil, err
	}

	return stories, nil
}

func (r *pgStoryRepository) FindStoryRepliesByStoryID(ctx context.Context, storyID int) ([]*entity.StoryReply, error) {
	query := `
		SELECT id, story_id, user_id, content, created_at
		FROM story_replies
		WHERE story_id = $1
	`

	var storyReplies []*entity.StoryReply
	if err := pgxscan.Select(ctx, r.db, &storyReplies, query, storyID); err != nil {
		return nil, err
	}

	return storyReplies, nil
}

func (r *pgStoryRepository) FindStoriesByUserID(ctx context.Context, userID int) ([]*entity.Story, error) {
	query := `
		SELECT id, user_id, channel_id, language_code, title, content, created_at
		FROM stories
		WHERE user_id = $1
	`

	var stories []*entity.Story
	if err := pgxscan.Select(ctx, r.db, &stories, query, userID); err != nil {
		return nil, err
	}

	return stories, nil
}

func (r *pgStoryRepository) FindStoryRepliesByUserID(ctx context.Context, userID int) ([]*entity.StoryReply, error) {
	query := `
		SELECT id, story_id, user_id, content, created_at
		FROM story_replies
		WHERE user_id = $1
	`

	var storyReplies []*entity.StoryReply
	if err := pgxscan.Select(ctx, r.db, &storyReplies, query, userID); err != nil {
		return nil, err
	}

	return storyReplies, nil
}

func (r *pgStoryRepository) DeleteStory(ctx context.Context, id int) error {
	query := `
		DELETE FROM stories
		WHERE id = $1
	`

	if _, err := r.db.Exec(ctx, query, id); err != nil {
		return err
	}

	return nil
}

func (r *pgStoryRepository) DeleteStoryReply(ctx context.Context, id int) error {
	query := `
		DELETE FROM story_replies
		WHERE id = $1
	`

	if _, err := r.db.Exec(ctx, query, id); err != nil {
		return err
	}

	return nil
}

func (r *pgStoryRepository) UpdateGeneratedContent(ctx context.Context, storyID int, content string) error {
	query := `
		UPDATE stories
		SET generated_content = $1
		WHERE id = $2
	`
	if _, err := r.db.Exec(ctx, query, content, storyID); err != nil {
		return err
	}

	return nil
}
