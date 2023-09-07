const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(4).max(15);
const description = Joi.string().min(4);
const status = Joi.string().min(1).max(2).default('A');
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createMenuSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  status,
  createdAt,
  updatedAt
})

const updateMenuSchema = Joi.object({
  name,
  description,
  createdAt,
  updatedAt
})

const getMenuSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createMenuSchema,
  updateMenuSchema,
  getMenuSchema
}
