package delivery

import (
	"starrynight.com/server/internal/user/application/service"
)

// UserHandler handles HTTP requests for user-related actions.
type UserHandler struct {
	userService service.UserService
}

// NewUserHandler creates a new HTTPUserHandler.
func NewUserHandler(userService service.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}
