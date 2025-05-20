#!/bin/bash

docker build -t starrynight-server .
docker run --name starrynight-server \
    --network starrynight-network \
    --add-host=host.docker.internal:host-gateway \
    -p 19882:8080 \
    -v /home/atlasyang/playground/audio-stream-test/1_0034.wav:/tmp/1_0034.wav \
    -e MAIN_DB_CONNECTION="postgres://starrynight:password@starrynight-db:5432/starrynight?sslmode=disable&pool_max_conns=200&pool_max_conn_lifetime=1h30m&pool_min_conns=50" \
    -e REDIS_CONNECTION="redis://default:password@starrynight-redis:6379/0" \
    -e STORAGE_ENDPOINT="starrynight-storage:9000" \
    -e MINIO_ACCESS_KEY="VeuxnwlscsZDjRT21BiS" \
    -e MINIO_SECRET_KEY="uJYMGkeruDlp7cIGqymJ1I2OCpORHROe8yaLUT8u" \
    -e TTS_API_URL="http://host.docker.internal:19886/synthesize" \
    -e OPENAI_API_KEY="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" \
    -d \
    starrynight-server