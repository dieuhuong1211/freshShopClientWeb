var express = require('express');
var router = express.Router();

const ShopController = require('./shopController');
const CartController = require('./cartController');
const ChekoutController = require('./checkoutController');
const OrderController = require('./orderController');

/* GET home page. */
router.get('/', ShopController.list);

router.get('/shopDetail/:id', ShopController.detail);
router.post('/shopDetail/:id', ShopController.addComment);


router.get('/cart', CartController.cart);
router.post('/cart', CartController.editCart);


router.get('/checkout', ChekoutController.checkout);
router.post('/checkout', ChekoutController.createOrder);

router.get('/myOrders', OrderController.myorder);
router.post('/myOrders', OrderController.editOrderPage);

router.get('/wishList', function(req, res, next) {
  res.render('shop/wishList', { title: 'Express' });
});


module.exports = router;