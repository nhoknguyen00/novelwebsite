const Story = require('../story');

exports.get_story_list = ()=>{
    var mysort = {name:1};
    return Story.find().populate('genre author').sort(mysort);
};

exports.get_story_by_id = id =>{
    return Story.findOne({_id: id}).populate('genre author');
};