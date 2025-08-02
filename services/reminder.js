const CustomError = require('../utils/customError');

require('dotenv').config();
const { PrismaClient } = require('../generated/prisma');

const databaseUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const client = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

async function createReminder(
  senderId,
  { title, content = '', dueDate, recurring, interval = '', channel }
) {
  try {
    const reminder = await client.reminder.create({
      data: { title, content, dueDate, recurring, interval, channel, senderId },
    });
    return reminder;
  } catch (err) {
    console.error(err);
    throw new CustomError(
      '500',
      'Server Error',
      'An error occured oncreating the reminder.'
    );
  }
}

module.exports = {
  createReminder,
};
