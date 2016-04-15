// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var storyList = [
  {
  title: "Whatever",
  author: "Jackie",
  genres: "Sci-Fi",
  content: "The aliens are coming! IDK!!!"
},
{
  title: "Whatever part II",
  author: "Coolio",
  genres: "Sci-Fi",
  content: "The aliens are coming back! GREAT!!!"
}];

var authorList = [
  {
    pseudonym: "Jackie",
    email: "jacquelynfambrough@gmail.com"
  },
  {
    pseudonym: "Coolio",
    email:"coolio@aol.com"
  }];


db.Author.remove({}, function(err, authors) {
  console.log('removed all authors');
  db.Author.create(authorList, function(err, authors){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all authors', authorList);


    db.Story.remove({}, function(err, stories){
      console.log('removed all stories');
      storyList.forEach(function (storyData) {
        var story = new db.Story({
          title: storyData.title,
          genres: [storyData.genre],
          content: storyData.content
        });
        db.Author.findOne({pseudonym: storyData.author}, function (err, foundAuthor) {

          if (err) {
            console.log(err);
            return;
          }
          story.author = foundAuthor;
          story.save(function(err, savedStory){
            if (err) {
              return console.log(err);
            }

          });
        });
      });
    });

  });
});
