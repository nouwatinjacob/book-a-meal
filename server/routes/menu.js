import MenusController from '../controllers/menus';
import authMiddleware from '../middleware/authentication';

const menuRoutes = (router) => {
  router.route('/menu').post(
    authMiddleware.verifyToken, authMiddleware.isCaterer,
    MenusController.setMenu
  );
};

export default menuRoutes;
