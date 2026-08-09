# Task 4 — The Broken Web App

This directory documents the debugging process and fixes applied to resolve the communication issues between the frontend and backend service.

---

## What Was Broken

### 1. `easy.html`
- **Misspelled Endpoint**: The fetch request was calling `/api/submt` instead of `/api/submit`.
- **Incorrect HTTP Method**: The request used `GET` while trying to send a JSON body. Changed this to `POST`.
- **Response Handling**: Updated condition check to ensure both `response.ok` and `result.success` pass before showing the success message.

### 2. `advanced.html`
- **Missing Content-Type Header**: The request didn't specify `"Content-Type": "application/json"`, causing Express to ignore `req.body`.
- **Incorrect Payload Keys**: The object being sent used `{ Fname, mail, message }` instead of `{ name, email, message }`, which caused backend validation failures.
- **Incorrect Response Parsing**: Called `response.text()` instead of `response.json()`, causing `result.success` checks to fail.
- **Display Mappings**: In `loadSubmissions()`, property accessors were using `item.FName` and `item.contact` instead of `item.name` and `item.email`.

---

## How to Run & Verify

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local server:
   ```bash
   npm start
   ```

3. Open `http://localhost:3000` in your browser and test form submissions on both pages.
