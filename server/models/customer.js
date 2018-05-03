
const customerModel = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Caterer', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Customer.associate = (models) => {
    Customer.belongsTo(models.User, {
      foreignKey: 'typeId',
      onDelete: 'CASCADE'
    });
  };


  return Customer;
};

export default customerModel;
