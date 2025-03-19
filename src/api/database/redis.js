require('dotenv').config();
const Redis = require('ioredis');

const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;

const redis = new Redis({
    host,
    port
});

redis.on("error", (err)=>{
    console.error('Erro no redis:',err);
});

module.exports = redis;