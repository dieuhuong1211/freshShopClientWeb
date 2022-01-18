var express = require('express');
var router = express.Router();

const ShopController = require('./shopListAndDetail/shopController');
const CartController = require('./cart/cartController');
const ChekoutController = require('./checkout/checkoutController');
const OrderController = require('./order/orderController');

/* GET home page. */
router.get('/', ShopController.list);
router.post('/', ShopController.cart);

router.get('/shopDetail/:id', ShopController.detail);
router.post('/shopDetail/:id', ShopController.addCommentandCart);


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