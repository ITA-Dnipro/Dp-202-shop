'use strict';
const config = require('../config/config');
const {Sequelize} = require ('sequelize-typescript');


const env = process.env.NODE_ENV || 'development';
const mode = config[env];

const sequelize = new Sequelize(mode.database, mode.username, mode.password, {
  host: mode.host,
  dialect: mode.dialect,
  modelMatch: (filename: string, member: string) => {
    return filename.substring(0, filename.indexOf('.model')) === member;
  },
});

sequelize.addModels([__dirname + '/**/*.model.ts']);

module.exports = sequelize;
