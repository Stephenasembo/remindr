const asyncHandler = require('express-async-handler');
const reminderService = require('../services/reminder');
const {
  reminderValidation,
  validationErrorHandling,
} = require('../middleware/formValidation');

module.exports = {
  createReminder: [
    ...reminderValidation,
    asyncHandler(async (req, res) => {
      validationErrorHandling(req);
      const reminderData = req.body;
      const userId = req.user.id;
      const reminder = await reminderService.createReminder(
        userId,
        reminderData
      );
      res.status(200).json({
        data: reminder,
        message: 'Reminder created successfully.',
      });
    }),
  ],

  getReminder: asyncHandler(async (req, res) => {
    const { reminderId } = req.params;
    const reminder = await reminderService.getReminder(reminderId);
    res.status(200).json({
      data: reminder,
      message: 'Reminder fetched successfully.',
    });
  }),

  updateReminder: [
    ...reminderValidation,
    asyncHandler(async (req, res) => {
      validationErrorHandling(req);
      const { reminderId } = req.params;
      const reminderData = req.body;
      const reminder = await reminderService.updateReminder(
        reminderId,
        reminderData
      );
      res.status(200).json({
        data: reminder,
        message: 'Reminder updated successfully.',
      });
    }),
  ],

  deleteReminder: asyncHandler(async (req, res) => {
    const { reminderId } = req.params;
    const reminder = await reminderService.deleteReminder(reminderId);
    res.status(200).json({
      data: reminder,
      message: 'Reminder deleted successfully.',
    });
  }),
};
