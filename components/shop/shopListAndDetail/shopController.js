
const shopService = require('./shopService');


const itemPrePage = 12;
let totalPage = 10;
let currentPage = 1;
let pageNumber = 0;
let filter = 0;
let search = "";
let cate = "";

const noResult = "No Result Found :<";
let proCount = 0;
const outstock = "Sorry, this product is sold out :<";
const carthaveproduct = "Your cart already has this product";
const addtocartsuccess = "Product successfully added to cart :>";
const now = new Date();
const today = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();


let products = [];
let prePage = 0;
let nextPage = 0;
let categories = [];

exports.list = async (req, res, next) => {
    
    pageNumber = req.query.page;
    currentPage = (pageNumber && !Number.isNaN(pageNumber)) ? parseInt(pageNumber) : 1;
    currentPage = (currentPage > 0) ? currentPage : 1;

    search = req.query.search;
    console.log("------search: ",search);
    

    filter = req.query.filter;
    filter = (filter && !Number.isNaN(filter)) ? parseInt(filter) : 0;
    filter = (filter > 0 && filter < 4) ? filter : 0;
    console.log("------filter: ",filter);

    cate = req.query.cate;
    console.log("------cate: ", cate);

    //count product by cate for layout 
    try{
        
        categories = await shopService.allCate();
        for(let i = 0; i < categories.length; i++)
        {
            const temp = await shopService.allProductByCate(categories[i].CATEGORY_ID);
            categories[i].count = temp.length;
        }
    }
    catch(err){
        console.log(err);
        next();
    }
    

    //filter + search + categori
    if(filter == 0 ) {
        try{
            products = await shopService.list(search, currentPage - 1, itemPrePage, cate);
            const allproduct = await shopService.listNonPaging(search, cate);
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
            products = await shopService.listPopular(search, currentPage - 1, itemPrePage, cate);
            const allproduct = await shopService.listNonPaging(search, cate);
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
            products = await shopService.listHighToLow(search, currentPage - 1, itemPrePage, cate);
            const allproduct = await shopService.listNonPaging(search, cate);
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
            products = await shopService.listLowToHigh(search, currentPage - 1, itemPrePage, cate);
            const allproduct = await shopService.listNonPaging(search, cate);
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
    
    if(products.length === 0)
    {
        console.log("part 3");

        res.render('shop/shopList', {
        noResult,
        filter,
        search,
        categories,
        cate
        });
    }
    else if(prePage === nextPage) {
        console.log("part 4");

        res.render('shop/shopList', {
            products,
            filter,
            search,
            categories,
            cate
            });
    }
    else if(prePage === currentPage)
    {
        console.log("part 5");
        res.render('shop/shopList', {
            products,
            currentPage,
            nextPage,
            filter,
            search,
            categories,
            cate
            });
    }
    else if(nextPage === currentPage)
    {
        console.log("part 6");
        res.render('shop/shopList', {
            products,
            currentPage,
            prePage,
            filter,
            search,
            categories,
            cate
            });
    }
    else {
        console.log("part 7");
        res.render('shop/shopList', {
            products,
            currentPage,
            prePage,
            nextPage,
            filter,
            search,
            categories,
            cate
            });
    }
}


exports.cart = async (req, res, next) => {
    // add product to cart
    const productID = req.body.cart;
    let clientID;
    if(req.user)
    {
        clientID = req.user.CLIENT_ID;
    }
    console.log("--------product: ", productID);
    let cartResult = outstock;
    if(productID && clientID)
    {
        try{ //in stock?
            let stock = await shopService.detail(productID);
            //console.log("stock "+stock.STOCK);
            if(stock.STOCK === "IN STOCK")
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
                    const cart = await shopService.restoreProductInCart(productID, clientID, 1);
                }
                else{
                    const cart = await shopService.addToCart(productID, clientID, 1);
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
                cartResult,
                categories
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
                cartResult,
                categories
                });
        }
        console.log("cartResult " + cartResult);
        return;
    }
    res.redirect('back');
}

let reviewitemperpage = 2;
const noReview = "There are no reviews yet";
exports.detail = async (req, res, next) => {
    id = req.params.id;
    let product_detail;
    let products;
    let review
    let clientID;
    if(req.user)
    {
        clientID = req.user.CLIENT_ID;
    }
    if(id===null || id==="")
    {
        return;
    }
    try{
        product_detail = await shopService.detail(id);
        //console.log(product_detail);
        product_detail.inCart = 0;
        if(clientID)
        {
            const inCart = await shopService.productInCart(product_detail.PRODUCT_ID, clientID);
            console.log("-------in cart:", inCart );
            if(inCart.length > 0)
            {
                product_detail.inCart = 1;
                console.log("code--------------",product_detail.inCart);
            }

        }
        const category = product_detail.CATEGORY;
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
                    //console.log(person);
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

    let clientalreadyreview = null;
    if(req.user)
    {
        const clientID = req.user.CLIENT_ID;
        try{
            clientalreadyreview = await shopService.clientAlreadyComment(id, clientID);
        }
        catch(err)
        {
            console.log(err);
            return next();
        }
    }
    
    

    if(review.length === 0)
    {
        console.log("no review");

        res.render('shop/shopDetail', {
            product_detail,
            products,
            noReview,
            clientalreadyreview
        });
    }
    else if(prePage === nextPage) {
        console.log("no paging");

        res.render('shop/shopDetail', {
            product_detail,
            products,
            review,
            clientalreadyreview
        });
    }
    else {
        console.log("review and paging");
        res.render('shop/shopDetail', {
            product_detail,
            products,
            review,
            clientalreadyreview,
            currentPage,
            prePage,
            nextPage,
            });
    }
};

exports.addCommentandCart = async (req, res, next) => {
    let clientID = null;
    let productID = req.params.id;
    if(req.user)
    {
        clientID = req.user.CLIENT_ID;
    }
    const review = req.body.comment;
    console.log("---------review: ", review);
    
    if(review.length > 0 && review)
    {
        try {
            const addComment = await shopService.addComment(productID, clientID, review, today);
            console.log(addComment);
            res.redirect('back');
        }
        catch(err){
            console.log(err);
            next();
        }
        res.redirect('back');
        return;
    }

    const quantity = req.body.quantity;
    console.log("---------quantity: ", quantity);
    if(quantity > 0)
    {
        try{
            const temp = await shopService.productInCartIsDelete(productID,clientID);
            if(temp.length > 0)
            {
                await shopService.restoreProductInCart(productID,clientID,quantity);
            }
            else 
            {
                await shopService.addToCart(productID,clientID,quantity);
            }
        }
        catch(err){
            console.log(err);
            next();
        }
        res.redirect('back');
        return;
    }
    res.redirect('back');
}
