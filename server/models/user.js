import bcrypt from 'bcrypt-nodejs';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  /**
   * Method for comparing passwords
   * @param { object } user
   * @param { string } password
   *
   * @returns { object } user
   */
  User.prototype.comparePassword = (user, password) =>
    bcrypt.compareSync(password, user.password);
  /**
   * Hook for hashing password before creating a new user
   */
  User.hook('beforeCreate', (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });

  return User;
};

export default userModel;
