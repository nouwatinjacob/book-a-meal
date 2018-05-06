import Validator from 'validatorjs';
import db from '../models';

const { Meal, User } = db;

/**
 * Class implementation for /api/v1/meals routes
 * @class UserController
 */
export default class MealsController {
  /**
   * @description - Create new Meal
   *
   * @param  { object } req
   * @param  { object } res
   *
   *
   * @results  { object } object
   */
  static async addMeal(req, res) {
    try {
      const price = parseInt(req.body.price, 10);
      const name = req.body.name ? req.body.name.trim() : req.body.name;
      const image = req.body.image ? req.body.image.trim() : req.body.name;
      const validation = new Validator(req.body, Meal.mealRules());
      if (validation.passes()) {
        const user = await User.findById(req.decoded.id);
        if (user) {
          const foundMeal = await Meal.findOne({ where: { name } });
          if (!foundMeal) {
            const meal = { name, price, image, userId: req.decoded.id };
            const newMeal = await Meal.create(meal);
            return res.status(201).json({
              message: 'Meal Created Successfully',
              newMeal
            });
          }
          return res.status(400).json({ message: 'You have this meal already, please edit it' });
        }
        return res.status(404).json({ message: 'Please log in to create a meal' });
      }
      return res.status(400).json({ message: validation.errors.all() });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error
      });
    }
  }
}
