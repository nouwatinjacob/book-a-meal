import OrdersController from '../controllers/orders';
import authMiddleware from '../middleware/authentication';

const orderRoutes = (router) => {
  router.route('/orders')
    .post(
      authMiddleware.verifyToken, authMiddleware.isCustomer,
      OrdersController.makeOrder
    );
  router.route('/orders/:id').put(
    authMiddleware.verifyToken, authMiddleware.isCustomer,
    OrdersController.modifyOrder
  );
};

export default orderRoutes;
