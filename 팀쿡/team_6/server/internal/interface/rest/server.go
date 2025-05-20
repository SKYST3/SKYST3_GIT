package rest

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/robfig/cron/v3"
	apidocsd "starrynight.com/server/internal/api_docs/delivery"
	channelService "starrynight.com/server/internal/channel/application/service"
	channeld "starrynight.com/server/internal/channel/delivery"
	channel_vo "starrynight.com/server/internal/channel/domain/valueobject"
	channelp "starrynight.com/server/internal/channel/infrastructure/persistence"
	"starrynight.com/server/internal/config"
	"starrynight.com/server/internal/shared/database/postgres"
	"starrynight.com/server/internal/shared/database/redis"
	ffmpeg_wrapper "starrynight.com/server/internal/shared/media/ffmpeg-wrapper"
	"starrynight.com/server/internal/shared/storage/minio"
	storyService "starrynight.com/server/internal/story/application/service"
	storyd "starrynight.com/server/internal/story/delivery"
	storyp "starrynight.com/server/internal/story/infrastructure/persistence"
)

func Run() {
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	if config.Server.RunMode == "debug" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	port := config.Server.Port
	if port == "" {
		port = "8080"
	}

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"https://starrynight.luidium.com",
			"http://localhost:19883",
		},
		AllowCredentials: true,
		AllowMethods:     []string{"PUT", "POST", "GET", "DELETE", "OPTIONS"},
		AllowHeaders: []string{
			"Authorization",
			"Content-Type",
		},
	}))

	router.Handle("GET", "/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	ctx := context.Background()

	pgPool, err := postgres.NewPostgresPoolFromConnectionString(ctx, config.Database.Postgres.Connection)
	if err != nil {
		log.Fatalf("Failed to create postgres pool: %v", err)
	}

	redisClient, err := redis.NewRedisClientFromConnectionString(config.Database.Redis.Connection)
	if err != nil {
		log.Fatalf("Failed to create redis client: %v", err)
	}

	storageClient, err := minio.NewStorageClient(config)
	if err != nil {
		log.Fatalf("Failed to create storage client: %v", err)
	}

	ffmpegService := ffmpeg_wrapper.NewFfmpegService(config)

	// Initialize repositories
	channelRepository := channelp.NewPgChannelRepository(pgPool)
	storyRepository := storyp.NewPgStoryRepository(pgPool)

	// Initialize caches

	// Initialize services
	channelService := channelService.NewChannelService(
		pgPool,
		channelRepository,
		storyRepository,
		storageClient,
		ffmpegService,
	)
	storyService := storyService.NewStoryService(
		pgPool,
		storyRepository,
	)

	// Initialize handlers
	channelHandler := channeld.NewChannelHandler(channelService)
	storyHandler := storyd.NewStoryHandler(storyService)
	apiDocsHandler := apidocsd.NewAPIDocsHandler(config)

	// Setup routes
	channeld.SetupChannelRoutes(router, pgPool, redisClient, channelHandler)
	storyd.SetupStoryRoutes(router, pgPool, redisClient, storyHandler)

	apidocsd.RegisterAPIDocsRoutes(router, apiDocsHandler)

	c := cron.New(cron.WithLocation(time.FixedZone("Asia/Seoul", 9*60*60)))
	c.AddFunc(fmt.Sprintf("@every %dm", channel_vo.GenerateContentPeriodMinutes), func() {
		cctx, cancel := context.WithTimeout(context.Background(), 10*time.Minute)
		defer cancel()

		log.Println("Generating content for all channels")

		channelService.GenerateContentForAllChannels(cctx)
	})
	c.Start()

	log.Println("Starting server on port", port)
	router.Run(":" + port)
}
