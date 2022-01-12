const cartService = require('./cartService');

const emptyCart = "Cart is empty";
exports.cart = async (req, res, next) => {
    if(req.user)
    {
        let clientID = req.user.CLIENT_ID;
        console.log(clientID);
        try{
            const cart_products = await cartService.cart(clientID);
            console.log(cart_products.length);
            if(cart_products.length === 0)
            {
                console.log("ko co product trong cart");
                res.render('shop/cart', {
                    emptyCart
                });
            }
            else{
                let product = [];
                for(let i = 0; i < cart_products.length; i++)
                {
                    let product_id = cart_products[i].PRODUCT_ID;
                    try{
                        product[i] = await cartService.productInCart(product_id);
                        console.log(product[i]);
                        product[i].cartquantity = cart_products[i].QUANTITY;
                        product[i].totalprice = cart_products[i].QUANTITY * product[i].PRICE;
                        console.log("tim product");
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                res.render('shop/cart', {
                    product
                });
            }
        }
        catch(err)
        {
            console.log(err);
        }
        
    }
    else {
        res.redirect('../auth/login');
    }
};