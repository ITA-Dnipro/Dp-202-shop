import config from './config';
import {Sequelize} from 'sequelize-typescript';
const env = process.env.NODE_ENV || 'development';
const mode = config[env];

const sequelize = new Sequelize(mode.database, mode.username, mode.password, {
  host: mode.host,
  dialect: mode.dialect,
  models: [__dirname + '/models']
});

console.log(sequelize);

export default sequelize;
