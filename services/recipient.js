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

async function createRecipient(userId, { name, email, phone }) {
  try {
    const person = await client.recipient.create({
      data: {
        name: name || '',
        email: email || '',
        phone: phone || '',
        userId,
      },
    });
    return person;
  } catch (err) {
    console.error(err);
    throw new CustomError(500, 'Server Error', 'An internal error occured.');
  }
}

async function getRecipients(userId) {
  try {
    const recipients = await client.recipient.findMany({
      where: { userId },
    });
    return recipients;
  } catch (err) {
    console.error(err);
    throw new CustomError(
      500,
      'Server Error',
      `An error occured on fetching user's recipients`
    );
  }
}

async function getRecipient(id) {
  try {
    const recipient = await client.recipient.findUnique({
      where: { id },
    });
    return recipient;
  } catch (err) {
    console.error(err);
    throw new CustomError(
      500,
      'Server Error',
      `An error occured on fetching recipient with id: ${id}`
    );
  }
}

module.exports = {
  createRecipient,
  getRecipients,
  getRecipient,
};
