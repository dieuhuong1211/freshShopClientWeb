const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    PRODUCT_ID: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      primaryKey: true
    },
    IMAGE: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    PRODUCT_NAME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CATEGORY: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      references: {
        model: 'categories',
        key: 'CATEGORY_ID'
      }
    },
    STOCK: {
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
      type: DataTypes.CHAR(100),
      allowNull: true,
      references: {
        model: 'admins',
        key: 'ADMIN_ID'
      }
    },
    DETAIL: {
      type: DataTypes.STRING(1000),
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
      {
        name: "fk_p_ca",
        using: "BTREE",
        fields: [
          { name: "CATEGORY" },
        ]
      },
    ]
  });
};
