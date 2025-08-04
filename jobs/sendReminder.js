const cron = require('node-cron');
const { findDueReminders } = require('../services/reminder');
const { sendEmail } = require('../utils/emailChannel');

async function sendReminder() {
  const reminders = await findDueReminders();
  if (reminders.length === 0) {
    console.log('No reminder due');
    return;
  }
  const emailReminders = await reminders.filter(
    (reminder) => reminder.channel === 'EMAIL'
  );
  if (emailReminders.length !== 0) {
    const sentReminders = await Promise.all(
      emailReminders.map((reminder) => sendEmail(reminder))
    );
  }
}

cron.schedule('*/5 * * * * *', sendReminder);
