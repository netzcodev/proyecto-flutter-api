const { Model, DataTypes, Sequelize } = require('sequelize');

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
  manufacturer: { // esto es una tabla aparte creo
    allowNull: false,
    type: DataTypes.INTEGER
  },
  model: {
    allowNull: false,
    type: DataTypes.STRING(20)
  },
  fuel: {
    allowNull: true,
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
  vId: {
    allowNull: false,
    unique: true,
    field: 'v_id',
    type: DataTypes.STRING(30)
  },
  plate: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(6)
  },
  owner: { // esto va referenciado a un cliente
    allowNull: false,
    type: DataTypes.INTEGER,
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
  static associate() {
    // relaciones
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
