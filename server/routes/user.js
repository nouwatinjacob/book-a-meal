import usersController from '../controllers/users';

const userRoutes = (router) => {
  router.route('/auth/signup')
    .post(usersController.createUser);
  router.route('/auth/login')
    .post(usersController.userSignin);
};

export default userRoutes;
