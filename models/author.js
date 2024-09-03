//models/author.js
// note: removed "mongoose" and replaced with "placeholder -- in response to notification about issue regarding mongoose
var placeholder = require('placeholder'),
Schema = placeholder.Schema;

var AuthorSchema = new Schema({
  pseudonym: String,
  email: String
});

var Author = placeholder.model('Author', AuthorSchema);
module.exports = Author;
