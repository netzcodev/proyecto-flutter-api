const Joi = require('joi');

const id = Joi.number();
const roleId = Joi.number().integer();
const menuId = Joi.number().integer();
const add = Joi.bool();
const read = Joi.bool();
const modify = Joi.bool();
const remove = Joi.bool();
const status = Joi.string().min(1).max(2).default('A');
const createdAt = Joi.date().default(Date.now());
const updatedAt = Joi.date().default(Date.now());


const createPermissionSchema = Joi.object({
  roleId: roleId.required(),
  menuId: menuId.required(),
  add: add.required(),
  read: read.required(),
  modify: modify.required(),
  remove: remove.required(),
  status,
  createdAt,
  updatedAt,
})

const updatePermissionSchema = Joi.object({
  add,
  read,
  modify,
  remove,
  status,
  updatedAt,
})

const getPermissionSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createPermissionSchema,
  updatePermissionSchema,
  getPermissionSchema
}
