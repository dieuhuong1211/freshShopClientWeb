const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deliveries', {
    DELIVERY_ID: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      primaryKey: true
    },
    ORDER_ID: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      references: {
        model: 'orders',
        key: 'ORDER_ID'
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
    DELIVERY_DAY: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DELIVERY_STATUS: {
      type: DataTypes.ENUM('FAILED','PACKAGING','DELIVERING','SUCCEED','RETURN'),
      allowNull: true
    },
    NOTE: {
      type: DataTypes.STRING(50),
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
    ISDELETED: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'deliveries',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DELIVERY_ID" },
        ]
      },
      {
        name: "fk_d_o",
        using: "BTREE",
        fields: [
          { name: "ORDER_ID" },
        ]
      },
      {
        name: "fk_d_cl",
        using: "BTREE",
        fields: [
          { name: "CLIENT_ID" },
        ]
      },
      {
        name: "fk_d_a",
        using: "BTREE",
        fields: [
          { name: "MANAGER" },
        ]
      },
    ]
  });
};
