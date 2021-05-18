const env = process.env.NODE_ENV || 'development';
const { [env]: mode} = require('./config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(mode.database, mode.username, mode.password, {
  host: mode.host,
  dialect: mode.dialect
});

module.exports = sequelize;

