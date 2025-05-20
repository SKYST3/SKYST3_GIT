package ai

import (
	"context"
	"fmt"

	"starrynight.com/server/internal/story/domain/entity"
)

// GenerateAndSetContentForStory generates AI-based response and sets it to story.GeneratedContent
// if you give stop token (Cdi6FyFruwrE8w61O4tS) then it will gives closing comment
func GenerateAndSetContentForStory(ctx context.Context, story *entity.Story) error {
	prompt := fmt.Sprintf("title: %s\ncontent: %s", story.Title, story.Content)

	// override := handleInput(prompt)
	// if override != "" {
	// 	story.GeneratedContent = &override
	// 	return nil
	// }

	response, err := callOpenAI(prompt)
	if err != nil {
		return fmt.Errorf("OpenAI API failed: %w", err)
	}

	story.GeneratedContent = &response
	return nil
}

// Optional helper for batch processing
func GenerateContentsForStories(ctx context.Context, stories []*entity.Story) error {
	for _, story := range stories {
		if story.GeneratedContent == nil || *story.GeneratedContent == "" {
			if err := GenerateAndSetContentForStory(ctx, story); err != nil {
				return err
			}
		}
	}
	return nil
}
