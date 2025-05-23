const sequelize = require('../database/db')
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const Message = sequelize.define('message', {
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    sender:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    room:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    date:{
        type: DataTypes.DATE,
        allowNull:false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, 
{
    tableName:'message',
    timestamps:false
});

Message.belongsTo(User, { foreignKey: 'sender', targetKey: 'id'});


module.exports = Message;