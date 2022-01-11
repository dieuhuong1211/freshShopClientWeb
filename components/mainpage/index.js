var express = require('express');
var router = express.Router();
const mainpageController = require('./mainpageController');

/* GET home page. */
router.get('/', mainpageController.list);

module.exports = router;
