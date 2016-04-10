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
});//doc end
    // $('#album-form form').on('submit', handleAlbumSubmit);


  // function handleAlbumSubmit(event){
  //
  //   event.preventDefault();
  //   var formData = $(this).serialize();
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/albums',
  //     data: formData,
  //     success: handleFormSubmitResponse,
  //     error: onErr
  //   });

    // $(this).trigger('reset');
  // }

  // function handleReceiveAllStories(stories) {
  //   console.log("json is now stories: ", stories);
  //    stories.forEach(story);
  //     renderStories(story);
  //
  //   }
  //
  // function getError(err) {
  //   console.log("uh..how do you?.... balenda", err);
  // }
  //


    // pass `allBooks` into the template function


    // append html to the view



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

function renderStories(storyList){
  console.log("rendering story", storyList);
  var source = $('#published-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(storyList);
  $('#publish').prepend(newHtml);
}
