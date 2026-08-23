# Task 5 — Containerization

## What I containerized

A two-player Tic-Tac-Toe game built with Python Flask.

## Application source

Refer application at [brutal-tripleT](https://github.com/bavanvrmk/brutal-tripleT).

## Build and run

```bash
git clone https://github.com/bavanvrmk/brutal-tripleT.git
cd brutal-tripleT
sudo docker build -t brutal-tic-tac-toe .
sudo docker run -d --name brutal-tic-tac-toe -p 5000:5000 brutal-tic-tac-toe
```

Open `http://localhost:5000` to access the app.

## Verification

 I have submitted `docker-ps-screenshot.png` as verification proof.