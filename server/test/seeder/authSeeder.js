import db from '../../models';

const { User } = db;

const seeder = {
  emptyUserTable(done) {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setData(
    email, password, userType,
    password_confirmation, firstName, lastName, businessName,
    ownerName, businessAddress
  ) {
    return {
      email,
      password,
      userType,
      password_confirmation,
      firstName,
      lastName,
      businessName,
      ownerName,
      businessAddress
    };
  },
  setCustomerData(
    email, password, password_confirmation,
    firstName, lastName, userType
  ) {
    return {
      email,
      password,
      password_confirmation,
      firstName,
      lastName,
      userType
    };
  },
  setCatererData(
    email, password, password_confirmation,
    businessAddress, businessName, ownerName, userType
  ) {
    return {
      email,
      password,
      password_confirmation,
      businessAddress,
      businessName,
      ownerName,
      userType
    };
  },
  setLoginData(email, password) {
    return { email, password };
  },
  addCustomerToDb(done) {
    User.create({
      firstName: 'Okafor',
      lastName: 'Emmanuel',
      email: 'nondefyde@gmail.com',
      password: 'kalamusu',
      userType: 'customer'
    }).then(() => done())
      .catch(err => done(err));
  },
  addCatererToDb(done) {
    User.create({
      businessAddress: '12, Adio Str., Okesokori',
      businessName: 'Yakoyo Food Canteen',
      ownerName: 'Babajide Olawale',
      email: 'nondefyde1@gmail.com',
      password: 'kalamusu',
      userType: 'caterer'
    }).then(() => done())
      .catch(err => done(err));
  },
};

export default seeder;
