module.exports = (io, socket) => {

    socket.on("private_message",({roomid, socket, sender},callback)=>{

        console.log(`Mensagem recebida na sala ${roomid}`);
        io.to(roomid).emit("receive_message",{message, sender});
        callback(message);
    });
}