const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { encryption } = require('../utils/helpers/encryption');

class PeopleService {

  async create(data) {
    const hash = await encryption(data.password);
    const response = await models.People.create({
      ...data,
      password: hash
    });
    const obj = await this.findOne(response.id);

    return obj;
  }

  async find(limit, offset) {
    const response = await models.People.findAll({
      limit,
      offset,
      include: [{
        association: 'user',
        include: ['role']
      }]
    });
    return response;
  }

  async findOne(id) {
    const obj = await models.People.findByPk(id, {
      include: [{
        association: 'user',
        include: [{
          association: 'role',
          include: [{
            association: 'permissions',
            include: ['menu']
          }]
        }]
      }]
    });
    if (!obj) {
      throw boom.notFound('Person Not Found');
    }
    return obj;
  }

  async findByEmail(email) {
    const obj = await models.People.findOne({
      where: { email },
      include: [{
        association: 'user',
        include: [{
          association: 'role',
          include: [{
            association: 'permissions',
            include: ['menu']
          }]
        }]
      }]
    });
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
