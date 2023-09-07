const Joi = require('joi');

const id = Joi.number();
const role = Joi.string().max(20);
const status = Joi.string().min(1).max(2).default('A');
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createUserSchema = Joi.object({
  role: role.required(),
  status,
  createdAt,
  updatedAt
})

const updateUserSchema = Joi.object({
  role,
  status,
  createdAt,
  updatedAt
})

const getUserSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema
}
