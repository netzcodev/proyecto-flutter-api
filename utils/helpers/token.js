const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

function signToken(payload) {
  return jwt.sign(payload, config.tokenSecret);
}

function verifyToken(toke) {
  return jwt.verify(toke, config.tokenSecret);
}


module.exports = {
  signToken,
  verifyToken
}
