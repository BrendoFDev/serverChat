const room = require('./events/room');
const chat = require('./events/chat');
const user = require('./events/user');

module.exports = (io) => {
    io.on("connection", (socket) => {
        
        console.log("Novo Client tentando se conectar: ",socket.id, " - ", socket.handshake.headers.cookie)
        
        user(socket)
        room(socket);
        chat(io,socket);
    
        socket.on('connect_error', (err) => {
            console.log('Erro de conexão:', err);
        });

        socket.on('disconnect', (reason)=>{
            console.log("cliente desconectado: ", socket.id);
        });
    
    });
}