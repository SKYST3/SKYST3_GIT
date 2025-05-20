package delivery

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	authd "starrynight.com/server/internal/auth/delivery"
)

func SetupStoryRoutes(
	router *gin.Engine,
	db *pgxpool.Pool,
	rc *redis.Client,
	storyHandler *StoryHandler,
) {
	storyRoutes := router.Group("/v1/story")
	{
		// Public routes (no auth required)
		storyRoutes.GET("/:storyID", storyHandler.GetStory)
		storyRoutes.GET("/:storyID/replies", storyHandler.GetStoryRepliesByStoryID)
		storyRoutes.GET("/channel/:channelID", storyHandler.GetStoriesByChannelID)

		storyUserRoutes := storyRoutes.Group("", authd.DefaultAuthMiddleWare(db, rc))
		{
			storyUserRoutes.POST("", storyHandler.CreateStory)
			storyUserRoutes.POST("/:storyID/reply", storyHandler.CreateStoryReply)
			storyUserRoutes.DELETE("/reply/:replyID", storyHandler.DeleteStoryReply)
			storyUserRoutes.GET("/user", storyHandler.GetStoriesByUserID)
			storyUserRoutes.GET("/user/replies", storyHandler.GetStoryRepliesByUserID)
		}

		storyAdminRoutes := storyRoutes.Group("", authd.AdminAuthMiddleWare(db, rc))
		{
			storyAdminRoutes.DELETE("/:storyID", storyHandler.DeleteStory)
		}
	}
}
