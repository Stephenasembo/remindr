const { generateApiKey } = require('generate-api-key');
const { createKey } = require('../services/apiKey');
const { hashInput } = require('./hashUtil');

function generateUserApiKey() {
  const apiKey = generateApiKey({
    method: 'base32',
    dashes: false,
    prefix: 'remindr',
  });
  return apiKey;
}

async function storeKey(userId) {
  const key = generateUserApiKey();
  const hashedKey = await hashInput(key);
  await createKey(hashedKey, userId);
  return key;
}

module.exports = {
  storeKey,
};
