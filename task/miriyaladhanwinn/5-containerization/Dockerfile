# Syntax=docker/dockerfile:1
# Base image: Official lightweight Node.js LTS on Alpine Linux
FROM node:20-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production \
    PORT=8080

# Copy package manifests for efficient layer caching
COPY package*.json ./

# Install only production dependencies (uses npm ci with committed lockfile)
RUN if [ -f package-lock.json ]; then \
      npm ci --omit=dev --ignore-scripts; \
    else \
      npm install --omit=dev --ignore-scripts; \
    fi && npm cache clean --force

# Copy application source code
COPY server.js ./

# Switch to non-privileged default node user for container security
USER node

# Expose service port
EXPOSE 8080

# Health check to ensure reliability
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:8080/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Start the application server
CMD ["node", "server.js"]
