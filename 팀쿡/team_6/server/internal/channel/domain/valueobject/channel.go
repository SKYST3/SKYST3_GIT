package valueobject

import "fmt"

type ChannelStatus string
type HostType string

const (
	ChannelStatusIdle     ChannelStatus = "idle"
	ChannelStatusActive   ChannelStatus = "active"
	ChannelStatusInactive ChannelStatus = "inactive"
)

const (
	HostTypeSingleHost HostType = "single_host"
	HostTypeDoubleHost HostType = "double_host"
)

const (
	AudioChunkSize = 4
)

const GenerateContentPeriodMinutes = 1

func GetAudioChunkFileURL(audioChunkUUID string) string {
	return fmt.Sprintf("https://storage-starrynight.luidium.com/audio-chunks/%s.aac", audioChunkUUID)
}
