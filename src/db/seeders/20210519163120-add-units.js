'use strict';
const units = require('./schemas/units');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('units', units);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('units', null, {});
  }
};
