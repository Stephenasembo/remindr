function timeTillDue(reminderDate) {
  const now = new Date();
  const timeInMs = reminderDate - now;
  return `${timeInMs} milliseconds`;
}

function timeSinceDue(reminderDate) {
  const now = new Date();
  const timeInMs = now - reminderDate;
  return `${timeInMs} milliseconds`;
}

function compareDate(reminderDate) {
  const now = new Date();
  const reminder = new Date(reminderDate);
  if (reminder > now) {
    return {
      isDue: false,
      dueIn: timeTillDue(reminder),
      message: 'This reminder is not yet due.',
    };
  }
  if (reminder < now) {
    return {
      isDue: true,
      dueIn: timeSinceDue(reminder),
      message: 'This reminder is already due.',
    };
  }
  return {
    isDue: true,
    message: 'This reminder is already due.',
  };
}

module.exports = { compareDate };
