const users = require('./schemas/users');

module.exports = {
	up: async (queryInterface) => {
		return queryInterface.bulkInsert('users', users);
	},

	down: async (queryInterface) => {
		return queryInterface.bulkDelete('users', null, {});
	},
};
