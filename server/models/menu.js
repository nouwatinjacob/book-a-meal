
const menuModel = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menuDate: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Menu.menuRules = () => ({
    mealId: 'required|integer',
    menuDate: 'required'
  });

  return Menu;
};

export default menuModel;
