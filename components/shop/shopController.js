
const shopService = require('./shopService');


const itemPrePage = 12;
let totalPage = 10;
let currentPage = 1;
let pageNumber = 0;
let filter = 0;
let search = "";
const noResult = "No Result Found :<";
let proCount = 0;
const outstonk = "Product is sold out";

exports.list = async (req, res, next) => {

    pageNumber = req.query.page;
    currentPage = (pageNumber && !Number.isNaN(pageNumber)) ? parseInt(pageNumber) : 1;
    currentPage = (currentPage > 0) ? currentPage : 1;
    search = req.query.search;
    
    filter = req.query.filter;
    filter = (filter && !Number.isNaN(filter)) ? parseInt(filter) : 0;
    filter = (filter > 0 && filter < 4) ? filter : 0;
    console.log(filter);

    let products = [];
    let prePage = 0;
    let nextPage = 0;
    if(filter == 0 ) {
        try{
            products = await shopService.list(search, currentPage - 1, itemPrePage);
            proCount = products.length;
            totalPage = Math.ceil(proCount/itemPrePage);
            currentPage = (currentPage <= totalPage) ? currentPage : totalPage
            if(totalPage === 1)
            {
                prePage = 1;
                nextPage = 1;
            }else if(currentPage === 1){
                prePage = 1;
                nextPage = 2;
            }else if(currentPage === totalPage){
                prePage = totalPage - 1;
                nextPage = totalPage;
            } else {
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
            }
        }
        
        catch(err){
            console.log(err);
            next();
        }
    }
    
    if(filter === 1)
    {
        try{
            products = await shopService.listPopular(search, currentPage - 1, itemPrePage);
            proCount = products.length;
            totalPage = Math.ceil(proCount/itemPrePage);
            currentPage = (currentPage <= totalPage) ? currentPage : totalPage
            if(totalPage === 1)
            {
                prePage = 1;
                nextPage = 1;
            }else if(currentPage === 1){
                prePage = 1;
                nextPage = 2;
            }else if(currentPage === totalPage){
                prePage = totalPage - 1;
                nextPage = totalPage;
            } else {
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
            }
        }
        
        catch(err){
            console.log(err);
            next();
        }
    } 

    if(filter === 2)
    {
        try{
            products = await shopService.listHighToLow(search, currentPage - 1, itemPrePage);
            proCount = products.length;
            totalPage = Math.ceil(proCount/itemPrePage);
            currentPage = (currentPage <= totalPage) ? currentPage : totalPage
            if(totalPage === 1)
            {
                prePage = 1;
                nextPage = 1;
            }else if(currentPage === 1){
                prePage = 1;
                nextPage = 2;
            }else if(currentPage === totalPage){
                prePage = totalPage - 1;
                nextPage = totalPage;
            } else {
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
            }
        }
        
        catch(err){
            console.log(err);
            next();
        }
    }

    if(filter === 3)
    {
        try{
            products = await shopService.listLowToHigh(search, currentPage - 1, itemPrePage);
            proCount = products.length;
            totalPage = Math.ceil(proCount/itemPrePage);
            currentPage = (currentPage <= totalPage) ? currentPage : totalPage;
            if(totalPage === 1)
            {
                prePage = 1;
                nextPage = 1;
            }else if(currentPage === 1){
                prePage = 1;
                nextPage = 2;
            }else if(currentPage === totalPage){
                prePage = totalPage - 1;
                nextPage = totalPage;
            } else {
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
            }
        }
        
        catch(err){
            console.log(err);
            next();
        }
        
    }
    // add product to cart
    const productID = req.query.cart;
    try{
        let stonk = await shopService.availableProduct(productID);
        if(stonk === false)
        {
            res.render('shop/shopList', {
                outstonk
                });
            return;
        } 
    }
    catch(err){
        console.log(err);
    }
    try{

    }
    catch(err){
        console.log(err);
        next();
    }

    if(products.length === 0)
    {
        res.render('shop/shopList', {
        noResult,
        filter,
        search
        });
    }
    else if(prePage === nextPage) {
        res.render('shop/shopList', {
            products,
            filter,
            search
            });
    }
    else {
        res.render('shop/shopList', {
            products,
            currentPage,
            prePage,
            nextPage,
            filter,
            search
            });
    }
};

let id = "P0001";

exports.detail = async (req, res, next) => {
    id = req.params.id;
    if(id===null || id==="")
    {
        id = "P0001";
    }
    Promise.all([shopService.detail(id), shopService.listNonPaging()])
    .then(([product_detail, products])=>{
        res.render('shop/shopDetail', {
            product_detail,
            products,
        });
    })
    .catch(err=>{
        console.log(err);
        next();
    });
};

const outstonk = "Product is sold out";
exports.addToCart = async (req, res, next) => {
    const productID = req.query.cart;
    try{
        let stonk = await shopService.availableProduct(productID);
        if(stonk === false)
        {
            res.render('shop/shopList', {
                outstonk
                });
            return;
        } 
    }
    catch(err){
        console.log(err);
    }
    try{

    }
    catch(err){
        console.log(err);
        next();
    }
};