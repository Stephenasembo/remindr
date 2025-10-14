require('dotenv').config();
const { PrismaClient } = require('../generated/prisma');
const CustomError = require('../utils/customError');

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

async function createKey(apiKey, userId) {
  try {
    const key = await client.apiKey.create({
      data: { key: apiKey, userId },
    });
    return key;
  } catch (err) {
    throw new CustomError(
      500,
      'Server Error',
      'An internal error occured on API key generation.'
    );
  }
}

module.exports = {
  createKey,
};
