import validator from 'validator';
import meals from '../models/meals';
import menus from '../models/menus';

class MenusController {
  constructor(router) {
    this.meals = meals;
    this.menus = menus;
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.setMenu = this.setMenu.bind(this);
    this.getMenu = this.getMenu.bind(this);
  }

  setMenu(req, res) {
    const { menuDate, mealId } = req.body;
    if (!menuDate) {
      return res.status(400).json({
        Message: 'Menu date required'
      });
    } else if (!mealId) {
      return res.status(400).json({
        Message: 'Pick the meal to be added'
      });
    } else if (!validator.isNumeric(mealId)) {
      return res.status(400).json({
        Message: 'Please enter a positive integer'
      });
    }
    const mealMenu = this.menus.find(myMeal => parseInt(myMeal.mealId, 10) === parseInt(mealId, 10));
    const existingMeal = this.meals.find(meal => meal.id === parseInt(mealId, 10));
    if (mealMenu) {
      return res.status(400).json({
        Message: 'Meal already exist in the menu'
      });
    }
    if (existingMeal) {
      const id = (this.menus[this.menus.length - 1].id) + 1;
      const { name, price, image } = existingMeal;
      menus.push({
        id,
        mealId,
        name,
        price,
        image,
        menuDate
      });
      return res.status(200).json({
        Message: 'Meal added to Menu option',
        menus
      });
    }
    return res.status(400).json({ Message: 'Meal not available' });
  }

  getMenu(req, res) {
    if (this.menus.length < 1) {
      return res.status(404).json({
        message: 'No meal found in menu',
      });
    }
    return res.status(200).json({ menus: this.menus });
  }
}

export default new MenusController();
