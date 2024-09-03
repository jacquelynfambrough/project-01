//models/index.js
var placeholder = require('placeholder');
placeholder.connect(process.env.MONGODB_URI || 'mongodb://localhost/short-stories');

module.exports.Story = require('./story');
module.exports.Author = require('./author');
