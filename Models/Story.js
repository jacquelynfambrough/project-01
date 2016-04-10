// models/stories.js
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
Author = require('./Author');


var StorySchema = new Schema ({

  title: String,
  author:
    {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    },
  datePublished: String,
  genres: [String],
  content: String
});

var Story = mongoose.model('Story', StorySchema);
module.exports = Story;
