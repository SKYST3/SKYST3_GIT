export REDIS_EXTERNAL_PORT=19881
export REDIS_PASSWORD="password"

docker run --name starrynight-cache-store \
  --network starrynight-network \
  -p $REDIS_EXTERNAL_PORT:6379 \
  -e REDIS_PASSWORD=$REDIS_PASSWORD \
  -d \
  redis:latest redis-server --requirepass "password"
