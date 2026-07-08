# Task 5 — Containerization ("It Works on My Machine")

## What I Containerized

I containerized the Task 4 "Broken Web App" — an Express.js server (`server.js`) that serves a contact form (`advanced.html`, `easy.html`) and stores submissions in memory, exposing:

- `POST /api/submit` — save a contact form entry
- `GET /api/submissions` — list all saved entries

**For the Advanced level**, I extended the app with a Redis-backed visit counter to demonstrate multi-service communication:

- `GET /api/visits` — increments and returns a counter stored in Redis (`visit_count`), proving the web service and Redis service talk to each other correctly over Docker's internal network.

## How I Built and Ran It

### Easy Level — single container

**Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t broken-webapp .
docker run -p 3000:3000 broken-webapp
```

Verified working at `http://localhost:3000` — form submission and load-submissions both functioned identically to running it natively with `npm start`.

### Advanced Level — multi-service with Docker Compose

Added Redis as a second service and wired the Express app to it via the `redis` npm client, connecting to `redis://redis:6379` (the hostname `redis` resolves automatically to the Redis container because Compose puts both services on the same internal network).

**docker-compose.yml:**
```yaml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

Run both services together:
```bash
docker-compose up --build
```

Verified by repeatedly refreshing `http://localhost:3000/api/visits` — the counter incremented on each request (1, 2, 3, ...), confirming the `web` container successfully persisted state in the `redis` container across separate HTTP requests.

`docker ps` while running showed both containers up:
```
CONTAINER ID   IMAGE                 PORTS                     NAMES
xxxxxxxxxxxx   4-broken-webapp-web   0.0.0.0:3000->3000/tcp    4-broken-webapp-web-1
xxxxxxxxxxxx   redis:7-alpine        0.0.0.0:6379->6379/tcp    4-broken-webapp-redis-1
```

## Issues I Faced

1. **Docker Desktop not running** — initial `docker build` failed with a named pipe connection error (`failed to connect to the docker API at npipe:...`). Docker Desktop was installed but the background engine wasn't started. Fixed by launching Docker Desktop and waiting for the engine to fully initialize before retrying.

2. **Hidden `.txt` extensions on Dockerfile** — first build attempt failed with `open Dockerfile: no such file or directory`, even though the file appeared as `Dockerfile` in File Explorer. Turned out Windows was hiding the real `.txt` extension. Fixed by enabling "File name extensions" in Explorer and renaming to a proper extensionless `Dockerfile`.

3. **Port conflict between old and new containers** — after adding Redis and running `docker-compose up --build`, hitting `/api/visits` returned `Cannot GET /api/visits`. Diagnosed with `docker ps`, which revealed an old standalone container (`broken-webapp`, from the Easy-level test) was still running and had already claimed port 3000 on the host — so the new Compose-managed container couldn't bind to it and was unreachable. Fixed by stopping/removing the old container (`docker stop` / `docker rm`) and re-running `docker-compose up --build`, after which the new container correctly showed `0.0.0.0:3000->3000/tcp` in `docker ps` and the route worked as expected.

## Key Learnings

- Docker Desktop must be actively running (not just installed) for the CLI to work — the engine is a separate background process.
- Docker Compose gives each service a resolvable hostname matching its service name (e.g. `redis`), which is how containers discover and talk to each other without hardcoded IPs.
- Two containers can't bind the same host port simultaneously — always check `docker ps` when a service seems unreachable, since a stale container is a common silent cause.
