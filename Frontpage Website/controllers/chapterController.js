const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const Story = require('../models/story');
const storyDAO = require('../models/DAO/storyDAO');
const chapterDAO = require('../models/DAO/chapterDAO');

exports.read_chapter = async function(req,res){
    const chapter = await chapterDAO.get_chapter_by_id(req.params.id);
    const story = await chapterDAO.get_story_by_chapter(chapter.id);
    const chapterList = await chapterDAO.get_chapter_list_by_story(story.id);
    console.log(chapter);
    res.render('chapters/read',{
        pageTitle: chapter.name,
        chapter: chapter,
        chapterList: chapterList,
        chapterLength: chapter.content.length
    })
};