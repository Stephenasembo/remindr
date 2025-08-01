const router = require('express').Router();
const controller = require('../controllers/userController');
const { errorHandler } = require('../middleware/errorHandler');

router.post('/recipients', controller.createRecipient);
router.get('/recipients', controller.getRecipients);
router.get('/recipients/:recipientId', controller.getRecipient);

router.use(errorHandler);

module.exports = router;
