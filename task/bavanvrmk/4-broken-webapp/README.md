# Task 4 — Broken Web App

## What was wrong

The contact form sent a `GET` request to `/api/submt`. The endpoint had a typo, and browsers do not allow a request body on a `GET` request. The request therefore failed before reaching the server.

## What I changed

In `easy.html`, I changed the request to `POST /api/submit` and kept the JSON payload containing `name`, `email`, and `message`. This matches the endpoint defined in `server.js`.

## How to verify

1. Run `npm install`.
2. Run `npm start`.
3. Open `http://localhost:3000/easy.html`.
4. Fill in the contact form and submit it.
5. Confirm that the page says "Submitted successfully!" and DevTools → Network shows `POST /api/submit` with status `201 Created`.
