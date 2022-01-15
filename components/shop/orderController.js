const orderService = require('./orderService');
const emptyOrder = "You have not created any orders yet";
const emptySuccess = "Not Found";
const emptyReturn = "Not Found";
let notfound = 0;

let orders = [];
let orders_products = [];
let success_products = [];
let success = [];
let returns_products = [];
let returns = [];
exports.myorder = async (req, res) => {
    
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

    //render orders on transit
    try{
        orders = await orderService.order(clientID);
        //console.log(orders.length);
        if(orders.length === 0)
        {
            console.log("ko co order nao");
            notfound = notfound + 1;
            // res.render('shop/myOrders', {
            //     emptyOrder
            // });
        }
        else{
            
            let bills = [];
            let price = 0;
            let totalprice = 0;
           for(let i = 0; i < orders.length; i++)
           {
                try{
                    orders_products[i] = await orderService.productListInOrder(orders[i].ORDER_ID); 
                    //console.log(orders_products[i]);
                    const daytime = new Date(orders[i].ORDER_DATE);
                    if (!isNaN(daytime.getTime())) {
                        //get date
                        let d = daytime.getDate();
                        let m = daytime.getMonth() + 1;
                        let y = daytime.getFullYear();
                        const d1 = d + 4;
                        orders[i].date = d + '/' + m + '/' + y;
                        orders[i].arrive = d1 + '/' + m + '/' + y;
                        //get time
                        let h = daytime.getHours();
                        let min = daytime.getMinutes();
                        let s = daytime.getSeconds();
                        orders[i].time = h + ':' + min + ':' + s;
                    }
                    for(let j = 0; j < orders_products[i].length; j++)
                    {
                        try{
                            const product_detail = await orderService.productDetail(orders_products[i][j].PRODUCT_ID);
                            //console.log(product_detail);
                            orders_products[i][j].image = product_detail.IMAGE;
                            orders_products[i][j].name = product_detail.PRODUCT_NAME;
                            price = orders_products[i][j].PRICE * orders_products[i][j].QUANTITY;
                            orders_products[i][j].price = price;
                            totalprice = totalprice + price;
                        }
                        catch(err){
                            console.log(err);
                        }
                    }
                    orders[i].totalprice = totalprice;
                    totalprice = 0;
                    orders[i].productList = orders_products[i];
                }
                catch(err){
                    console.log(err);
                }
                try {
                    bills[i] = await orderService.bill(orders[i].ORDER_ID);
                    //console.log(bills[i]);
                    orders[i].totalprice = orders[i].totalprice - bills[i].DISCOUNT + bills[i].TAX + bills[i].SHIPPING_COST;
                    orders[i].discount = bills[i].DISCOUNT;
                    orders[i].tax =  bills[i].TAX;
                    orders[i].shipping = bills[i].SHIPPING_COST;
                    
                    orders[i].payment = bills[i].PAYMENT;
                }
                catch(err) {
                    console.log(err);
                }
                
           }
            // res.render('shop/myOrders', {
            //     orders_products,
            //     orders,
            // });
        }
    }
    catch(err)
    {
        console.log(err);
        return;
    }
    //render succedd orders
    try{
        success = await orderService.deliverySuccess(clientID);
        //console.log(success.length);
        if(success.length === 0)
        {
            console.log("ko co don hang thanh cong nao");
            notfound = notfound + 1;
            // res.render('shop/myOrders', {
            //     emptySuccess
            // });
        }
        else{
            
            let bills = [];
            let price = 0;
            let totalprice = 0;
            for(let i = 0; i < success.length; i++)
            {
                try{
                    success_products[i] = await orderService.productListInOrder(success[i].ORDER_ID); 
                    console.log(success_products[i]);
                    const daytime = new Date(success[i].DELIVERY_DAY);
                    if (!isNaN(daytime.getTime())) {
                        //get date
                        let d = daytime.getDate();
                        let m = daytime.getMonth() + 1;
                        let y = daytime.getFullYear();
                        success[i].arrive = d + '/' + m + '/' + y;
                        
                    }
                    for(let j = 0; j < success_products[i].length; j++)
                    {
                        try{
                            const product_detail = await orderService.productDetail(success_products[i][j].PRODUCT_ID);
                            //console.log(product_detail);
                            success_products[i][j].image = product_detail.IMAGE;
                            success_products[i][j].name = product_detail.PRODUCT_NAME;
                            price = success_products[i][j].PRICE * success_products[i][j].QUANTITY;
                            success_products[i][j].price = price;
                            totalprice = totalprice + price;
                        }
                        catch(err){
                            console.log(err);
                        }
                    }
                    success[i].totalprice = totalprice;
                    totalprice = 0;
                    success[i].productList = success_products[i];
                }
                catch(err){
                    console.log(err);
                }
                try{
                    const orderbyid = await orderService.orderByID(success[i].ORDER_ID);
                    const daytime = new Date(orderbyid.ORDER_DATE);
                    if (!isNaN(daytime.getTime())) {
                        //get date
                        let d = daytime.getDate();
                        let m = daytime.getMonth() + 1;
                        let y = daytime.getFullYear();
                        success[i].orderday = d + '/' + m + '/' + y;
                        
                    }
                }
                catch(err){
                    console.log(err);
                }
                try {
                    bills[i] = await orderService.bill(success[i].ORDER_ID);
                    //console.log(bills[i]);
                    success[i].totalprice = success[i].totalprice - bills[i].DISCOUNT + bills[i].TAX + bills[i].SHIPPING_COST;
                    success[i].discount = bills[i].DISCOUNT;
                    success[i].tax =  bills[i].TAX;
                    success[i].shipping = bills[i].SHIPPING_COST;
                }
                catch(err) {
                    console.log(err);
                }
                    
            }
            // res.render('shop/myOrders', {
            //     success_products,
            //     success,
            // });
        }
    }
    catch(err)
    {
        console.log(err);
        return;
    }
    //render returned orders
    try{
        returns = await orderService.returnOrder(clientID);
        console.log(returns.length);
        if(returns.length === 0)
        {
            console.log("ko co don tra hang nao");
            notfound = notfound + 1;
            
        }
        else{
            
            let bills = [];
            let price = 0;
            let totalprice = 0;
            for(let i = 0; i < returns.length; i++)
            {
                try{
                    returns_products[i] = await orderService.productListInOrder(returns[i].ORDER_ID); 
                    console.log("don tra hang");
                    console.log(returns_products[i]);
                    const daytime = new Date(returns[i].DELIVERY_DAY);
                    if (!isNaN(daytime.getTime())) {
                        //get date
                        let d = daytime.getDate();
                        let m = daytime.getMonth() + 1;
                        let y = daytime.getFullYear();
                        returns[i].arrive = d + '/' + m + '/' + y;
                        
                    }
                    for(let j = 0; j < returns_products[i].length; j++)
                    {
                        try{
                            const product_detail = await orderService.productDetail(returns_products[i][j].PRODUCT_ID);
                            //console.log(product_detail);
                            returns_products[i][j].image = product_detail.IMAGE;
                            returns_products[i][j].name = product_detail.PRODUCT_NAME;
                            price = returns_products[i][j].PRICE * returns_products[i][j].QUANTITY;
                            returns_products[i][j].price = price;
                            totalprice = totalprice + price;
                        }
                        catch(err){
                            console.log(err);
                        }
                    }
                    returns[i].totalprice = totalprice;
                    totalprice = 0;
                    returns[i].productList = returns_products[i];
                }
                catch(err){
                    console.log(err);
                }
                try{
                    const orderbyid = await orderService.orderByID(returns[i].ORDER_ID);
                    const daytime = new Date(orderbyid.ORDER_DATE);
                    if (!isNaN(daytime.getTime())) {
                        //get date
                        let d = daytime.getDate();
                        let m = daytime.getMonth() + 1;
                        let y = daytime.getFullYear();
                        returns[i].returnday = d + '/' + m + '/' + y;
                        
                    }
                }
                catch(err){
                    console.log(err);
                }
                try {
                    bills[i] = await orderService.bill(returns[i].ORDER_ID);
                    console.log(bills[i]);
                    returns[i].totalprice = returns[i].totalprice - bills[i].DISCOUNT + bills[i].TAX + bills[i].SHIPPING_COST;
                    returns[i].discount = bills[i].DISCOUNT;
                    returns[i].tax =  bills[i].TAX;
                    returns[i].shipping = bills[i].SHIPPING_COST;
                }
                catch(err) {
                    console.log(err);
                }
                    
            }
          
        }
    }
    catch(err)
    {
        console.log(err);
        return;
    }


    switch(notfound){
        case 1:
        {
            if(orders.length === 0)
            {
                res.render('shop/myOrders', {
                    emptyOrder,

                    success,

                    returns
                });
            }
            else if(success.length === 0)
            {
                res.render('shop/myOrders', {
                    emptySuccess,

                    orders,

                    returns
                });
            }
            else
            {
                res.render('shop/myOrders', {
                    emptyReturn,

                    orders,

                    success,
                });
            }
            
        }
        case 2:
        {
            if(orders.length > 0)
            {
                res.render('shop/myOrders', {
                    emptySuccess,
                    emptyReturn,

                    orders,
                });
            }
            else if(success.length > 0)
            {
                res.render('shop/myOrders', {
                    emptyOrder,
                    emptyReturn,

                    success,
                });
            }
            else {
                res.render('shop/myOrders', {
                    emptySuccess,
                    emptyOrder,

                    returns
                });
            }
           
        }
        case 3:
        {
            res.render('shop/myOrders', {
                emptySuccess,
                emptyOrder,
                emptyReturn
            });
        }
        default:
            res.render('shop/myOrders', {

                orders,
 
                success,
   
                returns
            });
           
    }
}

exports.editOrderPage = async (req,res,next) => {
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

    const deliveryID = req.body.deleteRecieved;
    let delivery;
    if(deliveryID)
    {
        try{
            delivery = await orderService.findDeliveryByID(deliveryID);
            
        }
        catch(err)
        {
            console.log(err);
        }
    }
    
}



