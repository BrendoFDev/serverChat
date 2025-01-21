const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD
const dbServer = process.env.DB_SERVER;


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbServer,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize