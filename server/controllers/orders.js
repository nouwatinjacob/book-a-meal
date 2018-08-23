import Validator from 'validatorjs';
import Sequelize from 'sequelize';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import db from '../models/index';
import { checkTimeToOrder, checkTimeToModifyOrder } from '../util/helpers';
import validations from '../middleware/validations';

const { Order, Meal, MenuMeal, User } = db;

/**
 * OrdersContoller class declaration
 *
 * @class OrdersContoller
 *
 */
export default class OrdersContoller {
  /**
   * @description - Make order
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  static async makeOrder(req, res) {
    try {
      const { mealId, quantity, menuId } = req.body;
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
          if (userId === menuMeal.Meal.userId) {
            return res.status(400).json({
              message: 'You cant order your meal'
            });
          }
          if (checkTimeToOrder()) {
            return res.status(400).json({ message: 'Time to order elapse' });
          }
          const order = await Order.create({
            orderId: uuidv1(),
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
        return res.status(404).json({
          message: 'This meal is not on this menu'
        });
      }
      return res.status(400).json({ message: validation.errors.all() });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  /**
   * @description - Modify Order
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  static async modifyOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id, 10);
      if (!(Number.isInteger(orderId)) && (Number.isNaN(orderId))) {
        return res.status(400).json({
          message: 'Provide valid order id'
        });
      }
      const orderExist = await Order.findOne({ where: { id: orderId } });

      if (orderExist) {
        if (orderExist.userId !== req.decoded.id) {
          return res.status(400).json({
            message: 'This Order does not belong to this user'
          });
        }

        const {
          mealId = orderExist.dataValues.mealId,
          quantity = orderExist.dataValues.quantity,
          menuId = orderExist.dataValues.menuId
        } = req.body;
        const validation = new Validator({
          mealId, quantity, menuId
        }, validations().orderRules);
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
          if (!checkTimeToModifyOrder(menuMeal.createdAt)) {
            return res.status(400).json({
              message: 'Time to update order elapse'
            });
          }
          const modifiedOrder = await orderExist.update({
            mealId,
            menuId,
            quantity
          });
          modifiedOrder.dataValues.meal = menuMeal.Meal;
          return res.status(200).json({
            message: 'Order modified successfully',
            modifiedOrder,
          });
        }
        return res.status(404).json({
          message: 'This meal is not on this menu'
        });
      }
      return res.status(404).json({ message: 'Order not found' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  /**
   * @description - Get all the caterer orders
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  static async getCatererOrder(req, res) {
    try {
      const { orderDate } = req.query;
      const startDate = moment(orderDate).format();
      const endDate = moment(orderDate).clone().add(24, 'hour').format();
      const userId = req.decoded.id;
      const Op = Sequelize.Op;
      const queryBuilder = {
        where: {
          createdAt: { [Op.gt]: startDate, [Op.lte]: endDate }
        },
        include: [
          {
            model: Meal,
            where: { userId }
          },
          {
            model: User,
          },
        ],
      };
      const orders = await Order.findAll(queryBuilder);
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

  /**
   * @description - Get all the orders of a Customer
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  static async getCustomerOrders(req, res) {
    try {
      const userId = req.decoded.id;
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: Meal
          },
        ]
      });
      return res.status(200).json({
        message: 'Orders gotten successfully',
        orders
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  /**
   * @description - Get all the orders of a Customer
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  static async getAnOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id, 10);
      if (!(Number.isInteger(orderId)) && (Number.isNaN(orderId))) {
        return res.status(400).json({
          message: 'Provide valid order id'
        });
      }
      const order = await Order.findOne({
        where: { id: orderId },
        include: [
          {
            model: Meal,
          },
          {
            model: User,
          },
        ]
      });
      if (order) {
        return res.status(200).json({
          message: 'Order details',
          order
        });
      }
      return res.status(404).json({ message: 'Order not found' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  /**
   * @description - Cancel/Delete an order of a Customer
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  static async cancelOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id, 10);
      if (!(Number.isInteger(orderId))) {
        return res.status(400).json({
          message: 'Provide valid order id'
        });
      }
      const order = await Order.findById(orderId);
      if (order) {
        if (!checkTimeToModifyOrder(order.createdAt)) {
          return res.status(400).json({
            message: 'Time elapse for order to be canceled'
          });
        }
        if (order.userId !== req.decoded.id) {
          return res.status(400).json({
            message: 'This Order does not belong to you'
          });
        }
        await order.destroy();
        return res.status(200).json({
          message: 'Order cancelled succesfully'
        });
      }
      return res.status(404).json({ message: 'Order not found' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }
}
