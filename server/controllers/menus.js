import Validator from 'validatorjs';
import moment from 'moment';
import db from '../models/index';

const { Meal, User, Menu } = db;

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
        const meal = await Meal.findOne({ where: { id: mealId } });
        if (meal) {
          if ((moment(menuDate, 'MM/DD/YYYY', true).isValid())) {
            await Menu.create({ mealId, menuDate });
            return res.status(201).json({
              message: 'Meal added to Menu',
              meal,
              menuDate
            });
          }
          return res.status(400).json({ message: 'The Date must be of format MM/DD/YYYY' });
        }
        return res.status(400).json({ message: 'Meal Not Found' });
      }
      return res.status(400).json({ message: validation.errors.all() });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }
}
