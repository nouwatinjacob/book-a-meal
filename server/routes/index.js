import mealRoute from './meal';
import userRoutes from './user';

const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).json({
      message: 'Welcome to the Book-A-Meal API!',
    }));

  /* Users Routes */
  userRoutes(router);

  /* Meals Routes */
  // router.route('/meals').get(MealsController.getMeals);
  mealRoute(router);
  // router.route('/meals/:id').put(MealsController.modifyMeal);
  // router.route('/meals/:id').delete(MealsController.removeMeal);

  // /* Menus Routes */
  // router.route('/menu').post(MenusController.setMenu);
  // router.route('/menu').get(MenusController.getMenu);

  // /* Orders Routes */
  // router.route('/orders').post(OrdersController.makeOrder);
  // router.route('/orders').get(OrdersController.getAllOrders);
  // router.route('/orders/:id').put(OrdersController.modifyOrder);
};

export default routes;
