const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().alphanum().max(30);
const manufacturer = Joi.string().max(30);
const model = Joi.string().max(20);
const fuel = Joi.string().max(15);
const type = Joi.string().max(15);
const color = Joi.string().max(15);
const mileage = Joi.number();
const plate = Joi.string().max(6);
const firebaseToken = Joi.string();
const customerId = Joi.number().integer();
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createVehicleSchema = Joi.object({
  name: name.required(),
  manufacturer: manufacturer.required(),
  model,
  fuel: fuel.required(),
  type,
  color,
  mileage: mileage.required(),
  plate: plate.required(),
  customerId: customerId.required(),
  firebaseToken,
  createdAt,
  updatedAt,
})

const updateVehicleSchema = Joi.object({
  name,
  manufacturer,
  model,
  fuel,
  type,
  color,
  mileage,
  plate,
  customerId,
  firebaseToken,
  createdAt,
  updatedAt,
})

const getVehicleSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createVehicleSchema,
  updateVehicleSchema,
  getVehicleSchema
}
