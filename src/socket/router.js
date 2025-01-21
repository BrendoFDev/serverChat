const room = require('./routes/room');
const chat = require('./routes/chat');

module.exports = (io) => {
    io.on("connection", (socket) => {
        
        console.log("Novo Client conectado: ",socket.id)
        
        room(socket);
        chat(io,socket);
    
        socket.on('connect_error', (err) => {
            console.log('Erro de conexão:', err);
        });

        socket.on('disconnect', (reason)=>{
            console.log("cliente desconectado");
            console.log(reason.details)
            console.log(reason.description)
        });
    
    });
}