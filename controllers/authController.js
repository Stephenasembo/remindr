const asyncHandler = require('express-async-handler');
const userServices = require('../services/user');
const passwordUtil = require('../utils/passwordUtil');
const { generateToken } = require('../utils/jwtAuth');

module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    const userData = req.body;
    const hashedPassword = await passwordUtil.hashPassword(userData.password);
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
  loginUser: async (req, res, next) => {
    const userData = req.body;
    res.status(200).json(userData);
  },
};
