const cron = require('node-cron');
const reminderService = require('../services/reminder');
const { compareDate } = require('../utils/dateUtil');
const { sendEmail } = require('../utils/emailChannel');

async function checkReminderStatus() {
  try {
    const reminders = await reminderService.getAllDbReminders();
    const dueReminders = reminders.filter(
      (reminder) => compareDate(reminder.dueDate).isDue
    );
    return dueReminders;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function sendReminder(dueReminders) {
  const emailReminders = dueReminders.filter(
    (reminder) => reminder.channel === 'EMAIL' && reminder.status === 'NOT_SENT'
  );
  if (emailReminders.length !== 0) {
    const sentReminders = await Promise.all(
      emailReminders.map((reminder) => sendEmail(reminder))
    );
  }
}

async function flagDueReminders() {
  try {
    const dueReminders = await checkReminderStatus();
    if (dueReminders.length === 0) {
      console.log('No due reminder found');
      return;
    }

    const flaggedReminders = await Promise.all(
      dueReminders.map((reminder) => reminderService.flagReminder(reminder.id))
    );

    console.log(`${flaggedReminders.length} reminders flagged as due`);
    sendReminder(flaggedReminders);
  } catch (err) {
    console.error(err);
  }
}

cron.schedule('*/3 * * * * *', flagDueReminders);
