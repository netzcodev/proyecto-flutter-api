const { Model, DataTypes, Sequelize } = require('sequelize');
const { peopleTable } = require('./people.model');

const TABLE = 'vehicles';

const VehiclesModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  manufacturer: {
    allowNull: true,
    type: DataTypes.STRING(30)
  },
  model: {
    allowNull: true,
    type: DataTypes.STRING(20)
  },
  fuel: {
    allowNull: false,
    type: DataTypes.STRING(15)
  },
  type: {
    allowNull: true,
    type: DataTypes.STRING(15)
  },
  color: {
    allowNull: true,
    type: DataTypes.STRING(15)
  },
  mileage: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  plate: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(6)
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

class Vehicle extends Model {
  static associate(models) {
    this.belongsTo(models.People, { as: 'customer', foreignKey: 'customerId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'Vehicle',
      timestamps: true,
    }
  }
}

module.exports = {
  vehiclesTable: TABLE,
  VehiclesModelSchema,
  Vehicle
}
