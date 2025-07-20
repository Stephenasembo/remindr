const asyncHandler = require('express-async-handler');
const userServices = require('../services/user');
const { hashInput } = require('../utils/hashUtil');
const { generateToken } = require('../utils/jwtAuth');
const {
  validationRules,
  emailValidationRule,
  validationErrorHandling,
} = require('../middleware/formValidation');

module.exports = {
  registerUser: [
    ...validationRules,
    emailValidationRule(),
    asyncHandler(async (req, res) => {
      validationErrorHandling(req);
      const userData = req.body;
      const hashedPassword = await hashInput(userData.password);
      const user = await userServices.createUser({
        ...userData,
        password: hashedPassword,
      });
      delete user.password;
      const token = generateToken(user);
      res.status(200).json({
        data: user,
        jwt: token,
        message: 'User created successfully.',
      });
    }),
  ],

  loginUser: [
    ...validationRules,
    asyncHandler(async (req, res) => {
      validationErrorHandling(req);
      const userData = req.body;
      const user = await userServices.findUser(null, userData.username);
      delete user.password;
      const token = generateToken(user);
      res.status(200).json({
        data: user,
        jwt: token,
        message: 'Logged in successfully.',
      });
    }),
  ],
};
