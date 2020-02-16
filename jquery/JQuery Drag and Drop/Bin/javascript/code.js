$("document").ready(function () {

 // Make images draggable

    $( function() {
      $(".draggable").draggable({
        revert: "invalid",
        cursor: "move"
      });
    } );

  // Make trashArea droppable

  $(function () {
    $(".trashArea").droppable({
      hoverClass: "highlight",
      tolerance: "fit",
      drop: function (event, ui) { // When dropped - hide image
        $(ui.draggable).addClass("hide");
        $(".delete-animation-show").css("display", "block"); // When dropped - run delete-animation
        setTimeout(function () {
          $(".delete-animation-show").css("display", "none");
        }, 300); // When dropped - hide delete-animation after timeOut
      }
      
      });

    });

});