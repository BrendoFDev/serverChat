const express = require('express');
const router = require('./router');
const sequelize = require('./database/db');
const session = require('express-session')
const sequelizeStorage = require('connect-session-sequelize')(session.Store);
const cors = require('cors');

require('dotenv').config();
const app = express();

const sessionStorage = new sequelizeStorage({
    db:sequelize,
});

const sessionPassword =  process.env.SESSION_PASS ? process.env.SESSION_PASS.split(',') : 'senha_fallback_segura';

const sessionConfig = session({
    secret: sessionPassword,
    store: sessionStorage,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
});

app.use(
    sessionConfig
);
app.use(cors({
    origin: '*', // Origem permitida
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(router);

const PORT = process.env.SERVER_PORT || 3001;

const startExpressServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco bem-sucedida!');

        await sequelize.sync({alter: true});
        console.log('Modelos sincronizados com sucesso!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
        return { app,  sessionConfig}
    } catch (err) {
        console.error('Erro ao conectar ou sincronizar o banco de dados:', err);
        process.exit(1); 
    }
};

module.exports = { startExpressServer };