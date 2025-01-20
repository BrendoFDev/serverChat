const express = require('express');
const router = require('./router');
const cors = require('cors');

const {createServer} = require('http')
const { Server} = require("socket.io");
require('dotenv').config(); 

const app = express();
const PORT = process.env.SERVER_PORT || 3000;


const httpServer = createServer(app);

const io = new Server(httpServer, {   cors: {
    origin: "http://localhost:9091", // Permite todos os domínios
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
}
});

router(io)

httpServer.listen(PORT, ()=>{
    console.log(`servidor rodando em http://localhost:${PORT}`);
})