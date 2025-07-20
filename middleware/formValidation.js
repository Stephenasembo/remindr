const { validationResult, body } = require('express-validator');
const CustomError = require('../utils/customError');

const validationRules = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username can not be empty')
    .isAlphanumeric()
    .withMessage('Please use numbers and letters only.'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password can not be empty')
    .isAlphanumeric()
    .withMessage('Please use numbers and letters only.'),
];

const emailValidationRule = () =>
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email can not be empty')
    .isEmail()
    .withMessage('Enter valid email address such as: johndoe@gmail.com');

const validationErrorHandling = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array();
    throw new CustomError(400, 'Input Validation Error', error[0].msg);
  }
};

module.exports = {
  validationRules,
  emailValidationRule,
  validationErrorHandling,
};
