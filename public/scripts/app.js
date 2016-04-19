//app.js

$(document).ready(function() {
console.log("Sanity check! app.js running");

  //getting stories
  $.get('/api/stories/').success(function (stories) {
    console.log(stories);
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
      location.reload();
    });
    // $(this).trigger("reset");
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

//   //update ajax call
//   $('#publish').delegate('.editButton', "click", function(){
//   // $('#editModalWindow').on('submit', function(event){
//     var $form = $(this).closest('form');
//     pseudonym: $form.find('input.pseudonym').val();
//     email: $form.find('input.email').val();
//     genres: $form.find('input.genre').val();
//     title: $form.find('input.title').val();
//     content:$form.find('input.content').val();
//
// });
// var pub = {
//   pseudonym: author.pseudonym.val(),
//   email: author.email.val(),
//   genres: genre.val(),
//   title: title.val(),
//   content: content.val()
// };
// $.ajax({
//   method:'PUT',
//   url: '/api/stories/' + $form.attr('.data-story-id'),
//   success: function (editedStory) {
//     $form.find('span.pseudonym').html(pub.pseudonym);
//     $form.find('span.email').html(pub.email);
//     $form.find('span.genre').html(pub.genre);
//     $form.find('span.title').html(pub.title);
//     $form.find('span.content').html(pub.content);
//     $form.removeClass('edit');
//   },
//   error: function(){
//     console.log('updating error', err);
//   }
// });
// // });
//

  ///delete function
  function handleDeleteonSuccess(data) {
    var deletedStory = data._id;
    console.log('removing ', deletedStory, 'from page');
    $('div[data-story-id=' + deletedStory + ']').remove();
    location.reload();//reloads page to remove deleted story. cannot seem to figure out how to do it without page reload.
  };

  //renderStories function
  function renderStories(storyList){
    var source = $('#published-template').html();
    var template = Handlebars.compile(source);
    var newHtml = template(storyList);
    $('#publish').prepend(newHtml);
  };
});// end doc ready
