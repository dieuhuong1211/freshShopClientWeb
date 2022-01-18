var express = require('express');
var router = express.Router();
const passport = require('../../auth/passport')

const authController = require('./authController');

router.post('/login',
  passport.authenticate('local', 
  { successRedirect: '/',
  failureRedirect: '/auth/login?undefinedUser' }),
  function(req, res) { 
    if(req.user)
    {
      let lock = req.user.ISLOCK;
      let del = req.user.ISDELETED;
      console.log("------------lock: ", lock);

      if(lock === false && del === false)
      {
        res.redirect('/');
      }
      else
      {
        req.logout();
        res.render('login',{lockCode: true});
      }
    }
    else
      res.redirect('/auth/login');
  }
);

router.get('/login', function(req, res, next) {
  res.render('login', {undefinedUser: req.query.undefinedUser !==undefined});
});

router.get('/myAccount', authController.myAccount);

router.post('/myAccount', authController.updateAccount);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/auth/login');
});

router.post('/register', authController.register);

router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;