const sentinelsTop = document.querySelectorAll('.sticky_sentinel--top');

// Intersection observer for top Sentinels

function makeHeaderSticky(element, stuck) {
    // stuck == true/false
    if (stuck) {
        element.classList.add('shadow');
    } else {
        element.classList.remove('shadow');
    }
}

function ioTopCallback(entry, observer) {
    entry.forEach(entry => {
        const stickyTarget = entry.target.parentElement.querySelector(
            '.sticky-container'

        );
        const targetInfo = entry.boundingClientRect;
        const rootBoundsInfo = entry.rootBounds;
        const ratio = entry.intersectionRatio;


        if (targetInfo.bottom < rootBoundsInfo.top && ratio === 0) {
            makeHeaderSticky(stickyTarget, true);

        }
        if (targetInfo.bottom >= rootBoundsInfo.top &&
            targetInfo.bottom < rootBoundsInfo.bottom) {
            makeHeaderSticky(stickyTarget, false);
        }

    });
}

const ioTopOptions = {
    root: null,
};

const obseverTop = new IntersectionObserver(ioTopCallback, ioTopOptions);

//Observer each top sentinel
sentinelsTop.forEach(element => {
    obseverTop.observe(element);
});


// Intersection observer for bottom Sentinels

const sentinelsBottom = document.querySelectorAll('.sticky_sentinel--bottom');

function ioBotttomCallback(entry, observer) {
    entry.forEach(entry => {
        const stickyTarget = entry.target.parentElement.querySelector(
            '.sticky-container');
        const targetInfo = entry.boundingClientRect;
        const rootBoundsInfo = entry.rootBounds;

        if (targetInfo.top < rootBoundsInfo.top && targetInfo.bottom < 0) {
            makeHeaderSticky(stickyTarget, false);
        }

        if (targetInfo.top < rootBoundsInfo.top &&
            targetInfo.bottom > 0) {
            makeHeaderSticky(stickyTarget, true);
        }

    });
}

const ioBottomOptions = {
    root: null,
};

const obseverBottom = new IntersectionObserver(ioBotttomCallback, ioBottomOptions);

sentinelsBottom.forEach(element => {
    obseverBottom.observe(element);
});