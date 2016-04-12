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

$('#publish').on('click', '.btn-danger', handleDeleteStoryClick);

function handleDeleteStoryClick(e){
    var storyId = $(this).closest('button').data("story-id");
    console.log(storyId);
    $.ajax({
      method:'DELETE',
      url:'/api/stories/' + storyId,
      success: handleDeleteonSuccess
    });

  };

function handleDeleteonSuccess(data) {
 var deletedStory = data._id;
 console.log('removing ', deletedStory, 'from page');
 $('div[data-story-id=' + deletedStory + ']').remove();
}







      // updating data in modal window
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

  var source = $('#published-template').html();

  var template = Handlebars.compile(source);
  var newHtml = template(storyList);

  $('#publish').prepend(newHtml);
}
});//end doc ready
