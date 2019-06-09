const Chapter = require('../chapter');
const Story = require('../story');
const User = require('../user');
const History = require('../history');

exports.get_chapter_list = ()=>{
    var mysort = {name:1};
    return Chapter.find().populate('story').sort(mysort);
};

exports.get_newest_chapter_list = async () =>{
    return Chapter.find().populate('story').sort({createdDate: -1}).limit(5);
};

exports.get_chapter_by_id = id =>{
    return Chapter.findOne({_id: id}).populate('story');
};

exports.get_chapter_list_by_story = async id => {
    const storyObj = await Story.findOne({_id: id});
    var mysort = {name:1};
    return Chapter.find({story: storyObj}).populate('story').sort(mysort);
};

exports.get_story_by_chapter = async id => {
    const chapterObj = await Chapter.findOne({_id: id});
    return Story.findOne({_id: chapterObj.story});
};

exports.get_read_chapters = async id => {
    const userObj = await User.findOne({_id: id});
    return History.find({user: userObj}).populate('chapter').sort({createdDate: -1}).limit(8);
};

