package service

import (
	"context"
	"time"

	"starrynight.com/server/internal/auth/domain"
)

type SessionService struct {
	Repo  domain.SessionRepository
	Cache domain.SessionCache
}

func NewSessionService(repo domain.SessionRepository, cache domain.SessionCache) *SessionService {
	return &SessionService{Repo: repo, Cache: cache}
}

func (s *SessionService) Authorize(ctx context.Context, token string) (int, error) {
	userID, err := s.Cache.GetUserID(ctx, token)
	if err == nil {
		_ = s.Cache.RefreshTTL(ctx, token, 30*time.Minute)
		return userID, nil
	}
	userID, err = s.Repo.GetUserIDBySessionToken(ctx, token)
	if err != nil {
		return 0, err
	}
	_ = s.Cache.SetUserID(ctx, token, userID, 30*time.Minute)
	return userID, nil
}

func (s *SessionService) AuthorizeAdmin(ctx context.Context, token string) (int, bool, error) {
	userID, err := s.Authorize(ctx, token)
	if err != nil {
		return 0, false, err
	}
	isAdmin, err := s.Repo.IsAdmin(ctx, userID)
	if err != nil {
		return 0, false, err
	}
	return userID, isAdmin, nil
}
