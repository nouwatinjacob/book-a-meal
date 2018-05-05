import usersController from '../controllers/users';

const userRoutes = (router) => {
  router.route('/auth/signup')
    .post(usersController.createUser);
};

export default userRoutes;
