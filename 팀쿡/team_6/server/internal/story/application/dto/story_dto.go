package dto

import (
	sharedvo "starrynight.com/server/internal/shared/valueobject"
)

type CreateStoryDTO struct {
	ChannelID    int                   `json:"channel_id"`
	LanguageCode sharedvo.LanguageCode `json:"language_code"`
	Title        string                `json:"title"`
	Content      string                `json:"content"`
}

type CreateStoryReplyDTO struct {
	StoryID int    `json:"story_id"`
	Content string `json:"content"`
}
