const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.tokenSecret
}

const JwtStrategy = new Strategy(options, function (payload, done) {
  return done(null, payload);
});

module.exports = JwtStrategy;
