var express = require('express');
var router = express.Router();

const ShopController = require('./shopController');

/* GET home page. */
router.get('/', ShopController.list);

router.get('/shopDetail/:id', ShopController.detail);

router.get('/cart', function(req, res, next) {
  res.render('shop/cart', { title: 'Express' });
});

router.get('/checkout', function(req, res, next) {
  res.render('shop/checkout', { title: 'Express' });
});

router.get('/wishList', function(req, res, next) {
  res.render('shop/wishList', { title: 'Express' });
});

module.exports = router;