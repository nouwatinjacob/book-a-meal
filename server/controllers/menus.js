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
    this.router.post('/menu/', this.setMenu.bind(this));
    this.router.get('/menu/', this.getMenu.bind(this));
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

  getMenu(req, res) {
    const menuDate = '12-04-2018';
    const dateMenus = this.menus.filter(menu => menu.menuDate === menuDate);
    if (!dateMenus) {
      return res.status(404).json({ message: 'You have not set menu for this date' });
    }
    return res.status(200).json({ menus: dateMenus });
  }
}

export default MenusController;
