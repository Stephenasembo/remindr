const { updateStatus } = require('../services/reminder');

async function sendEmail(reminder) {
  console.log('email sent');
  await updateStatus(reminder.id, 'SENT');
}

module.exports = {
  sendEmail,
};
