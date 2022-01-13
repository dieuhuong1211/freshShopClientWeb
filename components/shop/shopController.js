
const shopService = require('./shopService');


const itemPrePage = 12;
let totalPage = 10;
let currentPage = 1;
let pageNumber = 0;
let filter = 0;
let search = "";
const noResult = "No Result Found :<";
let proCount = 0;
const outstonk = "Sorry, this product is sold out :<";
const carthaveproduct = "Your cart already has this product";
const addtocartsuccess = "Product successfully added to cart :>";


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
            const allproduct = await shopService.listNonPaging(search);
            proCount = allproduct.length;
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
    
    if(filter === 1)
    {
        try{
            products = await shopService.listPopular(search, currentPage - 1, itemPrePage);
            const allproduct = await shopService.listNonPaging(search);
            proCount = allproduct.length;
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
            const allproduct = await shopService.listNonPaging(search);
            proCount = allproduct.length;
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
            const allproduct = await shopService.listNonPaging(search);
            proCount = allproduct.length;
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
    let clientID;
    if(req.user)
    {
        clientID = req.user.CLIENT_ID;
    }
    let cartResult = outstonk;
    if(productID && clientID)
    {
        try{ //in stonk?
            let stonk = await shopService.detail(productID);
            //console.log("stonk "+stonk.STOCK);
            if(stonk.STOCK === "IN STOCK")
            {
                cartResult = addtocartsuccess;
                const productInCart = await shopService.productInCart(productID);
                //console.log("productInCart "+ productInCart.length);
                console.log(productInCart);
                if (productInCart.length > 0)
                {
                    cartResult = carthaveproduct;
                }
                else{
                    try{
                    const cart = await shopService.addToCart(productID, clientID);
                    //console.log("cart " + cart);
                    }
                    catch(err){
                        console.log(err);
                        next();
                    }
                }
            } 
        }
        catch(err){
            console.log(err);
        }
        if(prePage === nextPage) {
            console.log("part 1");
            res.render('shop/shopList', {
                products,
                filter,
                search,
                cartResult
                });
        }
        else {
            console.log("part 2");

            res.render('shop/shopList', {
                products,
                currentPage,
                prePage,
                nextPage,
                filter,
                search,
                cartResult
                });
        
        }
        console.log("alehoyaaaaaa " + cartResult);
        return;
    }
    
    if(products.length === 0)
    {
        console.log("part 3");

        res.render('shop/shopList', {
        noResult,
        filter,
        search,
        });
    }
    else if(prePage === nextPage) {
        console.log("part 4");

        res.render('shop/shopList', {
            products,
            filter,
            search,
            });
    }
    else {
        console.log("part 5");
        res.render('shop/shopList', {
            

            products,
            currentPage,
            prePage,
            nextPage,
            filter,
            search,
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

// const outstonk = "Product is sold out";
// exports.addToCart = async (req, res, next) => {
//     const productID = req.query.cart;
//     try{
//         let stonk = await shopService.availableProduct(productID);
//         if(stonk === false)
//         {
//             res.render('shop/shopList', {
//                 outstonk
//                 });
//             return;
//         } 
//     }
//     catch(err){
//         console.log(err);
//     }
//     try{

//     }
//     catch(err){
//         console.log(err);
//         next();
//     }
// };