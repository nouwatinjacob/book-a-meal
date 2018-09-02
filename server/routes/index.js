import menuRoutes from './menuRoutes';
import mealRoutes from './mealRoutes';
import userRoutes from './userRoutes';
import orderRoutes from './orderRoutes';

const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).json({
      message: 'Welcome to the Book-A-Meal API!',
    }));

  /* Users Routes */
  userRoutes(router);

  /* Meals Routes */
  mealRoutes(router);

  /* Menus Routes */
  menuRoutes(router);

  /* Orders Routes */
  orderRoutes(router);
};

export default routes;
