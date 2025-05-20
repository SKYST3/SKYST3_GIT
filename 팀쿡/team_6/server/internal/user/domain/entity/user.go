package domain

type User struct {
	ID            int    `json:"id"`
	Name          string `json:"name"`
	Email         string `json:"email"`
	EmailVerified bool   `json:"emailVerified"`
	Phone         string `json:"phone"`
	PhoneVerified bool   `json:"phoneVerified"`
	Image         string `json:"image"`
}
