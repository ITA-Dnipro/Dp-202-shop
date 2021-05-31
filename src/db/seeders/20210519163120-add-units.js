const units = require('./schemas/units');

module.exports = {
	up: async (queryInterface) => {
		return queryInterface.bulkInsert('units', units);
	},

	down: async (queryInterface) => {
		return queryInterface.bulkDelete('units', null, {});
	},
};
