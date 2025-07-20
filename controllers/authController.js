const userServices = require('../services/user');
const passwordUtil = require('../utils/passwordUtil');
const asyncHandler = require('express-async-handler');

module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    const userData = req.body;
    const hashedPassword = await passwordUtil.hashPassword(userData.password);
    const user = await userServices.createUser({
      ...userData,
      password: hashedPassword,
    });
    delete user.password;
    res.status(200).json({
      data: user,
      message: 'User created successfully.',
    });
  }),
  loginUser: async (req, res, next) => {
    const userData = req.body;
    res.status(200).json(userData);
  },
};
