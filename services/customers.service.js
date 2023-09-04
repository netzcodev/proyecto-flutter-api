const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { encryption } = require('../utils/helpers/encryption');

class CustomersService {

  async create(data) {
    const hash = await encryption(data['user'].password);
    const user = {
      ...data['user'],
      password: hash,
    }
    const people = data['people'];
    const myData = {
      user,
      people
    }
    const obj = await models.Customer.create(myData, {
      include: ['user', 'people']
    });
    return obj;
  }

  async find() {
    const response = await models.Customer.findAll({
      include: ['user', 'people'],
    });
    return response;
  }

  async findOne(id) {
    const obj = await models.Customer.findByPk(id, {
      include: ['user', 'people']
    });
    if (!obj) {
      throw boom.notFound('Customer Not Found');
    }
    return obj;
  }

  async update(id, changes) {
    const obj = await this.findOne(id);
    const response = await obj.update(changes);
    return response;
  }

  async delete(id) {
    const obj = await this.findOne(id);
    await obj.destroy(id);
    return { id };
  }

}

module.exports = CustomersService;
