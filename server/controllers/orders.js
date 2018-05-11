import Validator from 'validatorjs';
import db from '../models/index';
import validations from '../middleware/validations';

const { Order, Meal, Menu } = db;

export default class OrdersContoller {
  /**
   * @description - Make order
   *
   * @param { object } request
   * @param { object } response
   *
   * @returns { object } object
   */
  static async makeOrder(req, res) {
    try {
      const { mealId, quantity } = req.body;
      console.log(req.body);
      const validation = new Validator(req.body, validations().orderRules);
      if (validation.passes()) {
        const userId = req.decoded.id;
        const meal = await Meal.findOne({
          where: { id: mealId },
          include: [
            {
              model: Menu,
              through: { attributes: [] }
            },
          ]
        });
        if (meal) {
          const order = await Order.create({
            mealId,
            userId,
            quantity
          });
          return res.status(201).json({
            message: 'Order placed successfully',
            order,
            meal
          });
        }
        return res.status(400).json({ message: 'This meal is not on this menu' });
      }
      return res.status(400).json({ message: validation.errors.all() });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  static async modifyOrder(req, res) {
    try {
      const { mealId, quantity } = req.body;
      const orderExist = await Order.findOne({ where: { id: req.params.id } });
      const validation = new Validator(req.body, validations().orderRules);
      if (!validation.passes()) {
        return res.status(400).json({ message: validation.errors.all() });
      }
      if (orderExist) {
        if (orderExist.userId !== req.decoded.id) {
          return res.status(400).json({ message: 'This Order does not belong to this user' });
        }
        const meal = await Meal.findOne({
          where: { id: mealId },
          include: [
            {
              model: Menu,
              through: { attributes: [] }
            },
          ]
        });
        if (meal) {
          const modifiedOrder = await orderExist.update({
            mealId: mealId || orderExist.mealId,
            quantity: quantity || orderExist.quantity,
            userId: orderExist.userId
          });
          return res.status(201).json({
            message: 'Order modified successfully',
            modifiedOrder,
            meal
          });
        }
        return res.status(400).json({ message: 'This meal is not on this menu' });
      }
      return res.status(400).json({ message: 'Order does not exist' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  static async getOrder(req, res) {
    try {
      const orders = await Order.findAll();
      return res.status(200).json({
        message: 'All Orders',
        orders
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }
}
