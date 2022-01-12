const checkoutService = require('./checkoutService');

const emptyCart = "Cart is empty";
exports.checkout = async (req, res, next) => {
    let shipping = req.query.shippingOption;
    shipping = (shipping && !Number.isNaN(shipping)) ? parseInt(shipping) : 0;
    if(req.user)
    {
        let clientID = req.user.CLIENT_ID;
        console.log(clientID);
        try{
            const cart_products = await checkoutService.cart(clientID);
            console.log(cart_products.length);
            if(cart_products.length === 0)
            {
                console.log("ko co product trong cart");
                res.render('shop/checkout', {
                    emptyCart
                });
            }
            else{
                let product = [];
                let subtotal = 0;
                let discount = 0;
                let tax = 0;
                for(let i = 0; i < cart_products.length; i++)
                {
                    let product_id = cart_products[i].PRODUCT_ID;
                    try{
                        product[i] = await checkoutService.productInCart(product_id);
                        console.log(product[i]);
                        product[i].cartquantity = cart_products[i].QUANTITY;
                        product[i].totalprice = cart_products[i].QUANTITY * product[i].PRICE;
                        subtotal = subtotal + product[i].totalprice;
                        console.log("tim product");
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                discount = subtotal*0.1;
                tax = subtotal*0.05;
                const grandtotal = subtotal - discount + tax + shipping;
                res.render('shop/checkout', {
                    product,
                    subtotal,
                    discount,
                    tax,
                    shipping,
                    grandtotal
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