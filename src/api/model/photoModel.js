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
    originalName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.VIRTUAL,
        get() {
            return `http:localhost/${process.env.SERVER_PORT}/images/${this.getDataValue('filename')}`;
        }
    }
},
    {
        timestamps: true,
        tableName: 'Photo'
    });

Photo.belongsTo(User, { foreignKey: "owner", targetKey: "id" });
module.exports = Photo;