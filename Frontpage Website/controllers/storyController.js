const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const Story = require('../models/story');
const storyDAO = require('../models/DAO/storyDAO');
const genreDAO = require('../models/DAO/genreDAO');
const authorDAO = require('../models/DAO/authorDAO');
const chapterDAO = require('../models/DAO/chapterDAO');

exports.story_list = async function(req,res)
{
    const storyList = await storyDAO.get_story_list();
    const authorList = await authorDAO.get_author_list();
    const genreList = await genreDAO.get_genre_list();
    res.render('stories/list',{
        pageTitle: 'Danh sách truyện',
        storyList: storyList,
        authorList:authorList,
        genreList:genreList
    })
};

exports.story_list_by_author = async function(req,res)
{
    const storyList = await storyDAO.get_story_list_by_author(req.params.id);
    const author = await authorDAO.get_author_by_id(req.params.id);
    const authorList = await authorDAO.get_author_list();
    const genreList = await genreDAO.get_genre_list();
    res.render('stories/list',{
        pageTitle: 'Danh sách truyện',
        storyList: storyList,
        authorList:authorList,
        author: author,
        genreList:genreList
    })
};

exports.story_list_by_genre = async function(req,res)
{
    const storyList = await storyDAO.get_story_list_by_genre(req.params.id);
    const genre = await genreDAO.get_genre_by_id(req.params.id);
    const authorList = await authorDAO.get_author_list();
    const genreList = await genreDAO.get_genre_list();
    res.render('stories/list',{
        pageTitle: 'Danh sách truyện',
        storyList: storyList,
        genre: genre,
        authorList: authorList,
        genreList: genreList
    })
};

exports.single_story_index = async function(req,res)
{
    const story = await storyDAO.get_story_by_id(req.params.id);
    const chapterList = await chapterDAO.get_chapter_list_by_story(story._id);
    const authorList = await authorDAO.get_author_list();
    const genreList = await genreDAO.get_genre_list();
    res.render('stories/single-story',{
        pageTitle: 'Truyện ' + story.name,
        story: story,
        chapterList: chapterList,
        authorList: authorList,
        genreList: genreList
    })
};