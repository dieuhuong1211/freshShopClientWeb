const {models} = require('../../models');
const { Op } = require("sequelize");

exports.list = (page, itemPerPage) => {
    return models.products.findAll({
        offset: page * itemPerPage, 
        limit: itemPerPage, 
        raw:true
    });
};

let proCount = 0;

exports.Count = () => {
     proCount = models.products.count({ col: 'PRODUCT_ID' });
    return proCount;
}

exports.Countbyfilter = (filter) => {
    if(filter === 1)
    {
         proCount = models.products.count({ 
            col: 'PRODUCT_ID' ,
            where: { 
                SOLD: {
                    [Op.gte]: 80,  
                }
            } 
        })
    } else {
         proCount = models.products.count({ col: 'PRODUCT_ID' });
    }
    return proCount;
}

exports.listPopular = (page, itemPerPage) => {
    return models.products.findAll({
        where: {
            SOLD: {
                [Op.gte]: 80,  
            }
        },
        offset: page * itemPerPage, 
        limit: itemPerPage, 
        raw:true
    });
};

exports.listHighToLow = (page, itemPerPage) => {
    return models.products.findAll({
        // Add order conditions here....
        order: [
            ['PRICE', 'DESC'],
        ],
        offset: page * itemPerPage, 
        limit: itemPerPage, 
        raw:true
    });
};

exports.listLowToHigh = (page, itemPerPage) => {
    return models.products.findAll({
        // Add order conditions here....
        order: [
            ['PRICE', 'ASC'],
        ],
        offset: page * itemPerPage, 
        limit: itemPerPage, 
        raw:true
    });
};

exports.category = (page, itemPerPage, type)=> {
    return models.products.findAll({
        where: {
            PRODUCT_TYPE: type
        },
        offset: page * itemPerPage, 
        limit: itemPerPage, 
        raw:true
    });
};

exports.detail = (id) => {
    return models.products.findAll({
        where: {
            PRODUCT_ID: id
        },
        raw: true
    });
};

