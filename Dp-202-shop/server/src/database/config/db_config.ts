import config from './config.js';
import {Sequelize} from 'sequelize-typescript';
import {SequelizeTypescriptMigration} from "sequelize-typescript-migration/dist";
import * as path from "path";
const env = process.env.NODE_ENV || 'development';
const mode = config[env];

const sequelize = new Sequelize(mode.database, mode.username, mode.password, {
  host: mode.host,
  dialect: mode.dialect
});

// @ts-ignore
SequelizeTypescriptMigration.makeMigration(sequelize, {
  outDir: path.join(__dirname, "../migrations"),
  migrationName: "add-awesome-field-in-my-table",
  preview: true,
}).then(console.log).catch(console.error);

// export default sequelize;
