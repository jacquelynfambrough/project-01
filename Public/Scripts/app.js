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
    songsForms = template({songs: songs, albumId: albumId});
    // find the modal's body and replace it with the generated html
    $('#editSongsModalBody').html(songsForms);
  }

  // when the edit button for an album is clicked
  function handleAlbumEditClick(e) {
    var $albumRow = $(this).closest('.album');
    var albumId = $albumRow.data('album-id');
    console.log('edit album', albumId);

    // show the save changes button
    $albumRow.find('.save-album').toggleClass('hidden');
    // hide the edit button
    $albumRow.find('.edit-album').toggleClass('hidden');


    // get the album name and replace its field with an input element
    var albumName = $albumRow.find('span.album-name').text();
    $albumRow.find('span.album-name').html('<input class="edit-album-name" value="' + albumName + '"></input>');

    // get the artist name and replace its field with an input element
    var artistName = $albumRow.find('span.artist-name').text();
    $albumRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');

    // get the releasedate and replace its field with an input element
    var releaseDate = $albumRow.find('span.album-releaseDate').text();
    $albumRow.find('span.album-releaseDate').html('<input class="edit-album-releaseDate" value="' + releaseDate + '"></input>');
  }

  // after editing an album, when the save changes button is clicked
  function handleSaveChangesClick(e) {
    var albumId = $(this).parents('.album').data('album-id'); // $(this).closest would have worked fine too
    var $albumRow = $('[data-album-id=' + albumId + ']');

    var data = {
      name: $albumRow.find('.edit-album-name').val(),
      artistName: $albumRow.find('.edit-artist-name').val(),
      releaseDate: $albumRow.find('.edit-album-releaseDate').val()
    };
    console.log('PUTing data for album', albumId, 'with data', data);

    $.ajax({
      method: 'PUT',
      url: '/api/albums/' + albumId,
      data: data,
      success: handleAlbumUpdatedResponse
    });
  }

  function handleAlbumUpdatedResponse(data) {
    console.log('response to update', data);

    var albumId = data._id;
    // scratch this album from the page
    $('[data-album-id=' + albumId + ']').remove();
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
