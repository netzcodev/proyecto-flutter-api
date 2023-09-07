const { Strategy } = require('passport-local');
const PeopleService = require('../../../services/people.service');
const { verifyPassword } = require('../../helpers/encryption');
const boom = require('@hapi/boom');

const service = new PeopleService();

const LocalStrategy = new Strategy(async function (email, password, done) {
  try {
    const user = await service.findByEmail(email);
    if (!user) {
      done(boom.notFound('User not found'), false);
    }
    const match = await verifyPassword(user.password, password);
    if (!match) {
      done(boom.unauthorized(), false)
    }
    delete user.dataValues.password;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = LocalStrategy;
