const User = require('../user');

exports.get_user_list = ()=>{
    return User.find();
};

exports.get_user_by_id = id =>{
    return User.findOne({_id: id});
};