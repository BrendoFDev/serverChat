const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Session = sequelize.define('session', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  },
{
  tableName:"sessions",
  timestamps:true,
});

  module.exports = Session;