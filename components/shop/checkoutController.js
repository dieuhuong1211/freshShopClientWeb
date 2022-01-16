const checkoutService = require('./checkoutService');
const now = new Date();
const today = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
const time = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
const datetime = today +' '+ time;
const emptyCart = "Cart is empty";

let product = [];
let subtotal = 0;
let discount = 0;
let tax = 0;
let grandtotal = 0;
let cart_products = [];

exports.checkout = async (req, res, next) => {
    
    let shipping = 0;
    if(req.user)
    {
        let clientID = req.user.CLIENT_ID;
        console.log(clientID);
        try{
            cart_products = await checkoutService.cart(clientID);
            console.log(cart_products.length);
            if(cart_products.length === 0)
            {
                console.log("ko co product trong cart");
                res.render('shop/checkout', {
                    emptyCart
                });
            }
            else{
               
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
                tax = subtotal*0.02;
                grandtotal = subtotal - discount + tax + shipping;
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

exports.newOrder = async (req, res, next) => {
    console.log('---------------------------------begin new order---------------------------');
    let clientID;
    if(req.user)
        {
            clientID = req.user.CLIENT_ID;
        }
        else{
            res.redirect('../auth/login');
        }      
    let shipping = req.body.shippingOption;
    shipping = (shipping && !Number.isNaN(shipping)) ? parseInt(shipping) : 0;


    let address = req.body.address;
    const city = req.body.city;
    const district = req.body.district;
    const ward = req.body.ward;
    
    address = address + ', ' + ward + ', ' + district + ', ' + city;
    let newOD;
    try{
        newOD = await checkoutService.newOrder(datetime, address, clientID);
        console.log("--------newOD-------: ", newOD);
    }
    catch(err)
    {
        console.log(err);
        next();
    }
     
    const orderID = newOD.ORDER_ID;
    console.log(orderID);

    const productID = req.body.productID;
    console.log(productID);
    const quantity = req.body.quantity;
    const totalprice = req.body.totalprice;

    for(let i = 0; i < productID.length; i++)
    {
        try{
        
            const newODDetail = await checkoutService.newOrderDetail(orderID,productID[i],quantity[i],totalprice[i]);
            console.log(newODDetail);
        }
        catch(err)
        {
            console.log(err);
            next();
        }
    }

    try{
        
        const newDelv= await checkoutService.newDelivery(orderID, clientID, today);
        console.log(newDelv);
    }
    catch(err)
    {
        console.log(err);
        next();
    }

    const discount = req.body.discount;
    const tax = req.body.tax;
    const paymentMethod = req.body.paymentMethod;
    try{
        
        const newBil= await checkoutService.newBill(orderID, paymentMethod, discount, tax, shipping);
        console.log(newBil);
    }
    catch(err)
    {
        console.log(err);
        next();
    }

    try{
        
        const delcart = await checkoutService.deleteCart(clientID);
        console.log(delcart);
    }
    catch(err)
    {
        console.log(err);
        next();
    }
    cart_products = await checkoutService.cart(clientID);
    console.log(cart_products.length);
    // if(cart_products.length === 0)
    // {
    //     console.log("ko co product trong cart");
    //     res.render('shop/checkout', {
    //         emptyCart
    //     });
    // }
    // else{
    //     grandtotal = subtotal - discount + tax + shipping;
    //     res.render('shop/checkout', {
    //     product,
    //     subtotal,
    //     discount,
    //     tax,
    //     shipping,
    //     grandtotal
    //     });
    // }
    res.redirect('back');
    console.log('---------------------------------end new order---------------------------');
    
};