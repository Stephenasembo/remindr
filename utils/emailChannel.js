const { updateStatus, deleteReminder } = require('../services/reminder');

async function sendEmail(reminder) {
  console.log('email sent');
  if (!reminder.recurring) {
    await deleteReminder(reminder.id);
    return;
  }
  await updateStatus(reminder.id, 'SENT');
}

module.exports = {
  sendEmail,
};
