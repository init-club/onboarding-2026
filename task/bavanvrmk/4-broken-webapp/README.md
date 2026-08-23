# Task 4 — Broken Web App

## What's wrong and changes made by me:

The contact form sent a GET request to `/api/submt` instead of POST andd submit. So the request failed before reaching the server.So, I changed the request to `POST /api/submit`.