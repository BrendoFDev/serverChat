module.exports = (io, socket) => {

    socket.on("private_message",(data)=>{

        console.log(`Mensagem recebida na sala ${data.roomId}`);
        io.to(data.roomId).emit("receive_message",{message:data.message, sender: data.sender});
    });
}