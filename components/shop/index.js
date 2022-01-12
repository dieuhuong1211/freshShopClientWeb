var express = require('express');
var router = express.Router();

const ShopController = require('./shopController');
const CartController = require('./cartController');
const ChekoutController = require('./checkoutController');
const OrderController = require('./orderController');

/* GET home page. */
router.get('/', ShopController.list);

router.get('/shopDetail/:id', ShopController.detail);

router.get('/cart', CartController.cart);

router.get('/checkout', ChekoutController.checkout);

router.get('/myOrders', OrderController.delivery);

router.get('/wishList', function(req, res, next) {
  res.render('shop/wishList', { title: 'Express' });
});


module.exports = router;