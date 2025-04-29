const {createServer} = require('http');
const { Server } = require("socket.io");
const router = require('./router');
require('dotenv').config(); 

const startSocketServer = (app) => {
    const SERVER_PORT = process.env.SERVER_PORT || 3000;
    const httpServer = createServer(app);
    
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'], 
            allowedHeaders: ['Content-Type', 'Authorization']
        },
    });

    router(io);
    
    httpServer.listen(SERVER_PORT, () => {
        console.log(`Servidor rodando em http://localhost:${SERVER_PORT}`);
    });
};
module.exports = { startSocketServer }