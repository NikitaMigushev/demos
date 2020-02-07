window.onload = function () {

    // Main slider

    // Create clones of first and last elements of the slider for infinite slider

    function createFirstAndLastClone() {
        let carouselSlider = document.querySelector(".slider");
        let carouselImages = document.querySelectorAll(".slide")

        let firstChild = carouselImages[0];

        let firstClone = firstChild.cloneNode(true);

        let lastChild = carouselImages[2]

        let lastClone = lastChild.cloneNode(true);

        carouselSlider.appendChild(firstClone); // clone first slide and put it to the end. We need that for infinite slider

        carouselSlider.prepend(lastClone); // clone last slide and put in in the beggining of slider. Again for infinite slider

        firstClone.id = "firstClone"

        lastClone.id = "lastClone"
    }

    createFirstAndLastClone()

    const carouselSlider = document.querySelector(".slider");
    const carouselImages = document.querySelectorAll(".slide")

    // buttons

    const prevBtn = document.querySelector(".prev")
    const nextBtn = document.querySelector(".next")

    // counter

    let counter = 1;
    const size = carouselImages[0].clientWidth; // set the size of the image

    carouselSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // button listeners

    nextBtn.addEventListener('click', function () {
        if (counter >= carouselImages.length - 1) return;
        carouselSlider.style.transition = 'transform 0.4s ease-in-out';
        counter++;
        carouselSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    prevBtn.addEventListener('click', function () {
        if (counter <= 0) return // remove bug when clicking button too fast
        carouselSlider.style.transition = 'transform 0.4s ease-in-out';
        counter--;
        carouselSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });


    carouselSlider.addEventListener('transitionend', () => {
        //When on lastClone id - reset counter and move to the first slide
        if (carouselImages[counter].id === "lastClone") {
            carouselSlider.style.transition = "none";
            counter = carouselImages.length - 2;
            carouselSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        //When on firstClone id - reset counter and move to the last slide
        if (carouselImages[counter].id === "firstClone") {
            carouselSlider.style.transition = "none";
            counter = carouselImages.length - counter;
            carouselSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });


    // Product slider

    var productLine1CarouselSlider = document.querySelector(".sliderProductLine1");
    var productLine1CarouselImages = document.querySelectorAll(".slideProductLine1")
    var productLine1LastSlideId = "productLine1LastSlide"

    var productLine2CarouselSlider = document.querySelector(".sliderProductLine2");
    var productLine2CarouselImages = document.querySelectorAll(".slideProductLine2")
    var productLine2LastSlideId = "productLine2LastSlide"

    var productLine3CarouselSlider = document.querySelector(".sliderProductLine3");
    var productLine3CarouselImages = document.querySelectorAll(".slideProductLine3")
    var productLine3LastSlideId = "productLine3LastSlide"

    // buttons

    var productLine1PrevBtn = document.getElementById("productPrevLine1")
    var productLine1NextBtn = document.getElementById("productNextLine1")

    var productLine2PrevBtn = document.getElementById("productPrevLine2")
    var productLine2NextBtn = document.getElementById("productNextLine2")

    var productLine3PrevBtn = document.getElementById("productPrevLine3")
    var productLine3NextBtn = document.getElementById("productNextLine3")

    // counter

    var counters = {
        productLine1Counter: 0,
        productLine2Counter: 0,
        productLine3Counter: 0
    }
   
    // button listeners

    //Move Right Function

    function slidesMoveRigth(counter, slider, slides, lastSlide) {
        
        if (counters[counter] >= slides.length - 1) return; // debugs miltiple fast clicks
        if (slides[counters[counter] + 2].id === lastSlide) return; // if the last slide - don't move
        counters[counter]++
        console.log(counters[counter]);
        slider.style.transition = 'margin-left 0.4s ease-in-out';
        slider.style.marginLeft = '-' + 33.1 * counters[counter] + '%';

    }

    //Move Left Function


    function slidesMoveLeft(counter, slider, slides) {
        if (counters[counter] == 0) return;
        slider.style.transition = 'margin-left 0.4s ease-in-out';
        counters[counter]--;
        slider.style.marginLeft = '-' + 33.1 * counters[counter] + '%';
    }

    this.console.log(counters.productLine1Counter);

    //Run Functions

    productLine1NextBtn.addEventListener("click", function() {
        slidesMoveRigth('productLine1Counter', productLine1CarouselSlider, productLine1CarouselImages, productLine1LastSlideId)
    })

    productLine1PrevBtn.addEventListener("click", function () {
        slidesMoveLeft('productLine1Counter', productLine1CarouselSlider, productLine1CarouselImages)
    });


    productLine2NextBtn.addEventListener("click", function () {
        slidesMoveRigth('productLine2Counter', productLine2CarouselSlider, productLine2CarouselImages, productLine2LastSlideId)
    })

    productLine2PrevBtn.addEventListener("click", function () {
        slidesMoveLeft('productLine2Counter', productLine2CarouselSlider, productLine2CarouselImages)
    });


    productLine3NextBtn.addEventListener("click", function () {
        slidesMoveRigth('productLine3Counter', productLine3CarouselSlider, productLine3CarouselImages, productLine3LastSlideId)
    })

    productLine3PrevBtn.addEventListener("click", function () {
        slidesMoveLeft('productLine3Counter', productLine3CarouselSlider, productLine3CarouselImages)
    });

} // end window.onload