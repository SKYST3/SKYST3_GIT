package persistence

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type PgSessionRepository struct {
	db *pgxpool.Pool
}

func NewPgSessionRepository(db *pgxpool.Pool) *PgSessionRepository {
	return &PgSessionRepository{db: db}
}

func (r *PgSessionRepository) GetUserIDBySessionToken(ctx context.Context, token string) (int, error) {
	var userID int
	err := r.db.QueryRow(ctx, `
		SELECT "userId" FROM sessions WHERE "sessionToken" = $1
	`, token).Scan(&userID)
	if err != nil {
		return 0, err
	}
	return userID, nil
}

func (r *PgSessionRepository) IsAdmin(ctx context.Context, userID int) (bool, error) {
	var isAdmin bool
	err := r.db.QueryRow(ctx, `
		SELECT EXISTS (
			SELECT 1 FROM admin_users WHERE user_id = $1
		)
	`, userID).Scan(&isAdmin)
	if err != nil {
		return false, err
	}
	return isAdmin, nil
}
