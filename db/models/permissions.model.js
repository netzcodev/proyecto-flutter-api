const { Model, DataTypes, Sequelize } = require('sequelize');
const { menuTable } = require('./menu.model');
const { rolesTable } = require('./roles.model');

const TABLE = 'permissions';

const PermissionsModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  roleId: {
    field: 'role_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: rolesTable,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  menuId: {
    field: 'menu_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: menuTable,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  add: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  read: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  modify: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  remove: {
    allowNull: false,
    type: DataTypes.BOOLEAN
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

class Permission extends Model {
  static associate(models) {
    this.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role'
    })
    this.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      as: 'menu'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'Permission',
      timestamps: true,
      underscored: true
    }
  }
}

module.exports = {
  permissionsTable: TABLE,
  PermissionsModelSchema,
  Permission
}
