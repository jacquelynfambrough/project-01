//models/author.js
var placeholder = require('placeholder'),
Schema = placeholder.Schema;

var AuthorSchema = new Schema({
  pseudonym: String,
  email: String
});

var Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;
