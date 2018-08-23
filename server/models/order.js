
const orderModel = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
    });

    Order.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Order;
};

export default orderModel;
