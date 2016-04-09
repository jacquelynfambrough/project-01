//app.js
//
console.log("app.js running")

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

  function handleReceiveAllStories(json) {
    console.log(json);
     json.forEach(renderStories);
   }
  function getError(err) {
    console.log("uh..how do you?.... balenda", err);
  }
  //  function handleFormSubmitResponse(data){
  //    console.log("handleFormSubmitResponse:", data);
  //    renderStories(data);
  //  }


    // function getError() {
    //  console.log('Wow, okay.');
    //
    // }




function renderStories(stories){
  var source = $('#published-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(stories);
  $('#published').prepend(newHtml);
}
