//Require mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const storySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    info: String,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    viewed: {type: Number, default: 0},
    img: String,
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
