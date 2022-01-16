const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    ORDER_ID: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      primaryKey: true
    },
    ORDER_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ADDRESS: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MANAGER: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      references: {
        model: 'admins',
        key: 'ADMIN_ID'
      }
    },
    CLIENT_ID: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      references: {
        model: 'clients',
        key: 'CLIENT_ID'
      }
    },
    ISDELETED: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ORDER_ID" },
        ]
      },
      {
        name: "fk_o_cl",
        using: "BTREE",
        fields: [
          { name: "CLIENT_ID" },
        ]
      },
      {
        name: "fk_o_a",
        using: "BTREE",
        fields: [
          { name: "MANAGER" },
        ]
      },
    ]
  });
};
