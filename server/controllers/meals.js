import dotenv from 'dotenv';
import Validator from 'validatorjs';
import db from '../models';
import validations from '../middleware/validations';
import { generatePagination } from '../util/helpers';

dotenv.config();


const { Meal, User } = db;


/**
 * Class implementation for /api/v1/meals routes
 * @class UserController
 */
export default class MealsController {
  /**
   * @description - Create new Meal
   *
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  static async addMeal(req, res) {
    try {
      const validation = new Validator(
        req.body,
        validations().mealRules
      );
      if (validation.passes()) {
        const price = parseInt(req.body.price, 10);
        const name = req.body.name.trim();
        const image = req.file ? req.file.secure_url : req.body.image;
        const user = await User.findById(req.decoded.id);
        if (user) {
          const foundMeal = await Meal.findOne({
            where: { name, userId: req.decoded.id }
          });
          if (!foundMeal) {
            const meal = {
              name, price, image, userId: req.decoded.id
            };
            const newMeal = await Meal.create(meal);
            return res.status(201).json({
              message: 'Meal Created Successfully',
              newMeal
            });
          }
          return res.status(400).json({
            message: 'You have this meal already, please edit it'
          });
        }
        return res.status(400).json({
          message: 'Please log in to create a meal'
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
   * @description - Modify meal
   *
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  static async modifyMeal(req, res) {
    try {
      const validation =
      new Validator(req.body, validations().updateMealRules);
      if (validation.passes()) {
        const mealId = parseInt(req.params.id, 10);
        if (!(Number.isInteger(mealId)) && (Number.isNaN(mealId))) {
          return res.status(400).json({
            message: 'Provide valid meal id'
          });
        }
        const mealExist = await Meal.findById(mealId);
        if (mealExist) {
          if (req.decoded.id !== mealExist.userId) {
            return res.status(400).json({
              message: 'You have no access to edit this recipe'
            });
          }
          const meal = await mealExist.update({
            name: req.body.name ? req.body.name.trim() : mealExist.name,
            price: req.body.price ?
              parseInt(req.body.price, 10) : mealExist.price,
            image: req.file ? req.file.secure_url : mealExist.image
          });
          return res.status(200).json({
            message: 'Meal successfully updated',
            meal
          });
        }
        return res.status(400).send({ message: 'Meal Not Found' });
      }
      return res.status(400).json({ message: validation.errors.all() });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  /**
   * @description - Get all meals belonging to a Caterer
   *
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  static async getMeals(req, res) {
    try {
      const { limit, offset } = req.query;
      const meals = await Meal.findAndCountAll({
        where: { userId: req.decoded.id },
        limit: limit || 10,
        offset: offset || 0
      });
      if (meals.length < 1) {
        return res.status(400).json({ message: 'No meal found' });
      }
      return res.status(200).json({
        message: 'All meals displayed',
        paginate: generatePagination(limit, offset, meals),
        meals: meals.rows
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  /**
   * @description - Get a particular meal
   *
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  static async getAMeal(req, res) {
    const mealId = parseInt(req.params.id, 10);
    if (!(Number.isInteger(mealId)) && (Number.isNaN(mealId))) {
      return res.status(400).json({
        message: 'Provide valid meal id'
      });
    }
    const meal = await Meal.findById(mealId);
    return res.status(200).json({
      message: 'Meal Details',
      meal
    });
  }

  /**
   * @description - Delete a meal
   *
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  static async deleteMeal(req, res) {
    try {
      const mealId = parseInt(req.params.id, 10);
      if (!(Number.isInteger(mealId)) && (Number.isNaN(mealId))) {
        return res.status(400).json({
          message: 'Provide valid meal id'
        });
      }
      const meal = await Meal.findById(mealId);
      if (meal) {
        if (req.decoded.id !== meal.userId) {
          return res.status(400).json({
            message: 'You have no access to edit this meal'
          });
        }
        await meal.destroy({
          force: false,
          cascade: true
        });
        // await meal.destroy();
        return res.status(200).json({
          message: 'Meal successfully deleted'
        });
      }
      return res.status(400).json({ message: 'Meal not found' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }
}
