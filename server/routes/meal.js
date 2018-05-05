// import MealsController from '../controllers/meals';

const mealRoutes = (router) => {
  router.route('/menu')
    .get((req, res) => res.status(200).json({
      message: 'Welcome menu!',
    }));
};

export default mealRoutes;
