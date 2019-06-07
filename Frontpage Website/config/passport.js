const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signin',new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
},function (req,username,password,done) {

    User.findOne({username:username},function(err,user){
        if(err) {return done(err);}
        if(!user){
            req.flash('error','Tài khoản chưa được đăng ký.');
            return done(null,false,{message:'Tài khoản chưa được đăng ký.'});
        }
        if(!user.validPassword(password)){
            req.flash('error','Sai mật khẩu !!');
            return done(null,false,{message:'Sai mật khẩu'});
        }
        return done(null,user);
    })
}));