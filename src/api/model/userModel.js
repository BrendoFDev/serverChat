const sequelize = require('../database/db')
const { DataTypes } = require('sequelize');

const user = sequelize.define('user', {
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, 
{
    tableName:'user',
    timestamps:true
});

module.exports = user;