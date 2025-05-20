package persistence

import (
	"context"

	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"starrynight.com/server/internal/channel/application/dto"
	"starrynight.com/server/internal/channel/domain"
	"starrynight.com/server/internal/channel/domain/entity"
	channelvo "starrynight.com/server/internal/channel/domain/valueobject"
	"starrynight.com/server/internal/shared/database/postgres"
	sharedvo "starrynight.com/server/internal/shared/valueobject"
)

type pgChannelRepository struct {
	db postgres.DbExecutor
}

func NewPgChannelRepository(db *pgxpool.Pool) domain.ChannelRepository {
	return &pgChannelRepository{db: db}
}

func (r *pgChannelRepository) WithTx(ctx context.Context, tx pgx.Tx) domain.ChannelRepository {
	return &pgChannelRepository{db: tx}
}

func (r *pgChannelRepository) CreateChannel(ctx context.Context, channel *entity.Channel) (int, error) {
	query := `
		INSERT INTO channels (status, preferred_language_code, host_interface, speech_interface)
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`

	var id int
	if err := r.db.QueryRow(
		ctx,
		query,
		channel.Status,
		channel.PreferredLanguageCode,
		channel.HostInterface.Stringify(),
		channel.SpeechInterface.Stringify(),
	).Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *pgChannelRepository) CreateChannelTranslation(
	ctx context.Context,
	channelTranslation *entity.ChannelTranslation,
) (int, error) {
	query := `
		INSERT INTO channel_translations (channel_id, language_code, name, description)
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`

	var id int
	if err := r.db.QueryRow(
		ctx,
		query,
		channelTranslation.ChannelID,
		channelTranslation.LanguageCode,
		channelTranslation.Name,
		channelTranslation.Description,
	).Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *pgChannelRepository) FindChannelTranslationByID(ctx context.Context, id int) (*entity.ChannelTranslation, error) {
	query := `
		SELECT id, channel_id, language_code, name, description
		FROM channel_translations
		WHERE id = $1
	`

	var channelTranslation entity.ChannelTranslation
	if err := pgxscan.Get(ctx, r.db, &channelTranslation, query, id); err != nil {
		return nil, err
	}

	return &channelTranslation, nil
}

func (r *pgChannelRepository) FindChannelByID(ctx context.Context, id int) (*entity.Channel, error) {
	query := `
		SELECT id, status, preferred_language_code, host_interface, speech_interface, created_at
		FROM channels
		WHERE id = $1
	`

	var channelrow entity.ChannelRow

	if err := pgxscan.Get(ctx, r.db, &channelrow, query, id); err != nil {
		return nil, err
	}

	channel := channelrow.ToEntity()

	return channel, nil
}

func (r *pgChannelRepository) FindAllChannels(ctx context.Context) ([]*entity.Channel, error) {
	query := `
		SELECT id, status, preferred_language_code, host_interface, speech_interface, created_at
		FROM channels
	`

	var channelrows []entity.ChannelRow
	if err := pgxscan.Select(ctx, r.db, &channelrows, query); err != nil {
		return nil, err
	}

	channels := make([]*entity.Channel, len(channelrows))
	for i, channelrow := range channelrows {
		channels[i] = channelrow.ToEntity()
	}

	return channels, nil
}

func (r *pgChannelRepository) FindChannelByPreferredLanguageCode(
	ctx context.Context,
	languageCode sharedvo.LanguageCode,
) (*entity.Channel, error) {
	query := `
		SELECT id, status, preferred_language_code, host_interface, speech_interface, created_at
		FROM channels
		WHERE preferred_language_code = $1
	`

	var channelrow entity.ChannelRow
	if err := pgxscan.Get(ctx, r.db, &channelrow, query, languageCode); err != nil {
		return nil, err
	}

	return channelrow.ToEntity(), nil
}

func (r *pgChannelRepository) FindChannelsByStatus(
	ctx context.Context,
	status channelvo.ChannelStatus,
) ([]*entity.Channel, error) {
	query := `
		SELECT id, status, preferred_language_code, host_interface, speech_interface, created_at
		FROM channels
		WHERE status = $1
	`

	var channelrows []entity.ChannelRow
	if err := pgxscan.Select(ctx, r.db, &channelrows, query, status); err != nil {
		return nil, err
	}

	channels := make([]*entity.Channel, len(channelrows))
	for i, channelrow := range channelrows {
		channels[i] = channelrow.ToEntity()
	}

	return channels, nil
}

func (r *pgChannelRepository) ReadAllChannels(ctx context.Context, languageCode sharedvo.LanguageCode) ([]*dto.ReadChannelDTO, error) {
	query := `
		SELECT
			c.id,
			c.status,
			c.preferred_language_code,
			c.host_interface,
			c.speech_interface,
			c.created_at,
			ct.name,
			ct.description
		FROM channels c
		JOIN channel_translations ct ON c.id = ct.channel_id AND ct.language_code = $1
	`

	var readChannelDTOrows []*dto.ReadChannelDTOrow
	if err := pgxscan.Select(ctx, r.db, &readChannelDTOrows, query, languageCode); err != nil {
		return nil, err
	}

	readChannelDTOs := make([]*dto.ReadChannelDTO, len(readChannelDTOrows))
	for i, readChannelDTOrow := range readChannelDTOrows {
		readChannelDTO, err := readChannelDTOrow.ToDTO()
		if err != nil {
			return nil, err
		}
		readChannelDTOs[i] = readChannelDTO
	}

	return readChannelDTOs, nil
}

func (r *pgChannelRepository) ReadChannelByID(ctx context.Context, id int, languageCode sharedvo.LanguageCode) (*dto.ReadChannelDTO, error) {
	query := `
		SELECT
			c.id,
			c.status,
			c.preferred_language_code,
			c.host_interface,
			c.speech_interface,
			c.created_at,
			ct.name,
			ct.description
		FROM channels c
		JOIN channel_translations ct ON c.id = ct.channel_id AND ct.language_code = $2
		WHERE c.id = $1
	`

	var readChannelDTOrow dto.ReadChannelDTOrow
	if err := pgxscan.Get(ctx, r.db, &readChannelDTOrow, query, id, languageCode); err != nil {
		return nil, err
	}

	readChannelDTO, err := readChannelDTOrow.ToDTO()
	if err != nil {
		return nil, err
	}

	return readChannelDTO, nil
}

func (r *pgChannelRepository) ReadChannelsByPreferredLanguageCode(
	ctx context.Context,
	preferredLanguageCode sharedvo.LanguageCode,
	languageCode sharedvo.LanguageCode,
) ([]*dto.ReadChannelDTO, error) {
	query := `
		SELECT
			c.id,
			c.status,
			c.preferred_language_code,
			c.host_interface,
			c.speech_interface,
			c.created_at,
			ct.name,
			ct.description
		FROM channels c
		JOIN channel_translations ct ON c.id = ct.channel_id AND ct.language_code = $2
		WHERE c.preferred_language_code = $1
	`

	var readChannelDTOrows []*dto.ReadChannelDTOrow
	if err := pgxscan.Select(ctx, r.db, &readChannelDTOrows, query, preferredLanguageCode, languageCode); err != nil {
		return nil, err
	}

	readChannelDTOs := make([]*dto.ReadChannelDTO, len(readChannelDTOrows))
	for i, readChannelDTOrow := range readChannelDTOrows {
		readChannelDTO, err := readChannelDTOrow.ToDTO()
		if err != nil {
			return nil, err
		}
		readChannelDTOs[i] = readChannelDTO
	}

	return readChannelDTOs, nil
}

func (r *pgChannelRepository) ReadChannelsByStatus(
	ctx context.Context,
	status channelvo.ChannelStatus,
	languageCode sharedvo.LanguageCode,
) ([]*dto.ReadChannelDTO, error) {
	query := `
		SELECT
			c.id,
			c.status,
			c.preferred_language_code,
			c.host_interface,
			c.speech_interface,
			c.created_at,
			ct.name,
			ct.description
		FROM channels c
		JOIN channel_translations ct ON c.id = ct.channel_id AND ct.language_code = $2
		WHERE c.status = $1
	`

	var readChannelDTOrows []*dto.ReadChannelDTOrow
	if err := pgxscan.Select(ctx, r.db, &readChannelDTOrows, query, status, languageCode); err != nil {
		return nil, err
	}

	readChannelDTOs := make([]*dto.ReadChannelDTO, len(readChannelDTOrows))
	for i, readChannelDTOrow := range readChannelDTOrows {
		readChannelDTO, err := readChannelDTOrow.ToDTO()
		if err != nil {
			return nil, err
		}
		readChannelDTOs[i] = readChannelDTO
	}

	return readChannelDTOs, nil
}

func (r *pgChannelRepository) UpdateChannel(ctx context.Context, channel *entity.Channel) error {
	query := `
		UPDATE channels
		SET status = $1, preferred_language_code = $2, host_interface = $3, speech_interface = $4
		WHERE id = $5
	`

	if _, err := r.db.Exec(
		ctx,
		query,
		channel.Status,
		channel.PreferredLanguageCode,
		channel.HostInterface.Stringify(),
		channel.SpeechInterface.Stringify(),
		channel.ID,
	); err != nil {
		return err
	}

	return nil
}

func (r *pgChannelRepository) DeleteChannel(ctx context.Context, id int) error {
	query := `
		DELETE FROM channels
		WHERE id = $1
	`

	if _, err := r.db.Exec(ctx, query, id); err != nil {
		return err
	}

	return nil
}

func (r *pgChannelRepository) CreateChannelAudioChunk(ctx context.Context, channelAudioChunk *entity.ChannelAudioChunk) (int, error) {
	query := `
		INSERT INTO channel_audio_chunks (channel_id, audio_chunk_stage, audio_chunk_index, audio_chunk_uuid)
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`

	var id int
	if err := r.db.QueryRow(
		ctx,
		query,
		channelAudioChunk.ChannelID,
		channelAudioChunk.AudioChunkStage,
		channelAudioChunk.AudioChunkIndex,
		channelAudioChunk.AudioChunkUUID,
	).Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *pgChannelRepository) FindChannelAudioChunksByChannelID(ctx context.Context, channelID int) ([]*entity.ChannelAudioChunk, error) {
	query := `
		SELECT id, channel_id, audio_chunk_stage, audio_chunk_index, audio_chunk_uuid, created_at
		FROM channel_audio_chunks
		WHERE channel_id = $1
		ORDER BY audio_chunk_index ASC
	`

	var channelAudioChunks []*entity.ChannelAudioChunk
	if err := pgxscan.Select(ctx, r.db, &channelAudioChunks, query, channelID); err != nil {
		return nil, err
	}

	return channelAudioChunks, nil
}

func (r *pgChannelRepository) FindMaxAudioChunkStageByChannelID(ctx context.Context, channelID int) (int, error) {
	query := `
		SELECT 
			COALESCE(MAX(audio_chunk_stage), 0) 
		FROM channel_audio_chunks 
		WHERE channel_id = $1
	`

	var maxAudioChunkStage int
	if err := r.db.QueryRow(ctx, query, channelID).Scan(&maxAudioChunkStage); err != nil {
		return 0, err
	}

	return maxAudioChunkStage, nil
}
