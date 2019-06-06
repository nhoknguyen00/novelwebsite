const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const Story = require('../models/story');
const storyDAO = require('../models/DAO/storyDAO');
const genreDAO = require('../models/DAO/genreDAO');
const authorDAO = require('../models/DAO/authorDAO');
const chapterDAO = require('../models/DAO/chapterDAO');

exports.get_index = async function(req,res)
{
    const storyList = await storyDAO.get_story_list();
    const authorList = await authorDAO.get_author_list();
    const genreList = await genreDAO.get_genre_list();
    res.render('index',{
        pageTitle: 'Trang chủ',
        storyList: storyList,
        authorList: authorList,
        genreList: genreList
    })
};

exports.get_about = async function(req,res)
{
    const authorList = await authorDAO.get_author_list();
    const genreList = await genreDAO.get_genre_list();
    res.render('index',{
        pageTitle: 'About me',
        authorList: authorList,
        genreList: genreList
    })
};