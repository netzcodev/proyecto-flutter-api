const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLE = 'menu';

const MenuModelSchema = {
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

class Menu extends Model {
  static associate(models) {
    this.hasMany(models.Permission, {
      foreignKey: 'menuId',
      as: 'permissions'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE,
      modelName: 'Menu',
      timestamps: true,
    }
  }
}

module.exports = {
  menuTable: TABLE,
  MenuModelSchema,
  Menu
}
