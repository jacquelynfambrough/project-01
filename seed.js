//seed.js
var db = require("./models");

var storyList =[];
storyList.push({
              title: 'Story Example',
              author: "Shaq",
              datePublished: 'January 1, 2016',
              genre: [ 'horror' ],
              content: "It was a dark and stormy night at your mom's house...."

            });

var authorList =[];
authorList.push({
          name: "Shaq"
})




// //
// db.Story.remove({}, function(err, storyList){
//   console.log("removed all stories");
//   db.Story.create(storyList, function(err, storyList){
//     if (err) { return console.log('ERROR', err); }
//     console.log("created all stories:", storyList);
//
//     process.exit(); //makes seed stop running
//   });
//
// });

db.Author.remove({}, function(err, authors) {
  console.log('removed all authors');
  db.Author.create(authorList, function(err, authors){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all authors');
    console.log("created", authors.length, "authors");


    db.Story.remove({}, function(err, stories){
      console.log('removed all stories');
      storyList.forEach(function (storyData) {
        var story = new db.Story({
          title: storyData.title,
          image: storyData.image,
          releaseDate: storyData.releaseDate
        });
        db.Author.findOne({name: storyData.author}, function (err, foundAuthor) {
          console.log('found author ' + foundAuthor.name + ' for story ' + story.title);
          if (err) {
            console.log(err);
            return;
          }
          story.author = foundAuthor;
          story.save(function(err, savedStory){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedStory.title + ' by ' + foundAuthor.name);
          });
        });
      });
    });

  });
});
