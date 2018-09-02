import OrdersController from '../controllers/OrdersContoller';
import AuthMiddleware from '../middleware/AuthMiddleware';

const orderRoutes = (router) => {
  router.route('/orders')
    .post(
      AuthMiddleware.verifyToken,
      OrdersController.makeOrder
    )
    .get(
      AuthMiddleware.verifyToken, AuthMiddleware.isCaterer,
      OrdersController.getCatererOrder
    );
  router.route('/user-orders')
    .get(
      AuthMiddleware.verifyToken,
      OrdersController.getCustomerOrders
    );
  router.route('/order/:id')
    .get(
      AuthMiddleware.verifyToken,
      OrdersController.getAnOrder
    );
  router.route('/orders/:id')
    .put(
      AuthMiddleware.verifyToken,
      OrdersController.modifyOrder
    )
    .delete(
      AuthMiddleware.verifyToken,
      OrdersController.cancelOrder
    );
};

export default orderRoutes;
