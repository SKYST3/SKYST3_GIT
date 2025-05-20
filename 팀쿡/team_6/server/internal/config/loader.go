package config

import (
	"fmt"

	"github.com/spf13/viper"
)

func LoadConfig() (*Config, error) {
	v := viper.New()
	v.AutomaticEnv()

	bindEnvVars(v)

	var config Config
	if err := v.Unmarshal(&config); err != nil {
		return nil, fmt.Errorf("failed to unmarshal config: %w", err)
	}

	return &config, nil
}

func bindEnvVars(v *viper.Viper) {
	envMap := map[string]string{
		"server.env":      "ENV",
		"server.port":     "PORT",
		"server.run_mode": "RUN_MODE",

		"database.postgres.connection": "MAIN_DB_CONNECTION",
		"database.redis.connection":    "REDIS_CONNECTION",

		"storage.endpoint":   "STORAGE_ENDPOINT",
		"storage.access_key": "MINIO_ACCESS_KEY",
		"storage.secret_key": "MINIO_SECRET_KEY",

		"ffmpeg.path": "FFMPEG_BIN_PATH",
	}

	for key, env := range envMap {
		_ = v.BindEnv(key, env)
	}
}
