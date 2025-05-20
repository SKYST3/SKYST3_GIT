package cache

import (
	"github.com/redis/go-redis/v9"
	"starrynight.com/server/internal/channel/domain"
)

type redisChannelCache struct {
	rc *redis.Client
}

func NewRedisChannelCache(rc *redis.Client) domain.ChannelCache {
	return &redisChannelCache{rc: rc}
}
