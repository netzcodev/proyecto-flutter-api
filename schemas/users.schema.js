const Joi = require('joi');

const id = Joi.number();
const email = Joi.string().email();
const password = Joi.number();
const role = Joi.string().max(20);
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  createdAt,
  updatedAt
})

const updateUserSchema = Joi.object({
  email,
  password,
  role,
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
