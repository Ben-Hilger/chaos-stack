FROM golang:1.22.0

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./
COPY api/api.go ./api/api.go
COPY app/app.go ./app/app.go
COPY database/database.go ./database/database.go
COPY types/types.go ./types/types.go

RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping

CMD ["/docker-gs-ping"]