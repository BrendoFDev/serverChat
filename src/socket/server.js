const {createServer} = require('http');
const { Server } = require("socket.io");
const router = require('./router');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const startSocketServer = (app) => {
    const SERVER_PORT = process.env.SERVER_PORT || 3000;
    const JWT_SECRET = process.env.JWT_SECRET;
    const httpServer = createServer(app);
    
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:9091',
            methods: ['GET', 'POST', 'PUT', 'DELETE'], 
            allowedHeaders: ['Content-Type', 'Authorization','token'],
            //credentials:true,
        },
    });
    

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) return next(new Error('Token ausente'));
    
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err)
                 return next(new Error('Token inválido'));
            socket.user = user; 
            next();
        });
    });

    router(io);
    
    httpServer.listen(SERVER_PORT, () => {
        console.log(`Servidor rodando em http://localhost:${SERVER_PORT}`);
    });
};
module.exports = { startSocketServer }