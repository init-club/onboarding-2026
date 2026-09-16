const express = require('express');
const Redis = require('ioredis');

const app = express();
const PORT = process.env.PORT || 8080;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = parseInt(process.env.REDIS_PORT, 10) || 6379;

let isRedisConnected = false;
let redisClient = null;

try {
  redisClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    retryStrategy: (times) => Math.min(times * 150, 3000),
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,
    lazyConnect: false
  });

  // Track Redis connection lifecycle accurately via events
  redisClient.on('connect', () => {
    console.log(`[Redis] Connecting to ${REDIS_HOST}:${REDIS_PORT}...`);
  });

  redisClient.on('ready', () => {
    isRedisConnected = true;
    console.log(`[Redis] Connection ready at ${REDIS_HOST}:${REDIS_PORT}`);
  });

  redisClient.on('error', (err) => {
    isRedisConnected = false;
    console.warn(`[Redis] Connection error: ${err.message}`);
  });

  redisClient.on('close', () => {
    isRedisConnected = false;
    console.warn('[Redis] Connection closed');
  });

  redisClient.on('reconnecting', () => {
    isRedisConnected = false;
    console.log('[Redis] Reconnecting...');
  });

  redisClient.on('end', () => {
    isRedisConnected = false;
    console.warn('[Redis] Connection terminated');
  });
} catch (e) {
  console.warn(`[Redis] Initialization exception: ${e.message}`);
}

let localPageViews = 0;

app.get('/', async (req, res) => {
  let views = null;
  let storageMode = 'redis_persistent';

  if (isRedisConnected && redisClient) {
    try {
      views = await redisClient.incr('page_views');
    } catch (err) {
      // Upon increment failure, immediately update connection state
      isRedisConnected = false;
      console.error(`[Redis] INCR failed: ${err.message}. Falling back to memory counter.`);
      views = ++localPageViews;
      storageMode = 'memory_fallback';
    }
  } else {
    views = ++localPageViews;
    storageMode = 'memory_fallback';
  }

  res.json({
    status: 'ok',
    service: 'init-club-container-service',
    page_views: views,
    redis_connected: isRedisConnected,
    storage_mode: storageMode,
    environment: process.env.NODE_ENV || 'production',
    hostname: process.env.HOSTNAME || 'localhost',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    redis_connected: isRedisConnected,
    uptime: process.uptime()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Containerized service listening on http://0.0.0.0:${PORT}`);
});
