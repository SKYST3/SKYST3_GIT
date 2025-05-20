package cache

import (
	"github.com/redis/go-redis/v9"
	"starrynight.com/server/internal/story/domain"
)

type redisStoryCache struct {
	rc *redis.Client
}

func NewRedisStoryCache(rc *redis.Client) domain.StoryCache {
	return &redisStoryCache{rc: rc}
}
