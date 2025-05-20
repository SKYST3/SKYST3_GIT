package redis

import (
	"github.com/redis/go-redis/v9"
)

func ParseRedisConnectionString(connectionString string) (*redis.Options, error) {
	opts, err := redis.ParseURL(connectionString)
	if err != nil {
		return nil, err
	}

	return opts, nil
}
