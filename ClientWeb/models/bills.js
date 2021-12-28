const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bills', {
    ORDER_ID: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'ORDER_ID'
      }
    },
    DELIVERY_ID: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'deliveries',
        key: 'DELIVERY_ID'
      }
    },
    PAYMENT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DISCOUNT: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    COUPON: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TAX: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    SHIPPING_COST: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ISDELETED: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bills',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ORDER_ID" },
          { name: "DELIVERY_ID" },
        ]
      },
      {
        name: "fk_b_d",
        using: "BTREE",
        fields: [
          { name: "DELIVERY_ID" },
        ]
      },
    ]
  });
};
