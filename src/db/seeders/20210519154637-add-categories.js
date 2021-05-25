const categories = require('./schemas/categories');

module.exports = {
	up: async (queryInterface) => {
		return queryInterface.bulkInsert('categories', categories);
	},

	down: async (queryInterface) => {
		return queryInterface.bulkDelete('categories', null, {});
	},
};
