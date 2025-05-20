package minio

import (
	"context"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"starrynight.com/server/internal/config"
)

type StorageClient interface {
	UploadAudioChunk(ctx context.Context, fileKey string, filePath string) error
	DeleteAudioChunk(ctx context.Context, fileKey string) error
	UploadAudioFile(ctx context.Context, fileKey string, filePath string) error
	DeleteAudioFile(ctx context.Context, fileKey string) error
}

type storageClient struct {
	minioClient *minio.Client
}

func NewStorageClient(config *config.Config) (StorageClient, error) {
	minioClient, err := minio.New(config.Storage.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(config.Storage.AccessKey, config.Storage.SecretKey, ""),
		Secure: config.Server.RunMode == "production",
	})
	if err != nil {
		return nil, err
	}

	return &storageClient{
		minioClient: minioClient,
	}, nil
}

func (s *storageClient) UploadAudioChunk(ctx context.Context, fileKey string, filePath string) error {
	if _, err := s.minioClient.FPutObject(ctx, AudioChunksBucketName, fileKey, filePath, minio.PutObjectOptions{}); err != nil {
		return err
	}

	return nil
}

func (s *storageClient) DeleteAudioChunk(ctx context.Context, fileKey string) error {
	return s.minioClient.RemoveObject(ctx, AudioChunksBucketName, fileKey, minio.RemoveObjectOptions{})
}

func (s *storageClient) UploadAudioFile(ctx context.Context, fileKey string, filePath string) error {
	if _, err := s.minioClient.FPutObject(ctx, AudioFilesBucketName, fileKey, filePath, minio.PutObjectOptions{}); err != nil {
		return err
	}

	return nil
}

func (s *storageClient) DeleteAudioFile(ctx context.Context, fileKey string) error {
	return s.minioClient.RemoveObject(ctx, AudioFilesBucketName, fileKey, minio.RemoveObjectOptions{})
}
