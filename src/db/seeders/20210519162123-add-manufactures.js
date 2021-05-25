const manufactures = require('./schemas/manufactures');

module.exports = {
	up: async (queryInterface) => {
		return queryInterface.bulkInsert('manufactures', manufactures);
	},

	down: async (queryInterface) => {
		return queryInterface.bulkDelete('manufactures', null, {});
	},
};
