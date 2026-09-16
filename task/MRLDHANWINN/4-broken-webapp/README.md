# Task 4 — The Broken Web App

**Contributor:** Dhanwin (`MRLDHANWINN`)  
**Task ID:** `4-broken-webapp`

---

## 1. Executive Summary

This task involved diagnosing and fixing communication faults between client-side web forms and an Express backend API service. Using Chrome/Edge Developer Tools (Console, Network, and Application tabs), multiple client-server interaction bugs were systematically isolated, reproduced, and remediated in both `easy.html` and `advanced.html`.

---

## 2. Bug Analysis & Root Cause Diagnosis

### A. Easy Level (`easy.html`)

1. **Bug 1: Invalid API Endpoint (Typo)**
   - **Symptom:** Submitting the form triggered a `404 Not Found` response.
   - **DevTools Discovery:** Inspected **Network tab** → `Request URL: http://localhost:3000/api/submt`.
   - **Root Cause:** Typo in fetch URL: `/api/submt` instead of `/api/submit`.
   - **Fix:** Corrected endpoint URL to `/api/submit`.

2. **Bug 2: Incorrect HTTP Verb**
   - **Symptom:** Request was dispatched as `GET` while attempting to send a JSON payload in `body`.
   - **DevTools Discovery:** Network tab request method displayed `GET`. The HTTP spec prohibits/ignores bodies in GET requests; backend route was configured strictly as `app.post("/api/submit")`.
   - **Fix:** Updated request method to `POST`.

---

### B. Advanced Level (`advanced.html`)

1. **Bug 1: Missing `Content-Type` Header**
   - **Symptom:** Server responded with HTTP `400 Bad Request` (`Name and email are required.`).
   - **DevTools Discovery:** Inspected **Network tab** → **Request Headers**. `Content-Type` was absent. Express middleware `express.json()` did not parse the body stream, leaving `req.body` undefined/empty `{}`.
   - **Fix:** Added `headers: { "Content-Type": "application/json" }`.

2. **Bug 2: Undeclared Variable References**
   - **Symptom:** Clicking submit failed before any network request was sent.
   - **DevTools Discovery:** Inspected **Console tab** → `Uncaught ReferenceError: Fname is not defined at HTMLFormElement.<anonymous> (advanced.html:73)`.
   - **Root Cause:** The form inputs were stored in variables `name` and `email`, but the payload serialized `{ Fname, mail, message }`.
   - **Fix:** Passed `{ name, email, message }` matching DOM values and server expectations.

3. **Bug 3: Response Serialization Deserialization Mismatch**
   - **Symptom:** Submissions succeeded on the server (HTTP 201), but the frontend UI showed `Server error: undefined`.
   - **DevTools Discovery:** Inspected JavaScript execution. `const result = await response.text();` parsed the response as a raw string. Evaluating `result.success` returned `undefined`.
   - **Fix:** Changed to `const result = await response.json();`.

4. **Bug 4: Schema Property Mismatch in `loadSubmissions()`**
   - **Symptom:** Submissions loaded from `/api/submissions` rendered as `undefined — undefined`.
   - **DevTools Discovery:** Inspected JSON response from `GET /api/submissions`: entries had keys `name`, `email`, `message`, while the UI template attempted to read `item.FName` and `item.contact`.
   - **Fix:** Updated template string to `item.name` and `item.email`.

---

## 3. How to Run & Verify

### Step 1: Install Dependencies & Start Server
```bash
cd task/4-broken-webapp
npm install
npm start
```
Server starts on `http://localhost:3000`.

### Step 2: Test Easy Level
1. Open `http://localhost:3000/easy.html`.
2. Enter Name, Email, and Message, then click **Submit**.
3. Green notification banner will appear: `"Submitted successfully!"`.

### Step 3: Test Advanced Level
1. Open `http://localhost:3000/advanced.html`.
2. Fill in the form and click **Submit** → `"Submitted Successfully!"`.
3. Click **Load Submissions** → The newly submitted entry renders with correct Name, Email, and Message.
