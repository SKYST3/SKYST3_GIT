#!/bin/bash

export POSTGRES_DB=starrynight
export POSTGRES_USER=starrynight
export POSTGRES_PASSWORD=password
export DB_VOLUME=starrynight-db-volume

export DB_EXTERNAL_PORT=19880

docker network create starrynight-network
docker volume create $DB_VOLUME
docker build -t starrynight-db .
docker run --name starrynight-db \
    -p $DB_EXTERNAL_PORT:5432 \
    -v $DB_VOLUME:/var/lib/postgresql/data \
    -e POSTGRES_USER=$POSTGRES_USER \
    -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    -e POSTGRES_DB=$POSTGRES_DB \
    --network starrynight-network \
    -d \
    starrynight-db