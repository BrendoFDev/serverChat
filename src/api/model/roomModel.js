const sequelize = require('../database/db')
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const Room = sequelize.define('room', {
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    code:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    creationDate:{
        type: DataTypes.DATE,
        allowNull:false
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull:false,
    }
}, 
{
    tableName:'room',
    timestamps:false,
});

Room.belongsTo(User, { foreignKey:'owner', targetKey:'id' });

module.exports = Room;