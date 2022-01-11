const mainpageService = require('./mainpageService');

const emptyCart = "Cart is empty";
// exports.cart = async (req, res, next) => {
//     if(req.user)
//     {
//         const clientID = user.CLIENT_ID;
//         Promise.all([mainpageService.cart(clientID), mainpageService.listNonPaging()])
//         .then(([product_detail, products])=>{
//             res.render('shop/shopDetail', {
//                 product_detail,
//                 products,
//             });
//         })
//         .catch(err=>{
//             console.log(err);
//             next();
//         });
//     }
        
// };
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
};