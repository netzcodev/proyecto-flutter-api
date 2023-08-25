const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ServicesService {

  async create(data) {
    const obj = await models.Service.create(data);
    return obj;
  }

  async find() {
    const response = await models.Service.findAll({
      include: ['serviceType']
    });
    return response;
  }

  async findOne(id) {
    const obj = await models.Service.findByPk(id, {
      include: ['serviceType']
    });
    if (!obj) {
      throw boom.notFound('Service Not Found');
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

module.exports = ServicesService;
