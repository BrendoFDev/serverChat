const room = require('./events/room');
const chat = require('./events/chat');
const user = require('./events/user');

module.exports = (io) => {
    io.on("connection", async (socket) => {
        
        console.log('Novo socket conectado: ', socket.id, ' - ', socket.request.session);
        console.log('Dados da sessão:', socket.session);
   
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