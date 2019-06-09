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
router.post('/login', passport.authenticate('local.signin',{
    successRedirect: '/',
    failureRedirect: '../login',
    failureFlash:true
}));
router.get('/logout',isLoggedIn,function(req,res,next){
    req.logout();
    res.redirect('/');
});
router.get('/profile',isLoggedIn,userController.get_profile);
module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Xin hãy đăng nhập để tiếp tục!!');
    res.redirect('/login');
}