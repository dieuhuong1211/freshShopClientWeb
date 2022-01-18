var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _bills = require("./bills");
var _carts = require("./carts");
var _categories = require("./categories");
var _clients = require("./clients");
var _deliveries = require("./deliveries");
var _orders = require("./orders");
var _orders_detail = require("./orders_detail");
var _products = require("./products");
var _reviews = require("./reviews");

function initModels(sequelize) {
  var admins = _admins(sequelize, DataTypes);
  var bills = _bills(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var deliveries = _deliveries(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var orders_detail = _orders_detail(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);

  clients.belongsToMany(products, { as: 'PRODUCT_ID_products', through: carts, foreignKey: "CLIENT_ID", otherKey: "PRODUCT_ID" });
  clients.belongsToMany(products, { as: 'PRODUCT_ID_products_reviews', through: reviews, foreignKey: "CLIENT_ID", otherKey: "PRODUCT_ID" });
  orders.belongsToMany(products, { as: 'PRODUCT_ID_products_orders_details', through: orders_detail, foreignKey: "ORDER_ID", otherKey: "PRODUCT_ID" });
  products.belongsToMany(clients, { as: 'CLIENT_ID_clients', through: carts, foreignKey: "PRODUCT_ID", otherKey: "CLIENT_ID" });
  products.belongsToMany(clients, { as: 'CLIENT_ID_clients_reviews', through: reviews, foreignKey: "PRODUCT_ID", otherKey: "CLIENT_ID" });
  products.belongsToMany(orders, { as: 'ORDER_ID_orders', through: orders_detail, foreignKey: "PRODUCT_ID", otherKey: "ORDER_ID" });
  deliveries.belongsTo(admins, { as: "MANAGER_admin", foreignKey: "MANAGER"});
  admins.hasMany(deliveries, { as: "deliveries", foreignKey: "MANAGER"});
  orders.belongsTo(admins, { as: "MANAGER_admin", foreignKey: "MANAGER"});
  admins.hasMany(orders, { as: "orders", foreignKey: "MANAGER"});
  products.belongsTo(admins, { as: "IMPORTER_admin", foreignKey: "IMPORTER"});
  admins.hasMany(products, { as: "products", foreignKey: "IMPORTER"});
  products.belongsTo(categories, { as: "CATEGORY_category", foreignKey: "CATEGORY"});
  categories.hasMany(products, { as: "products", foreignKey: "CATEGORY"});
  carts.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(carts, { as: "carts", foreignKey: "CLIENT_ID"});
  deliveries.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(deliveries, { as: "deliveries", foreignKey: "CLIENT_ID"});
  orders.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(orders, { as: "orders", foreignKey: "CLIENT_ID"});
  reviews.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(reviews, { as: "reviews", foreignKey: "CLIENT_ID"});
  bills.belongsTo(orders, { as: "ORDER", foreignKey: "ORDER_ID"});
  orders.hasOne(bills, { as: "bill", foreignKey: "ORDER_ID"});
  deliveries.belongsTo(orders, { as: "ORDER", foreignKey: "ORDER_ID"});
  orders.hasMany(deliveries, { as: "deliveries", foreignKey: "ORDER_ID"});
  orders_detail.belongsTo(orders, { as: "ORDER", foreignKey: "ORDER_ID"});
  orders.hasMany(orders_detail, { as: "orders_details", foreignKey: "ORDER_ID"});
  carts.belongsTo(products, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  products.hasMany(carts, { as: "carts", foreignKey: "PRODUCT_ID"});
  orders_detail.belongsTo(products, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  products.hasMany(orders_detail, { as: "orders_details", foreignKey: "PRODUCT_ID"});
  reviews.belongsTo(products, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "PRODUCT_ID"});

  return {
    admins,
    bills,
    carts,
    categories,
    clients,
    deliveries,
    orders,
    orders_detail,
    products,
    reviews,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
