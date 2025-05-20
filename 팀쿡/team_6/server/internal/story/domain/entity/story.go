package entity

import (
	"github.com/jackc/pgx/v5/pgtype"
	sharedvo "starrynight.com/server/internal/shared/valueobject"
)

type Story struct {
	ID           int
	UserID       int
	ChannelID    int
	LanguageCode sharedvo.LanguageCode
	Title        string
	Content      string
	GeneratedContent *string
	CreatedAt    pgtype.Timestamptz
}

type StoryReply struct {
	ID        int
	StoryID   int
	UserID    int
	Content   string
	CreatedAt pgtype.Timestamptz
}
