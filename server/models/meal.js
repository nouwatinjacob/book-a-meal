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
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  Meal.mealRules = () => ({
    name: 'required|min:4',
    price: 'required|numeric|integer',
    image: 'required'
  });

  return Meal;
};

export default mealModel;
