import MealsController from '../controllers/meals';
import authMiddleware from '../middleware/authentication';

const mealRoutes = (router) => {
  router.route('/meals')
    .post(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      MealsController.addMeal
    );

  router.route('/meals/:id')
    .put(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      MealsController.modifyMeal
    );
};

export default mealRoutes;
