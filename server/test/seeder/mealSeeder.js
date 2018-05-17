import db from '../../models';

const { Meal } = db;

const mealSeeder = {
  emptyMealTable(done) {
    Meal.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setMealData(name, price, image, userId) {
    return {
      name,
      price,
      image,
      userId
    };
  },
  setUpdateMeal(name, price, image) {
    return {
      name,
      price,
      image
    };
  },
};

export default mealSeeder;
