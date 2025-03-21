const redisService = require("../../api/services/redisService");

module.exports = (io, socket) =>{
    
    socket.on("join_private_room", async (data)=>{
        try{
            socket.join(data.roomId);
            console.log(`Socket ${socket.id} : ${data.sender}, conectado ao room ${data.roomId}`);

            if(!await redisService.SaveRoom(data.email, data.roomId)){
                socket.emit("room_already_saved", `Você já está conectado a sala ${roomId}`);
                console.log("Sala já conectada");
                return;
            }

            io.to(data.roomId).emit("joined_in_room", `${data.sender} entrou na sala ${data.roomId}`);
        }
        catch(error){
           socket.emit('error',{response: `erro ao entrar na sala: ${error}`});
        }
    });

    socket.on('leave_private_room', (roomId) => {
        socket.leave(roomId);  
        console.log(`Socket ${socket.id}, desconectou da room ${roomId}`)
        socket.to(roomId).emit('userLeft', `${socket.id} saiu da sala`);
    });
}