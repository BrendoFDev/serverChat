const {createServer} = require('http');
const { Server } = require("socket.io");
const router = require('./router');
const sessionModel = require('../api/model/sessionModel');

require('dotenv').config(); 

const startSocketServer = (app) => {
    const SERVER_PORT = process.env.SERVER_PORT || 3000;

    const httpServer = createServer(app);
    
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:9091',
            methods: ['GET', 'POST', 'PUT', 'DELETE'], 
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials:true,
        },
    });

  
    io.use((socket, next) => {
        const cookies = socket.request.headers.cookie; 
        if (!cookies) {
            return next(new Error('Não autorizado: Cookies não encontrados'));
        }
    
        const sessionID = cookies.split('; ').find(row => row.startsWith('connect.sid='));
        if (!sessionID) {
            return next(new Error('Não autorizado: Session ID não encontrado'));
        }
    
        const sessionIdValue = sessionID.split('=')[1]; 
        
        
        sessionModel.findOne({ where: { sid: sessionIdValue } })
            .then(session => {
                if (!session) {
                    return next(new Error('Não autorizado: Sessão não encontrada'));
                }
                socket.session = session.data; // Armazena os dados da sessão no socket
                next();
            })
            .catch(error => {
                console.error('Erro ao buscar a sessão:', error.message);
                next(new Error('Erro ao buscar a sessão'));
            });
    });


    router(io);
    
    httpServer.listen(SERVER_PORT, () => {
        console.log(`Servidor rodando em http://localhost:${SERVER_PORT}`);
    });
};
module.exports = { startSocketServer }