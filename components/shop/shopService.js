const {models} = require('../../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
exports.listNonPaging = (search) => {
    if(search !== "" && search !== undefined)
    {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
            ISDELETED: false

            },
            raw:true
        });
        
    }
    else {
        return models.products.findAll({
            where: {
                ISDELETED: false
            },
            order: Sequelize.literal('rand()'),
            raw:true
        });
    }
    
    
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
            PRODUCT_TYPE: type,
            ISDELETED: false
        },
        offset: page * itemPerPage, 
        limit: itemPerPage, 
        raw:true
    });
};

exports.detail = (id) => {
    return models.products.findOne({
        where: {
            PRODUCT_ID: id,
            ISDELETED: false
        },
        raw: true
    });
};


exports.addToCart = (productID, clientID) => {
    return models.carts.create({
        PRODUCT_ID: productID, 
        CLIENT_ID: clientID,
        QUANTITY: 1, 
        ISDELETED: false
    });
    
}

// exports.updateCart = (quantity, productID, clientID) => {
//     return models.carts.update(
//         {
//         QUANTITY: quantity,
//         },
//         { where: 
//             {
//             EMAIL: productID, 
//             CLIENT_ID: clientID,
//             }
//         }
//     );
    
// }
exports.productInCart = (productID) =>{
    return models.carts.findAll({
        where: {
            PRODUCT_ID: productID,
            ISDELETED: false

        },
        raw: true
    });
}
// exports.cart = (clientID) => {
//     return models.carts.findAll({
//         where: {
//             CLIENT_ID: clientID,
//             ISDELETED: false
//         },
//         raw: true
//     });
// }


