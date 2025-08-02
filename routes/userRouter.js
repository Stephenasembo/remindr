const router = require('express').Router();
const controller = require('../controllers/userController');
const { errorHandler } = require('../middleware/errorHandler');
const authorizeUser = require('../middleware/authorizeUser');

router.use(authorizeUser);
router.get('/reminders', controller.getUserReminders);
router.post('/recipients', controller.createRecipient);
router.get('/recipients', controller.getRecipients);
router.get('/recipients/:recipientId', controller.getRecipient);
router.put('/recipients/:recipientId', controller.updateRecipient);
router.delete('/recipients/:recipientId', controller.deleteRecipient);
router.delete('/recipients', controller.deleteRecipients);

router.use(errorHandler);

module.exports = router;
