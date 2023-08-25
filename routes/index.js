const express = require('express');
const passport = require('passport');
const customers = require('./customers.router');
const employees = require('./employees.router');
const people = require('./people.router');
const schedules = require('./schedules.router');
const services = require('./services.router');
const servicestypes = require('./servicestypes.router');
const users = require('./users.router');
const vehicles = require('./vehicles.router');
const auth = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', auth);
  router.use(passport.authenticate('jwt', { session: false }))
  router.use('/customers', customers);
  router.use('/employees', employees);
  router.use('/people', people);
  router.use('/schedules', schedules);
  router.use('/services', services);
  router.use('/services-types', servicestypes);
  router.use('/users', users);
  router.use('/vehicles', vehicles);

}

module.exports = routerApi;
