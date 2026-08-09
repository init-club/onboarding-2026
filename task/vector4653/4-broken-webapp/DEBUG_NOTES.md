# Task 4 — The Broken Web App Debugging Summary

## Overview of Fixes

### 1. `easy.html`
- **Misspelled Endpoint**: Fixed `/api/submt` -> `/api/submit`.
- **Incorrect HTTP Method**: Changed `method: "GET"` to `method: "POST"`.
- **Response Validation**: Checked both `response.ok` and `result.success` before displaying success output.

---

### 2. `advanced.html`
- **Missing Header**: Added `"Content-Type": "application/json"` to request headers so Express correctly parses the payload.
- **Incorrect Payload Key Names**: Fixed object keys `{ Fname, mail, message }` -> `{ name, email, message }`.
- **Incorrect Response Parsing**: Changed `response.text()` -> `response.json()` to properly read the response status object.
- **Display Key Mapping**: Corrected `item.FName` and `item.contact` accessors in `loadSubmissions()` -> `item.name` and `item.email`.
