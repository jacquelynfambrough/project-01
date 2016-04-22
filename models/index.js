//models/index.js
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/short-stories');

module.exports.Story = require('./story');
module.exports.Author = require('./author');
