import Validator from 'validatorjs';
import moment from 'moment';
import Sequelize from 'sequelize';
import db from '../models/index';
import validations from '../middleware/validations';

const { Op } = Sequelize;

const { Meal, Menu } = db;

export default class MenusController {
  /**
   * @description - Caterer set menu for a day
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  static async setMenu(req, res) {
    try {
      const { mealId, menuDate } = req.body;
      const validation = new Validator(req.body, validations().menuRules);
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
            return res.status(400).json({ message: 'You already have menu for this date' });
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

          const menu = await Menu.create({ menuDate, userId });
          const menuMeal = await menu.addMeals([...acceptedIds]);

          return res.status(201).json({
            message: 'Meal added to Menu',
            meals
          });
        }
        return res.status(400).json({ message: 'The Date must be of format YYYY-MM-DD' });
      }
      return res.status(400).json({ message: validation.errors.all() });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error
      });
    }
  }

  static async getMenu(req, res) {
    try {
      const menuDate = req.query.date;
      if ((moment(menuDate, 'YYYY-MM-DD', true).isValid())) {
        const dateMenu = await Menu.findAll({
          where: { menuDate },
          include: [{
            model: Meal,
            through: { attributes: [] }
          }] });
        return res.status(200).json({
          message: 'Menu for this Date',
          dateMenu
        });
      }
      return res.status(400).json({ message: 'The Date must be of format YYYY-MM-DD' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }
}
