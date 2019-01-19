import validate from 'validate.js';
import { signUpConstraints } from './userConstraints';

export default (req, res, next) => {
  const {
    firstName, lastName, username, password
  } = req.body;
  const validationError = validate({
    firstName, lastName, username, password
  }, signUpConstraints);

  if (validationError) {
    return res.status(401).json({ error: { signup: validationError } });
  }
  return next();
};
