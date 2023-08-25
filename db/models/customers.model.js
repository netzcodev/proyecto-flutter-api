const { Model, DataTypes, Sequelize } = require('sequelize');
const { usersTable } = require('./users.model');
const { peopleTable } = require('./people.model');

const TABLE = 'customers';

const CustomersModelSchema = {
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
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: usersTable,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  peopleId: {
    field: 'people_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: peopleTable,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

}

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    this.belongsTo(models.People, { as: 'people', foreignKey: 'peopleId' });
    this.hasMany(models.Schedule, {
      foreignKey: 'customerId',
      as: 'schedules'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'Customer',
      timestamps: true,
      underscored: true,
    }
  }
}

module.exports = {
  customersTable: TABLE,
  CustomersModelSchema,
  Customer
}
