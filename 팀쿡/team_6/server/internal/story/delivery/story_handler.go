package delivery

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	shared_dto "starrynight.com/server/internal/shared/dto"
	story_dto "starrynight.com/server/internal/story/application/dto"
	"starrynight.com/server/internal/story/application/service"
	story_entity "starrynight.com/server/internal/story/domain/entity"
)

var _ story_entity.Story       // for swagger
var _ story_dto.CreateStoryDTO // for swagger

type StoryHandler struct {
	storyService service.StoryService
}

// NewStoryHandler creates a new StoryHandler.
func NewStoryHandler(storyService service.StoryService) *StoryHandler {
	return &StoryHandler{storyService: storyService}
}

// CreateStory godoc
// @Summary Create a new story
// @Description Creates a new story in a channel.
// @Tags story
// @Accept json
// @Produce json
// @Param story body story_dto.CreateStoryDTO true "Story creation DTO"
// @Success 201 {object} story_entity.Story "Story created successfully"
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid request body"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/story [post]
func (h *StoryHandler) CreateStory(c *gin.Context) {
	var createDto story_dto.CreateStoryDTO
	if err := c.ShouldBindJSON(&createDto); err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid request body: " + err.Error()})
		return
	}

	// TODO: Get userID from context after auth middleware is implemented
	userID := 1 // Temporary hardcoded userID

	createdStory, err := h.storyService.CreateStory(c.Request.Context(), userID, &createDto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusCreated, createdStory)
}

// CreateStoryReply godoc
// @Summary Create a reply to a story
// @Description Creates a new reply to an existing story.
// @Tags story
// @Accept json
// @Produce json
// @Param storyID path int true "Story ID"
// @Param reply body story_dto.CreateStoryReplyDTO true "Story reply DTO"
// @Success 201 {object} story_entity.StoryReply "Reply created successfully"
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid request body"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/story/{storyID}/reply [post]
func (h *StoryHandler) CreateStoryReply(c *gin.Context) {
	storyID, err := strconv.Atoi(c.Param("storyID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid story ID"})
		return
	}

	var replyDto story_dto.CreateStoryReplyDTO
	if err := c.ShouldBindJSON(&replyDto); err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid request body: " + err.Error()})
		return
	}

	// TODO: Get userID from context after auth middleware is implemented
	userID := 1 // Temporary hardcoded userID

	replyDto.StoryID = storyID
	createdReply, err := h.storyService.CreateStoryReply(c.Request.Context(), userID, &replyDto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusCreated, createdReply)
}

// GetStory godoc
// @Summary Get a specific story
// @Description Retrieves a story by its ID.
// @Tags story
// @Produce json
// @Param storyID path int true "Story ID"
// @Success 200 {object} story_entity.Story
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid story ID"
// @Failure 404 {object} shared_dto.ErrorResponse "Story not found"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/story/{storyID} [get]
func (h *StoryHandler) GetStory(c *gin.Context) {
	storyID, err := strconv.Atoi(c.Param("storyID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid story ID"})
		return
	}

	story, err := h.storyService.GetStory(c.Request.Context(), storyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	if story == nil {
		c.JSON(http.StatusNotFound, shared_dto.ErrorResponse{Error: "Story not found"})
		return
	}
	c.JSON(http.StatusOK, story)
}

// GetStoriesByChannelID godoc
// @Summary Get stories by channel ID
// @Description Retrieves all stories in a specific channel.
// @Tags story
// @Produce json
// @Param channelID path int true "Channel ID"
// @Success 200 {array} story_entity.Story
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid channel ID"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel/{channelID}/stories [get]
func (h *StoryHandler) GetStoriesByChannelID(c *gin.Context) {
	channelID, err := strconv.Atoi(c.Param("channelID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid channel ID"})
		return
	}

	stories, err := h.storyService.GetStoriesByChannelID(c.Request.Context(), channelID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, stories)
}

// GetStoryRepliesByStoryID godoc
// @Summary Get replies for a story
// @Description Retrieves all replies for a specific story.
// @Tags story
// @Produce json
// @Param storyID path int true "Story ID"
// @Success 200 {array} story_entity.StoryReply
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid story ID"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/story/{storyID}/replies [get]
func (h *StoryHandler) GetStoryRepliesByStoryID(c *gin.Context) {
	storyID, err := strconv.Atoi(c.Param("storyID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid story ID"})
		return
	}

	replies, err := h.storyService.GetStoryRepliesByStoryID(c.Request.Context(), storyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, replies)
}

// DeleteStory godoc
// @Summary Delete a story
// @Description Deletes a story by its ID.
// @Tags story
// @Produce json
// @Param storyID path int true "Story ID"
// @Success 204 "Story deleted successfully"
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid story ID"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/story/{storyID} [delete]
func (h *StoryHandler) DeleteStory(c *gin.Context) {
	storyID, err := strconv.Atoi(c.Param("storyID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid story ID"})
		return
	}

	if err := h.storyService.DeleteStory(c.Request.Context(), storyID); err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
}

// DeleteStoryReply godoc
// @Summary Delete a story reply
// @Description Deletes a story reply by its ID.
// @Tags story
// @Produce json
// @Param replyID path int true "Reply ID"
// @Success 204 "Reply deleted successfully"
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid reply ID"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/story/reply/{replyID} [delete]
func (h *StoryHandler) DeleteStoryReply(c *gin.Context) {
	replyID, err := strconv.Atoi(c.Param("replyID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid reply ID"})
		return
	}

	if err := h.storyService.DeleteStoryReply(c.Request.Context(), replyID); err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
}

// GetStoriesByUserID godoc
// @Summary Get stories by user ID
// @Description Retrieves all stories created by the authenticated user.
// @Tags story
// @Produce json
// @Success 200 {array} story_entity.Story
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/story/user [get]
func (h *StoryHandler) GetStoriesByUserID(c *gin.Context) {
	userID := c.GetInt("userID")
	stories, err := h.storyService.GetStoriesByUserID(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, stories)
}

// GetStoryRepliesByUserID godoc
// @Summary Get story replies by user ID
// @Description Retrieves all story replies created by the authenticated user.
// @Tags story
// @Produce json
// @Success 200 {array} story_entity.StoryReply
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/story/user/replies [get]
func (h *StoryHandler) GetStoryRepliesByUserID(c *gin.Context) {
	userID := c.GetInt("userID")
	replies, err := h.storyService.GetStoryRepliesByUserID(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, replies)
}
