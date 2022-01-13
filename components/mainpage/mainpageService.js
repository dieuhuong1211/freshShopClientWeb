const {models} = require('../../models');
const Sequelize = require('sequelize');


exports.list = (item) => {
    return models.products.findAll({
        where: {
            ISDELETED: false
        },
        order: Sequelize.literal('rand()'),
        limit: item, 
        raw:true
    });
};

// exports.cart = (clientID) => {
//     return models.carts.findAll({
//         where: {
//             CLIENT_ID: clientID,
//             ISDELETED: false
//         },
//         raw: true
//     });
// }

// exports.productInCart = (productID) =>{
//     return models.products.findOne({
//         where: {
//             PRODUCT_ID: productID,
//             ISDELETED: false

//         },
//         raw: true
//     });
// }
