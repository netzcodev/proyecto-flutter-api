const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class VehiclesService {

  constructor() {
  }

  async create(data) {
    const obj = await models.Vehicle.create(data);
    return obj;
  }

  async find(userId, role = null) {
    let response;

    if (role == 'cliente') {
      response = await models.Vehicle.findAll({
        where: {
          id: userId
        }
      });

      return response;
    }

    response = await models.Vehicle.findAll();
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
    let notificationFlag = false;
    let notificationType = 'mileage';
    const obj = await this.findOne(id);
    const lastService = await this.getLastVehicleService(obj.dataValues.id);

    if (changes.mileage && changes.mileage >= lastService.coming_mileage) {
      notificationFlag = true;
      notificationType = 'scheduleMileage';
    }

    if (lastService.coming_date && new Date() >= new Date(lastService.coming_date)) {
      notificationFlag = true;
      notificationType = 'scheduleDate';
    }


    const response = await obj.update(changes);
    return { response, notificationFlag, notificationType };
  }

  async delete(id) {
    const obj = await this.findOne(id);
    await obj.destroy(id);
    return { id };
  }

  async getLastVehicleService(vehicleId) {
    const sequelize = models.Service.sequelize;
    const query = `
      SELECT
        s.id,
        s.coming_date,
        s.coming_mileage
      FROM services s
      WHERE s.vehicle_id = :id
      ORDER BY created_at DESC
      LIMIT 1
    `;

    try {
      const response = await sequelize.query(query, {
        replacements: { id: vehicleId },
        type: sequelize.QueryTypes.SELECT
      });

      return response[0];
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
  }
}

module.exports = VehiclesService;
