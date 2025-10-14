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

const reminderValidation = [
  body('title').trim().notEmpty().withMessage('Title can not be empty'),

  body('content')
    .optional({ falsy: true })
    .isString()
    .withMessage('Content must be a string.'),

  body('dueDate')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Due date must be in the future.');
      }
      return true;
    }),

  body('interval')
    .optional({ falsy: true })
    .isString()
    .withMessage('Interval must be a string.'),

  body('recurring')
    .optional()
    .isBoolean()
    .withMessage('Recurring must be true or false'),

  body('isDue')
    .optional()
    .isBoolean()
    .withMessage('isDue must be true or false'),
];

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
  reminderValidation,
};
