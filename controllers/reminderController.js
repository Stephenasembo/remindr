const asyncHandler = require('express-async-handler');
const reminderService = require('../services/reminder');

module.exports = {
  createReminder: asyncHandler(async (req, res) => {
    const reminderData = req.body;
    const userId = req.user.id;
    const reminder = await reminderService.createReminder(userId, reminderData);
    res.status(200).json({
      data: reminder,
      message: 'Reminder created successfully.',
    });
  }),

  getReminder: asyncHandler(async (req, res) => {
    const { reminderId } = req.params;
    const reminder = await reminderService.getReminder(reminderId);
    res.status(200).json({
      data: reminder,
      message: 'Reminder fetched successfully.',
    });
  }),

  updateReminder: asyncHandler(async (req, res) => {
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

  deleteReminder: asyncHandler(async (req, res) => {
    const { reminderId } = req.params;
    const reminder = await reminderService.deleteReminder(reminderId);
    res.status(200).json({
      data: reminder,
      message: 'Reminder deleted successfully.',
    });
  }),
};
