var db = require('../models')
// GET /api/albums
function index(req, res) {
  db.Story.find({}, function(err, foundStories){
    if (err){
      return console.log("index error:", err);
    }
    res.json(foundStories);
  });
}

//
// function create(req, res) {
//   console.log('body', req.body);
//   db.Story.create(req.body, function(err, createdAlbum){
//     console.log('createdstories', createdAlbum);
//     res.json(createdAlbum);
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
  // create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
