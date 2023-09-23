const { Model, DataTypes, Sequelize } = require('sequelize');
const { servicestypesTable } = require('./servicestypes.model');

const TABLE = 'services';

const ServicesModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  serviceTypeId: {
    field: 'service_type_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: servicestypesTable,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  currentDate: {
    allowNull: false,
    field: 'current_date',
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  comingDate: {
    allowNull: true,
    field: 'coming_date',
    type: DataTypes.DATEONLY
  },
  duration: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(20)
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(150)
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

class Service extends Model {
  static associate(models) {
    this.belongsTo(models.ServicesType, {
      foreignKey: 'serviceTypeId',
      as: 'serviceType'
    })
    this.belongsToMany(models.Schedule, {
      through: 'ScheduleService',
      foreignKey: 'serviceId',
      as: 'schedules',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'Service',
      timestamps: true,
      underscored: true
    }
  }
}

module.exports = {
  servicesTable: TABLE,
  ServicesModelSchema,
  Service
}
