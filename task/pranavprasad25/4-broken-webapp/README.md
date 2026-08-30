# Task — The Broken Web App

## Purpose
**Goal:** Learn practical debugging by diagnosing and fixing a broken interaction between a frontend and a backend service. This task builds confidence in tracing issues across the client–server boundary.


## Description of the Challenge
You are given a small web app where the frontend and backend are not communicating correctly. Your job is to investigate, identify the fault, and fix it so data flows as expected.


## Sub-problems
- Inspecting network requests  
- Fixing incorrect API communication  


## Easy Level
- Identify why the submit button fails  
- Fix the communication issue so requests succeed  


## Advanced Level
- Use Browser DevTools (Network, Console, Application tabs) to debug  
- Ensure data is correctly sent, received, and stored  


## Pre-requisites
- Basic HTML knowledge  
- Basic JavaScript knowledge  
- Familiarity with how web requests work (high-level)  


## Learning Outcomes
- Stronger debugging skills  
- Understanding client–server interaction  
- Confidence using browser developer tools  


## What to Do
1. Reproduce the bug consistently.  
2. Open DevTools and inspect Console and Network activity.  
3. Check request URLs, methods, headers, and payloads.  
4. Verify backend responses and error messages.  
5. Apply a fix and retest until the flow works reliably.  


## Expected Submission
- A Pull Request that fixes the issue  
- Short notes in the PR description explaining:
  - What was wrong  
  - How you found it   
  - What you changed   

## How to run this locally

Prerequisites: Node.js v14+ installed.

1. Install dependencies and start the server:

```bash
cd task/4-broken-webapp
npm install
npm start
```

2. Open the app in your browser:

- Main Page: http://localhost:3000

Notes:
- The backend is implemented in `server.js` and stores submissions in memory.
- The `easy.html` and `advanced.html` pages intentionally include client-side bugs for the debugging; use DevTools (F12) → Network/Console to inspect requests.

`   


## Evaluation Criteria
- Correctness of the fix  
- Clear debugging approach  
- Evidence of using DevTools effectively  


## Good Practices
- Change one thing at a time and retest  
- Read error messages carefully  
- Avoid “random fixes” without understanding the cause  
- Keep your explanation simple and reproducible
