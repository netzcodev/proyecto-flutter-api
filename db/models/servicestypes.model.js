const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLE = 'services_types';

const ServicesTypesModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
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

class ServicesType extends Model {
  static associate(models) {
    this.hasMany(models.Service, {
      foreignKey: 'serviceTypeId',
      as: 'services'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'ServicesType',
      timestamps: true,
      underscored: true
    }
  }
}

module.exports = {
  servicestypesTable: TABLE,
  ServicesTypesModelSchema,
  ServicesType
}
