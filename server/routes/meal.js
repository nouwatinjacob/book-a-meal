import MealsController from '../controllers/meals';
import authMiddleware from '../middleware/authentication';

const mealRoutes = (router) => {
  router.route('/meals')
    .post(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      MealsController.addMeal
    );
};

export default mealRoutes;
