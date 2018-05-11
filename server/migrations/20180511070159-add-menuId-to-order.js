'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Orders',
      'menuId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Orders', 'menuId');
  }
};
