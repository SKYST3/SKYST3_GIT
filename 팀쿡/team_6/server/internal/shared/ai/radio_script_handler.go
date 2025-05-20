package ai

import (
	"context"
	"os"
	"strings"

	openai "github.com/sashabaranov/go-openai"
)

func preprocessInput(input string) string {
	if strings.Contains(input, "프롬프트") &&
		(strings.Contains(input, "무시") || strings.Contains(input, "override") || strings.Contains(input, "무효화")) {
		return SpoilToken
	}
	return input
}

func handleInput(input string) string {
	output := preprocessInput(input)
	if strings.Contains(output, SpoilToken) {
		return ""
	} else if strings.Contains(output, StopToken) {
		return ClosingMent
	}
	return output
}

func callOpenAI(prompt string) (string, error) {
	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))

	req := openai.ChatCompletionRequest{
		Model: "gpt-4o-mini-2024-07-18",
		Messages: []openai.ChatCompletionMessage{
			{Role: openai.ChatMessageRoleSystem, Content: SystemPrompt},
			{Role: openai.ChatMessageRoleUser, Content: prompt},
		},
		MaxTokens:   1024,
		Temperature: 0.8,
	}

	resp, err := client.CreateChatCompletion(context.Background(), req)
	if err != nil {
		return "", err
	}
	return resp.Choices[0].Message.Content, nil
}
