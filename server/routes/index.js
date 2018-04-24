import MealsController from '../controllers/meals';
import MenusController from '../controllers/menus';

const routes = (router) => {
  const mealCtrl = new MealsController(router);
  const menuCtrl = new MenusController(router);
  router.route('/')
    .get((req, res) => res.status(200).json({
      message: 'Welcome to the More Book-A-Meal API!',
    }));
  /* Meals Routes */
  router.route('/meals').get(mealCtrl.getMeals);
  router.route('/meals').post(mealCtrl.addMeal);
  router.route('/meals/:id').put(mealCtrl.modifyMeal);
  router.route('/meals/:id').delete(mealCtrl.removeMeal);

  /* Menus Routes */
  router.route('/menu').post(menuCtrl.setMenu);
  router.route('/menu').get(menuCtrl.getMenu);
};

export default routes;
