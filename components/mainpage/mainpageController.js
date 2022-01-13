const mainpageService = require('./mainpageService');


const item = 24;

exports.list = async (req, res, next) => {

    Promise.all([mainpageService.list(item)])
    .then(([products])=>{
        res.render('index', {
            products,
            });
        
    })
    .catch(err=>{
        console.log(err);
        next();
    });
    // const emtycart = 0;
    // if(req.user)
    // {
    //     const clientID = req.user.CLIENT_ID;
    //     try{
    //         const cart_products = await mainpageService.cart(clientID);
    //         console.log(cart_products);
    //         if(cart_products.length === 0)
    //         {
    //             res.render('layout',{
    //                 emtycart
    //             })
    //         }
    //         else{
    //             let product = [];
    //             let subtotal = 0;
    //             for(let i = 0; i < cart_products.length; i++)
    //             {
    //                 let product_id = cart_products[i].PRODUCT_ID;
    //                 try{
    //                     product[i] = await mainpageService.productInCart(product_id);
    //                     console.log(product[i]);
    //                     product[i].cartquantity = cart_products[i].QUANTITY;
    //                     product[i].totalprice = cart_products[i].QUANTITY * product[i].PRICE;
    //                     subtotal = subtotal + product[i].totalprice;
                        
    //                 }
    //                 catch(err){
    //                     console.log(err);
    //                 }
    //             }
    //             res.render('layout',{
    //                 product,
    //                 subtotal,
    //             });
    //         }
    //     }
    //     catch(err)
    //     {
    //         console.log(err);
    //         next();
    //     }
    // }
};

