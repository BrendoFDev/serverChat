const room = require('./events/room');
const chat = require('./events/chat');

module.exports = (io) => {
    io.on("connection", async (socket) => {
        
        console.log('Novo socket conectado: ', socket.id);
        room(io, socket);
        chat(io, socket);
    
        socket.on('connect_error', (err) => {
            console.log('Erro de conexão:', err);
        });

        socket.on('disconnect', (reason)=>{
            console.log("cliente desconectado: ", socket.id);
        });
    
    });
}