
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
                const productInCart = await shopService.productInCart(productID, clientID);
                const dummyInCart = await shopService.productInCartIsDelete(productID, clientID);
                //console.log("productInCart "+ productInCart.length);
                console.log(productInCart);
                console.log("dummyInCart: ",dummyInCart);

                if (productInCart.length > 0)
                {
                    cartResult = carthaveproduct;
                }
                else if(dummyInCart.length > 0)
                {
                    const cart = await shopService.restoreProductInCart(productID, clientID);
                }
                else{
                    const cart = await shopService.addToCart(productID, clientID);
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
        console.log("cartResult " + cartResult);
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
let reviewitemperpage = 3;
const noReview = "There are no reviews yet"
exports.detail = async (req, res, next) => {
    id = req.params.id;
    let product_detail;
    let products;
    let review
    if(id===null || id==="")
    {
        id = "P0001";
    }
    try{
        product_detail = await shopService.detail(id);
        console.log(product_detail);
        const category = product_detail.PRODUCT_TYPE;
        products = await shopService.listItemByCategory(category);
    }
    catch(err)
    {
        console.log(err);
        next();
    }

    const pageNumber = req.query.reviewpage;
    let currentPage = (pageNumber && !Number.isNaN(pageNumber)) ? parseInt(pageNumber) : 1;
    currentPage = (currentPage > 0) ? currentPage : 1;
    try{
        review = await shopService.review(id, currentPage - 1, reviewitemperpage);
        if(review.length > 0)
        {
            for(let i = 0; i < review.length; i++)
            {
                try{
                    const person = await shopService.personalReview(review[i].CLIENT_ID);
                    console.log(person);
                    review[i].name = person.FIRSTNAME + " " + person.LASTNAME;
                    review[i].personimage = person.IMAGE;
                    const daytime = new Date(review[i].REVIEWDATE);
                    if (!isNaN(daytime.getTime())) {
                        //get date
                        let d = daytime.getDate();
                        let m = daytime.getMonth() + 1;
                        let y = daytime.getFullYear();
                        review[i].date = d + '/' + m + '/' + y;
                    }
                }
                catch(err)
                {
                    console.log(err);
                    return next();
                }
            }

        }


        const allreview = await shopService.allReview(id);
        const revCount = allreview.length;
        totalPage = Math.ceil(revCount/reviewitemperpage);
        currentPage = (currentPage <= totalPage) ? currentPage : totalPage;
    }
    catch(err)
    {
        console.log(err);
        return next();
    }
    
    
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

    if(review.length === 0)
    {
        console.log("no review");

        res.render('shop/shopDetail', {
            product_detail,
            products,
            noReview,
        });
    }
    else if(prePage === nextPage) {
        console.log("no paging");

        res.render('shop/shopDetail', {
            product_detail,
            products,
            review,
        });
    }
    else {
        console.log("review and paging");
        res.render('shop/shopDetail', {
            product_detail,
            products,
            review,
            currentPage,
            prePage,
            nextPage,
            });
    }
};
