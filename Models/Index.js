//models/index.js
var mongoose = require('mongoose'),
mongoose.connect('mongodb://localhost/short-stories');

module.exports.Story = require('./Story');
module.exports.Author = require('./Author');
