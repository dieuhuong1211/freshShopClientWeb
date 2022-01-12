const {models} = require('../../models');
const { Op } = require('sequelize');

exports.order = (clientID) => {
    return models.orders.findAll({
        where: {
            CLIENT_ID: clientID,
            ISDELETED: false

        },
        raw: true
    });
}
exports.orderByID = (orderID) => {
    return models.orders.findOne({
        where: {
            ORDER_ID: orderID,
        },
        raw: true
    });
}
exports.bill = (orderID) =>{
    return models.bills.findOne({
        where: {
            ORDER_ID: orderID,
            ISDELETED: false

        },
        raw: true
    });
}

exports.productListInOrder = (orderID) =>{
    return models.orders_detail.findAll({
        where: {
            ORDER_ID: orderID,
            ISDELETED: false

        },
        raw: true
    });
}
exports.productDetail = (productID) => {
    return models.products.findOne({
        where: {
            PRODUCT_ID: productID,
            ISDELETED: false

        },
        raw: true
    });
}

exports.bill = (orderID) =>{
    return models.bills.findOne({
        where: {
            ORDER_ID: orderID,
            ISDELETED: false

        },
        raw: true
    });
}

exports.deliverySuccess = (clientID) =>{
    return models.deliveries.findAll({
        where: {
            CLIENT_ID: clientID,
            ISDELETED: false,
            DELIVERY_STATUS: "SUCCEED"
        },
        raw: true
    });
}

exports.returnProduct = (productID) =>{
    return models.orders_detail.findOne({
        where: {
            PRODUCT_ID: productID,
            ISDELETED: false

        },
        raw: true
    });
}