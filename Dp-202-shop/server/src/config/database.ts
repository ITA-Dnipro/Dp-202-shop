import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelizeConnection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: +process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000
  }
});
