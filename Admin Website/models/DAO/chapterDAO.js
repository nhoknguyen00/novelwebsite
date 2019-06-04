const Chapter = require('../chapter');

exports.get_chapter_list = ()=>{
    var mysort = {name:1};
    return Chapter.find().populate('story').sort(mysort);;
};

exports.get_chapter_by_id = id =>{
    return Chapter.findOne({_id: id}).populate('story');
};