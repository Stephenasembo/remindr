require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('App is live');
});

app.post('/', (req, res) => {
  res.status(200).json({ data: req.body.data });
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use('/', (req, res) => {
  res.status(404).json({ error: 'Page does not exist.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port: ${PORT}`);
});

module.exports = app;
