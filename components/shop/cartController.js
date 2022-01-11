const cartService = require('./cartService');

const emptyCart = "Cart is empty";
let clientID = "C0001";
exports.cart = async (req, res, next) => {
    
    //let clientID = req.user.CLIENT_ID;

    
    Promise.all([cartService.cart(clientID)])
        .then(([cart_products])=>{
            if(cart_products.length === 0)
            {
                res.render('shop/cart', {
                    emptyCart
                });
            }
            else{
                res.render('shop/cart', {
                    cart_products
                });
            }
            
        })
        .catch(err=>{
            console.log(err);
            next();
        }); 
};