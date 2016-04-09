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
//
db.Story.remove({}, function(err, storyList){

  db.Story.create(storyList, function(err, storyList){
    if (err) { return console.log('ERROR', err); }
    console.log("all stories:", storyList);

    process.exit(); //makes seed stop running
  });

});
