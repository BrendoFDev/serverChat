const {Queue} = require('bullmq');
require('dotenv').config();

const port = process.env.REDIS_PORT;
const host = process.env.REDIS_HOST;

const redisConfig = {connection:{host,port}};

const messageQueue = new Queue('messages', redisConfig);

exports.addMessageInQueue = async (roomId, message)=>{
    await messageQueue.add('newMessage', {roomId, message});
    console.log('Mensagem Adicionada na fila');
}

