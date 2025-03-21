const redis = require('../database/redis');

exports.SaveMessage = async (roomId, message) => {
    await redis.rpush(`chat:${roomId}`, JSON.stringify(message));
    console.log('Mensagem salva');
}

exports.SearchMessages = async (roomId) => {
    const messages = await redis.lrange(`chat:${roomId}`,0, -1);
    return messages.map(JSON.parse);
}

exports.SaveRoom = async (userEmail,roomId) => {
    const rooms = await redis.lrange(`user:${userEmail}`,0,-1);

    if(rooms.includes(JSON.stringify(roomId))){
        return false;
    }

    await redis.rpush(`user:${userEmail}`, JSON.stringify(roomId));
    return true;
}

exports.SearchRooms = async (userEmail) => {
    const rooms = await redis.lrange(`user:${userEmail}`,0, -1);
    return rooms.map(JSON.parse);
}
