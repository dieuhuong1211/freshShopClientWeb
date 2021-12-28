var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _bills = require("./bills");
var _carts = require("./carts");
var _clients = require("./clients");
var _deliveries = require("./deliveries");
var _orders = require("./orders");
var _orders_detail = require("./orders_detail");
var _orders_return = require("./orders_return");
var _products = require("./products");
var _wishlists = require("./wishlists");

function initModels(sequelize) {
  var admins = _admins(sequelize, DataTypes);
  var bills = _bills(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var deliveries = _deliveries(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var orders_detail = _orders_detail(sequelize, DataTypes);
  var orders_return = _orders_return(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var wishlists = _wishlists(sequelize, DataTypes);

  clients.belongsToMany(orders, { as: 'ORDER_ID_orders_orders_returns', through: orders_return, foreignKey: "CLIENT_ID", otherKey: "ORDER_ID" });
  clients.belongsToMany(products, { as: 'PRODUCT_ID_products', through: carts, foreignKey: "CLIENT_ID", otherKey: "PRODUCT_ID" });
  clients.belongsToMany(products, { as: 'PRODUCT_ID_products_wishlists', through: wishlists, foreignKey: "CLIENT_ID", otherKey: "PRODUCT_ID" });
  deliveries.belongsToMany(orders, { as: 'ORDER_ID_orders', through: bills, foreignKey: "DELIVERY_ID", otherKey: "ORDER_ID" });
  orders.belongsToMany(clients, { as: 'CLIENT_ID_clients_orders_returns', through: orders_return, foreignKey: "ORDER_ID", otherKey: "CLIENT_ID" });
  orders.belongsToMany(deliveries, { as: 'DELIVERY_ID_deliveries', through: bills, foreignKey: "ORDER_ID", otherKey: "DELIVERY_ID" });
  orders.belongsToMany(products, { as: 'PRODUCT_ID_products_orders_details', through: orders_detail, foreignKey: "ORDER_ID", otherKey: "PRODUCT_ID" });
  products.belongsToMany(clients, { as: 'CLIENT_ID_clients', through: carts, foreignKey: "PRODUCT_ID", otherKey: "CLIENT_ID" });
  products.belongsToMany(clients, { as: 'CLIENT_ID_clients_wishlists', through: wishlists, foreignKey: "PRODUCT_ID", otherKey: "CLIENT_ID" });
  products.belongsToMany(orders, { as: 'ORDER_ID_orders_orders_details', through: orders_detail, foreignKey: "PRODUCT_ID", otherKey: "ORDER_ID" });
  deliveries.belongsTo(admins, { as: "MANAGER_admin", foreignKey: "MANAGER"});
  admins.hasMany(deliveries, { as: "deliveries", foreignKey: "MANAGER"});
  orders.belongsTo(admins, { as: "MANAGER_admin", foreignKey: "MANAGER"});
  admins.hasMany(orders, { as: "orders", foreignKey: "MANAGER"});
  products.belongsTo(admins, { as: "IMPORTER_admin", foreignKey: "IMPORTER"});
  admins.hasMany(products, { as: "products", foreignKey: "IMPORTER"});
  carts.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(carts, { as: "carts", foreignKey: "CLIENT_ID"});
  deliveries.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(deliveries, { as: "deliveries", foreignKey: "CLIENT_ID"});
  orders.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(orders, { as: "orders", foreignKey: "CLIENT_ID"});
  orders_return.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(orders_return, { as: "orders_returns", foreignKey: "CLIENT_ID"});
  wishlists.belongsTo(clients, { as: "CLIENT", foreignKey: "CLIENT_ID"});
  clients.hasMany(wishlists, { as: "wishlists", foreignKey: "CLIENT_ID"});
  bills.belongsTo(deliveries, { as: "DELIVERY", foreignKey: "DELIVERY_ID"});
  deliveries.hasMany(bills, { as: "bills", foreignKey: "DELIVERY_ID"});
  bills.belongsTo(orders, { as: "ORDER", foreignKey: "ORDER_ID"});
  orders.hasMany(bills, { as: "bills", foreignKey: "ORDER_ID"});
  deliveries.belongsTo(orders, { as: "ORDER", foreignKey: "ORDER_ID"});
  orders.hasMany(deliveries, { as: "deliveries", foreignKey: "ORDER_ID"});
  orders_detail.belongsTo(orders, { as: "ORDER", foreignKey: "ORDER_ID"});
  orders.hasMany(orders_detail, { as: "orders_details", foreignKey: "ORDER_ID"});
  orders_return.belongsTo(orders, { as: "ORDER", foreignKey: "ORDER_ID"});
  orders.hasMany(orders_return, { as: "orders_returns", foreignKey: "ORDER_ID"});
  carts.belongsTo(products, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  products.hasMany(carts, { as: "carts", foreignKey: "PRODUCT_ID"});
  orders_detail.belongsTo(products, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  products.hasMany(orders_detail, { as: "orders_details", foreignKey: "PRODUCT_ID"});
  wishlists.belongsTo(products, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  products.hasMany(wishlists, { as: "wishlists", foreignKey: "PRODUCT_ID"});

  return {
    admins,
    bills,
    carts,
    clients,
    deliveries,
    orders,
    orders_detail,
    orders_return,
    products,
    wishlists,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
