import meals from '../models/meals';

class MealsController {
  constructor(router) {
    this.meals = meals;
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/meals/', this.getMeals.bind(this));
    this.router.post('/meals/', this.addMeal.bind(this));
    this.router.put('/meals/:id', this.modifyMeal.bind(this));
    this.router.delete('/meals/:id', this.removeMeal.bind(this));
  }

  getMeals(req, res) {
    if (this.meals.length < 1) {
      return res.status(200).json({
        message: 'Meals not available now',
      });
    }
    return res.status(200).json(this.meals);
  }

  addMeal(req, res) {
    const id = (this.meals[this.meals.length - 1].id) + 1;
    const price = parseInt(req.body.price, 10);
    const name = req.body.name.trim();
    const image = req.body.image.trim();
    if (!req.body.name) {
      return res.status(400).json({
        Message: 'Name Field should not be Empty',
      });
    } else if (!req.body.price) {
      return res.status(400).json({
        Message: 'Price Field should not be Empty',
      });
    } else if (Number.isNaN(price)) {
      return res.status(400).json({
        Message: 'Enter a Valid Value for Price',
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
      meals,
    });
  }

  modifyMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const price = parseInt(req.body.price, 10);
    const name = req.body.name.trim();
    const image = req.body.image.trim();
    const existingMeal = this.meals.filter(meal => meal.id === id)[0];
    if (!existingMeal) {
      return res.status(404).json({
        Message: 'Meal does not exist',
      });
    }
    existingMeal.name = name;
    existingMeal.price = price;
    existingMeal.image = image;
    return res.status(200).json({
      Message: 'Meal successfully updated',
      existingMeal,
    });
  }

  removeMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const existingMeal = this.meals.filter(meal => meal.id === id)[0];
    if (!existingMeal) {
      return res.status(400).json({
        Message: 'Meal does not exist',
      });
    }
    const newMeal = this.meals.filter(meal => meal.id !== id);
    return res.status(200).json({
      Message: 'Meal deleted successfully',
      newMeal,
    });
  }
}

export default MealsController;
