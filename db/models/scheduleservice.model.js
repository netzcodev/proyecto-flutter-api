const { Model, DataTypes, Sequelize } = require('sequelize');
const { schedulesTable } = require('./schedules.model');
const { servicesTable } = require('./services.model');

const TABLE = 'schedule_service';

const ScheduleServiceModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at'
  },
  scheduleId: {
    field: 'schedule_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: schedulesTable,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  serviceId: {
    field: 'service_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: servicesTable,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },

}

class ScheduleService extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'ScheduleService',
      timestamps: true,
      underscored: true,
    }
  }
}

module.exports = {
  scheduleserviceTable: TABLE,
  ScheduleServiceModelSchema,
  ScheduleService
}
