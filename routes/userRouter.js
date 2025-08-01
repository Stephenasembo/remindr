const router = require('express').Router();
const controller = require('../controllers/userController');
const { errorHandler } = require('../middleware/errorHandler');

router.post('/recipients', controller.createRecipient);

router.use(errorHandler);

module.exports = router;
