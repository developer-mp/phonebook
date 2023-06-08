FROM golang:1.19-bullseye as build
WORKDIR /phonebook
RUN useradd -u 1001 nonroot
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
  --mount=type=cache,target=/root/.cache/go-build \
  go mod download
COPY . .
RUN go build \
  -ldflags="-linkmode external -extldflags -static" \
  -tags netgo \
  -o server

FROM scratch
COPY --from=build /etc/passwd /etc/passwd
COPY --from=build /phonebook/server server
USER nonroot
EXPOSE 4000
CMD ["/server"]
