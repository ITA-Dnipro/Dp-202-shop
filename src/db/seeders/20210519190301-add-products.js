const products = require('./schemas/products_data');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('products', products);
	},
	down: (queryInterface) => {
		return queryInterface.bulkDelete('products', null, {});
	},
};
