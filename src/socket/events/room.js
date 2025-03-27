const roomService = require("../../api/services/roomService");
const Room = require('../../api/model/roomModel');

module.exports = (io, socket) => {
    try {

        socket.on("join_private_room", async (data) => {
            try {
                const roomData = { name:data.roomName, code:'code', creationDate: Date.now(), owner: data.userId };
                const room = await Room.create(roomData);

                await roomService.SaveRoom(data.userId, room.dataValues);
                
                socket.join(room.id);
                console.log(`Socket ${socket.id} : ${data.userId}, conectado ao room ${room.name}`);
                
                io.to(room.id).emit("joined_in_room", `${data.userId} entrou na sala ${room.id}`);
            }
            catch (error) {
                console.log(error)
                socket.emit('error', { response: `erro ao entrar na sala: ${error}` });
            };
        });

        socket.on('leave_private_room', (roomId) => {
            socket.leave(roomId);
            console.log(`Socket ${socket.id}, desconectou da room ${roomId}`)
            socket.to(roomId).emit('user_left', `${socket.id} saiu da sala`);
        });

        socket.on("restore_rooms", async (id) => {
            try {
                const rooms = await roomService.SearchRooms(id);
                rooms.forEach((room) => {
                    socket.join(room.id);
                });
                socket.emit("joined_rooms", rooms);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    catch (err) {
        socket.emit('error', err);
    }
}