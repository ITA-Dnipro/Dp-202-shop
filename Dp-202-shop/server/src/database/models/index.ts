'use strict';
import config from '../config/config';
import {Sequelize} from 'sequelize-typescript';
const env = process.env.NODE_ENV || 'development';
const mode = config[env];

const sequelize = new Sequelize(mode.database, mode.username, mode.password, {
  host: mode.host,
  dialect: mode.dialect,
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member;
  },
});

sequelize.addModels([__dirname + '/**/*.model.ts']);

console.log(sequelize);

export default sequelize;
