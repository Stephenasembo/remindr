const router = require('express').Router();
const controller = require('../controllers/userController');
const { errorHandler } = require('../middleware/errorHandler');
const authorizeUser = require('../middleware/authorizeUser');
const { checkRecipientOwnership } = require('../middleware/ownerShipCheck');

router.use(authorizeUser);
router.get('/reminders', controller.getUserReminders);
router.post('/recipients', controller.createRecipient);
router.get('/recipients', controller.getRecipients);
router.get(
  '/recipients/:recipientId',
  checkRecipientOwnership,
  controller.getRecipient
);
router.put(
  '/recipients/:recipientId',
  checkRecipientOwnership,
  controller.updateRecipient
);
router.delete(
  '/recipients/:recipientId',
  checkRecipientOwnership,
  controller.deleteRecipient
);
router.delete('/recipients', controller.deleteRecipients);
router.delete('/reminders', controller.deleteUserReminders);

router.use(errorHandler);

module.exports = router;
