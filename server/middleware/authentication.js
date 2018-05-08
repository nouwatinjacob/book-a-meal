import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.config();
const secret = process.env.SECRET_TOKEN;
const { User } = db;

export default class Auth {
  static verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: 'Invalid authorization token' });
        }
        User.findById(decoded.id)
          .then((user) => {
            if (!user) {
              return res.status(400).json({ message: 'This user does not exist' });
            }
            req.decoded = decoded;
            return next();
          })
          .catch(err => res.status(404).json(err));
      });
    } else {
      res.status(403).json({
        message: 'Token not provided'
      });
    }
  }

  static async verifyUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        req.user = user;
        return next();
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(400).json({ message: 'Error processing request', error });
    }
  }

  static isCaterer(req, res, next) {
    if (req.decoded && req.decoded.userType === 'caterer') return next();
    return res.status(403).send({
      message: 'You must be caterer to perform this operation'
    });
  }

  static isCustomer(req, res, next) {
    if (req.decoded && req.decoded.userType === 'customer') return next();
    return res.status(403).send({ message: 'You must be registered to perform this operation' });
  }
}
