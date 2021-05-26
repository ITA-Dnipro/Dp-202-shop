import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { sequelizeOptions } from './sequelize.options';

dotenv.config({ path: `${__dirname}/../.env` });
const env = process.env.NODE_ENV || 'development';
const { [env]: mode } = require('./config');

export default new Sequelize(
	mode.database,
	mode.username,
	mode.password,
	sequelizeOptions,
);
