module.exports = (io, socket) => {

    socket.on("private_message",({roomid, socket, sender})=>{
        console.log(`Mensagem recebida na sala ${roomid}`);
        io.to(roomid).emit("receive_message",{message, sender});

    });
}