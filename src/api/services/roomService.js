const redis = require('../database/redis');

exports.SaveRoom = async (userId, room) => {
    try {
        await redis.rpush(`user:${userId}`, JSON.stringify(room));
        return true;
    } catch (err) {
        console.log(err);
    }
}

exports.SearchRooms = async (userId) => {
    try {
        const rooms = await redis.lrange(`user:${userId}`, 0, -1);
        return rooms.map(JSON.parse);
    } catch (err) {
        console.log(err);
    }
}