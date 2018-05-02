import validator from 'validator';
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
    this.makeOrder = this.makeOrder.bind(this);
    this.makeOrder = this.makeOrder.bind(this);
    this.modifyOrder = this.modifyOrder.bind(this);
  }

  makeOrder(req, res) {
    const { mealId, quantity } = req.body;
    if (!validator.isNumeric(mealId)) {
      return res.status(400).json({
        Message: 'Enter a valid '
      });
    } else if (!validator.isNumeric(quantity)) {
      return res.status(400).json({
        Message: 'Enter positive integer'
      });
    } else if (!quantity) {
      return res.status(400).json({
        Message: 'Specify the quatity of your order'
      });
    } else if (!mealId) {
      return res.status(400).json({
        Message: 'Enter valid meal id'
      });
    }
    const orderId = (this.orders[this.orders.length - 1].id) + 1;
    const orderedMeal = this.menus.find(meal => parseInt(meal.mealId, 10) === parseInt(mealId, 10));
    const mealExists = this.orders.find(meal => parseInt(meal.orderedMeal.mealId, 10) === parseInt(mealId, 10));
    if (mealExists) {
      return res.status(409).json({
        Message: 'You have this meal orderd already'
      });
    } else if (orderedMeal) {
      this.orders.push({
        id: orderId,
        orderedMeal,
        quantity
      });
      return res.status(200).json({
        Message: 'Meal added to your order',
        orderId,
        orderedMeal,
        quantity
      });
    }
    return res.status(400).json({ Message: 'Meal not available' });
  }

  getAllOrders(req, res) {
    if (this.orders.length < 1) {
      return res.status(404).json({
        message: 'No orders found',
      });
    }
    return res.status(200).json({ orders: this.orders });
  }

  modifyOrder(req, res) {
    const orderedItem = this.orders.find(order => order.id === parseInt(req.params.id, 10));
    console.log(orderedItem, '=======');
    // const mealId = req.body.mealId;
    const mealId = req.body.mealId ? req.body.mealId : orderedItem.orderedMeal.id;
    console.log(mealId, '<<<<<<');
    const quantity = req.body.quantity ? req.body.quantity : orderedItem.orderedMeal.quantity;
    const newOrder = this.menus.find(meal => meal.mealId === parseInt(mealId, 10));
    console.log(newOrder);
    if (!orderedItem) {
      return res.status(400).json({
        Message: 'This Order does not exist',
      });
    }
    orderedItem.orderedMeal = newOrder;
    orderedItem.quantity = quantity;
    return res.status(200).json({
      Message: 'Order successfully modified',
      orderedItem
    });
  }
}

export default new OrdersController();
