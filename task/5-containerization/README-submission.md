# Task 5 Submission: Containerization

## What I Containerized
I containerized the Node.js/Express web application from Task 4. 

## How I Built and Ran It
1. Created a `Dockerfile` using `node:18-alpine` as the base image.
2. Copied the application files and bypassed a network firewall issue by smuggling my local `node_modules` into the container.
3. Created a `docker-compose.yml` file to fulfill the Advanced Level requirement, spinning up the web app alongside a `redis:alpine` database.
4. Booted the stack using `sudo docker compose up -d`.

## Issues Faced
I encountered a major `npm` memory crash out of the box (`Exit handler never called!`), which I bypassed by attempting to use Yarn. When the institutional firewall blocked the Yarn registry (`ECONNREFUSED`), I successfully pivoted to copying my local pre-installed dependencies directly into the container to bypass the network entirely.
