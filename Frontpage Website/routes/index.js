var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

//Controllers
var homeController = require('../controllers/homeController');
/* GET home page. */
router.get('/', homeController.get_index);

router.get('/about', homeController.get_about);

module.exports = router;
