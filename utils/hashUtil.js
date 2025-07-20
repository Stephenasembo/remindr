require('dotenv').config();
const bcrypt = require('bcryptjs');

const salt = Number(process.env.SALT);

async function hashInput(input) {
  const hashedPassword = await bcrypt.hash(input, salt);
  return hashedPassword;
}

async function verifyHashedInput(input, hashedPassword) {
  const result = await bcrypt.compare(input, hashedPassword);
  return result;
}

module.exports = {
  hashInput,
  verifyHashedInput,
};
