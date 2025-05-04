const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const User = require('./userModel');
require('dotenv').config();

const Photo = sequelize.define('Photo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        timestamps: true,
        tableName: 'Photo'
    });

module.exports = Photo;