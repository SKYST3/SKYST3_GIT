package cache

import (
	"context"
	"time"

	"github.com/redis/go-redis/v9"
)

type RedisSessionCache struct {
	client *redis.Client
}

func NewRedisSessionCache(client *redis.Client) *RedisSessionCache {
	return &RedisSessionCache{client: client}
}

func (r *RedisSessionCache) GetUserID(ctx context.Context, token string) (int, error) {
	return r.client.Get(ctx, token).Int()
}

func (r *RedisSessionCache) SetUserID(ctx context.Context, token string, userID int, ttl time.Duration) error {
	return r.client.Set(ctx, token, userID, ttl).Err()
}

func (r *RedisSessionCache) RefreshTTL(ctx context.Context, token string, ttl time.Duration) error {
	return r.client.Expire(ctx, token, ttl).Err()
}
