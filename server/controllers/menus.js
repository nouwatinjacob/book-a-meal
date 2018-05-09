import Validator from 'validatorjs';
import moment from 'moment';
import db from '../models/index';

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
      const validation = new Validator(req.body, Menu.menuRules());
      if (validation.passes()) {
        if ((moment(menuDate, 'MM/DD/YYYY', true).isValid())) {
          const menu = await Menu.create({ menuDate });
          const menuMeal = await menu.addMeals([...mealId]);

          return res.status(201).json({
            message: 'Meal added to Menu',
            menuMeal
          });
        }
        return res.status(400).json({ message: 'The Date must be of format MM/DD/YYYY' });
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
      if ((moment(menuDate, 'MM/DD/YYYY', true).isValid())) {
        const dateMenu = await Menu.findAll({
          where: { menuDate },
          include: [{
            model: Meal,
            attribute: 'id',
            as: 'meals'
          }] });
        return res.status(200).json({
          message: 'Menu for this Date',
          dateMenu
        });
      }
      return res.status(400).json({ message: 'The Date must be of format MM/DD/YYYY' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }
}
