module.exports = (socket) =>{
    
    socket.on("join_private_room", (data)=>{
        try{
            socket.join(data.roomId);
            console.log(`Socket ${socket.id}, conectado ao room ${data.roomId}`)
            
            socket.to(roomId).emit('new_user_joined_room',`${socket.id} entrou na sala`)

            socket.emit("joined_in_room", {response: `Entrou na sala ${data.roomId}`});
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