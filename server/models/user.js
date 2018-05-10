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
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'meal'
    });
  };

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
