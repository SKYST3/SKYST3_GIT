package ai

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

func TTS(ctx context.Context, targetText string, outputPath string) error {
	gptModelPath := "/home/atlasyang/playground/audio-stream-test/GPT-SoVITS/GPT_SoVITS/pretrained_models/s1v3.ckpt"
	sovitsModelPath := "/home/atlasyang/playground/audio-stream-test/GPT-SoVITS/SoVITS_weights_v2/xxx_e4_s412.pth"
	refAudioPath := "/tmp/1_0034.wav"

	url := os.Getenv("TTS_API_URL")

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	writer.WriteField("gpt_model_path", gptModelPath)
	writer.WriteField("sovits_model_path", sovitsModelPath)
	writer.WriteField("ref_language", "韩文")
	writer.WriteField("target_language", "韩文")
	writer.WriteField("ref_text", "한국어 실력이 날로 발전하는 것을 보니 기쁩니다")
	writer.WriteField("target_text", targetText)
	writer.WriteField("output_path", outputPath)

	refAudioFile, err := os.Open(refAudioPath)
	if err != nil {
		panic(err)
	}
	defer refAudioFile.Close()

	part, err := writer.CreateFormFile("ref_audio", "1_0034.wav")
	if err != nil {
		panic(err)
	}
	_, err = io.Copy(part, refAudioFile)
	if err != nil {
		panic(err)
	}

	writer.Close()

	req, err := http.NewRequest("POST", url, body)
	if err != nil {
		panic(err)
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("TTS API failed: %s", respBody)
	}

	return nil
}
