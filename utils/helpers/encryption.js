const bcrypt = require('bcrypt');
const { config } = require('../../config/config');

async function encryption(password) {
  return bcrypt.hash(password, parseInt(config.hashCicles));
}


async function verifyPassword(hash, password) {
  return await bcrypt.compare(password, hash);
}

module.exports = { encryption, verifyPassword };
