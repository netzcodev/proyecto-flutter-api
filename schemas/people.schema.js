const Joi = require('joi');

const id = Joi.number();
const document = Joi.number().min(4).max(15);
const name = Joi.string().alphanum().min(3).max(15);
const lastName = Joi.string().alphanum().min(3).max(15);
const phone = Joi.string().min(10).max(10);
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createPeopleSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  document: document.required(),
  createdAt,
  updatedAt
})

const updatePeopleSchema = Joi.object({
  name,
  lastName,
  phone,
  document,
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
