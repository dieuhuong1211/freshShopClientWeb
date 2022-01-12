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