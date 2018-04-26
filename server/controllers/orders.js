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
    this.router.put('/orders/:id', this.modifyOrder.bind(this));
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
    return res.status(400).json({ Message: 'You can only select a meal that is in the menu option' });
  }

  getAllOrders(req, res) {
    if (this.orders.length < 1) {
      return res.status(404).json({
        message: 'No orders found',
      });
    }
    return res.status(200).json(this.orders);
  }

  modifyOrder(req, res) {
    const { mealId, quantity } = req.body;
    const orderedItem = this.orders.find(order => order.id === parseInt(req.params.id, 10));
    const newOrder = this.menus.find(meal => meal.menu.id === parseInt(mealId, 10));
    if (!orderedItem) {
      return res.status(400).json({
        Message: 'This Order has not been made',
      });
    } else if (!newOrder) {
      return res.status(400).json({
        Message: 'Meal selected does not exist',
      });
    }
    orderedItem.menu = newOrder;
    orderedItem.quantity = quantity;
    return res.status(200).json({
      Message: 'Order successfully modified',
      orderedItem,
    });
  }
}

export default OrdersController;
