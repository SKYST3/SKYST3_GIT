package config

type Config struct {
	Server struct {
		Env     string `mapstructure:"env"`
		Port    string `mapstructure:"port"`
		RunMode string `mapstructure:"run_mode"`
	} `mapstructure:"server"`

	Database struct {
		Postgres struct {
			Connection string `mapstructure:"connection"`
		} `mapstructure:"postgres"`

		Redis struct {
			Connection string `mapstructure:"connection"`
		} `mapstructure:"redis"`
	} `mapstructure:"database"`

	Storage struct {
		Endpoint  string `mapstructure:"endpoint"`
		AccessKey string `mapstructure:"access_key"`
		SecretKey string `mapstructure:"secret_key"`
	} `mapstructure:"storage"`

	Ffmpeg struct {
		Path string `mapstructure:"path"`
	} `mapstructure:"ffmpeg"`
}
