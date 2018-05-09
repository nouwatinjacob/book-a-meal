
const menuModel = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    menuDate: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      through: 'MenuMeals',
      foreignKey: 'menuId'
    });
  };

  Menu.menuRules = () => ({
    // mealId: 'required|integer',
    menuDate: 'required'
  });

  return Menu;
};

export default menuModel;
