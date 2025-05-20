package sharedvo

import "fmt"

type LanguageCode string

const (
	LanguageCodeKorean  LanguageCode = "ko"
	LanguageCodeEnglish LanguageCode = "en"
)

func (c LanguageCode) String() string {
	return string(c)
}

func (c LanguageCode) IsValid() bool {
	return c == LanguageCodeKorean || c == LanguageCodeEnglish
}

func (c LanguageCode) GetLanguageName() string {
	switch c {
	case LanguageCodeKorean:
		return "한국어"
	case LanguageCodeEnglish:
		return "English"
	default:
		return "Unknown"
	}
}

func (c LanguageCode) GetLanguageCode() string {
	return string(c)
}

func NewLanguageCode(langStr string) (LanguageCode, error) {
	if !LanguageCode(langStr).IsValid() {
		return "", fmt.Errorf("invalid language code: %s", langStr)
	}
	return LanguageCode(langStr), nil
}
