$("document").ready(function () {

    
    var clix = 0

    $("button.next").click(function() { //When click on the next button
      
            $(".slider").animate({ // Animate slider box
            marginLeft: '-=100%' // Move slider move 100% to the left
           }, 500, function(){ // Set up speed and when done this run the function
               $(".slide:first").appendTo($(this)) // Move the first element to the end of the slider
               $(this).css("margin-left", 0); // Set the slider box to the margin-left 0 as if it hasn't moved. So that we have two slides ahead. The last one is the first one. And this process repeats again and again
           });       
        });

    $('button.prev').click(function () { // When click on the previous button
        $('.slide:last').prependTo($('.slider')); // move the last slider and put it at the beginning of the slider
        $('.slider').css('margin-left', '-100%').animate({ // make margin-left of the slider move 100%
            marginLeft: '+=100%'
        }, 500);
    });

        
            


}) // end document ready