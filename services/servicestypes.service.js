const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ServicesTypesService {

  async create(data) {
    const obj = await models.ServicesType.create(data);
    return obj;
  }

  async find() {
    const response = await models.ServicesType.findAll();
    return response;
  }

  async findOne(id) {
    const obj = await models.ServicesType.findByPk(id);
    if (!obj) {
      throw boom.notFound('Service Type Not Found');
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

module.exports = ServicesTypesService;
