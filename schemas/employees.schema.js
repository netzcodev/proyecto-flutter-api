const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./users.schema');
const { createPeopleSchema, updatePeopleSchema } = require('./people.schema');

const id = Joi.number();
const userId = Joi.number();
const peopleId = Joi.number();
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createEmployeeSchema = Joi.object({
  user: createUserSchema,
  people: createPeopleSchema,
  createdAt: createdAt,
  updatedAt: updatedAt,
})

const updateEmployeeSchema = Joi.object({
  userId,
  peopleId,
  user: updateUserSchema,
  people: updatePeopleSchema,
  updatedAt,
  createdAt
})

const getEmployeeSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createEmployeeSchema,
  updateEmployeeSchema,
  getEmployeeSchema
}
