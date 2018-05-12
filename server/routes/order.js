import OrdersController from '../controllers/orders';
import authMiddleware from '../middleware/authentication';

const orderRoutes = (router) => {
  router.route('/orders')
    .post(
      authMiddleware.verifyToken, authMiddleware.isCustomer,
      OrdersController.makeOrder
    )
    .get(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      OrdersController.getOrder
    );
  router.route('/orders/:id').put(
    authMiddleware.verifyToken, authMiddleware.isCustomer,
    OrdersController.modifyOrder
  );
};

export default orderRoutes;
