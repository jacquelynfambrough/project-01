//models/index.js
var mongoose = require('mongoose'),
mongoose.connect('mongodb://localhost/3000');

module.exports.Stories = require('./Stories');
module.exports.Author = require('./Author');
