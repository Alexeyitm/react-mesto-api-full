const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllUsers,
  getMe,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { regex } = require('../regex');

router.get('/', getAllUsers);

router.get('/me', getMe);

router.get('/:userId', celebrate({
  params: {
    userId: Joi.string().hex().length(24),
  },
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regex),
  }),
}), updateAvatar);

module.exports = router;
