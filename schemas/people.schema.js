const Joi = require('joi');

const id = Joi.number();
const document = Joi.number().min(4).max(15);
const name = Joi.string().alphanum().min(3).max(15);
const lastName = Joi.string().alphanum().min(3).max(15);
const phone = Joi.string().min(10).max(10);
const email = Joi.string().email();
const password = Joi.number();
const photo = Joi.string().min(10);
const status = Joi.string().min(1).max(2).default('A');
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createPeopleSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone,
  document,
  email: email.required(),
  password: password.required(),
  photo,
  createdAt,
  updatedAt
})

const updatePeopleSchema = Joi.object({
  name,
  lastName,
  phone,
  document,
  email,
  password,
  status,
  photo,
  updatedAt
})

const getPeopleSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createPeopleSchema,
  updatePeopleSchema,
  getPeopleSchema
}
