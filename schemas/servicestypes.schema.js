const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().alphanum().max(30);
const description = Joi.string().min(4).max(255);
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createServicesTypeSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  createdAt: createdAt,
  updatedAt: updatedAt,
})

const updateServicesTypeSchema = Joi.object({
  name,
  description,
  updatedAt,
})

const getServicesTypeSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createServicesTypeSchema,
  updateServicesTypeSchema,
  getServicesTypeSchema
}
