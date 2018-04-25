import menus from '../models/menus';
import orders from '../models/orders';

class OrdersController {
  constructor(router) {
    this.menus = menus;
    this.orders = orders;
    this.router = router;
    this.registerRouters();
  }

  registerRouters() {
    this.router.post('/orders', this.makeOrder.bind(this));
    this.router.get('/orders', this.getAllOrders.bind(this));
  }

  makeOrder(req, res) {
    const { mealId, quantity } = req.body;
    const orderId = (this.orders[this.orders.length - 1].id) + 1;
    const orderedMeal = this.menus.find(meal => meal.menu.id === parseInt(mealId, 10));
    if (orderedMeal) {
      this.orders.push({
        id: orderId,
        orderedMeal,
        quantity
      });
      return res.status(200).json({
        Message: 'Meal added to your order',
        orders,
      });
    }
    return res.status(400).json({ message: 'You can only select a meal in the menu option' });
  }

  getAllOrders(req, res) {
    if (this.orders.length < 1) {
      return res.status(404).json({
        message: 'No orders found',
      });
    }
    return res.status(200).json(this.orders);
  }
}

export default OrdersController;
