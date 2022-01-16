const {models} = require('../../models');
const { Op } = require('sequelize');

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

exports.deleteProductInCart = (productID, clientID) => {
    return models.carts.update(
        {
        ISDELETED: true,
        QUANTITY: 1
        },
        {
            where: {
                PRODUCT_ID: productID,
                CLIENT_ID: clientID,

            }
        });
}

exports.updateCart = (clientID, productID, quantity) => {
    return models.carts.update(
        {
        QUANTITY: quantity
        },
        {
            where: {
                PRODUCT_ID: productID,
                CLIENT_ID: clientID
            }
        });
}