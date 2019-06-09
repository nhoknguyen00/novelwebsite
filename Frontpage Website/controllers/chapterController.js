const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const Story = require('../models/story');
const storyDAO = require('../models/DAO/storyDAO');
const chapterDAO = require('../models/DAO/chapterDAO');
const History = require('../models/history');

exports.read_chapter_get = async function(req,res){
    const chapter = await chapterDAO.get_chapter_by_id(req.params.id);
    const story = await chapterDAO.get_story_by_chapter(chapter.id);
    const chapterList = await chapterDAO.get_chapter_list_by_story(story.id);
    res.render('chapters/read',{
        pageTitle: chapter.name,
        chapter: chapter,
        chapterList: chapterList,
        chapterLength: chapter.content.length
    })
};

exports.read_chapter_post = function(req,res){
    if(req.isAuthenticated()) {
        mongoose.connect(mongoDB, function(error){
            if(error)
                throw error;
            let history = new History({
                _id: new mongoose.Types.ObjectId(),
                chapter: mongoose.Types.ObjectId(req.params.id),
                user: mongoose.Types.ObjectId(req.user._id),
                createdDate: Date.now()
            });
            history.save(function(error){
                if(error) throw error;
            });
        });
    }
    res.redirect('../chapters/'+req.params.id);
};