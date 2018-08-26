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

    Meal.belongsToMany(models.Menu, {
      through: 'MenuMeals',
      foreignKey: 'mealId',
      otherKey: 'menuId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      hook: true
    });
  };


  return Meal;
};

export default mealModel;
