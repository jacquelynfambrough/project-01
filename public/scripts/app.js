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


  ///delete function
  function handleDeleteonSuccess(data) {
    var deletedStory = data._id;
    console.log('removing ', deletedStory, 'from page');
    $('div[data-story-id=' + deletedStory + ']').remove();
    location.reload();//reloads page to remove deleted story. cannot seem to figure out how to do it without page reload.
  };


  // update function
  // $('#editButton').on('submit', function handleEdit(e) {
  //   e.preventDefault();
  //    console.log('just clicked modal button');
  //
  //  });



 //     var id= $(this).closest('.store').data('store-id');
 //     console.log('this is the id of closest store',id);
 //     $('#storeModal').data('store-id', id);
 //     $('#storeModal').modal();
 // });
 // // for update: submit event on `.update-post` form
 // .on('submit', '.update-post', function (event) {
 //   event.preventDefault();
 //
 //   // find the post's id (stored in HTML as `data-id`)
 //   var id = $(this).closest('.store').attr('store-id');
 //
 //   // find the post to update by its id
 //   var storeToUpdate = allPosts.filter(function (post) {
 //     return post._id == postId;
 //   })[0];
 //
 //   // serialze form data
 //   var updatedStore = $(this).serialize();
 //
 //   // PUT request to update post
 //   $.ajax({
 //     type: 'PUT',
 //     url: '/api/stores/' + storetId,
 //     data: updatedStore,
 //     success: function(data) {
 //       // replace post to update with newly updated version (data)
 //       allStores.splice(allStores.indexOf(storeToUpdate), 1, data);
 //
 //       // render all posts to view
 //       storeSuccess(storeData);
 //     }
 //   });
 // });

  //renderStories function
  function renderStories(storyList){
    var source = $('#published-template').html();
    var template = Handlebars.compile(source);
    var newHtml = template(storyList);
    $('#publish').prepend(newHtml);
  };
});// end doc ready
