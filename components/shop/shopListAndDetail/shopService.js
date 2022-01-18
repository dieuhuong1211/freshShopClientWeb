const {models} = require('../../../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
exports.listItemByCategory = (category) => {
    return models.products.findAll({
        where: {
            ISDELETED: false,
            CATEGORY: category
        },
        order: Sequelize.literal('rand()'),
        raw:true
    });
};
exports.listNonPaging = (search, cate) => {
    if((search !== "" && search ) && (cate !== "" && cate ))
    {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
                CATEGORY: cate,
                ISDELETED: false

            },
            raw:true
        });
        
    }
    else if(search !== "" && search )
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
    else if(cate !== "" && cate )
    {
        return models.products.findAll({
            where: {
                CATEGORY: cate,
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
//--------- begin filter & search & cate -------
exports.list = (search, page, itemPerPage, cate) => {
    if((search !== "" && search ) && (cate !== "" && cate ))
    {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
                CATEGORY: cate,
                ISDELETED: false

            },
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
        
    }
    else if(search !== "" && search )
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
    else if(cate !== "" && cate )
    {
        return models.products.findAll({
            where: {
                CATEGORY: cate,
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

exports.listPopular = (search, page, itemPerPage, cate) => {
    if((search !== "" && search ) && (cate !== "" && cate ))
    {
        return models.products.findAll({
            where: {
                SOLD: {
                    [Op.gte]: 80,  
                },
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
                CATEGORY: cate,
                ISDELETED: false
                
            },
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
        
    }
    else if(search !== "" && search )
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
    else if(cate !== "" && cate )
    {
        return models.products.findAll({
            where: {
                SOLD: {
                    [Op.gte]: 80,  
                },
                CATEGORY: cate,
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

exports.listHighToLow = (search, page, itemPerPage, cate) => {
    if((search !== "" && search ) && (cate !== "" && cate ))
    {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
                CATEGORY: cate,
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
    else if(search !== "" && search )
    {
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
    else if(cate !== "" && cate )
    {
        return models.products.findAll({
            where: {
                CATEGORY: cate,
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
    else {
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

exports.listLowToHigh = (search, page, itemPerPage, cate) => {
    if((search !== "" && search ) && (cate !== "" && cate ))
    {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
                CATEGORY: cate,
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
    else if(search !== "" && search )
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
    else if(cate !== "" && cate )
    {
        return models.products.findAll({
            where: {
                CATEGORY: cate,
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
    else {
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
//---------end filter & search -------

exports.allCate = ()=> {
    return models.categories.findAll({
        raw:true
    });
}

exports.allProductByCate = (type) => {
    
    return models.products.findAll({
        where: {
            CATEGORY: type,
            ISDELETED: false
        }, 
        raw:true
    });
    
}

exports.category = (search, page, itemPerPage, type)=> {
    if(search !== "" && search)
    {
        return models.products.findAll({
            where: {
                PRODUCT_NAME: {
                    [Op.like]: '%' + search + '%'
                },
            ISDELETED: false,
            CATEGORY: type
            },
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
    else {
        return models.products.findAll({
            where: {
                CATEGORY: type,
                ISDELETED: false
            },
            offset: page * itemPerPage, 
            limit: itemPerPage, 
            raw:true
        });
    }
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

exports.review = (productID, page, itemPerPage) => {
    return models.reviews.findAll({
        where: {
            PRODUCT_ID: productID,
            ISDELETED: false
        },
        offset: page * itemPerPage, 
        limit: itemPerPage, 
        raw: true
    });
}
exports.allReview = (productID) => {
    return models.reviews.findAll({
        where: {
            PRODUCT_ID: productID,
            ISDELETED: false
        },
        raw: true
    });
}

exports.personalReview = (clientID) => {
    return models.clients.findOne({
        where: {
            CLIENT_ID: clientID,
            ISDELETED: false
        },
        raw: true
    });
}

exports.addToCart = (productID, clientID) => {
    
    return models.carts.create({
        PRODUCT_ID: productID, 
        CLIENT_ID: clientID,
        QUANTITY: 1, 
        ISDELETED: false
    });
    
}

exports.productInCart = (productID, clientID) =>{
    return models.carts.findAll({
        where: {
            PRODUCT_ID: productID,
            CLIENT_ID: clientID,
            ISDELETED: false

        },
        raw: true
    });
}

exports.productInCartIsDelete = (productID, clientID) =>{
    return models.carts.findAll({
        where: {
            PRODUCT_ID: productID,
            CLIENT_ID: clientID,

            ISDELETED: true

        },
        raw: true
    });
}

exports.clientAlreadyComment = (productID, clientID) => {
    return models.reviews.findOne({
        where: {
            CLIENT_ID: clientID,
            PRODUCT_ID: productID,
            ISDELETED: false
        },
        raw: true
    });
}

exports.restoreProductInCart = (productID, clientID) => {
    return models.carts.update(
        {
        ISDELETED: false
        },
        {
            where: {
                PRODUCT_ID: productID,
                CLIENT_ID: clientID,

            }
        });
}

exports.addComment = (productID, clientID, review, date) => {
    return models.reviews.create({
        PRODUCT_ID: productID, 
        CLIENT_ID: clientID,
        REVIEW: review,
        REVIEWDATE: date,
        ISDELETED: false
    });
}

