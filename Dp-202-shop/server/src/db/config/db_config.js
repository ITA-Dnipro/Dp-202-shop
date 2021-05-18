const dotenv = require('dotenv');
dotenv.config({path:__dirname+'/../.env'});
const env = process.env.NODE_ENV || 'development';
const { [env]: mode} = require('./config');
const { Sequelize } = require('sequelize');

console.log(env);

export const sequelize = new Sequelize(mode.database, mode.username, mode.password, {
  host: mode.host,
  dialect: mode.dialect
});

