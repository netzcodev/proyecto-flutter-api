const Joi = require('joi');

const id = Joi.number();
const serviceTypeId = Joi.number().integer();
const scheduleId = Joi.number().integer();
const vehicleId = Joi.number().integer();
const duration = Joi.number().integer();
const mileage = Joi.number().integer();
const currentDate = Joi.string();
const comingDate = Joi.date();
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());
const name = Joi.string().max(20).min(4);
const description = Joi.string().max(150).min(4).empty().not('');

const createServicesSchema = Joi.object({
  serviceTypeId: serviceTypeId.required(),
  duration: duration.required(),
  currentDate: currentDate.required(),
  comingDate: comingDate,
  name: name.required(),
  description: description.required().not('').empty(),
  scheduleId: scheduleId.required().not(0),
  vehicleId: vehicleId.required().not(0),
  mileage: mileage.required().not(0),
  createdAt,
  updatedAt,
})

const updateServicesSchema = Joi.object({
  duration,
  updatedAt,
  comingDate,
  name,
  description,
})

const getServicesSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createServicesSchema,
  updateServicesSchema,
  getServicesSchema
}
