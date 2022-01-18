const cartService = require('./cartService');

const emptyCart = "Cart is empty";
exports.cart = async (req, res, next) => {
    if(req.user)
    {
        let clientID = req.user.CLIENT_ID;
        console.log(clientID);
        try{
            const cart_products = await cartService.cart(clientID);
            //console.log(cart_products.length);
            if(cart_products.length === 0)
            {
                console.log("ko co product trong cart");
                res.render('shop/cart', {
                    emptyCart
                });
            }
            else{
                let product = [];
                let subtotal = 0;
                let discount = 0;
                for(let i = 0; i < cart_products.length; i++)
                {
                    let product_id = cart_products[i].PRODUCT_ID;
                    try{
                        product[i] = await cartService.productInCart(product_id);
                        //console.log(product[i]);
                        product[i].cartquantity = cart_products[i].QUANTITY;
                        product[i].totalprice = cart_products[i].QUANTITY * product[i].PRICE;
                        subtotal = subtotal + product[i].totalprice;
                        //console.log("tim product");
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                discount = subtotal*0.1;
                const grandtotal = subtotal - discount;
                res.render('shop/cart', {
                    product,
                    subtotal,
                    discount,
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

exports.editCart = async (req,res,next) => {
    let clientID = null;

    if(req.user)
    {
        clientID = req.user.CLIENT_ID;
        //console.log(clientID);
    }
    else {
        res.redirect('../auth/login');
        return;
    }

    const del_productID = req.body.delete;
    console.log(del_productID);

    let del;
    if(del_productID)
    {
        try{
            del = await cartService.deleteProductInCart(del_productID, clientID);
            console.log(del);

        }
        catch(err)
        {
            console.log(err);
            return next();
        }
        res.redirect('back');
        return;
    }
    let cart = [];
    try{
        cart = await cartService.cart(clientID);
    }
    catch(err){
        console.log(err);
        next();
    }
    console.log(cart.length);
    if(cart.length > 0)
    {
        const updateQuantity = req.body.quantity;
        console.log("updateQuantity: ", updateQuantity);
        if(cart.length === 1)
        {
            const quantity = parseInt(updateQuantity);
            const productID = cart[0].PRODUCT_ID;
            try{
                const update = await cartService.updateCart(clientID, productID, quantity);
            }
            catch(err){
                console.log(err);
                next();
            }
        }
        else{
            for(let i = 0; i < cart.length; i++)
            {
                const quantity = parseInt(updateQuantity[i]);
                const productID = cart[i].PRODUCT_ID;
                try{
                    const update = await cartService.updateCart(clientID, productID, quantity);
                }
                catch(err){
                    console.log(err);
                    next();
                }
            }
        }
        
    }
    res.redirect('back');
    
    
}
