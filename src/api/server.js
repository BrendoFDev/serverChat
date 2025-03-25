const express = require('express');
const router = require('./router');

const sequelize = require('./database/db');
const cors = require('cors');
require('dotenv').config();
const app = express();

const User = require('./model/userModel');
const Room = require('./model/roomModel');
const Message = require('./model/messageModel');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'refresh'],
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(router);

const startExpressServer = async () => {
    try {
        
        await sequelize.authenticate();
        console.log('Conexão com o banco bem-sucedida!');

        await sequelize.sync({alter:true});
        console.log(`Modelos sincronizados com sucesso!`)

        return app;
    } catch (err) {
        console.error('Erro ao conectar ou sincronizar o banco de dados:', err);
        process.exit(1); 
    }
};

module.exports = { startExpressServer };