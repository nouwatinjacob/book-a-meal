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

  Meal.mealRules = () => ({
    name: 'required|min:4|alpha',
    price: 'required|numeric',
    image: 'required'
  });

  return Meal;
};

export default mealModel;
