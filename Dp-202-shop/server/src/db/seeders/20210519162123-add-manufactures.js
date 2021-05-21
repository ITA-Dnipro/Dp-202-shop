'use strict';
const manufactures = require('./schemas/manufactures');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('manufactures', manufactures);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('manufactures', null, {});
  }
};
