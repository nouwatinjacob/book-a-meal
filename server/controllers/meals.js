class MealsController {
  constructor(router) {
    this.meals = [];
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/meals/', this.getMeals.bind(this));
  }

  getMeals(req, res) {
    if (this.meals.length < 1) {
      return res.status(404).json({
        message: 'No meals found',
      });
    }
    return res.status(200).send(this.meals);
  }
}

export default MealsController;
