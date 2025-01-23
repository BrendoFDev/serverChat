
const {createServer} = require('http');
const { Server } = require("socket.io");
const router = require('./router');
const sharedSession = require('express-socket.io-session');

require('dotenv').config(); 

const startSocketServer = (app, session) => {
    const socketPort = process.env.SOCKET_PORT || 3000;

    const httpServer = createServer(app);
    
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:9091",
            methods: ["GET", "POST"],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        },
    });
    
    io.use(sharedSession(session, {
            autoSave:true,
        }),
    );
    
    router(io);
    
    httpServer.listen(socketPort, () => {
        console.log(`Servidor SOCKET rodando em http://localhost:${socketPort}`);
    });
};
module.exports = { startSocketServer }