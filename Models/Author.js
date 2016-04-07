//models/author.js
var mongoose = require('mongoose'),
Schema = mongoose.schema;

var AuthorSchema new Schema({
  name:String,
  email:String
})

var Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;
