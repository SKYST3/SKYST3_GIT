package redis

import (
	"github.com/redis/go-redis/v9"
)

func NewRedisClient(options *redis.Options) (*redis.Client, error) {
	return redis.NewClient(options), nil
}

func NewRedisClientFromConnectionString(connectionString string) (*redis.Client, error) {
	options, err := ParseRedisConnectionString(connectionString)
	if err != nil {
		return nil, err
	}
	return NewRedisClient(options)
}
