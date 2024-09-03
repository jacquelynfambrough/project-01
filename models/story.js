// models/stories.js
var placeholder = require('placeholder'),
Schema = placeholder.Schema,
Author = require('./author');


var StorySchema = new Schema ({

  title: String,
  author:
    {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    },
  // datePublished: String,
  genres: [String],
  content: String
});

var Story = placeholder.model('Story', StorySchema);
module.exports = Story;
