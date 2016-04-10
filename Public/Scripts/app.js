//app.js

$(document).ready(function() {
console.log("Sanity check! app.js running");


  $.get('/api/stories').success(function (stories) {
    stories.forEach(function(story) {
      renderStories(story);
    });
  });


  $("#newPub").on('submit', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
       console.log('formData',formData);
       $.post('/api/stories', formData, function(story) {
         console.log('story after POST', story);
         renderStories(story);  //render the server's response
       });
      //  $(this).trigger("reset");

     });

   });//end doc ready




function renderStories(storyList){
  console.log("rendering story", storyList);
  var source = $('#published-template').html();
  console.log(source);
  var template = Handlebars.compile(source);
  var newHtml = template(storyList);
  console.log(newHtml);
  $('#publish').prepend(newHtml);
}
