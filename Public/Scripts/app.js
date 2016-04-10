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
       console.log('formData',
        formData);
        console.log("CALLING POST..");
       $.post('/api/stories', formData, function(story) {
         console.log('story after POST', story);
         renderStories(story);  //render the server's response
       });
       console.log("ENDING POST...");
       $(this).trigger("reset");
     });

   });//end doc ready




function renderStories(storyList){
  console.log("rendering story", storyList);
  var source = $('#published-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(storyList);
  $('#publish').prepend(newHtml);
}
