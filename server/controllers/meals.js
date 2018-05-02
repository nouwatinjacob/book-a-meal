import validator from 'validator';
import meals from '../models/meals';

class MealsController {
  constructor(router) {
    this.meals = meals;
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.getMeals = this.getMeals.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.modifyMeal = this.modifyMeal.bind(this);
    this.removeMeal = this.removeMeal.bind(this);
  }

  getMeals(req, res) {
    if (this.meals.length < 1) {
      return res.status(200).json({
        message: 'Meals not available now',
      });
    }
    return res.status(200).json({
      Message: 'All meals',
      Meals: this.meals
    });
  }

  addMeal(req, res) {
    const id = (this.meals[this.meals.length - 1].id) + 1;
    const price = parseInt(req.body.price, 10);
    const name = req.body.name ? req.body.name.trim() : req.body.name;
    const image = req.body.image ? req.body.image.trim() : req.body.name;
    if (!name) {
      return res.status(400).json({
        Message: 'Name Field should not be Empty',
      });
    } else if (!req.body.price) {
      return res.status(400).json({
        Message: 'Price Field should not be Empty',
      });
    } else if (!req.body.image) {
      return res.status(400).json({
        Message: 'Image Field should not be Empty',
      });
    } else if (Number.isNaN(price)) {
      return res.status(400).json({
        Message: 'Enter a Valid Value for Price',
      });
    } else if (validator.isNumeric(name)) {
      return res.status(400).json({
        Message: 'Name field can only be alphabetical',
      });
    }
    const mealExist = this.meals.find(meal => meal.name === name);
    if (mealExist) {
      return res.status(400).json({
        Message: 'This meal already exist'
      });
    }
    meals.push({
      id,
      name,
      price,
      image,
    });
    return res.status(201).json({
      Message: 'Meal successfully created',
      addedMeal: {
        id, name, price, image
      }
    });
  }

  modifyMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const existingMeal = this.meals.find(meal => meal.id === id);
    const price = !req.body.price ? existingMeal.price : parseInt(req.body.price, 10);
    const name = !req.body.name ? existingMeal.name : req.body.name.trim();
    const image = !req.body.image ? existingMeal.image : req.body.image.trim();
    if (!existingMeal) {
      return res.status(400).json({
        Message: 'Meal does not exist',
      });
    } else if (Number.isNaN(price)) {
      return res.status(400).json({
        Message: 'Enter a Valid Value for Price',
      });
    } else if (validator.isNumeric(name)) {
      return res.status(400).json({
        Message: 'Name field can only be alphabetical',
      });
    }
    existingMeal.name = name;
    existingMeal.price = price;
    existingMeal.image = image;
    return res.status(200).json({
      Message: 'Meal successfully updated',
      updatedMeal: existingMeal,
    });
  }

  removeMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const existingMeal = this.meals.find(meal => meal.id === id);
    if (!existingMeal) {
      return res.status(400).json({
        Message: 'Meal not available',
      });
    }
    const remainingMeals = this.meals.filter(meal => meal.id !== id);
    return res.status(200).json({
      Message: 'Meal deleted successfully',
      meals: remainingMeals,
    });
  }
}

export default new MealsController();
