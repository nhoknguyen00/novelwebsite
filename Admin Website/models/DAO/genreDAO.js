const Genre = require('../genre');

exports.get_genre_list = ()=>{
    return Genre.find();
};

exports.get_genre_by_id = id =>{
    return Genre.findOne({_id: id});
};