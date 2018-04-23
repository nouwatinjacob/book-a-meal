
const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).json({
      message: 'Welcome to the More Book-A-Meal API!',
    }));
};

export default routes;
