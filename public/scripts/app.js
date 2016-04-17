//app.js

$(document).ready(function() {
console.log("Sanity check! app.js running");




  //getting stories
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

  //delete ajax call
  $('#publish').on('click', '.btn-danger',handleDeleteStoryClick);
  function handleDeleteStoryClick(e){
   var storyId = $(this).closest('button').data("story-id");
   console.log(storyId);
   $.ajax({
      method:'DELETE',
      url:'/api/stories/' + storyId,
      success:handleDeleteonSuccess
    });
  };

  ///delete function
  function handleDeleteonSuccess(data) {
    var deletedStory = data._id;
    console.log('removing ', deletedStory, 'from page');
    $('div[data-story-id=' + deletedStory + ']').remove();
    location.reload();
  };

  //renderStories function
  function renderStories(storyList){
    var source = $('#published-template').html();
    var template = Handlebars.compile(source);
    var newHtml = template(storyList);
    $('#publish').prepend(newHtml);
  };
});// end doc ready
