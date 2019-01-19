import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user';
import { CustomError, handleException } from '../util/CustomError';

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error(error.message);
  }
};

const removePasswordFromUser = (user) => {
  const { password, ...rest } = user;
  return rest;
};

const signToken = (user) => {
  const { SECRET_KEY } = process.env;
  // Check that SALT and SECRET is available
  if (!SECRET_KEY) {
    throw new Error('Secret key is not present.');
  }
  // Create web token
  return jwt.sign(removePasswordFromUser(user.toObject()), SECRET_KEY, {
    expiresIn: '1h'
  });
};

export default class {
  static async create(req, res) {
    try {
      // Create username
      const { username } = req.body;
      const hashedPassword = await hashPassword(req.body.password);
      const user = new User({ username, password: hashedPassword });

      await user.save();
      const token = signToken(user);

      return res.status(201).json({
        message: 'New user created',
        data: { token }
      });
    } catch (error) {
      return handleException(res, error);
    }
  }

  static signin = async (req, res) => {
    try {
      // Find user from db
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new CustomError(404, { signin: ['User does not exist.'] });
      }
      const token = signToken(user);

      return res.status(200).json({ data: { token } });
    } catch (error) {
      return handleException(res, error);
    }
  };
}
