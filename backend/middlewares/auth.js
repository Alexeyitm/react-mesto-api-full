/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const LoginDataError = require('../errors/login-data-error');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginDataError('Необходима авторизация!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new LoginDataError('Необходима авторизация!');
  }
  req.user = payload;
  next();
  return null;
};
