# Containerized Flask App

A minimal example that shows the full workflow: a small web app, a
`Dockerfile`, and a `docker-compose.yml` that adds a Postgres database.

## Project layout

```
docker-demo/
├── app/
│   ├── app.py            # Flask app
│   ├── requirements.txt  # Python deps
│   ├── Dockerfile        # Image definition for the app
│   └── .dockerignore
├── docker-compose.yml     # App + Postgres, wired together
└── README.md
```

---

## Part 1: Build and run the app alone (no database)

The app works standalone too — `/` and `/health` don't need the DB;
only `/visits` does.

```bash
cd docker-demo/app

# 1. Build the image
docker build -t flask-demo:latest .

# 2. Run the container, mapping host port 5000 -> container port 5000
docker run -d -p 5000:5000 --name flask-demo flask-demo:latest

# 3. Verify it's working
curl http://localhost:5000/
curl http://localhost:5000/health
```

You should see the HTML greeting and `{"status": "ok"}`.

Check logs / stop it:
```bash
docker logs flask-demo
docker stop flask-demo && docker rm flask-demo
```

(`/visits` will fail here since there's no database yet — that's expected.
Onto Part 2.)

---

## Part 2 (Advanced): Add Postgres with Docker Compose

`docker-compose.yml` builds the same image, adds a `postgres:16-alpine`
service, and connects them on a shared network with a named volume for
persistent data.

```bash
cd docker-demo

# 1. Build and start both services in the background
docker compose up -d --build

# 2. Check status
docker compose ps

# 3. Verify the app + database integration
curl http://localhost:5000/
curl http://localhost:5000/visits   # increments and returns a counter
curl http://localhost:5000/visits   # count goes up each call

# 4. Watch logs from both services
docker compose logs -f

# 5. Tear down (add -v to also delete the database volume)
docker compose down
```

### How the pieces connect
- `web` depends on `db` and waits for its healthcheck (`pg_isready`) before starting.
- The app talks to Postgres using the service name `db` as the hostname — Compose's
  built-in DNS resolves it to the right container, so no manual networking is needed.
- Credentials are passed as environment variables (`environment:` in compose); in a
  real project these would come from a `.env` file or a secrets manager, not be
  hardcoded.
- `db_data` is a named volume, so your data survives `docker compose down`
  (but not `docker compose down -v`).

---

## Key concepts illustrated here

- **Dockerfile**: base image → deps → app code → run command, ordered so
  `requirements.txt` is copied and installed before app code (better layer caching).
- **Non-root user**: the container runs as `appuser`, not root.
- **`.dockerignore`**: keeps unnecessary files out of the build context.
- **Compose**: multi-container orchestration — networking, startup ordering
  (`depends_on` + healthcheck), and persistent storage (volumes) in one file.
