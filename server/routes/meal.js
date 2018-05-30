import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import MealsController from '../controllers/meals';
import authMiddleware from '../middleware/authentication';
import cloudinaryConfig from '../middleware/cloudinaryConfig';

cloudinaryConfig();

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'BookMeal/',
  allowedFormats: ['jpg', 'png', 'jpeg']
});

const upload = multer({ storage });

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
