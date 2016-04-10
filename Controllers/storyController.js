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
  req.body.genres = genre;

  var newStory = {
    title: req.body.title,
    datePublished: String,
    genres: [req.body.genres],
    content: req.body.content
  }
  console.log('pre-creation', newStory);
  db.Story.create(newStory, function(err, createdStory){
      if(err)
       {
         console.log('error', err);
       }
       console.log('success:', createdStory);
       res.json(createdStory)
  });
}

//   db.Story.create(req.body, function(err, createdStory) {
//     if (err) { console.log('error', err); }
//     console.log(createdStory);
//     res.json(C);
//   });
// }

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
  create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
