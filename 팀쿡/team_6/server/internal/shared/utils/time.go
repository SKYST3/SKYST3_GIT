package utils

import (
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func ToTimestamptz(t time.Time) pgtype.Timestamptz {
	return pgtype.Timestamptz{
		Time:  t,
		Valid: !t.IsZero(),
	}
}
