const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    PRODUCT_ID: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'PRODUCT_ID'
      }
    },
    CLIENT_ID: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clients',
        key: 'CLIENT_ID'
      }
    },
    REVIEW: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    REVIEWDATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ISDELETED: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reviews',
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
        name: "fk_rv_pd",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
    ]
  });
};
