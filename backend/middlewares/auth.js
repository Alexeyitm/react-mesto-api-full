/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const LoginDataError = require('../errors/login-data-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new LoginDataError('Необходима авторизация!');
  }
  const token = req.cookies.jwt;
  console.log(JWT_SECRET);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new LoginDataError('Необходима авторизация!');
  }
  req.user = payload;
  next();
  return null;
};
