
export function up(queryInterface, Sequelize) {
  queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    mealId: {
      type: Sequelize.INTEGER
    },
    orderDate: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export function down(queryInterface) { queryInterface.dropTable('Orders'); }
