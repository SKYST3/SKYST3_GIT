package delivery

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	"starrynight.com/server/internal/auth/application/service"
	"starrynight.com/server/internal/auth/infrastructure/cache"
	"starrynight.com/server/internal/auth/infrastructure/persistence"
)

func WebUserAuthorizationMiddleware(svc *service.SessionService) gin.HandlerFunc {
	return func(c *gin.Context) {
		// token := c.GetHeader("Authorization")
		// if token == "" {
		// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		// 	c.Abort()
		// 	return
		// }

		// userID, err := svc.Authorize(c.Request.Context(), token)
		// if err != nil {
		// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		// 	c.Abort()
		// 	return
		// }

		// c.Set("userID", userID)
		// c.Next()

		// For testing
		c.Set("userID", 1)
		c.Next()
	}
}

func AdminAuthorizationMiddleware(svc *service.SessionService) gin.HandlerFunc {
	return func(c *gin.Context) {
		// token := c.GetHeader("Authorization")
		// if token == "" {
		// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		// 	c.Abort()
		// 	return
		// }

		// userID, isAdmin, err := svc.AuthorizeAdmin(c.Request.Context(), token)
		// if err != nil {
		// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		// 	c.Abort()
		// 	return
		// }
		// if !isAdmin {
		// 	c.JSON(http.StatusForbidden, gin.H{"error": "Forbidden: Admins only"})
		// 	c.Abort()
		// 	return
		// }

		// c.Set("userID", userID)
		// c.Set("isAdmin", isAdmin)
		// c.Next()

		// For testing
		c.Set("userID", 1)
		c.Set("isAdmin", true)
		c.Next()
	}
}

func DefaultAuthMiddleWare(db *pgxpool.Pool, rc *redis.Client) gin.HandlerFunc {
	sessionRepo := persistence.NewPgSessionRepository(db)
	sessionCache := cache.NewRedisSessionCache(rc)
	sessionService := service.NewSessionService(sessionRepo, sessionCache)

	return WebUserAuthorizationMiddleware(sessionService)
}

func AdminAuthMiddleWare(db *pgxpool.Pool, rc *redis.Client) gin.HandlerFunc {
	sessionRepo := persistence.NewPgSessionRepository(db)
	sessionCache := cache.NewRedisSessionCache(rc)
	sessionService := service.NewSessionService(sessionRepo, sessionCache)

	return AdminAuthorizationMiddleware(sessionService)
}
