docker build -t starrynight-web-client .
docker run --name starrynight-web-client \
    --network host \
    -d starrynight-web-client
