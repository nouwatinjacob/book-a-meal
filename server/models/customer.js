
const customerModel = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Customer.customerValidation = () => ({
    email: 'required|email',
    password: 'required|min:6|confirmed',
    password_confirmation: 'required',
    firstName: 'required|min:3|string',
    lastName: 'required|min:3|string'
  });

  return Customer;
};

export default customerModel;
