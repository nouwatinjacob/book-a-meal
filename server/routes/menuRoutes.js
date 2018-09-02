import MenusController from '../controllers/MenusController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const menuRoutes = (router) => {
  router.route('/menu')
    .post(
      AuthMiddleware.verifyToken, AuthMiddleware.isCaterer,
      MenusController.setMenu
    )
    .get(
      AuthMiddleware.verifyToken,
      MenusController.getMenu
    );
};

export default menuRoutes;
