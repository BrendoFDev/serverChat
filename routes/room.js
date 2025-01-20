module.exports = (socket) =>{
    
    socket.on("join_private_room", (data)=>{
        try{
            socket.join(data.roomId);
            console.log(`Socket ${socket.id}, conectado ao room ${data.roomId}`)
            io.to(data.roomId).emit("joined_in_room",  `Entrou na sala ${data.roomId}`);
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