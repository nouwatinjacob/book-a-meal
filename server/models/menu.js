
const menuModel = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    menuDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      through: 'MenuMeals',
      foreignKey: 'menuId',
    });
  };

  return Menu;
};

export default menuModel;
