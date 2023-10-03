const express = require('express');
const passport = require('passport');
const people = require('./people.router');
const customers = require('./customers.router');
const employees = require('./employees.router');
const roles = require('./roles.router');
const schedules = require('./schedules.router');
const services = require('./services.router');
const servicestypes = require('./servicestypes.router');
const vehicles = require('./vehicles.router');
const auth = require('./auth.router');
const firebase = require('./firebase.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', auth);
  router.use(passport.authenticate('jwt', { session: false }))
  router.use('/vehicles', vehicles);
  router.use('/schedules', schedules);
  router.use('/services-types', servicestypes);
  router.use('/services', services);
  router.use('/roles', roles);
  router.use('/people', people);
  router.use('/customers', customers);
  router.use('/employees', employees);
  router.use('/firebase', firebase);

}

module.exports = routerApi;
