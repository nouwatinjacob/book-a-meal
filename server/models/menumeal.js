const menuMealModel = (sequelize, DataTypes) => {
  const MenuMeal = sequelize.define('MenuMeal', {
    mealId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['menuId', 'mealId']
      }
    ]
  });

  MenuMeal.associate = (models) => {
    MenuMeal.belongsTo(models.Meal, {
      foreignKey: 'mealId',
    });
  };

  return MenuMeal;
};

export default menuMealModel;
