const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const User = require('../models/user');
const chapterDAO = require('../models/DAO/chapterDAO');
const storyDAO = require('../models/DAO/storyDAO');
const authorDAO = require('../models/DAO/authorDAO');
const genreDAO = require('../models/DAO/genreDAO');

exports.register_get = function(req,res)
{
    res.render('users/register',{pageTitle: 'Đăng ký'});
};

exports.register_post = async function(req,res)
{
    if(await User.findOne({username:req.body.username}))
    {
        res.render('users/register',{
            pageTitle: 'Đăng ký',
            errorMessage:'Tên tài khoản đã được dùng.'
        });
    }
    else
    {
        if(await User.findOne({email:req.body.email}))
        {
            res.render('users/register',{
                pageTitle: 'Đăng ký',
                errorMessage:'Email đã được dùng.'
            });
        }
        else
        {
            await mongoose.connect(mongoDB, function (error) {
                if (error)
                    throw error;
                let user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                });
                user.password = user.generateHash(req.body.inputPassword);
                user.save(function (error) {
                    if (error) throw error;
                    req.flash(
                        'success_msg',
                        'Bạn đã đăng ký thành công và có thể đăng nhập lúc này'
                    );
                    res.redirect('/login');
                });
            });
        }
    }
};

exports.get_profile = async function(req,res)
{
    const histories = await chapterDAO.get_read_chapters(req.user._id);
    const bookmarks = await storyDAO.get_bookmark_stories(req.user._id);
    const authorList = await authorDAO.get_author_list();
    const genreList = await genreDAO.get_genre_list();
    res.render('users/profile',{
        pageTitle: 'Thông tin người dùng',
        histories: histories,
        bookmarks: bookmarks,
        curCustomer: req.user,
        authorList: authorList,
        genreList: genreList,
    });
};