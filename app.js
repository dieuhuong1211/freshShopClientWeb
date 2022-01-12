const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var session = require('express-session');
var hbs = require("hbs")

const indexRouter = require('./components/mainpage');
const usersRouter = require('./routes/users');
const shopRouter = require('./components/shop');
const contactRouter = require('./routes/contact');
const galleryRouter = require('./routes/gallery');
const aboutRouter = require('./routes/about');
const authRouter = require('./components/auth/authRouter');
const registerRouter = require('./routes/register');

hbs.registerHelper("equal", require("handlebars-helper-equal"));
hbs.registerHelper('index_of', function(context,ndx) {
  return context[ndx];
});

const app = express();
const passport = require('./auth/passport')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler

app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);
app.use('/contact', contactRouter);
app.use('/gallery', galleryRouter);
app.use('/about', aboutRouter);
app.use('/auth', authRouter);
app.use('/register', registerRouter);


app.get("/sitemap", (req, res) => {

  res.status(301).redirect("https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Khoa+h%E1%BB%8Dc+T%E1%BB%B1+nhi%C3%AAn+TP.HCM/@10.762913,106.6821717,15z/data=!4m5!3m4!1s0x0:0x43900f1d4539a3d!8m2!3d10.762913!4d106.6821717")

})

app.get("/facebookNam", (req, res) => {

  res.status(301).redirect("https://www.facebook.com/nam.son.1069")

})

app.get("/facebookHuong", (req, res) => {

  res.status(301).redirect("https://www.facebook.com/nguyenhodieuhuong/")

})

app.get("/twitterNam", (req, res) => {

  res.status(301).redirect("https://twitter.com/fit524596")

})

app.get("/twitterHuong", (req, res) => {

  res.status(301).redirect("https://twitter.com/Ng_H_Dh1211")

})

app.get("/linkedin", (req, res) => {

  res.status(301).redirect("https://www.linkedin.com/")

})

app.get("/pinterest", (req, res) => {

  res.status(301).redirect("https://www.pinterest.com/booshopa2001/_saved/")

})

app.get("/instagramNam", (req, res) => {

  res.status(301).redirect("https://www.instagram.com/nuiz_sn/")

})

app.get("/instagramHuong", (req, res) => {

  res.status(301).redirect("https://www.instagram.com/Ng.H.Dhuong/")

})

app.get("/youtubeNam", (req, res) => {

  res.status(301).redirect("https://www.youtube.com/channel/UCg4xQhFOg1GjWFxKl2EfgIQ")

})

app.get("/youtubeHuong", (req, res) => {

  res.status(301).redirect("https://www.youtube.com/channel/UC1I3-8wpgVP4pgSJMo1y-eg")

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
