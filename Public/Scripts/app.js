//app.js
$(document).ready(function() {
console.log("Sanity check! app.js running");

  $.ajax({
     method: 'GET',
     url: '/api/albums',
     success: handleReceiveAllAlbums,
     error: getError
   });
    $('#album-form form').on('submit', handleAlbumSubmit);


  function handleAlbumSubmit(event){

    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: formData,
      success: handleFormSubmitResponse,
      error: onErr
    });

    $(this).trigger('reset');
  }

  function handleReceiveAllAlbums(json) {
    console.log(json);
     json.forEach(renderAlbums);
   }
  function onErr(err) {
    console.log("we done fucked up", err)
  }
   function handleFormSubmitResponse(data){
     console.log("handleFormSubmitResponse:", data);
     renderAlbums(data);
   }


    function getError() {
     console.log('Wow, okay.');

    }




function renderAlbums(albums){
  var source = $('#album-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(albums);
  $('#albums').prepend(newHtml);
}
});//doc end
