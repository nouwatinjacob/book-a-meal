import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import Validator from 'validatorjs';
import db from '../models';
import validations from '../middleware/validations';

dotenv.config();

const secret = process.env.SECRET_TOKEN;

const { User } = db;

/**
 * UserController class declaration
 *
 * @class UserController
 *
 */
export default class UserController {
  /**
   * @description - Create new User
   *
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  static async createUser(req, res) {
    try {
      const {
        email, password, userType, password_confirmation,
        firstName, lastName, businessName,
        ownerName, businessAddress
      } = req.body;
      const userDetails = { email, password, userType };
      const customerDetails = { firstName, lastName };
      const catererDetails = { businessName, businessAddress, ownerName };

      if (userType === 'customer') {
        const customerValidation = new Validator(
          { ...customerDetails, ...userDetails, password_confirmation },
          validations().customerValidation
        );
        if (customerValidation.passes()) {
          const foundUser = await User.findOne({ where: { email } });
          if (!foundUser) {
            const newUser = await User.create({
              ...userDetails,
              ...customerDetails
            });

            const user = lodash.pick(newUser, ['id', 'email', 'userType', 'firstName', 'lastName']);
            const token = jwt.sign(user, secret, { expiresIn: 86400 });
            return res.status(201).json({
              message: 'Registration Successful',
              user,
              token
            });
          }
          return res.status(409).json({
            message: 'email or password already exists'
          });
        }
        return res.status(400).json({ message: customerValidation.errors.all() });
      } else if (userType === 'caterer') {
        const catererValidation = new Validator(
          { ...catererDetails, ...userDetails, password_confirmation },
          validations().catererValidation
        );
        if (catererValidation.passes()) {
          const foundUser = await User.findOne({ where: { email } });
          if (!foundUser) {
            const newUser = await User.create({
              ...userDetails,
              ...catererDetails
            });
            const user = lodash.pick(newUser, ['id', 'email', 'userType',
              'businessName', 'businessAddress', 'ownerName']);
            const token = jwt.sign(user, secret, { expiresIn: 86400 });
            return res.status(201).json({
              message: 'Registration Successful',
              user,
              token
            });
          }
          return res.status(409).json({
            message: 'email or password already exists'
          });
        }
        return res.status(400).json({ message: catererValidation.errors.all() });
      }
      return res.status(400).json({ message: 'Request type must be customer or caterer' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error: error.toString()
      });
    }
  }

  /**
   * @description - Log in user and validate user request
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  static async userSignin(req, res) {
    try {
      const { email, password } = req.body;
      const validation = new Validator(req.body, validations().signinRules);
      if (validation.passes()) {
        const userExist = await User.findOne({ where: { email } });
        if (userExist) {
          const verifyPassword = userExist.comparePassword(userExist, password);
          if (!verifyPassword) {
            return res.status(400).json({ message: 'Invalid login credentials' });
          }
          const user = lodash.pick(userExist, ['id', 'email', 'userType']);
          const token = jwt.sign(user, secret);
          return res.status(200).json({
            message: 'Log in successful',
            token,
            user
          });
        }
        return res.status(404).json({ message: 'Invalid credentials' });
      }
      return res.status(400).json({ message: validation.errors.all() });
    } catch (error) {
      return res.status(400).json({ message: 'Error processing request', error: error.toString() });
    }
  }
}
