
const {createServer} = require('http');
const { Server} = require("socket.io");
const router = require('./router');
require('dotenv').config(); 

const startSocketServer = (app, sessionConfig) => {
    const socketPort = process.env.SOCKET_PORT || 3000;

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:9091",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true,
        },
    });
    
    io.use((socket,next)=>{
        sessionConfig(socket.request, {}, next);
    });
    
    router(io);
    
    httpServer.listen(socketPort, () => {
        console.log(`Servidor SOCKET rodando em http://localhost:${socketPort}`);
    });
};
module.exports = { startSocketServer }