const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLE = 'roles';

const RolesModelSchema = {
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

class Role extends Model {
  static associate(models) {
    this.hasMany(models.Permission, {
      foreignKey: 'roleId',
      as: 'permissions'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'Role',
      timestamps: true,
    }
  }
}

module.exports = {
  rolesTable: TABLE,
  RolesModelSchema,
  Role
}
