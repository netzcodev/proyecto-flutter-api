const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ServicesService {

  async create(data) {
    const obj = await models.Service.create(data);

    const otherObj = await models.ScheduleService.create({
      scheduleId: data.scheduleId,
      serviceId: obj.dataValues.id,
    })

    if (!otherObj) {
      await models.Service.delete(obj.dataValues.id);
      throw "No se pudo crear";
    }

    return obj;
  }

  async find() {
    const response = await models.Service.findAll({
      include: ['serviceType']
    });
    return response;
  }

  async findHistory(id, limit, offset) {
    const sequelize = models.Service.sequelize;
    const query = `
    SELECT s.*
    FROM services s
    INNER JOIN schedule_service ss ON s.id = ss.service_id
    INNER JOIN schedules sch ON ss.schedule_id = sch.id
    WHERE sch.customer_id = :id
    ORDER BY created_at DESC
    LIMIT :limit
    OFFSET :offset
  `;

    try {
      const response = await sequelize.query(query, {
        replacements: { id, limit, offset },
        type: sequelize.QueryTypes.SELECT
      });
      return response;
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
  }

  async findComingService(id) {
    const sequelize = models.Service.sequelize;
    const query = `
    SELECT s.*
    FROM services s
    INNER JOIN schedule_service ss ON s.id = ss.service_id
    INNER JOIN schedules sch ON ss.schedule_id = sch.id
    WHERE sch.customer_id = :id
    ORDER BY created_at DESC
    LIMIT 1
  `;

    try {
      const response = await sequelize.query(query, {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      });
      return response;
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
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
