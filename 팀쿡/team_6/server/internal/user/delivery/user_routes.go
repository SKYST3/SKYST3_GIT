package delivery

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

// RegisterUserRoutes sets up the user-related routes.
// It now takes the HTTPUserHandler directly, and dependencies for middleware.
func RegisterUserRoutes(
	router *gin.Engine,
	db *pgxpool.Pool,
	rc *redis.Client,
	userHandler *UserHandler,
) {
	// userRoutes := router.Group("/v1/user")
	// {
	// 	// userNormalRoutes := userRoutes.Group("", authd.DefaultAuthMiddleWare(db, rc))
	// 	// {
	// 	// }

	// 	// userAdminRoutes := userRoutes.Group("", authd.AdminAuthMiddleWare(db, rc))
	// 	// {
	// 	// }
	// }
}
