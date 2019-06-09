const Story = require('../story');
const Author = require('../author');
const Genre = require('../genre');
const User = require('../user');
const Bookmark = require('../bookmark');

exports.get_story_list = ()=>{
    var mysort = {name:1};
    return Story.find().populate('genre author').sort(mysort);
};

exports.get_most_viewed_story_list = ()=>{
    return Story.find().populate('genre author').sort({views: -1}).limit(4);
};

exports.get_finished_story_list = ()=>{
    return Story.find({finished:"Hoàn thành"}).populate('genre author');
};


exports.get_story_by_id = id =>{
    return Story.findOne({_id: id}).populate('genre author');
};

exports.get_story_list_by_author = async id => {
    const authorObj = await Author.findOne({_id: id});
    var mysort = {name:1};
    return Story.find({author: authorObj}).populate('genre author').sort(mysort);
};

exports.get_story_list_by_genre = async id => {
    const genreObj = await Genre.findOne({_id: id});
    var mysort = {name:1};
    return Story.find({genre: genreObj}).populate('genre author').sort(mysort);
};

exports.get_bookmark_stories = async id =>
{
    const userObj = await User.findOne({_id:id});
    return Bookmark.find({user: userObj}).populate('story').sort({name:1});
};
