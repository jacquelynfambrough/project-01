//models/index.js
var mongoose = require('mongoose'),
mongoose.connect('mongodb://localhost/short-stories');

module.exports.Stories = require('./Stories');
module.exports.Author = require('./Author');
