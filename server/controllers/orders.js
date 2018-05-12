import Validator from 'validatorjs';
import db from '../models/index';
import checkTimeToOrder from '../util/helpers';
import validations from '../middleware/validations';

const { Order, Meal, MenuMeal } = db;

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
      const { mealId, quantity, menuId } = req.body;
      console.log(req.body);
      const validation = new Validator(req.body, validations().orderRules);
      if (validation.passes()) {
        const userId = req.decoded.id;
        const menuMeal = await MenuMeal.findOne({
          where: {
            menuId,
            mealId
          },
          include: [
            {
              model: Meal
            },
          ]
        });

        if (menuMeal) {
          if (!checkTimeToOrder(menuMeal.createdAt)) {
            return res.status(400).json({ message: 'Time to order elapse' });
          }
          const order = await Order.create({
            mealId,
            userId,
            menuId,
            quantity
          });
          order.dataValues.meal = menuMeal.Meal;
          return res.status(201).json({
            message: 'Order placed successfully',
            order,
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
      const orderExist = await Order.findOne({ where: { id: req.params.id } });

      if (orderExist) {
        if (orderExist.userId !== req.decoded.id) {
          return res.status(400).json({ message: 'This Order does not belong to this user' });
        }

        console.log(orderExist.dataValues);
        const {
          mealId = orderExist.dataValues.mealId,
          quantity = orderExist.dataValues.quantity,
          menuId = orderExist.dataValues.menuId
        } = req.body;
        const validation = new Validator({ mealId, quantity, menuId }, validations().orderRules);
        if (!validation.passes()) {
          return res.status(400).json({ message: validation.errors.all() });
        }

        const menuMeal = await MenuMeal.findOne({
          where: {
            menuId,
            mealId
          },
          include: [
            {
              model: Meal
            },
          ]
        });
        if (menuMeal) {
          if (!checkTimeToOrder(menuMeal.createdAt)) {
            return res.status(400).json({ message: 'Time to update order elapse' });
          }
          const modifiedOrder = await orderExist.update({
            mealId,
            menuId,
            quantity
          });
          modifiedOrder.dataValues.meal = menuMeal.Meal;
          return res.status(201).json({
            message: 'Order modified successfully',
            modifiedOrder,
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
      const orders = await Order.findAll({
        include: [
          {
            model: Meal
          },
        ]
      });
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
