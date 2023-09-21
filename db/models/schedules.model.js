const { Model, DataTypes, Sequelize } = require('sequelize');
const { peopleTable } = require('./people.model');
const { servicesTable } = require('./services.model');

const TABLE = 'schedules';

const SchedulesModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: peopleTable,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  employeeId: {
    field: 'employee_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: peopleTable,
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
  date: {
    allowNull: false,
    type: DataTypes.DATEONLY
  },
  time: {
    allowNull: false,
    type: DataTypes.TIME
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(150),
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
}

class Schedule extends Model {
  static associate(models) {
    this.belongsTo(models.People, {
      foreignKey: 'customerId',
      as: 'customer'
    });
    this.belongsTo(models.People, {
      foreignKey: 'employeeId',
      as: 'employee'
    })
    this.belongsToMany(models.Service, {
      through: 'ScheduleService',
      foreignKey: 'scheduleId',
      as: 'services'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'Schedule',
      timestamps: true,
      underscored: true
    }
  }
}

module.exports = {
  schedulesTable: TABLE,
  SchedulesModelSchema,
  Schedule
}
