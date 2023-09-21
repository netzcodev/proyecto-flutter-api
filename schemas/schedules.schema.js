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
const name = Joi.string().max(20);
const description = Joi.string().max(150);

const getScheduleSchema = Joi.object({
  id: id.required(),
});

const createScheduleSchema = Joi.object({
  customerId: customerId.required(),
  employeeId: employeeId.required(),
  serviceId,
  date: date.required(),
  time: time.required(),
  name: name.required(),
  description: description.required(),
});

const updateScheduleSchema = Joi.object({
  customerId,
  employeeId,
  serviceId,
  date,
  time,
  name,
  description,
});

const addServiceSchema = Joi.object({
  serviceId: serviceId.required(),
  scheduleId: scheduleId.required(),
});

module.exports = {
  getScheduleSchema,
  createScheduleSchema,
  addServiceSchema,
  updateScheduleSchema
};
