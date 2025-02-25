const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD, 
});

client.on("error", (err) => console.error("Redis Error:", err));

client.connect();

const setCache = async (key, data, expiry = 600) => {
  await client.setEx(key, expiry, JSON.stringify(data)); 
};

const getCache = async (key) => {
  const cachedData = await client.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

module.exports = { client, setCache, getCache };
