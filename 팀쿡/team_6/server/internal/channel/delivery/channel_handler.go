package delivery

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"starrynight.com/server/internal/channel/application/dto"
	"starrynight.com/server/internal/channel/application/service"
	"starrynight.com/server/internal/channel/domain/entity"
	channelvo "starrynight.com/server/internal/channel/domain/valueobject"
	shared_dto "starrynight.com/server/internal/shared/dto"
	sharedvo "starrynight.com/server/internal/shared/valueobject"
)

var _ entity.ChannelTranslation // for swagger
var _ dto.CreateChannelDTO      // for swagger

type ChannelHandler struct {
	channelService service.ChannelService
}

// NewCampaignHandler creates a new CampaignHandler.
func NewChannelHandler(channelService service.ChannelService) *ChannelHandler {
	return &ChannelHandler{channelService: channelService}
}

// CreateChannel godoc
// @Summary Create a new channel
// @Description Creates a new channel with translations.
// @Tags channel
// @Accept json
// @Produce json
// @Param channel body dto.CreateChannelDTO true "Channel creation DTO"
// @Success 201 {object} entity.Channel "Channel created successfully"
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid request body"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel [post]
func (h *ChannelHandler) CreateChannel(c *gin.Context) {
	var createDto dto.CreateChannelDTO
	if err := c.ShouldBindJSON(&createDto); err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid request body: " + err.Error()})
		return
	}
	createdChannel, err := h.channelService.CreateChannel(c.Request.Context(), &createDto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusCreated, createdChannel)
}

// CreateChannelTranslation godoc
// @Summary Add a translation to a channel
// @Description Adds a new language translation to an existing channel.
// @Tags channel
// @Accept json
// @Produce json
// @Param channelID path int true "Channel ID"
// @Param translation body dto.CreateChannelTranslationDTO true "Channel translation DTO"
// @Success 201 {object} entity.ChannelTranslation "Translation created successfully"
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid input"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel/{channelID}/translation [post]
func (h *ChannelHandler) CreateChannelTranslation(c *gin.Context) {
	channelID, err := strconv.Atoi(c.Param("channelID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid channel ID"})
		return
	}
	var transDto dto.CreateChannelTranslationDTO
	if err := c.ShouldBindJSON(&transDto); err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid request body: " + err.Error()})
		return
	}
	createdTranslation, err := h.channelService.CreateChannelTranslation(c.Request.Context(), channelID, &transDto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusCreated, createdTranslation)
}

// GetChannel godoc
// @Summary Get a specific channel
// @Description Retrieves a channel by its ID and language code.
// @Tags channel
// @Produce json
// @Param channelID path int true "Channel ID"
// @Param lang query string true "Language code (e.g., en, ko)"
// @Success 200 {object} dto.ReadChannelDTO
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid channel ID or language code"
// @Failure 404 {object} shared_dto.ErrorResponse "Channel not found"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel/{channelID} [get]
func (h *ChannelHandler) GetChannel(c *gin.Context) {
	channelID, err := strconv.Atoi(c.Param("channelID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid channel ID"})
		return
	}
	languageCode := c.Query("lang")
	if languageCode == "" {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "lang query parameter is required"})
		return
	}
	channel, err := h.channelService.GetChannel(c.Request.Context(), channelID, sharedvo.LanguageCode(languageCode))
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	if channel == nil {
		c.JSON(http.StatusNotFound, shared_dto.ErrorResponse{Error: "Channel not found"})
		return
	}
	c.JSON(http.StatusOK, channel)
}

// ListAllChannels godoc
// @Summary List all channels
// @Description Retrieves all channels for a given language.
// @Tags channel
// @Produce json
// @Param lang query string true "Language code (e.g., en, ko)"
// @Success 200 {array} dto.ReadChannelDTO
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid language code"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel [get]
func (h *ChannelHandler) ListAllChannels(c *gin.Context) {
	languageCode := c.Query("lang")
	if languageCode == "" {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "lang query parameter is required"})
		return
	}
	channels, err := h.channelService.ListAllChannels(c.Request.Context(), sharedvo.LanguageCode(languageCode))
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, channels)
}

// ListChannelsByPreferredLanguageCode godoc
// @Summary List channels by preferred language code
// @Description Retrieves channels accessible to the user (active, or exclusive if whitelisted).
// @Tags channel
// @Produce json
// @Param lang query string true "Language code"
// @Param preferredLang query string true "Preferred language code"
// @Success 200 {array} dto.ReadChannelDTO
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid input"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel/preferred-language-code [get]
func (h *ChannelHandler) ListChannelsByPreferredLanguageCode(c *gin.Context) {
	languageCode := c.Query("lang")
	if languageCode == "" {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "lang query parameter is required"})
		return
	}

	preferredLanguageCode := c.Query("preferredLang")
	if preferredLanguageCode == "" {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "preferredLang query parameter is required"})
		return
	}

	channels, err := h.channelService.ListChannelsByPreferredLanguageCode(
		c.Request.Context(),
		sharedvo.LanguageCode(preferredLanguageCode),
		sharedvo.LanguageCode(languageCode),
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, channels)
}

// ListChannelsByStatus godoc
// @Summary List channels by status
// @Description Retrieves channels by status.
// @Tags channel
// @Produce json
// @Param status query string true "Status"
// @Param lang query string true "Language code"
// @Success 200 {array} dto.ReadChannelDTO
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid input"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel/status [get]
func (h *ChannelHandler) ListChannelsByStatus(c *gin.Context) {
	status := c.Query("status")
	if status == "" {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "status query parameter is required"})
		return
	}
	languageCode := c.Query("lang")
	if languageCode == "" {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "lang query parameter is required"})
		return
	}
	channels, err := h.channelService.ListChannelsByStatus(
		c.Request.Context(),
		channelvo.ChannelStatus(status),
		sharedvo.LanguageCode(languageCode),
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, channels)
}

// UpdateChannel godoc
// @Summary Update a channel
// @Description Updates details of an existing channel.
// @Tags channel
// @Accept json
// @Produce json
// @Param channelID path int true "Channel ID"
// @Param channel body dto.UpdateChannelDTO true "Channel update DTO"
// @Success 200 {object} nil "Channel updated successfully"
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid input"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel/{channelID} [put]
func (h *ChannelHandler) UpdateChannel(c *gin.Context) {
	channelID, err := strconv.Atoi(c.Param("channelID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid channel ID"})
		return
	}
	var updateDto dto.UpdateChannelDTO
	if err := c.ShouldBindJSON(&updateDto); err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid request body: " + err.Error()})
		return
	}
	if err := h.channelService.UpdateChannel(c.Request.Context(), channelID, &updateDto); err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, nil)
}

// DeleteChannel godoc
// @Summary Delete a channel
// @Description Deletes a channel by its ID.
// @Tags channel
// @Produce json
// @Param channelID path int true "Channel ID"
// @Success 204 "Channel deleted successfully"
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid channel ID"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel/{channelID} [delete]
func (h *ChannelHandler) DeleteChannel(c *gin.Context) {
	channelID, err := strconv.Atoi(c.Param("channelID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid channel ID"})
		return
	}
	if err := h.channelService.DeleteChannel(c.Request.Context(), channelID); err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
}

// ListChannelAudioChunks godoc
// @Summary List channel audio chunks
// @Description Retrieves all audio chunks for a given channel.
// @Tags channel
// @Produce json
// @Param channelID path int true "Channel ID"
// @Success 200 {array} entity.ChannelAudioChunk
// @Failure 400 {object} shared_dto.ErrorResponse "Invalid channel ID"
// @Failure 500 {object} shared_dto.ErrorResponse "Internal server error"
// @Router /v1/channel/{channelID}/audio-chunks [get]
func (h *ChannelHandler) ListChannelAudioChunks(c *gin.Context) {
	channelID, err := strconv.Atoi(c.Param("channelID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, shared_dto.ErrorResponse{Error: "Invalid channel ID"})
		return
	}
	chunks, err := h.channelService.ListChannelAudioChunks(c.Request.Context(), channelID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, shared_dto.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, chunks)
}
