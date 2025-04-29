const messageService = require('../../api/services/messageService');
const Message = require('../../api/model/messageModel');
const { format } = require('date-fns');

module.exports = async (io, socket) => {
    try {

        socket.on("private_message", async (data) => {
            try {

                const { roomId, message, currentUser } = data;
                
                let time = format(new Date(),'hh:mm');
                let date = new Date().toISOString().split('T')[0]

                console.log(`Mensagem recebida na sala ${roomId}`);
                const formatedMessage = { sender: currentUser.id, message, room: roomId, date, time }
                console.log(formatedMessage);
                let newMessage = await Message.create(formatedMessage);

                const redisMessage = { ...newMessage.dataValues, senderName: currentUser.name };

                await messageService.SaveMessage(roomId, redisMessage);
                io.to(parseInt(roomId)).emit("receive_message", redisMessage);

            }
            catch (err) {
                console.log(err);
            }
        });

        socket.on('load_room_messages', async (roomId) => {
            messages = await messageService.SearchMessages(parseInt(roomId));
            socket.emit('return_room_messages', messages);
        });
    }
    catch (err) {
        socket.emit('error', err);
    }
}