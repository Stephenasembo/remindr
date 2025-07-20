require('dotenv').config();
const bcrypt = require('bcryptjs');

const salt = Number(process.env.SALT);

async function hashPassword(input) {
  const hashedPassword = await bcrypt.hash(input, salt);
  return hashedPassword;
}

async function verifyPassword(input, hashedPassword) {
  const result = await bcrypt.compare(input, hashedPassword);
  return result;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
