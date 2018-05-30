import multer from 'multer';
import MealsController from '../controllers/meals';
import authMiddleware from '../middleware/authentication';

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const upload = multer({ dest: 'uploads/' });

const mealRoutes = (router) => {
  router.route('/meals')
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

  router.route('/meals')
    .post(
      authMiddleware.verifyToken,
      authMiddleware.isCaterer,
      upload.single('image'),
      MealsController.addMeal
    );
};

export default mealRoutes;
