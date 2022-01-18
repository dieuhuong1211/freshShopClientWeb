var express = require('express');
var router = express.Router();
const passport = require('../../auth/passport');

const multer  = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/images/clients/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) 
    }
  })
const upload = multer({ storage: storage });

const authController = require('./authController');

router.post('/login',
  passport.authenticate('local', 
  { successRedirect: '/',
  failureRedirect: '/auth/login?undefinedUser' }),
  function(req, res) { 
    if(req.user)
    {
      res.redirect('/');
    }
    else
      res.redirect('/auth/login');
  }
);

router.get('/login', function(req, res, next) {
  res.render('login', {undefinedUser: req.query.undefinedUser !==undefined});
});

router.get('/myAccount', authController.myAccount);

router.post('/myAccount',upload.single('uploaded_newfile')
, authController.updateAccount);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/auth/login');
});

router.post('/register', authController.register);

router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;