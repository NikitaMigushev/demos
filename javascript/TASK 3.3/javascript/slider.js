$("document").ready(function () {

    //Slider of the main image

    $("button.next").click(function () { //When click on the next button

        $(".slider").animate({ // Animate slider box
            marginLeft: '-=100%' // Move slider 100% to the left
        }, 500, function () { // when done this run the function
            $(".slide:first").appendTo($(this)) // Move the first element to the end of the slider
            $(this).css("margin-left", 0); // Set the slider box to the margin-left 0 as if it hasn't moved. So that we have two slides ahead. The first one is the last one now. And this process repeats again and again
        });
    });

    $('button.prev').click(function () { // When click on the previous button
        $('.slide:last').prependTo($('.slider')); // move the last slider and put it at the beginning of the slider
        $('.slider').css('margin-left', '-100%').animate({ // mover slider to the left 100%
            marginLeft: '+=100%' // the the first image(the one that we moved from the last position) slide in
        }, 500);
    });

    // Slider of product lines

    //Define variables for which area to move

    var sliderProductLine1 = ".sliderProductLine1";
    var slideProductLine1 = ".slideProductLine1";
    var sliderProductLine2 = ".sliderProductLine2";
    var slideProductLine2 = ".slideProductLine2";
    var sliderProductLine3 = ".sliderProductLine3";
    var slideProductLine3 = ".slideProductLine3";

    //Make function to move product slides to the right

    function moveProductRight(slider, slide) {
        $(slider).animate({
            marginLeft: '-=33.1%'
        }, 300, function() {
            $(slide).first().appendTo($(this))
            $(this).css("margin-left", 0);
        })
    }

    //Make function to move product slides to the left

    function moveProductLeft(slider, slide) {
        $(slide).last().prependTo($(slider));
        $(slider).css('margin-left', '-33.1%').animate({
            marginLeft: '+=33.1%'
        })
    }

    $('#productNextLine1').click(function() {
        moveProductRight(sliderProductLine1, slideProductLine1);
    })

    $('#productPrevLine1').click(function () {
        moveProductLeft(sliderProductLine1, slideProductLine1);
    })

    $('#productNextLine2').click(function () {
        moveProductRight(sliderProductLine2, slideProductLine2);
    })

     $('#productPrevLine2').click(function () {
         moveProductLeft(sliderProductLine2, slideProductLine2);
     })

    $('#productNextLine3').click(function () {
           moveProductRight(sliderProductLine3, slideProductLine3);
       })

    $('#productPrevLine3').click(function () {
           moveProductLeft(sliderProductLine3, slideProductLine3);
       })


}) // end document ready
