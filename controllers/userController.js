const asyncHandler = require('express-async-handler');
const recipientServices = require('../services/recipient');

module.exports = {
  createRecipient: asyncHandler(async (req, res) => {
    const recipientData = req.body;
    const userId = '77816efa-838d-49bb-a92f-7541a3e7365f';
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
    const userId = '77816efa-838d-49bb-a92f-7541a3e7365f';
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
};
