const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLE = 'users';

const UsersModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  roleId: {
    field: 'role',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'roles',
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

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' });
    this.hasOne(models.Customer, { as: 'employee', foreignKey: 'userId' });
    this.belongsTo(models.Role, { as: 'role', foreignKey: 'roleId' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'User',
      timestamps: true,
    }
  }
}

module.exports = {
  usersTable: TABLE,
  UsersModelSchema,
  User
}
