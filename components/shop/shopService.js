const {models} = require('../../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
exports.listNonPaging = (item = 25) => {
    return models.products.findAll({
        where: {
            ISDELETED: false
        },
        order: Sequelize.literal('rand()'),
        limit: item, 
        raw:true
    });
    
}

exports.list = (search, page, itemPerPage) => {
    if(search !== "" && search !== undefined)
    {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
            ISDELETED: false

            },
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
    else {
        return models.products.findAll({
            where: {
            ISDELETED: false
            },
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
};

let proCount = 0;

exports.Count = () => {
     proCount = models.products.count({ col: 'PRODUCT_ID' });
    return proCount;
}

exports.listPopular = (search, page, itemPerPage) => {
    if (search !== "")
    {
        return models.products.findAll({
            where: {
                SOLD: {
                    [Op.gte]: 80,  
                },
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
                ISDELETED: false
                
            },
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
    else
    {
        return models.products.findAll({
            where: {
                SOLD: {
                    [Op.gte]: 80,  
                },
                ISDELETED: false
            },
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
};

exports.listHighToLow = (search, page, itemPerPage) => {
    if (search !== "") {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
                ISDELETED: false
                
            },
            order: [
                ['PRICE', 'DESC'],
            ],
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
    else{
        return models.products.findAll({
            where: {
                ISDELETED: false
            },
            order: [
                ['PRICE', 'DESC'],
            ],
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
};

exports.listLowToHigh = (search, page, itemPerPage) => {
    if(search !== "")
    {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
                ISDELETED: false
            },
            order: [
                ['PRICE', 'ASC'],
            ],
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
    else
    {
        return models.products.findAll({
            where: {
                ISDELETED: false
            },
            order: [
                ['PRICE', 'ASC'],
            ],
            
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
    
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

