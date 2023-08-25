const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class SchedulesService {

  async create(data) {
    const obj = await models.Vehicle.create(data);
    return obj;
  }

  async find(query = null) {
    const options = {
      include: [
        {
          association: 'customer',
          include: ['people'],
        },
        {
          association: 'services',
          include: ['serviceType']
        },
      ],
      limit: query.limit ? query.limit : 10,
      offset: query.offset ? query.offset : 0,
    }
    const response = await models.Vehicle.findAll(options);
    return response;
  }

  async findOne(id) {
    const obj = await models.Vehicle.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['people'],
        },
        {
          association: 'services',
          include: ['serviceType']
        },
      ]
    });
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

module.exports = SchedulesService;
