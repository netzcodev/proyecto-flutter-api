const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const { startOfWeek, endOfWeek } = require('date-fns');

class SchedulesService {

  async create(data) {
    const obj = await models.Schedule.create(data);
    return obj;
  }

  async find(week = null) {
    const currentDate = new Date();
    let schedules;

    currentDate.setMonth(0, 1);
    currentDate.setHours(0, 0, 0, 0);

    const dayOfWeek = currentDate.getDay();
    const daysUntilMonday = (dayOfWeek === 0 ? 7 : dayOfWeek) - 1;
    currentDate.setDate(currentDate.getDate() - daysUntilMonday);

    if (week) {
      currentDate.setDate(currentDate.getDate() + (parseInt(week['week']) - 1) * 7);
      const nextSaturday = new Date(currentDate);
      nextSaturday.setDate(currentDate.getDate() + 6);

      schedules = await models.Schedule.findAll({
        where: {
          date: {
            [Op.between]: [startOfWeek(currentDate), endOfWeek(nextSaturday)],
          },
        },
      });
    } else {
      schedules = await models.Schedule.findAll();
    }
    return schedules;
  }

  async findOne(id) {
    const obj = await models.Schedule.findByPk(id, {
      include: ['services']
    });
    if (!obj) {
      throw boom.notFound('Schedule Not Found');
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
