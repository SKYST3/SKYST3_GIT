package shared_dto

// swagger:model ErrorResponse
type ErrorResponse struct {
	Error string `json:"error" example:"Error message description"`
}
