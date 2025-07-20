const router = require('express').Router();
const controller = require('../controllers/authController');
const { errorHandler } = require('../middleware/errorHandler');

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);

router.use(errorHandler);

module.exports = router;
