function compareDate(reminderDate) {
  const now = new Date();
  const reminder = new Date(reminderDate);
  const isDue = reminder <= now;
  return isDue;
}

module.exports = { compareDate };
