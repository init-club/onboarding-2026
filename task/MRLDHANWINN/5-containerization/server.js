const express = require('express');
const Redis = require('ioredis');

const app = express();
const PORT = process.env.PORT || 8080;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

let redisClient = null;
let isRedisConnected = false;

try {
  redisClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    retryStrategy: (times) => Math.min(times * 100, 3000),
    maxRetriesPerRequest: 3,
    lazyConnect: true
  });

  redisClient.connect().then(() => {
    isRedisConnected = true;
    console.log(`Connected to Redis instance at ${REDIS_HOST}:${REDIS_PORT}`);
  }).catch((err) => {
    console.warn(`Redis optional connection warning: ${err.message}. Running in fallback mode.`);
  });
} catch (e) {
  console.warn(`Redis init warning: ${e.message}`);
}

let localPageViews = 0;

app.get('/', async (req, res) => {
  let views = 0;
  if (isRedisConnected && redisClient) {
    try {
      views = await redisClient.incr('page_views');
    } catch {
      views = ++localPageViews;
    }
  } else {
    views = ++localPageViews;
  }

  res.json({
    status: 'ok',
    service: 'init-club-container-service',
    page_views: views,
    redis_connected: isRedisConnected,
    environment: process.env.NODE_ENV || 'production',
    hostname: process.env.HOSTNAME || 'localhost',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Containerized service listening on http://0.0.0.0:${PORT}`);
});
