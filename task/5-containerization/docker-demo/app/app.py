import os
import time

from flask import Flask, jsonify
import psycopg2
from psycopg2 import OperationalError

app = Flask(__name__)

DB_HOST = os.environ.get("DB_HOST", "db")
DB_NAME = os.environ.get("DB_NAME", "appdb")
DB_USER = os.environ.get("DB_USER", "appuser")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "apppassword")


def get_connection(retries=10, delay=2):
    """Retry loop so the app can start slightly before the DB is ready."""
    last_error = None
    for attempt in range(retries):
        try:
            return psycopg2.connect(
                host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD
            )
        except OperationalError as e:
            last_error = e
            time.sleep(delay)
    raise last_error


def ensure_table(conn):
    with conn, conn.cursor() as cur:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY, seen_at TIMESTAMP DEFAULT NOW())"
        )


@app.route("/")
def index():
    return (
        "<h1>Hello from a containerized Flask app!</h1>"
        "<p>Try <a href='/health'>/health</a> or <a href='/visits'>/visits</a>.</p>"
    )


@app.route("/health")
def health():
    return jsonify(status="ok")


@app.route("/visits")
def visits():
    """Increments and returns a visit counter stored in Postgres.
    Only reachable when a database is actually connected (e.g. via docker compose)."""
    try:
        conn = get_connection(retries=3, delay=1)
    except OperationalError:
        return (
            jsonify(error="No database connection. Run this with docker compose to enable /visits."),
            503,
        )
    ensure_table(conn)
    with conn, conn.cursor() as cur:
        cur.execute("INSERT INTO visits DEFAULT VALUES")
        cur.execute("SELECT COUNT(*) FROM visits")
        count = cur.fetchone()[0]
    conn.close()
    return jsonify(visit_count=count)


if __name__ == "__main__":
    # No DB connection attempted at startup — / and /health work immediately,
    # even with a plain `docker run` and no database attached.
    app.run(host="0.0.0.0", port=5000)
