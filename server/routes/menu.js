import MenusController from '../controllers/menus';
import authMiddleware from '../middleware/authentication';

const menuRoutes = (router) => {
  router.route('/menu')
    .post(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      MenusController.setMenu
    )
    .get(
      authMiddleware.verifyToken, authMiddleware.isCustomer,
      MenusController.getMenu
    );
};

export default menuRoutes;
