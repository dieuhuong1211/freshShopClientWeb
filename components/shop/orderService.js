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

exports.findReturnOrder = (clientID) =>{
    return models.deliveries.findAll({
        where: {
            CLIENT_ID: clientID,
            ISDELETED: false,
            DELIVERY_STATUS: "RETURN"
        },
        raw: true
    });
}

exports.findDeliveryByID = (deliveryID) => {
    return models.deliveries.findOne({
        where: {
            DELIVERY_ID: deliveryID,
            ISDELETED: false
        },
        raw: true
    });
}


exports.deleteSuccessDelivery = (deliveryID) => {
    return models.deliveries.update(
        {
        ISDELETED: true
        },
        {
            where: {
                DELIVERY_ID: deliveryID,
            }
        });
}

exports.findDeliveryByOrder = (orderID) => {
    return models.deliveries.findAll({
            where: {
                ORDER_ID: orderID,
                ISDELETED: false,
            },
            order: [
                ['DELIVERY_DAY', 'DESC'],
            ],
            raw: true
        });
}

exports.returnOrder = (deliveryID, note, date) => {
    return models.deliveries.update(
        {
            DELIVERY_STATUS: "RETURN",
            NOTE: note,
            DELIVERY_DAY: date
        },
        {
            where: {
                DELIVERY_ID: deliveryID,
            }
        });
}

exports.deleteOrder = (orderID) => {
    return models.orders.update(
        {
            ISDELETED: true
        },
        {
            where: {
                ORDER_ID: orderID,
            }
        });
}

exports.receiveOrder = (deliveryID, date) => {
    return models.deliveries.update(
        {
            DELIVERY_STATUS: "SUCCEED",
            DELIVERY_DAY: date
        },
        {
            where: {
                DELIVERY_ID: deliveryID,
            }
        });
}