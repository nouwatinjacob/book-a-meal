import db from '../../models';

const { Menu } = db;

const menuSeeder = {
  emptyMenuTable(done) {
    Menu.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setMenuData(mealId, menuDate) {
    return {
      mealId,
      menuDate
    };
  },
  setUpdateMenu(mealId, menuDate) {
    return {
      mealId,
      menuDate
    };
  },
};

export default menuSeeder;
