const {models} = require('../../models');
const { Op } = require('sequelize');
const { v1: uuidv1 } = require('uuid');
const now = new Date();

exports.cart = (clientID) => {
    return models.carts.findAll({
        where: {
            CLIENT_ID: clientID,
            ISDELETED: false

        },
        raw: true
    });
}

exports.productInCart = (productID) =>{
    return models.products.findOne({
        where: {
            PRODUCT_ID: productID,
            ISDELETED: false

        },
        raw: true
    });
}

exports.newOrder = (date, address, clientID) => {
    return models.orders.create({
        ORDER_ID: uuidv1(), 
        ORDER_DATE: date, 
        ADDRESS: address,
        MANAGER: null,
        CLIENT_ID: clientID,
        ISDELETED: false
    });
}

exports.newOrderDetail = (orderID, productID, quantity, price) => {
    return models.orders_detail.create({
        ORDER_ID: orderID, 
        PRODUCT_ID: productID, 
        QUANTITY: quantity,
        PRODUCTPRICE: price,
        ISDELETED: false
    });
}

exports.newDelivery = (orderID, clientID, date) => {
    return models.orders_detail.create({
        DELIVERY_ID: uuidv1(), 
        ORDER_ID: orderID, 
        CLIENT_ID: clientID,
        DELIVERY_DAY: date,
        DELIVERY_STATUS: PACKAGING,
        NOTE: null,
        MANAGER: null,
        ISDELETED: false
    });
}

exports.newBill = (orderID, payment, discount, tax, shipping) => {
    return models.bills.create({
        ORDER_ID: orderID, 
        PAYMENT: payment,
        DISCOUNT: discount,
        TAX: tax,
        SHIPPING_COST: shipping,
        ISDELETED: false
    });
}

exports.deleteCart = (clientID) => {
    return models.carts.update(
        {
            ISDELETED: true
        },
        {
            where: {
                CLIENT_ID: clientID,
            }
        });
}