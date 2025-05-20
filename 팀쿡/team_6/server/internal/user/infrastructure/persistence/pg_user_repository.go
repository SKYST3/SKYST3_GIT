package infrastructure

import (
	"starrynight.com/server/internal/shared/database/postgres"
	"starrynight.com/server/internal/user/domain"
)

type pgUserRepository struct {
	db postgres.DbExecutor
}

func NewPgUserRepository(db postgres.DbExecutor) domain.UserRepository {
	return &pgUserRepository{db: db}
}
