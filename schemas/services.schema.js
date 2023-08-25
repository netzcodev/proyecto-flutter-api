const Joi = require('joi');

const id = Joi.number();
const serviceTypeId = Joi.number().integer();
const duration = Joi.number().integer();
const currentDate = Joi.date().iso().custom((value, helpers) => {
  const isoString = value.toISOString();
  if (!isoString.endsWith('T00:00:00.000Z')) {
    return helpers.message('La fecha debe ser de tipo "date-only".');
  }
  return value;
}).default(new Date().setHours(0, 0, 0, 0));
const comingDate = Joi.date().iso().custom((value, helpers) => {
  const isoString = value.toISOString();
  if (!isoString.endsWith('T00:00:00.000Z')) {
    return helpers.message('La fecha debe ser de tipo "date-only".');
  }
  return value;
}, 'Fecha Personalizada');
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());

const createServicesSchema = Joi.object({
  serviceTypeId: serviceTypeId.required(),
  duration: duration.required(),
  currentDate: currentDate,
  comingDate: comingDate,
  createdAt: createdAt,
  updatedAt: updatedAt,
})

const updateServicesSchema = Joi.object({
  duration,
  serviceTypeId,
  updatedAt,
  currentDate,
  comingDate,
})

const getServicesSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createServicesSchema,
  updateServicesSchema,
  getServicesSchema
}
