//server.js ---> SERVER!
var express = require('express');
var bodyParser = require('body-parser');

// calling express in app variable.
var app = express();


/**********
SERVER
***********/
// serve static files in public
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/vendor', express.static(__dirname + '/bower_components'));
var controllers = require('./controllers');
var db = require('./models');

console.log(" i'm server js... Hi I love you. We're best friends.");

/**********
ROUTES
***********/


//HTML endpoints********
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/index.html');
});
//JSON API Endpoints*************

//story
app.get('/api', controllers.api.index);

app.get('/api/stories', controllers.story.index);

app.post('/api/stories', controllers.story.create);

app.delete('/api/stories/:storyId', controllers.story.destroy);
//
app.put('/api/stories/:storyId', controllers.story.update);


/**********
SERVER
***********/

//listening on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
