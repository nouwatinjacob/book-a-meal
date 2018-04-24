import meals from '../models/meals';

class MenusController {
  constructor(router) {
    this.meals = meals;
    this.menus = [];
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/menu/', this.setMenu.bind(this));
  }

  setMenu(req, res) {
    const { menuDate, mealId } = req.body;
    const menu = this.meals.find(meal => meal.id === parseInt(mealId, 10));
    if (menu) {
      return res.status(200).json({
        Message: 'Meal added to Menu option ',
        menu,
        menuDate
      });
    }
    return res.status(400).json({ message: 'You can only set menu from already created meal' });
  }
}

export default MenusController;
