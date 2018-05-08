
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

  Caterer.catererValidation = () => ({
    email: 'required|email',
    password: 'required|min:6|confirmed',
    password_confirmation: 'required',
    businessName: 'required|string',
    ownerName: 'required|string|min:6',
    businessAddress: 'required'
  });

  return Caterer;
};

export default catererModel;
