# Use a small, official base image
FROM python:3.12-slim

# Prevents Python from buffering stdout/stderr (logs show up immediately)
ENV PYTHONUNBUFFERED=1

# Set working directory inside the container
WORKDIR /app

# Install dependencies first (better layer caching: only re-runs if requirements.txt changes)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Run as a non-root user for better security
RUN useradd -m appuser
USER appuser

# The app listens on this port
EXPOSE 5000

# Default command to run the app
CMD ["python", "app.py"]
