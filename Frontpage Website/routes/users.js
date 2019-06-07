var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');

//Controllers
var userController = require('../controllers/userController');

router.get('/register', userController.register_get);
router.post('/register', userController.register_post);
router.get('/login',function(req,res,next){
    const errorMessages = res.locals.error[0];
    const successMsg = res.locals.success_msg[0];
    res.render('users/login',{
        errorMessages: errorMessages,
        successMsg: successMsg});
});

//POST login
//router.post('/login', customer_Controller.customer_login_post);
router.post('/login', passport.authenticate('local.signin',{
    successRedirect: '/',
    failureRedirect: '../login',
    failureFlash:true
}));

//logout
router.get('/logout',function(req,res,next){
    req.logout();
    res.redirect('/');
});
module.exports = router;
