const Author = require('../author');

exports.get_author_list = ()=>{
    return Author.find();
};

exports.get_author_by_id = id =>{
    return Author.findOne({_id: id});
};