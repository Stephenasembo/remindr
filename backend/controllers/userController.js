const asyncHandler = require('express-async-handler');
const recipientServices = require('../services/recipient');
const reminderService = require('../services/reminder');

module.exports = {
  createRecipient: asyncHandler(async (req, res) => {
    const recipientData = req.body;
    const userId = req.user.id;
    const recipient = await recipientServices.createRecipient(
      userId,
      recipientData
    );
    res.status(200).json({
      data: recipient,
      message: 'Recipient created successfully.',
    });
  }),
  getRecipients: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const recipients = await recipientServices.getRecipients(userId);
    res.status(200).json({
      data: recipients,
      message: 'Recipients fetched successfully.',
    });
  }),

  getRecipient: asyncHandler(async (req, res) => {
    const { recipientId } = req.params;
    const recipient = await recipientServices.getRecipient(recipientId);
    res.status(200).json({
      data: recipient,
      message: 'Recipient fetched successfully.',
    });
  }),

  updateRecipient: asyncHandler(async (req, res) => {
    const { recipientId } = req.params;
    const formData = req.body;
    const recipient = await recipientServices.updateRecipient(
      recipientId,
      formData
    );
    res.status(200).json({
      data: recipient,
      message: 'Recipient updated successfully.',
    });
  }),

  deleteRecipient: asyncHandler(async (req, res) => {
    const { recipientId } = req.params;
    const recipient = await recipientServices.deleteRecipient(recipientId);
    res.status(200).json({
      data: recipient,
      message: 'Recipient deleted successfully.',
    });
  }),

  deleteRecipients: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const recipients = await recipientServices.deleteRecipients(userId);
    res.status(200).json({
      data: recipients,
      message: 'All recipients deleted successfully.',
    });
  }),

  getUserReminders: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const reminders = await reminderService.getUserReminders(userId);
    res.status(200).json({
      data: reminders,
      message: `User's reminders fetched successfully.`,
    });
  }),

  deleteUserReminders: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const reminders = await reminderService.deleteUserReminders(userId);
    res.status(200).json({
      data: reminders,
      message: `User's reminders deleted successfully.`,
    });
  }),
};
