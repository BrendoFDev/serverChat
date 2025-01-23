const express = require('express');
const router = require('./router');
const sequelize = require('./database/db');
const sessionCreator = require('express-session')
const sequelizeStorage = require('connect-session-sequelize')(sessionCreator.Store);
const http = require('http');
const cors = require('cors');

require('dotenv').config();
const app = express();

const sessionStorage = new sequelizeStorage({
    db:sequelize,
});

const sessionPassword =  process.env.SESSION_PASS ? process.env.SESSION_PASS.split(',') : 'senha_fallback_segura';

const session = sessionCreator({
    secret: sessionPassword,
    store: sessionStorage,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure:false
    },
});

app.use(
    session
);

app.use(cors({
    origin: 'http://localhost:9091', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(router);

const PORT = process.env.SERVER_PORT || 3001;

const startExpressServer = async () => {
    try {
        const appServer = http.createServer(app);
        await sequelize.authenticate();
        console.log('Conexão com o banco bem-sucedida!');

        await sequelize.sync({alter: true});
        console.log('Modelos sincronizados com sucesso!');

        appServer.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
        return { appServer,  session}
    } catch (err) {
        console.error('Erro ao conectar ou sincronizar o banco de dados:', err);
        process.exit(1); 
    }
};

module.exports = { startExpressServer };