const redis = require('redis');
let client = null;
export const getCache = async (key) => {
  client = redis.createClient({
    host: process.env.CAMARA_REDIS_HOST,
    port: process.env.CAMARA_REDIS_PORT,
  });

  await client.connect();
  return await client.get(key);
}

export const setCache = (key, data) => {
  client.set(key, JSON.stringify(data));
  client.quit();
}