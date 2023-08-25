const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { encryption } = require('../utils/helpers/encryption');

class UsersService {

  async create(data) {
    const hash = await encryption(data.password);
    const obj = await models.User.create({
      ...data,
      password: hash
    });
    delete obj.dataValues.password;
    return obj;
  }

  async find() {
    const response = await models.User.findAll();
    return response;
  }

  async findOne(id) {
    const obj = await models.User.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['people']
      }]
    });
    if (!obj) {
      throw boom.notFound('User Not Found');
    }
    return obj;
  }

  async findByEmail(email) {
    const obj = await models.User.findOne({
      where: { email }
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

module.exports = UsersService;
