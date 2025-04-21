const sequelize = require('../database/db')
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Email Inválido'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        tableName: 'user',
        timestamps: true
    });

module.exports = User;