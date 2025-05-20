FROM golang:1.23.2

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init -g cmd/server/main.go -o _docs --parseDependency

RUN apt-get update && apt-get install -y xz-utils && rm -rf /var/lib/apt/lists/*

ADD https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz /tmp/

RUN tar -xf /tmp/ffmpeg-release-amd64-static.tar.xz -C /opt && \
    mv /opt/ffmpeg-*-static/ffmpeg /usr/local/bin/ && \
    rm -rf /tmp/*

RUN go build -o main cmd/server/main.go

EXPOSE 8080

CMD ["./main"]