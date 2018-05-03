
const catererModel = (sequelize, DataTypes) => {
  const Caterer = sequelize.define('Caterer', {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Caterer.associate = (models) => {
    Caterer.belongsTo(models.User, {
      foreignKey: 'typeId',
      onDelete: 'CASCADE'
    });
  };


  return Caterer;
};

export default catererModel;
