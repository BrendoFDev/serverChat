module.exports = (socket) =>{
    
    socket.on("join_private_room", (roomId)=>{
        socket.join(roomId);
        console.log(`Socket ${socket.id}, conectado ao room ${roomId}`)
        socket.to(roomId).emit('userJoin', `${socket.id} entrou na sala`);
    });

    socket.on('leave_private_room', (roomId) => {
        socket.leave(roomId);  
        console.log(`Socket ${socket.id}, desconectou da room ${roomId}`)
        socket.to(roomId).emit('userLeft', `${socket.id} saiu da sala`);
    });
}