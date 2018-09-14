import MealsController from '../controllers/MealsController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import cloudinaryUpload from '../middleware/cloudinaryUpload';
import checkImage from '../middleware/checkImage';


const mealRoutes = (router) => {
  router.route('/meals')
    .get(
      AuthMiddleware.verifyToken, AuthMiddleware.isCaterer,
      MealsController.getMeals
    );

  router.route('/meals/:id')
    .put(
      AuthMiddleware.verifyToken,
      AuthMiddleware.isCaterer,
      cloudinaryUpload.single('image'),
      MealsController.modifyMeal
    )
    .get(
      AuthMiddleware.verifyToken,
      MealsController.getAMeal
    )
    .delete(
      AuthMiddleware.verifyToken, AuthMiddleware.isCaterer,
      MealsController.deleteMeal
    );

  router.route('/meals')
    .post(
      AuthMiddleware.verifyToken,
      AuthMiddleware.isCaterer,
      cloudinaryUpload.single('image'),
      MealsController.addMeal
    );
};

export default mealRoutes;
