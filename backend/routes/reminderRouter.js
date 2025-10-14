const router = require('express').Router();
const controller = require('../controllers/reminderController');
const { errorHandler } = require('../middleware/errorHandler');
const authorizeUser = require('../middleware/authorizeUser');
const { checkReminderOwnership } = require('../middleware/ownerShipCheck');

router.use(authorizeUser);
router.post('/', controller.createReminder);
router.get('/:reminderId', checkReminderOwnership, controller.getReminder);
router.put('/:reminderId', checkReminderOwnership, controller.updateReminder);
router.delete(
  '/:reminderId',
  checkReminderOwnership,
  controller.deleteReminder
);
router.use(errorHandler);

module.exports = router;
