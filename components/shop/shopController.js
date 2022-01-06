
const shopService = require('./shopService');


const itemPrePage = 12;
let totalPage = 10;
let currentPage = 1;
let pageNumber = 0;
let filter = 0;
let search = "";
const noResult = "No Result Found :<";
let proCount = 0;

exports.list = async (req, res, next) => {

    pageNumber = req.query.page;
    currentPage = (pageNumber && !Number.isNaN(pageNumber)) ? parseInt(pageNumber) : 1;
    currentPage = (currentPage > 0) ? currentPage : 1;

    search = req.query.search;
    
    filter = req.query.filter;
    filter = (filter && !Number.isNaN(filter)) ? parseInt(filter) : 0;
    filter = (filter > 0 && filter < 4) ? filter : 0;


    if(filter===0 ) {
        Promise.all([shopService.list(search, currentPage - 1, itemPrePage)])
        .then(([products])=>{
            proCount = products.length;
            totalPage = Math.ceil(proCount/itemPrePage);
            currentPage = (currentPage <= totalPage) ? currentPage : totalPage
            let prePage = 0;
            let nextPage = 0;
            if(currentPage === 1){
                prePage = 1;
                nextPage = 2;
            }else if(currentPage === totalPage){
                prePage = totalPage - 1;
                nextPage = totalPage;
            } else {
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
            }
            if(products.length === 0)
            {
                res.render('shop/shopList', {
                noResult,
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
            
        })
        .catch(err=>{
            console.log(err);
            next();
        });
    }

    if(filter === 1)
    {
        Promise.all([shopService.listPopular(search, currentPage - 1, itemPrePage)])
        .then(([products])=>{
            
            proCount = products.length;
            totalPage = Math.ceil(proCount/itemPrePage);
            currentPage = (currentPage <= totalPage) ? currentPage : totalPage
            let prePage = 0;
            let nextPage = 0;
            if(currentPage === 1){
                prePage = 1;
                nextPage = 2;
            }else if(currentPage === totalPage){
                prePage = totalPage - 1;
                nextPage = totalPage;
            } else {
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
            }
            if(products.length === 0)
            {
                res.render('shop/shopList', {
                noResult,
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
        })
        .catch(err=>{
            console.log(err);
            next();
        });
    } 

    if(filter === 2)
    {
        Promise.all([shopService.listHighToLow(search, currentPage - 1, itemPrePage)])
        .then(([products])=>{
            proCount = products.length;
            totalPage = Math.ceil(proCount/itemPrePage);
            currentPage = (currentPage <= totalPage) ? currentPage : totalPage
            let prePage = 0;
            let nextPage = 0;
            if(currentPage === 1){
                prePage = 1;
                nextPage = 2;
            }else if(currentPage === totalPage){
                prePage = totalPage - 1;
                nextPage = totalPage;
            } else {
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
            }
            if(products.length === 0)
            {
                res.render('shop/shopList', {
                noResult,
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
        })
        .catch(err=>{
            console.log(err);
            next();
        });
    }

    if(filter === 3)
    {
        Promise.all([shopService.listLowToHigh(search, currentPage - 1, itemPrePage)])
        .then(([products])=>{
            proCount = products.length;
            totalPage = Math.ceil(proCount/itemPrePage);
            currentPage = (currentPage <= totalPage) ? currentPage : totalPage
            let prePage = 0;
            let nextPage = 0;
            if(currentPage === 1){
                prePage = 1;
                nextPage = 2;
            }else if(currentPage === totalPage){
                prePage = totalPage - 1;
                nextPage = totalPage;
            } else {
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
            }
            if(products.length === 0)
            {
                res.render('shop/shopList', {
                noResult,
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
        })
        .catch(err=>{
            console.log(err);
            next();
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
