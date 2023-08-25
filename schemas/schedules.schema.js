const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const employeeId = Joi.number().integer();
const serviceId = Joi.number().integer();
const scheduleId = Joi.number().integer();
const date = Joi.date().iso().custom((value, helpers) => {
  const isoString = value.toISOString();
  if (!isoString.endsWith('T00:00:00.000Z')) {
    return helpers.message('La fecha debe ser de tipo "date-only".');
  }
  return value;
}, 'Fecha personalizada.');
const time = Joi.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const getScheduleSchema = Joi.object({
  id: id.required(),
});

const createScheduleSchema = Joi.object({
  customerId: customerId.required(),
  employeeId: employeeId.required(),
  serviceId: serviceId.required(),
  date: date.required(),
  time: time.required()
});

const addServiceSchema = Joi.object({
  serviceId: serviceId.required(),
  scheduleId: scheduleId.required(),
});

const queryScheduleSchema = Joi.object({
  limit,
  offset,
});

module.exports = { getScheduleSchema, createScheduleSchema, addServiceSchema, queryScheduleSchema };
