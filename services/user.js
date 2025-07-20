const CustomError = require('../utils/customError');

require('dotenv').config();
const { PrismaClient, Prisma } = require('../generated/prisma');

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

async function createUser({ username, email, password }) {
  try {
    const user = await client.user.create({
      data: { username, email, password },
    });
    return user;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        const constraint = err.meta.target[0].startsWith('username')
          ? 'Username'
          : 'Email';

        const message = `${constraint} has to be unique.`;
        throw new CustomError(400, 'Invalid Input', message);
      }
    }
    throw new CustomError(500, 'Server Error', 'An internal error occured.');
  }
}

async function findUser(id, username = null) {
  try {
    const where = {};
    if (id) where.id = id;
    else if (username) where.username = username;
    const user = await client.user.findUnique({ where });
    return user;
  } catch (err) {
    throw new CustomError(500, 'Database Error', 'Error on finding user.');
  }
}

module.exports = {
  createUser,
  findUser,
};
