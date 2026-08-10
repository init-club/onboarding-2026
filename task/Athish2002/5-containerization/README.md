# Task 5 — Containerization ("It Works on My Machine")

Submitted by [@Athish2002](https://github.com/Athish2002). Tier: **Advanced** (docker-compose
with a second service).

## What I containerized

A small Flask web app that increments a page-visit counter. The counter is stored in a
**separate Redis container**, not in the app's memory — so the two services have to
actually talk to each other for the app to work. That makes the multi-service wiring
self-demonstrating rather than something you have to take on faith.

Two services:

| Service | Image | Role |
|---|---|---|
| `web` | built from local `Dockerfile` (`python:3.12-slim`) | Flask + gunicorn, port 5000 |
| `redis` | `redis:7-alpine` | persistent counter storage |

## How I built and ran it

```bash
cd task/Athish2002/5-containerization
docker compose up --build
```

Then open <http://localhost:8000> and refresh a few times.

## How a reviewer can verify it

```bash
# 1. Both containers are up
docker ps
# expect: task5_web (0.0.0.0:8000->5000/tcp) and task5_redis (6379/tcp)

# 2. The app responds and the counter increments
curl -s http://localhost:8000 | grep -o 'served <strong>[0-9]*</strong>'
curl -s http://localhost:8000 | grep -o 'served <strong>[0-9]*</strong>'   # number goes up

# 3. Health endpoint confirms the app reached Redis
curl -s http://localhost:8000/health
# expect: {"redis":"connected","status":"ok"}

# 4. State really lives in Redis, not in the web process
docker exec -it task5_redis redis-cli GET hits

# 5. Restarting the web container does NOT reset the counter
docker compose restart web
curl -s http://localhost:8000 | grep -o 'served <strong>[0-9]*</strong>'   # continues
```

Teardown: `docker compose down` (add `-v` to also drop the Redis volume).

## Design choices

- **`python:3.12-slim`** over the full `python:3.12` image — ~150 MB instead of ~1 GB.
- **`requirements.txt` is copied and installed before `app.py`.** Docker caches layers, so
  editing the app doesn't re-run `pip install`. Copying everything in one `COPY . .` is the
  most common Dockerfile mistake and it makes every rebuild slow.
- **Non-root `appuser`.** Containers are isolated, not sandboxed; root inside the container
  is worth real privilege if a process escapes.
- **gunicorn, not `flask run`.** The Flask dev server is single-threaded and explicitly not
  meant for anything but development.
- **Named volume `redis_data` + `--appendonly yes`** so the counter survives
  `docker compose down`.
- **No secrets in the image.** Redis host/port come in as environment variables.

## Issues I faced

**The first build died on a truncated base-image layer.** `docker compose up --build`
failed part-way through with:

```
 > [2/6] WORKDIR /app:
------
Dockerfile:8
failed to solve: failed to compute cache key:
short read: expected 12113733 bytes but got 146853: unexpected EOF
```

The error points at `Dockerfile:8` (`WORKDIR /app`), which is misleading — `WORKDIR` just
sets a directory and can't fail on its own. What actually happened is that one layer of
`python:3.12-slim` came down incomplete (146 KB of an expected 12.1 MB), and BuildKit only
noticed when it went to compute the cache key for the *next* step. The failure surfaces one
instruction later than its cause.

Fixed by throwing away the poisoned cache and re-pulling the base image explicitly before
rebuilding:

```bash
docker builder prune -af
docker pull python:3.12-slim
docker compose up --build
```

The second build completed and both containers came up clean. The lesson I'm keeping: when
a build fails on a trivial instruction, suspect a corrupt cache entry or a half-downloaded
layer before you start rewriting the Dockerfile.

**What didn't bite me, and why.** Three things I'd expected to debug never came up, because
the compose file was written to avoid them from the start:

- The app points at the **service name** `redis`, not `localhost`. Each container has its
  own network namespace, so `localhost` inside `web` would mean `web` itself.
- `depends_on` uses `condition: service_healthy` with a `redis-cli ping` healthcheck, not
  bare `depends_on` — which only waits for the container to *start*, not to accept
  connections.
- gunicorn binds `0.0.0.0:5000`, not `127.0.0.1`, or the published port would forward to
  nothing.

I'd rather state these as design decisions than dress them up as bugs I hit.

## Files

- `Dockerfile` — web image definition
- `docker-compose.yml` — both services, healthcheck, volume
- `app.py` — Flask app (`/` counter page, `/health` check)
- `requirements.txt` — pinned dependencies
- `.dockerignore` — keeps build context small
- `docker-ps-screenshot.png` — `docker ps` with both containers running

## Environment

Docker Desktop 29.7.2 (Compose v5.3.1) on Windows 11, WSL2 backend — Linux containers on
kernel `6.18.33.2-microsoft-standard-WSL2`. Commands run from PowerShell.

## Verified output

```
CONTAINER ID   IMAGE                    COMMAND                  STATUS                    PORTS                          NAMES
add6ed8274e9   5-containerization-web   "gunicorn --bind 0.0…"   Up 21 seconds             0.0.0.0:8000->5000/tcp         task5_web
6ca19f453aee   redis:7-alpine           "docker-entrypoint.s…"   Up 27 seconds (healthy)   6379/tcp                       task5_redis
```

Three requests to `/` returned counts 1, 2, 3. `/health` returned
`{"redis":"connected","status":"ok"}`. `redis-cli GET hits` returned `3`, confirming the
counter lives in Redis rather than the web process. After `docker compose restart web` the
next request returned **4**, not 1 — the state survived the restart.
