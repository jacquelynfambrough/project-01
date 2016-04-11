var db = require('../models')
// GET /api/albums
function index(req, res) {
  db.Story.find({})
    .populate('author')
    .exec(function(err, foundStories){
    if (err){
      return console.log("index error:", err);
    }
    res.json(foundStories);
  });
}

function create(req, res) {
  console.log('body', req.body);

  // split at comma and remove and trailing space
  var genre = req.body.genre.split(',').map(function(item) { return item.trim(); } );




    var newStory = {
       title: req.body.title,
       genres: [genre],
       content: req.body.content
     }
     console.log('PRECREATION: ',newStory);
     db.Story.create(newStory)
      .populate('author')
      .exec(function(err, createdStory) {
       if(err) { console.log('error', err);}
       console.log("SUCCESS", createdStory);
       res.json(createdStory);
     });
   }

   var editedStory = {
      title: req.body.title,
      genres: [genre],
      content: req.body.content
    }
    console.log('PRECREATION: ',editedStory);
    db.Story.findById(editedStory)
     .populate('author')
     .exec(function(err, editedStory) {
      if(err) { console.log('error', err);}
      console.log("SUCCESS", createdStory);
      res.json(createdStory);
    });
  }



//
// function show(req, res) {
//   // FILL ME IN !
// }
//
// function destroy(req, res) {
//   // FILL ME IN !
// }
//
// function update(req, res) {
//   // FILL ME IN !
// }


// export public methods here
module.exports = {
  index: index,
  create: create
  // show: show,
  // destroy: destroy,
  update: update
};
