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
  }

  getMeals(req, res) {
    if (this.meals.length < 1) {
      return res.status(404).json({
        message: 'No meals found',
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
    return res.status(201).json({ meals });
  }
}

export default MealsController;
