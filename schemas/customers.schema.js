const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./users.schema');
const { createPeopleSchema, updatePeopleSchema } = require('./people.schema');

const id = Joi.number();
const userId = Joi.number().integer();
const peopleId = Joi.number().integer();
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createCustomerSchema = Joi.object({
  user: createUserSchema,
  people: createPeopleSchema,
  createdAt: createdAt,
  updatedAt: updatedAt,
})

const updateCustomerSchema = Joi.object({
  userId,
  peopleId,
  user: updateUserSchema,
  people: updatePeopleSchema,
  updatedAt,
  createdAt
})

const getCustomerSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
}
