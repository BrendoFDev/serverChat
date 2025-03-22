const redisService = require('../../api/services/redisService');

module.exports = (io, socket) => {
    try {
        socket.on("private_message", (data) => {
            ({ roomId, message, sender, date, time} = data);

            console.log(`Mensagem recebida na sala ${roomId}`);

            let formatedMsg = {sender, message, date, time};

            redisService.SaveMessage(roomId, formatedMsg);
            io.to(data.roomId).emit("receive_message",  formatedMsg );
        });

        socket.on('load_room_messages', async (roomId)=>{
            messages = await redisService.SearchMessages(roomId);
            console.log('Menssagens carregadas');
            socket.emit('return_room_messages', messages);
        })
    }
    catch (err) {
        socket.emit('error', err);
    }
}