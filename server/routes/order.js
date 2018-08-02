import OrdersController from '../controllers/orders';
import authMiddleware from '../middleware/authentication';

const orderRoutes = (router) => {
  router.route('/orders')
    .post(
      authMiddleware.verifyToken,
      OrdersController.makeOrder
    )
    .get(
      authMiddleware.verifyToken, authMiddleware.isCaterer,
      OrdersController.getCatererOrder
    );
  router.route('/user-orders')
    .get(
      authMiddleware.verifyToken,
      OrdersController.getCustomerOrders
    );
  router.route('/order/:id')
    .get(
      authMiddleware.verifyToken,
      OrdersController.getAnOrder
    );
  router.route('/orders/:id')
    .put(
      authMiddleware.verifyToken, authMiddleware.isCustomer,
      OrdersController.modifyOrder
    )
    .delete(
      authMiddleware.verifyToken, authMiddleware.isCustomer,
      OrdersController.cancelOrder
    );
};

export default orderRoutes;
