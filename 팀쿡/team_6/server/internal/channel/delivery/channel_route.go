package delivery

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	authd "starrynight.com/server/internal/auth/delivery"
)

func SetupChannelRoutes(
	router *gin.Engine,
	db *pgxpool.Pool,
	rc *redis.Client,
	channelHandler *ChannelHandler,
) {
	channelRoutes := router.Group("/v1/channel")
	{
		channelUserRoutes := channelRoutes.Group("", authd.DefaultAuthMiddleWare(db, rc))
		{
			channelUserRoutes.GET("", channelHandler.ListAllChannels)
			channelUserRoutes.GET("/:channelID", channelHandler.GetChannel)
			channelUserRoutes.GET("/preferred-language-code", channelHandler.ListChannelsByPreferredLanguageCode)
			channelUserRoutes.GET("/status", channelHandler.ListChannelsByStatus)
			channelUserRoutes.GET("/:channelID/audio-chunks", channelHandler.ListChannelAudioChunks)
		}

		channelAdminRoutes := channelRoutes.Group("", authd.AdminAuthMiddleWare(db, rc))
		{
			channelAdminRoutes.POST("", channelHandler.CreateChannel)
			channelAdminRoutes.POST("/:channelID/translation", channelHandler.CreateChannelTranslation)
			channelAdminRoutes.PUT("/:channelID", channelHandler.UpdateChannel)
			channelAdminRoutes.DELETE("/:channelID", channelHandler.DeleteChannel)
		}
	}
}
