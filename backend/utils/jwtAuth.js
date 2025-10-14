require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('./customError');

const secret = process.env.SECRET;

function generateToken(user) {
  try {
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1d' });
    return token;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw CustomError(
      500,
      'Intenal Error',
      'Authentication token generation error occured'
    );
  }
}

module.exports = {
  generateToken,
};
