const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards,
  createCard,
  deleteCardById,
  addLike,
  deleteLike,
} = require('../controllers/cards');
const { regex } = require('../regex');

const CardId = celebrate({
  params: {
    cardId: Joi.string().hex().length(24),
  },
});

router.get('/', getAllCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regex),
  }),
}), createCard);

router.delete('/:cardId', CardId, deleteCardById);

router.put('/:cardId/likes', CardId, addLike);

router.delete('/:cardId/likes', CardId, deleteLike);

module.exports = router;
