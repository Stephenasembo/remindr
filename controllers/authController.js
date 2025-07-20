const asyncHandler = require('express-async-handler');
const userServices = require('../services/user');
const { hashInput, verifyHashedInput } = require('../utils/hashUtil');
const { generateToken } = require('../utils/jwtAuth');
const {
  validationRules,
  emailValidationRule,
  validationErrorHandling,
} = require('../middleware/formValidation');
const CustomError = require('../utils/customError');

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
      const passwordMatch = await verifyHashedInput(
        userData.password,
        user.password
      );
      if (!passwordMatch) {
        throw new CustomError(401, 'Invalid Input', 'Wrong password entered.');
      }
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
