const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    PRODUCT_ID: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    IMAGE: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PRODUCT_NAME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PRODUCT_TYPE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    STONK: {
      type: DataTypes.ENUM('IN STOCK','OUT STOCK'),
      allowNull: true
    },
    QUANTITY: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SOLD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PRICE: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    IMPORTDATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IMPORTER: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'admins',
        key: 'ADMIN_ID'
      }
    },
    DETAIL: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ISDELETED: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
      {
        name: "fk_p_ad",
        using: "BTREE",
        fields: [
          { name: "IMPORTER" },
        ]
      },
    ]
  });
};
