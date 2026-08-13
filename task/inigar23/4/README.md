\# Task 4 - Broken Web App



&#x20;  ## Easy (easy.html)

&#x20;  Fixed two bugs:

&#x20;  1. fetch() used method: "GET" instead of "POST" (GET can't have a body)

&#x20;  2. Endpoint URL typo: "/api/submt" → "/api/submit"



&#x20;  ## Advanced (advanced.html)

&#x20;  Fixed:

&#x20;  1. Missing Content-Type: application/json header

&#x20;  2. Body sent undefined vars (Fname, mail) → changed to (name, email, message)

&#x20;  3. response.text() → response.json() so result.success actually works

&#x20;  4. loadSubmissions() referenced item.FName/item.contact → changed to item.name/item.email



&#x20;  ## Verification

&#x20;  npm install \&\& npm start, open localhost:3000/easy.html and /advanced.html,

&#x20;  submit the form on each, then click "Load Submissions" on advanced.html

&#x20;  to confirm stored entries display correctly.

