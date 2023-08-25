const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class VehiclesService {

  constructor() {
  }

  async create(data) {
    const obj = await models.Vehicle.create(data);
    return obj;
  }

  async find() {
    const response = await models.Vehicle.findAll();
    return response;
  }

  async findOne(id) {
    const obj = await models.Vehicle.findByPk(id);
    if (!obj) {
      throw boom.notFound('Vehicle Not Found');
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

module.exports = VehiclesService;
