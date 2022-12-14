require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, setUser } = require('./controllers/users');
const { validateUser, validateAuth } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(requestLogger);

app.post('/signup', validateUser, setUser);
app.post('/signin', validateAuth, login);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('/*', auth, () => {
  throw new NotFoundError('К сожалению, запрашиваемая страница не найдена.');
});

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
