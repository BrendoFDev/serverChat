const redis = require('../database/redis');

exports.SaveMessage = async (roomId, message) => {
    await redis.rpush(`room:${roomId}`, JSON.stringify(message));
}

exports.SearchMessages = async (roomId) => {
    try {
        const messages = await redis.lrange(`room:${roomId}`, 0, -1);
        if (messages.length != 0){
            return (messages.map(JSON.parse)).filter(Boolean);
        }
        else{
            return [];
        }
    } catch (err) {
        console.log(err);
    }
}

