\# Task 5 - Containerization



&#x20;  Containerized the Task 4 broken-webapp with Docker.



&#x20;  ## How to run

&#x20;  cd task/4-broken-webapp

&#x20;  docker build -t broken-webapp .

&#x20;  docker run -p 3000:3000 broken-webapp



&#x20;  ## Verification

&#x20;  docker ps shows the container running with port 3000 mapped.

&#x20;  See screenshot for proof.

