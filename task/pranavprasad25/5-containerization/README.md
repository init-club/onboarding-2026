# Task  — Containerization (“It Works on My Machine”)

## Purpose
**Goal:** Learn how containerization solves environment mismatch problems by packaging applications and their dependencies in a consistent, portable way using Docker.


## Description of the Challenge
This task introduces the basics of Docker and container-based workflows. You will package an application into a container and run it in a controlled, reproducible environment.


## Sub-problems
- Writing a Dockerfile  
- Running multi-service applications  


## Easy Level
- Containerize a simple web application  
- Build and run the container locally  


## Advanced Level
- Use `docker-compose` (or similar tooling) to run the app with a database or Redis  
- Configure services so they communicate correctly  


## Pre-requisites
- Basic Linux/terminal familiarity  
- Basic understanding of how applications run locally  


## Learning Outcomes
- Understanding what containers are and how they differ from VMs  
- Environment consistency across machines  
- Confidence running and managing containers  


## What to Do
1. Choose a small app (for example, a simple web server).  
2. Write a Dockerfile to define the environment.  
3. Build the container image.  
4. Run the container and verify the app works.  
5. (Advanced) Add a second service like a database and connect it using compose.  


## Expected Submission
- Screenshot of `docker ps` showing running containers  
- A short README describing:
  - What you containerized  
  - How you built and ran it  
  - Any issues you faced  


## Evaluation Criteria
- Successful containerization  
- Correct service setup (for multi-service setups)  
- Clear explanation of your steps  


## Good Practices
- Keep images lightweight  
- Use official base images when possible  
- Rebuild after changes to verify reproducibility  
- Avoid hardcoding secrets into images
