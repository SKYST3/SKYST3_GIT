package ffmpeg_wrapper

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"strings"

	"starrynight.com/server/internal/config"
)

type FfmpegService interface {
	SplitAudioFile(ctx context.Context, audioFilePath string, chunkSize int, outputDir string) ([]string, error)
}

type ffmpegService struct {
	ffmpegPath string
}

func NewFfmpegService(config *config.Config) FfmpegService {
	return &ffmpegService{
		ffmpegPath: config.Ffmpeg.Path,
	}
}

func (s *ffmpegService) SplitAudioFile(ctx context.Context, audioFilePath string, chunkSize int, outputDir string) ([]string, error) {
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return nil, err
	}

	cmd := exec.Command(
		s.ffmpegPath,
		"-i", audioFilePath,
		"-f", "segment",
		"-segment_list", fmt.Sprintf("%s/out.list", outputDir),
		"-segment_time", fmt.Sprintf("%d", chunkSize),
		"-ar", "44100",
		"-ac", "2",
		"-c:a", "aac",
		"-map", "0:a",
		"-y",
		outputDir+"/%04d.aac",
	)

	if err := cmd.Run(); err != nil {
		return nil, err
	}

	fileList, err := os.ReadFile(fmt.Sprintf("%s/out.list", outputDir))
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(fileList), "\n")
	files := make([]string, 0, len(lines))
	for _, line := range lines {
		if line == "" {
			continue
		}
		files = append(files, fmt.Sprintf("%s/%s", outputDir, line))
	}
	return files, nil
}

func (s *ffmpegService) CleanUp(ctx context.Context, outputDir string) error {
	return os.RemoveAll(outputDir)
}
