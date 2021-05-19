'use strict';
const products = require('./schemas/products_data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', products )},
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
