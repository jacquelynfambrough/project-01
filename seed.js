//seed.js
var db = require("./models");

var storyList =[];
storyList.push({
              title: 'Story Example',
              author: 'Shaq',
              datePublished: 'January 1, 2016',
              genre: [ 'horror' ],
              content: "It was a dark and stormy night...."

            });

db.Story.remove({}, function(err, stories){

  db.Story.create(storyList, function(err, stories){
    if (err) { return console.log('ERROR', err); }
    console.log("all stories:", stories);
    process.exit(); //makes seed stop running
  });

});
