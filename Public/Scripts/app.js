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
    var storyId = $(this).closest('.button-danger').data("story-id");
    console.log(storyId);
    $.ajax({
      method:'DELETE',
      url:'/api/stories/' + storyId,
      success: handleDeleteonSuccess
    });

  };
  ///////////UPDATE

  // takes an array of stories and generates an EDIT form for them
  function populateEditStoriesModal(stories, storyId) {
    // prep the template
    var templateHtml = $('#published-template').html();
    var template = Handlebars.compile(templateHtml);
    // use the template's #each to render all songs at once
    // note that DELETE/PUT will need the albumId to construct the URL,
    //   so we'll plant that on the form too
    storyForms = template({title: title, author: author, email: email, genres: genres, content: content });
    // find the modal's body and replace it with the generated html
    $('#myEditModal').html(storyForms);
  }

  // when the edit button for an album is clicked
  function handleStoryEditClick(e) {
    var $storyRow = $(this).closest('.');
    var storyId = $storyRow.data('story-id');
    console.log('edit story', storyId);

    // show the save changes button
    $storyRow.find('.save-story').toggleClass('hidden');
    // hide the edit button
    $storyRow.find('.edit-story').toggleClass('hidden');


    // get the album name and replace its field with an input element
    var storyName = $storyRow.find('span.story-name').text();
    $storyRow.find('span.story-name').html('<input class="edit-story-name" value="' + storyName + '"></input>');

    // get the artist name and replace its field with an input element
    var authorName = $storyRow.find('span.author-name').text();
    $storyRow.find('span.author-name').html('<input class="edit-author-name" value="' + authorName + '"></input>');

    // get the releasedate and replace its field with an input element
    var releaseDate = $storyrow.find('span.album-releaseDate').text();
    $storyRow.find('span.story-releaseDate').html('<input class="edit-story-releaseDate" value="' + releaseDate + '"></input>');
  }

  // after editing an album, when the save changes button is clicked
  function handleSaveChangesClick(e) {
    var storyId = $(this).parents('.story').data('story-id'); // $(this).closest would have worked fine too
    var $storyRow = $('[data-syotu-id=' + storyId + ']');

    var data = {
      pseudonym: $storyRow.find('.edit-story-psdeudonym').val(),
      email: $storyRow.find('.edit-author-name').val(),
      genres: $storyRow.find('.edit-story-releaseDate').val()
      content: $storyRow.find('.edit-story-content').val()
    };
    console.log('PUTing data for album', storyId, 'with data', data);

    $.ajax({
      method: 'PUT',
      url: '/api/stories/' + albumId,
      data: data,
      success: handleStoryUpdatedResponse
    });
  }

  function handleStoryUpdatedResponse(data) {
    console.log('response to update', data);

    var storyId = data._id;
    // scratch this album from the page
    $('[data-album-id=' + storyId + ']').remove();
    // and then re-draw it with the updates ;-)
    renderStories(data);

    // BONUS: scroll the change into view ;-)
    $('[data-album-id=' + albumId + ']')[0].scrollIntoView();
  }

////end update










function renderStories(storyList){

  var source = $('#published-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(storyList);
  $('#publish').prepend(newHtml);
}
});//end doc ready
