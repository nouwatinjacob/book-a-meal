import MealsController from '../controllers/meals';
import authMiddleware from '../middleware/authentication';

const mealRoutes = (router) => {
  router.route('/meals')
    .post(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      MealsController.addMeal
    )
    .get(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      MealsController.getMeals
    );

  router.route('/meals/:id')
    .put(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      MealsController.modifyMeal
    )
    .delete(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      MealsController.deleteMeal
    );
};

export default mealRoutes;
