const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wishlists', {
    CLIENT_ID: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clients',
        key: 'CLIENT_ID'
      }
    },
    PRODUCT_ID: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'PRODUCT_ID'
      }
    },
    ISDELETED: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'wishlists',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CLIENT_ID" },
          { name: "PRODUCT_ID" },
        ]
      },
      {
        name: "fk_w_pd",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
    ]
  });
};
