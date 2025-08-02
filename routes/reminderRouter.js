const router = require('express').Router();
const controller = require('../controllers/reminderController');
const { errorHandler } = require('../middleware/errorHandler');
const authorizeUser = require('../middleware/authorizeUser');

router.use(authorizeUser);
router.post('/', controller.createReminder);
router.get('/:reminderId', controller.getReminder);
router.put('/:reminderId', controller.updateReminder);
router.delete('/:reminderId', controller.deleteReminder);
router.use(errorHandler);

module.exports = router;
