
import MealsController from '../controllers/meals';

const routes = (router) => {
  const mealCtrl = new MealsController(router);

  const routes = (router) => {
   router.route('/')
    .get((req, res) => res.status(200).json({
      message: 'Welcome to the More Book-A-Meal API!',
    }));

  router.route('/meals').get(mealCtrl.getMeals);
};

export default routes;
