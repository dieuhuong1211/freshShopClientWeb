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