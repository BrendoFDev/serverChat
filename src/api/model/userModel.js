const sequelize = require('../database/db')
const { DataTypes } = require('sequelize');

const user = sequelize.define('user', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
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