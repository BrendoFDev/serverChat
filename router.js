const room = require('./routes/room');
const chat = require('./routes/chat');

module.exports = (io) => {
    io.on("connection", (socket) => {
       
        room(socket);
        chat(io,socket);
    
        socket.on('disconnect', ()=>{
            console.log("cliente disconectado");
        });
    
    });
}