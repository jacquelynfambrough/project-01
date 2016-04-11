//app.js

$(document).ready(function() {
console.log("Sanity check! app.js running");

//getting data from seed
  $.get('/api/stories').success(function (stories) {
    stories.forEach(function(story) {
      renderStories(story);

    });
  });
//submitting data on new story form
  $("#newPub").on('submit', function(event){
     event.preventDefault();
     var formData = $(this).serialize();
     console.log(formData);
        $.post('/api/stories', formData, function(story) {
          console.log('story after POST', story);
          renderStories(story);  //render the server's response
        });


        $(this).trigger("reset");

      });

//updating data in modal window
  // $("#myEditModal").on('submit', function(event){
  //     event.preventDefault();
  //     var formData = $(this).serialize();
  //       $.put('/api/stories/:id_story', formData, function (editedStory){
  //         console.log('story after PUT', editedStory){
  //         renderStories(editedStory);
  //       }
  //         }
  //       });






function renderStories(storyList){
  console.log("rendering story", storyList);
  var source = $('#published-template').html();
  console.log(source);
  var template = Handlebars.compile(source);
  var newHtml = template(storyList);
  console.log(newHtml);
  $('#publish').prepend(newHtml);
}
});//end doc ready
