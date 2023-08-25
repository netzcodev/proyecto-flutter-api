const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(4).max(15);
const description = Joi.string().min(4);
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createRoleSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  createdAt,
  updatedAt
})

const updateRoleSchema = Joi.object({
  name,
  description,
  createdAt,
  updatedAt
})

const getRoleSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  getRoleSchema
}
