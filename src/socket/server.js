
const {createServer} = require('http');
const { Server} = require("socket.io");
require('dotenv').config(); 

const startSocketServer = (app) => {
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
   
    routerSocket(io);
    
    httpServer.listen(socketPort, () => {
        console.log(`Servidor SOCKET rodando em http://localhost:${socketPort}`);
    });
};
module.exports = { startSocketServer }