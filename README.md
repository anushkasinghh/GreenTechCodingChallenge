# GreenTechProject

A green-tech blog application with a React frontend, Node.js/Express backend, and MongoDB database — all orchestrated with Docker Compose.

## Services

| Service  | URL                       | Description               |
|----------|---------------------------|---------------------------|
| Frontend | http://localhost:3000     | React app served via Nginx |
| Backend  | http://localhost:4500     | Express REST API          |
| MongoDB  | localhost:27017           | Database (internal)       |

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)

## Quick start

```bash
# Build images and start all services in the background
docker compose up --build -d

# View logs (all services)
docker compose logs -f

# View logs for a single service
docker compose logs -f backend
```

The frontend is available at **http://localhost:3000** once all containers are healthy.

## Stop / tear down

```bash
# Stop containers (keeps data volume)
docker compose down

# Stop containers and delete all data (resets the database)
docker compose down -v
```

## Useful commands

```bash
# Rebuild a single service after code changes
docker compose up --build -d backend

# Open a shell inside the backend container
docker exec -it greentech_backend sh

# Check container status
docker compose ps
```
