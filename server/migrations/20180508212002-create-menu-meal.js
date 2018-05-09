
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MenuMeals', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    mealId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Meals',
        key: 'id'
      },
    },
    menuId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Menus',
        key: 'id'
      },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),
  down: queryInterface => queryInterface.dropTable('MenuMeals'),
};
