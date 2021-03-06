const checkoutService = require('./checkoutService');
const { v1: uuidv1 } = require('uuid');

const now = new Date();
const today = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
const time = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
const datetime = today +' '+ time;
let emptyCart;


const shipping = 10;

exports.checkout = async (req, res, next) => {
    let cart_products = [];
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
                emptyCart = 1;
                res.render('shop/checkout', {
                    emptyCart
                });
                return;
            }
            else{
                let product = [];
                let subtotal = 0;
                let discount = 0;
                let tax = 0;
                let grandtotal = 0;
                
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
                discount = parseFloat(subtotal*0.1).toFixed(2);
                tax = parseFloat(subtotal*0.02).toFixed(2);
                grandtotal = (subtotal - discount) + parseFloat(tax) + parseFloat(shipping);
                grandtotal = parseFloat(grandtotal).toFixed(2);
                res.render('shop/checkout', {
                    product,
                    subtotal,
                    discount,
                    tax,
                    grandtotal
                });
                return;
            }
        }
        catch(err)
        {
            console.log(err);
        }
        
    }
    else {
        res.redirect('../auth/login');
        return;
    }
};

exports.createOrder = async (req, res, next) => {
    console.log('---------------------------------begin new order---------------------------');
    let clientID;
    if(req.user)
    {
        clientID = req.user.CLIENT_ID;
    }
    else{
        res.redirect('../auth/login');
        return;
    }      

    // let shipping = req.body.shippingOption;
    // shipping = (shipping && !Number.isNaN(shipping)) ? parseInt(shipping) : 0;

    
    let address = req.body.address;
    const city = req.body.city;
    const district = req.body.district;
    const ward = req.body.ward;
    
    address = address + ', ' + ward + ', ' + district + ', ' + city;
    console.log("--------address-------: ", address);
    const orderID = uuidv1();
    console.log("--------id-------: ",orderID);
    try{
        const newOD = await checkoutService.newOrder(orderID, datetime, address, clientID);
        //console.log("--------newOD-------: ", newOD);
    }
    catch(err)
    {
        console.log(err);
        next();
    }
     
    // const orderID = newOD.ORDER_ID;
    // console.log(orderID);
    const productID = req.body.productID;
    console.log(productID);console.log("length: ", productID.length);
    const quantity = req.body.quantity;
    console.log(quantity);console.log("length: ", quantity.length);

    const totalprice = req.body.totalprice;
    console.log(totalprice);console.log("length: ", totalprice.length);

    if (productID.length === quantity.length)
    {
        for(let i = 0; i < productID.length; i++)
        {
            try{
                console.log("--------productID[i]-------: ", productID[i]);
                const id = productID[i];
                const quan = parseInt(quantity[i]);
                const pri = parseInt(totalprice[i]);
                const newODDetail = await checkoutService.newOrderDetail(orderID, id ,quan,pri);
                console.log("--------newODDetail-------: ", newODDetail);

            }
            catch(err)
            {
                console.log(err);
                next();
            }
        }
    }  
    else
    {
        try{
            console.log("--------productID-------: ", productID);
            const id = productID;
            const quan = parseInt(quantity);
            const pri = parseInt(totalprice);
            const newODDetail = await checkoutService.newOrderDetail(orderID, id ,quan,pri);
            console.log("--------newODDetail-------: ", newODDetail);

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

    const discount = parseFloat(req.body.discount).toFixed(2);
    const tax = parseFloat(req.body.tax).toFixed(2);
    const paymentMethod = req.body.paymentMethod;
    try{
        
        const newBil = await checkoutService.newBill(orderID, paymentMethod, discount, tax, shipping);
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
    emptyCart = 2;
    res.render('shop/checkout', {
        emptyCart
    });
    
    console.log('---------------------------------end new order---------------------------');
    
};