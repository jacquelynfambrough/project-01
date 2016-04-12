//models/author.js
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  pseudonym: String,
  email: String
});

var Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;
