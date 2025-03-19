const redis = require('../database/redis');

exports.SaveMessage = async (roomId, message)=>{
    await redis.rpush(`chat:${roomId}`, JSON.stringify(message));
    console.log('Mensagem salva');
}

exports.SearchMessages = async (roomId)=>{
    const messages = await redis.lrange(`chat:${roomId}`,0, -1);
    return messages.map(JSON.parse);
}

