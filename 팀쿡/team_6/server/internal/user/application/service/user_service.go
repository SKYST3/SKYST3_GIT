package service

import (
	"starrynight.com/server/internal/user/domain"
)

// UserService interface remains the same, but it's now an application service
type UserService interface {
}

type userService struct {
	userRepo domain.UserRepository // Changed from repository.UserRepository
}

func NewUserService(userRepo domain.UserRepository) UserService { // Changed parameter type
	return &userService{userRepo: userRepo}
}
