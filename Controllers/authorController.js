var db = require('../models')
// GET /api/stories
function index(req, res) {
  db.Author.find({}, function(err, foundAuthor){
    if (err){
      return console.log("index error:", err);
    }
    res.json(foundAuthor);
  });
}
//
//
// function create(req, res) {
//   console.log('body', req.body);
//   db.Author.create(req.body, function(err, createdAuthor){
//     console.log('createdauthor', createdAuthor);
//     res.json(createdAuthor);
//
//   });
// }
//
// //delete
// // function destroy(req, res) {
// //   db.Story.findById(req.params.storyId, function(err, foundStory) {
// //     console.log(foundStory);
// //     // finding author within story
// //     var correctAuthor = foundStory.author.id(req.params.authorId);
// //     if (correctAuthor) {
// //       correctAuthor.remove();
// //       // resaving Story
// //       foundStory.save(function(err, saved) {
// //         // console.log('REMOVED ', correctAuthors.pseudonym, 'FROM ', saved.authors);
// //         res.json(correctAuthor);
// //       });
// //     } else {
// //       res.send(404);
// //     }
// //   });
//
//
// // }
// //update author
// function update(req, res) {
//   db.Story.findById(req.params.storyId, function(err, foundStory) {
//     console.log(foundStory);
//     //finding author within story
//     var correct = foundStory.authors.id(req.params.authorId);
//     if (correctAuthor) {
//       console.log(req.body);
//       correctAuthor.pseudonym = req.body.pseudonym;
//       correctAuthor.email = req.body.email;
//       foundStory.save(function(err, saved) {
//         console.log('UPDATED', correctAuthor, 'IN ', saved.authors);
//         res.json(correctAuthor);
//       });
//     } else {
//       res.send(404);
//     }
//   });
//
// }

// export public methods here
module.exports = {
  index: index,
  // create: create,
  // show: show,
  // destroy: destroy
  // update: update
};
