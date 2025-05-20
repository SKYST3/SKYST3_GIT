package domain

import (
	"context"
	"time"
)

type SessionRepository interface {
	GetUserIDBySessionToken(ctx context.Context, token string) (int, error)
	IsAdmin(ctx context.Context, userID int) (bool, error)
}

type SessionCache interface {
	GetUserID(ctx context.Context, token string) (int, error)
	SetUserID(ctx context.Context, token string, userID int, ttl time.Duration) error
	RefreshTTL(ctx context.Context, token string, ttl time.Duration) error
}
