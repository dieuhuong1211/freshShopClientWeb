const {models} = require('../../models');
const Sequelize = require('sequelize');

exports.cart = (clientID) => {
    return models.carts.findAll({
        where: {
            CLIENT_ID: clientID
        },
        raw: true
    });
}

exports.productInCart = (productID) =>{
    return models.products.findOne({
        where: {
            PRODUCT_ID: productID
        },
        raw: true
    });
}

exports.list = (item) => {
    return models.products.findAll({
        order: Sequelize.literal('rand()'),
        limit: item, 
        raw:true
    });
};