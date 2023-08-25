const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLE = 'people';

const PeopleModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  document: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(15)
  },
  lastName: {
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING(15)
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING(10)
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

class People extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'peopleId' });
    this.hasOne(models.Customer, { as: 'employee', foreignKey: 'peopleId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'People',
      timestamps: true,
    }
  }
}

module.exports = {
  peopleTable: TABLE,
  PeopleModelSchema,
  People
}
