'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {type:Sequelize.DATE, allowNull:false, defaultValue: new Date()},
      updatedAt: {type:Sequelize.DATE, allowNull:false, defaultValue: new Date()},
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  },
};
