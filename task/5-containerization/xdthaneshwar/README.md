# Task 5 – Containerization

## Overview

The web application was containerized using Docker.

## Steps Performed

1. Created a Dockerfile
2. Built the Docker image
3. Ran the container
4. Exposed port 8000
5. Verified the application in the browser

## Docker Commands Used

docker build -t homework-webapp .

docker run -p 8000:8000 homework-webapp

## Files Included

interfaced_web.png
Shows the web interface built, running on the browser.

docker_run.png  
Shows container running in terminal.

docker_container.png  
Shows running container in Docker Desktop.