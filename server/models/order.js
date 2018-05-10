
const orderModel = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    mealId: {
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

  };

  return Order;
};

export default orderModel;
