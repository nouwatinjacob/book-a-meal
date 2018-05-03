
const mealModel = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Meal.associate = (models) => {
    Meal.belongTo(models.User, {
      foreignKey: 'userId',
      as: 'caterer'
    });
  };

  return Meal;
};

export default mealModel;
