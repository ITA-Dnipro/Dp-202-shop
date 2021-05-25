const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../../.env` });

const config = {
	development: {
		username: process.env.DEV_DB_USER,
		password: process.env.DEV_DB_PASSWORD,
		database: process.env.DEV_DB_NAME,
		host: process.env.DEV_DB_HOST,
		port: process.env.DEV_DB_PORT,
		dialect: process.env.DEV_DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	test: {
		username: process.env.CI_DB_USER,
		password: process.env.CI_DB_PASSWORD,
		database: process.env.CI_DB_NAME,
		host: process.env.CI_DB_HOST,
		port: process.env.CI_DB_PORT,
		dialect: process.env.CI_DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	production: {
		username: process.env.PROD_DB_USER,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOST,
		port: process.env.PROD_DB_PORT,
		dialect: process.env.PROD_DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
};

module.exports = config;
