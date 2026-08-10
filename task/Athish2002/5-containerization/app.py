"""
INIT Club Onboarding - Task 5: Containerization
A tiny Flask app that counts visits in Redis, proving the two containers talk.
"""

import os
import socket

import redis
from flask import Flask, jsonify

app = Flask(__name__)

# Host is the compose service name, not localhost -- each container has its own
# network namespace, so localhost here would mean this container.
cache = redis.Redis(
    host=os.environ.get("REDIS_HOST", "redis"),
    port=int(os.environ.get("REDIS_PORT", 6379)),
    decode_responses=True,
)


@app.route("/")
def index():
    count = cache.incr("hits")
    return f"""<!doctype html>
<html>
  <head><title>Task 5 - Containerization</title></head>
  <body style="font-family: system-ui; padding: 3rem; line-height: 1.6">
    <h1>It works on every machine.</h1>
    <p>This page has been served <strong>{count}</strong> time(s).</p>
    <p>The counter lives in a separate Redis container, so it survives
       restarts of this web container.</p>
    <p><small>Served by container <code>{socket.gethostname()}</code></small></p>
    <p><a href="/health">/health</a></p>
  </body>
</html>"""


@app.route("/health")
def health():
    """Used by the compose healthcheck."""
    try:
        cache.ping()
        return jsonify(status="ok", redis="connected"), 200
    except redis.exceptions.ConnectionError:
        return jsonify(status="degraded", redis="unreachable"), 503


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
