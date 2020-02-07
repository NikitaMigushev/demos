$("document").ready(function () {

    $('button.next').click(function () {
        $(".slider").animate({ // Animate slider box
            marginLeft: '-=33.1%' // Move slider move 100% to the left
        }, 300, function () { // Set up speed and when done this run the function
            $(".slide:first").appendTo($(this)) // Move the first element to the end of the slider
            $(this).css("margin-left", 0); // Set the slider box to the margin-left 0 as if it hasn't moved. So that we have two slides ahead. The last one is the first one. And this process repeats again and again
        });
    });

    $('button.prev').click(function () { // When click on the previous button
        $('.slide:last').prependTo($('.slider')); // move the last slider and put it at the beginning of the slider
        $('.slider').css('margin-left', '-33.1%').animate({ // make margin-left of the slider move 100%
            marginLeft: '+=33.1%'
        }, 300);
    });

}) // end document ready