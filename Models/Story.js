// models/stories.js
var mongoose = require('mongoose'),
Stories = mongoose.Schema;


var StorySchema = new Schema ({
  title: String,
  author: [
    {
      type: Schema.Type.ObjectsId,
      ref:"Author"
    }
  ],
  datePublished: Date.now(),
  genre: [String],
  content: String
});

var Story = mongoose.model('Story', StorySchema);
module.exports = Story;
