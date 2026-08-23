# Task 5 — Containerization

## What I containerized

A two-player Tic-Tac-Toe game built with Python Flask. The game has a neo-brutalist interface and runs in a lightweight Python container.

## Source code

The application source is maintained separately at [brutal-tripleT](https://github.com/bavanvrmk/brutal-tripleT).

## Build and run

```bash
docker build -t brutal-tic-tac-toe task/bavanvrmk/5-containerization
docker run -d --name brutal-tic-tac-toe -p 5000:5000 brutal-tic-tac-toe
```

Open `http://localhost:5000` and play the game.

## Verification

Run `docker ps` and capture a screenshot showing the running `brutal-tic-tac-toe` container. Save it as `docker-ps-screenshot.png` in this folder.

## Cleanup

```bash
docker stop brutal-tic-tac-toe
docker rm brutal-tic-tac-toe
```
