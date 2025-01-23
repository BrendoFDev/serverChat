const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD
const dbServer = process.env.DB_SERVER;


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbServer,
  dialect: 'postgres',
  port:5432,
});


const connectWithRetry = async () => {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
      break; // Se a conexão for bem-sucedida, saia do loop
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000)); // Espera 5 segundos antes de tentar novamente
    }
  }
};

connectWithRetry();

module.exports = sequelize