const { Model, DataTypes, Sequelize } = require('sequelize');
const { usersTable } = require('./users.model');

const TABLE = 'people';

const PeopleModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  document: {
    allowNull: true,
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
    allowNull: true,
    type: DataTypes.STRING(10)
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(50)
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  photo: {
    allowNull: true,
    type: DataTypes.STRING(50)
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING(2)
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: usersTable,
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

class People extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
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
