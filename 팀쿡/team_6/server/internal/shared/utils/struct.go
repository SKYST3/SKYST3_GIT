package utils

import (
	"encoding/json"
	"fmt"
)

func AnyToStruct[T any](input any) (*T, error) {
	bytes, err := json.Marshal(input)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal input: %w", err)
	}

	var result T
	if err := json.Unmarshal(bytes, &result); err != nil {
		return nil, fmt.Errorf("failed to unmarshal into struct: %w", err)
	}

	return &result, nil
}
