const cartService = require('./cartService');

const emptyCart = "Cart is empty";
exports.cart = async (req, res, next) => {
    if(req.user)
    {
        let clientID = req.user.CLIENT_ID;
    console.log(clientID);
    
    Promise.all([cartService.cart(clientID)])
        .then(([cart_products])=>{
            if(cart_products.length === 0)
            {
                res.render('shop/cart', {
                    emptyCart
                });
            }
            else{
                let product = [];
                for(let i = 0; i < cart_products.length; i++)
                {
                    let product_id = cart_products.PRODUCT_ID;
                    try{
                        product[i] = cartService.productInCart(product_id);
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                res.render('shop/cart', {
                    cart_products,
                    product
                });
            }
            
        })
        .catch(err=>{
            console.log(err);
            next();
        }); 
    }
    else {
        res.redirect('../auth/login');
    }
};