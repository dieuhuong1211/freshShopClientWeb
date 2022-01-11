var express = require('express');
var router = express.Router();

const ShopController = require('./shopController');
const CartController = require('./cartController');

/* GET home page. */
router.get('/', ShopController.list);

router.get('/shopDetail/:id', ShopController.detail);

//router.get('/cart', CartController.cart);
router.get('/cart', async function(req, res) {
  if(req.user)
  {
    try{
      await CartController.cart;
    } 
    catch(err)
    {
      console.log(err);
    }
  }
  else
    res.redirect('../auth/login');
});

router.get('/checkout', function(req, res, next) {
  res.render('shop/checkout', { title: 'Express' });
});

router.get('/wishList', function(req, res, next) {
  res.render('shop/wishList', { title: 'Express' });
});


module.exports = router;