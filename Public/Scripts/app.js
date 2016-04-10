//app.js
//
console.log("Sanity Check: JS is working!");






// compile handlebars template



$(document).ready(function() {
console.log("Sanity check! app.js running");

  $.ajax({
     method: 'GET',
     url: '/api/stories',
     success: handleReceiveAllStories,
     error: getError
  });

  $("#newPub").on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method:'POST',
      url: 'api/stories',
      data: $(this).serialize(),
      success: submitSuccess,
      error: submitError
    });
  });





});//doc end
    // $('#album-form form').on('submit', handleAlbumSubmit);


/////getting functions
  function handleReceiveAllStories(stories) {
    console.log(stories);
    stories.forEach(function(story){
      renderStories(story);
    });
  }

  function getError(e) {
    console.log('uh oh');
    $('#publish').text('Failed to load books, is the server working?');
  }


////////posting functions
function submitSuccess(stories){
  var newStory = $('#newPub input').val();
  {
    
  }
}

//////renderstories function
function renderStories(storyList){
  console.log("rendering story", storyList);
  var source = $('#published-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(storyList);
  $('#publish').prepend(newHtml);
}
