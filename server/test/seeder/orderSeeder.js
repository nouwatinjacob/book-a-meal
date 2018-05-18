import db from '../../models';

const { Order } = db;

const orderSeeder = {
  emptyOrderTable(done) {
    Order.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setOrderData(mealId, quantity, menuId, userId) {
    return {
      mealId,
      quantity,
      menuId,
      userId
    };
  },
  setUpdateOrder(mealId, quantity, menuId) {
    return {
      mealId,
      quantity,
      menuId,
    };
  },
};

export default orderSeeder;
