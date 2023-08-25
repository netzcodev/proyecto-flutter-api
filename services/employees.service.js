const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class EmployeesService {

  async create(data) {
    const obj = await models.Employee.create(data, {
      include: ['user', 'people']
    });
    return obj;
  }

  async find() {
    const response = await models.Employee.findAll({
      include: ['user', 'people'],
    });
    return response;
  }

  async findOne(id) {
    const obj = await models.Employee.findByPk(id, {
      include: ['user', 'people']
    });
    if (!obj) {
      throw boom.notFound('Employee Not Found');
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

module.exports = EmployeesService;
