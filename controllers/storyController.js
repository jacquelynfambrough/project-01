var db = require('../models')

// get response
function index(req, res) {
    db.Story.find({})
        .populate('author')
        .exec(function(err, foundStories) {
            if (err) {
                return console.log("index error:", err);
            }
            res.json(foundStories);
        });
}

//post response
function create(req, res) {
    var newStory = new db.Story({
        title: req.body.title,
        genres: [req.body.genre],
        content: req.body.content,
    });
    var author = new db.Author({
        pseudonym: req.body.pseudonym,
        email: req.body.email
    });
    newStory.author = author;
    newStory.save(function(err, oneStory) {
        if (err) {
            return console.log("an error on SAVE: " + err);
        }
        console.log("saved, ", oneStory);
        res.json(oneStory);
    });
}

//update response
function update(req, res) {
    console.log('updating with data', req.body);
    db.Story.findById(req.params.storyId)
        .populate('author')
        .exec(function(err, foundStory) {
            if (err) {
                console.log('storyController.update error', err);
            }
            foundStory.email = req.body.email;
            foundStory.pseudonym = req.body.pseudonym;
            foundStory.genres = [req.body.genre];
            foundStory.save(function(err, savedStory) {
                if (err) {
                    console.log('save fail');
                }
                res.json(savedStory);
            });
        });

}

//delete
function destroy(req, res) {
    db.Story.findOneAndRemove({
        _id: req.params.storyId
    }, function(err, foundStory) {
        if (err) {
            return console.log("index error:", err);
        }
        res.json(foundStory);
    });

}

// export public methods here
module.exports = {
    index: index,
    create: create,
    destroy: destroy,
    update: update
};
