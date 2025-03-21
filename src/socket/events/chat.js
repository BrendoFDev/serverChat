const redisService = require('../../api/services/redisService');

module.exports = (io, socket) => {
    try {
        socket.on("private_message", (data) => {
            ({ roomId, message, sender, date, time} = data);

            console.log(`Mensagem recebida na sala ${roomId}`);

            let formatedMsg = {sender, message, date, time};

            redisService.SaveMessage(roomId, formatedMsg);
            io.to(data.roomId).emit("receive_message", { formatedMsg });
        });
    }
    catch (err) {
        console.log(err);
    }
}