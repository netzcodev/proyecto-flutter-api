const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const { startOfWeek, endOfWeek } = require('date-fns');
const { occupiedTimesMapper } = require('../utils/helpers/mappers/schedule.mapper');

class SchedulesService {

  async create(data) {
    const obj = await models.Schedule.create(data);
    return obj;
  }

  async find(week = null, role, id) {
    const currentDate = new Date();
    let filters = {};
    currentDate.setMonth(0, 1);
    currentDate.setHours(0, 0, 0, 0);

    const dayOfWeek = currentDate.getDay();
    const daysUntilMonday = (dayOfWeek === 0 ? 7 : dayOfWeek) - 1;
    currentDate.setDate(currentDate.getDate() - daysUntilMonday);

    if (role === 'cliente') {
      filters.customerId = id;
    } else if (role === 'mecanico') {
      filters.employeeId = id;
    }

    if (week) {
      currentDate.setDate(currentDate.getDate() + (parseInt(week) - 1) * 7);
      const nextSaturday = new Date(currentDate);
      nextSaturday.setDate(currentDate.getDate() + 6);

      const schedules = await models.Schedule.findAll({
        where: {
          date: {
            [Op.between]: [startOfWeek(currentDate), endOfWeek(nextSaturday)],
          },
          ...filters,
        },
      });

      return schedules;
    } else {
      const schedules = await models.Schedule.findAll();
      return schedules;
    }
  }

  async findComingSchedule(id) {
    const sequelize = models.Service.sequelize;
    const query = `
    SELECT *
    FROM schedules
    WHERE customer_id = :id
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
    const obj = await models.Schedule.findByPk(id, {
      include: ['services']
    });

    if (!obj) {
      throw boom.notFound('Schedule Not Found');
    }

    const occupiedTimes = await this.getOccupiedTimes(obj.date, obj.id);

    obj.dataValues.occupiedTimes = occupiedTimes;

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

  async getOccupiedTimes(date, id = null) {
    const sequelize = models.Service.sequelize;
    const query = `
      SELECT time
      FROM schedules
      WHERE date = :dateValue::date
      ${(id == null || id == 0) ? ' AND id <> :id ' : ''}
    `;

    try {
      const response = await sequelize.query(query, {
        replacements: { dateValue: date, id: id },
        type: sequelize.QueryTypes.SELECT
      });

      return response.map(element => occupiedTimesMapper(element));
    } catch (error) {
      return [];
    }
  }

}

module.exports = SchedulesService;
