package dto

type CreateUserPhoneVerificationDTO struct {
	UserName    string `json:"user_name"`
	PhoneNumber string `json:"phone_number"`
}

type ConfirmUserPhoneVerificationDTO struct {
	PhoneNumber      string `json:"phone_number"`
	VerificationCode string `json:"verification_code"`
}

type SetUserOfficialNameDTO struct {
	OfficialName string `json:"official_name"`
}

type SetUserNameDTO struct {
	Name string `json:"name"`
}

type SetUserPhoneDTO struct {
	Phone string `json:"phone"`
}

type SetUserOnboardCompleteDTO struct {
	OnboardComplete bool `json:"onboard_complete"`
}

type ReservationCount struct {
	Total     int `json:"total"`
	Finished  int `json:"finished"`
	Confirmed int `json:"confirmed"`
	Cancelled int `json:"cancelled"`
	Pending   int `json:"pending"`
}

type ReadUserDTO struct {
	ID               int              `json:"id"`
	Name             string           `json:"name"`
	Email            string           `json:"email"`
	Phone            string           `json:"phone"`
	OfficialName     string           `json:"official_name"`
	Providers        []string         `json:"providers"`
	Image            string           `json:"image"`
	OnboardComplete  bool             `json:"onboard_complete"`
	ReservationCount ReservationCount `json:"reservation_count"`
}

type ReadUserDTOalt struct {
	ID              int      `json:"id"`
	Name            string   `json:"name"`
	Email           string   `json:"email"`
	Phone           string   `json:"phone"`
	OfficialName    string   `json:"official_name"`
	Providers       []string `json:"providers"`
	Image           string   `json:"image"`
	OnboardComplete bool     `json:"onboard_complete"`
	Total           int      `json:"total"`
	Finished        int      `json:"finished"`
	Confirmed       int      `json:"confirmed"`
	Cancelled       int      `json:"cancelled"`
	Pending         int      `json:"pending"`
}

// SearchUserResult is the DTO exposed by the application layer for search results.
// It maps from domain.SearchUserResult.
type SearchUserResult struct {
	ID           int      `json:"id"`
	Name         string   `json:"name"`
	Email        string   `json:"email"`
	Phone        string   `json:"phone"`
	OfficialName string   `json:"official_name"`
	Providers    []string `json:"providers"`
	Image        string   `json:"image"`
}
