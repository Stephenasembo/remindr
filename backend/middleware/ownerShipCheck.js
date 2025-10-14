const asyncHandler = require('express-async-handler');
const reminderService = require('../services/reminder');
const recipientService = require('../services/recipient');

const checkReminderOwnership = asyncHandler(async (req, res, next) => {
  const { reminderId } = req.params;
  const reminder = await reminderService.getReminder(reminderId);
  if (reminder.senderId !== req.user.id) {
    return res.status(403).json({
      message: 'Unathorized access.',
    });
  }
  return next();
});

const checkRecipientOwnership = asyncHandler(async (req, res, next) => {
  const { recipientId } = req.params;
  const recipient = await recipientService.getRecipient(recipientId);
  if (recipient.userId !== req.user.id) {
    return res.status(403).json({
      message: 'Unathorized access.',
    });
  }
  return next();
});

module.exports = {
  checkReminderOwnership,
  checkRecipientOwnership,
};
