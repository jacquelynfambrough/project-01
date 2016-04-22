var db = require('../models')
// GET
function index(req, res) {
  db.Author.find({}, function(err, foundAuthor){
    if (err){
      return console.log("index error:", err);
    }
    res.json(foundAuthor);
  });
}

// export public methods here.
module.exports = {
  index: index
};
