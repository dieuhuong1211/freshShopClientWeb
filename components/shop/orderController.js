const orderService = require('./orderService');
const emptyOrder = "You have not created any orders yet";
exports.delivery = async (req, res, next) => {
    if(req.user)
    {
        let clientID = req.user.CLIENT_ID;
        console.log(clientID);
        try{
            const orders = await orderService.order(clientID);
            console.log(orders.length);
            if(orders.length === 0)
            {
                console.log("ko co order nao");
                res.render('shop/myOrders', {
                    emptyOrder
                });
            }
            else{
                let products = [];
                let bills = [];
                let price = 0;
                let totalprice = 0;
               for(let i = 0; i < orders.length; i++)
               {
                    try{
                        products[i] = await orderService.productListInOrder(orders[i].ORDER_ID); 
                        //console.log(products[i]);
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
                        for(let j = 0; j < products[i].length; j++)
                        {
                            try{
                                const product_detail = await orderService.productDetail(products[i][j].PRODUCT_ID);
                                //console.log(product_detail);
                                products[i][j].image = product_detail.IMAGE;
                                products[i][j].name = product_detail.PRODUCT_NAME;
                                price = products[i][j].PRICE * products[i][j].QUANTITY;
                                products[i][j].price = price;
                                totalprice = totalprice + price;
                            }
                            catch(err){
                                console.log(err);
                            }
                        }
                        
                        orders[i].productList = products[i];
                    }
                    catch(err){
                        console.log(err);
                    }
                    try {
                        bills[i] = await orderService.bill(orders[i].ORDER_ID);
                        console.log(bills[i]);
                        totalprice = totalprice - bills[i].DISCOUNT + bills[i].TAX + bills[i].SHIPPING_COST;
                        console.log(totalprice); 
                        orders[i].discount = bills[i].DISCOUNT;
                        orders[i].tax =  bills[i].TAX;
                        orders[i].shipping = bills[i].SHIPPING_COST;
                        orders[i].totalprice = totalprice;
                        orders[i].payment = bills[i].PAYMENT;
                    }
                    catch(err) {
                        console.log(err);
                    }
                    
               }
                res.render('shop/myOrders', {
                    products,
                    orders,
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
    
}