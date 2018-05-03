
export function up(queryInterface, Sequelize) {
  queryInterface.createTable('Caterers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    businessName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ownerName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    businessAddress: {
      type: Sequelize.STRING,
      allowNull: false
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
export function down(queryInterface) { queryInterface.dropTable('Caterers'); }
