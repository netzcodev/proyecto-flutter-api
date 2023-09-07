const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLE = 'users';

const UsersModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  status: {
    allowNull: true,
    type: DataTypes.STRING(2)
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
    this.hasOne(models.People, { as: 'People', foreignKey: 'userId' });
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
