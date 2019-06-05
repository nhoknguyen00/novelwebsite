//Require mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    info: String
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
