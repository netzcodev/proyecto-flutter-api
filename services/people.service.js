const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class PeopleService {

  async create(data) {
    const obj = await models.People.create(data);
    return obj;
  }

  async find() {
    const response = await models.People.findAll();
    return response;
  }

  async findOne(id) {
    const obj = await models.People.findByPk(id);
    if (!obj) {
      throw boom.notFound('Person Not Found');
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

module.exports = PeopleService;
