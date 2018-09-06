import Validator from 'validatorjs';
import moment from 'moment';
import Sequelize from 'sequelize';
import db from '../models';
import { generatePagination } from '../util/helpers';
import Validations from '../middleware/validations';
import errorMap from '../middleware/errorMap';

const { Op } = Sequelize;

const { Meal, Menu, User } = db;

/**
 * MenusController class declaration
 *
 * @class MenusController
 *
 */
export default class MenusController {
  /**
   * @description - Create new Menu
   *
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  static async setMenu(req, res) {
    try {
      const { mealId, menuDate } = req.body;
      const validation = new Validator(req.body, Validations().menuRules);
      if (validation.passes()) {
        if ((moment(menuDate, 'YYYY-MM-DD', true).isValid())) {
          const userId = req.decoded.id;
          const checkMenu = await Menu.findOne({
            where: {
              userId,
              menuDate
            }
          });
          if (checkMenu) {
            return res.status(409).json({
              message: 'You already have menu for this date'
            });
          }
          const meals = await Meal.findAll({
            where: {
              userId,
              id: {
                [Op.in]: [...mealId]
              }
            }
          });
          const acceptedIds = [];
          meals.map(meal => acceptedIds.push(meal.id));

          if (acceptedIds.length > 0) {
            const menu = await Menu.create({ menuDate, userId });
            await menu.addMeals([...acceptedIds]);

            return res.status(201).json({
              message: 'Meals added to Menu',
              menu,
              meals
            });
          }
          return res.status(400).json({
            message: 'None of the meals belong to caterer'
          });
        }
        return res.status(400).json({
          message: 'The Date must be of format YYYY-MM-DD'
        });
      }
      return res.status(400).json({
        message: errorMap(validation.errors.all())
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error processing request', error
      });
    }
  }

  /**
   * @description - Get the Menu
   *
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  static async getMenu(req, res) {
    try {
      const { menuDate, limit, offset } = req.query;
      if ((moment(menuDate, 'YYYY-MM-DD', true).isValid())) {
        const dateMenu = await Menu.findAndCountAll({
          where: { menuDate },
          include: [
            {
              model: Meal,
              through: { attributes: [] },
            },
            {
              model: User,
              attributes: ['id', 'businessName', 'ownerName']
            },
          ],
          subQuery: false,
          limit: limit || 10,
          offset: offset || 0
        });

        const { count, rows } = dateMenu;
        return res.status(200).json({
          message: 'Menu for this Date',
          paginate: generatePagination(limit, offset, dateMenu),
          dateMenu: rows
        });
      }
      return res.status(400).json({
        message: 'The Date must be of format YYYY-MM-DD'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }
}
