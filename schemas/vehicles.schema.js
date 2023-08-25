const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().alphanum().max(30);
const manufacturer = Joi.number();
const model = Joi.string().max(20);
const fuel = Joi.string().max(15);
const type = Joi.string().max(15);
const color = Joi.string().max(15);
const mileage = Joi.number();
const vId = Joi.string().max(30);
const plate = Joi.string().max(6);
const owner = Joi.number();
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createVehicleSchema = Joi.object({
  name: name.required(),
  manufacturer: manufacturer.required(),
  model: model.required(),
  fuel: fuel,
  type: type,
  color: color,
  mileage: mileage.required(),
  vId: vId.required(),
  plate: plate.required(),
  owner: owner.required(),
  createdAt: createdAt,
  updatedAt: updatedAt,
})

const updateVehicleSchema = Joi.object({
  name,
  manufacturer,
  model,
  fuel,
  type,
  color,
  mileage,
  owner,
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
