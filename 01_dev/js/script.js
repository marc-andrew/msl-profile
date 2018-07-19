"use strict";
var noJs = document.getElementsByClassName('no-js');
// Delete no-js class name
while (noJs.length > 0) {
    noJs[0].classList.remove('no-js');
}

// -----------------------------------------------
// Mobile navigation trigger
//
var triggerBtn = document.querySelectorAll('.mobile-trigger .btn')[0],
    navEl = document.getElementsByClassName('nav--header')[0];

triggerBtn.addEventListener('click', function () {
    if (navEl.classList.contains('nav--open')) {
        navEl.classList.remove('nav--open');
        this.classList.remove('btn--burger-close');
    } else {
        navEl.classList.add('nav--open');
        this.classList.add('btn--burger-close');
    }
});


// -----------------------------------------------
// Search
//
var searchWrapper = document.getElementsByClassName('search--header')[0],
    searchBtn = document.querySelectorAll('.search--header .btn--search')[0],
    searchForm = document.getElementById('search-form');

searchBtn.addEventListener('click', function () {
    if (this.classList.contains('btn--search-close')) {
        this.classList.remove('btn--search-close');
        searchWrapper.classList.remove('open');
        searchForm.classList.remove('form--search-open');
    } else {
        this.classList.add('btn--search-close');
        searchWrapper.classList.add('open');
        searchForm.classList.add('form--search-open');
    }
});


// -----------------------------------------------
// Load JSON
// The function above will create a new instance of a XMLHttpRequest and 
// load asynchronously the contents of the given jsonUrl. 
// The argument for .open is set to true to make it asynchronous 
//
function loadJSON(callback) {
    var xObj = new XMLHttpRequest(),
        jsonUrl = 'assets/carousel.json';

    xObj.overrideMimeType("application/json");
    xObj.open('GET', jsonUrl, true);
    xObj.onreadystatechange = function () {
        if (xObj.readyState == 4) {
            if(xObj.status == "200") {
                callback(xObj.responseText,xObj.status);
            } else {
                callback(xObj.responseText,xObj.status);
            }
        }
    };
    xObj.send(null);
}

// -----------------------------------------------
// Carousel
// constructor function
//
function carousel(el, jsonData) {
    var obj = this,
        dataLength = jsonData.items.length,
        currentSlide = 0;

    obj.init = function () {
        // Create elements
        var ulEl = document.createElement('ul');
        var pagination = document.createElement('ul');
        var arrows = document.createElement('div');
        // Assign class names to the new elements
        ulEl.className = "carousel";
        arrows.className = "carousel-arrows";
        pagination.className = "carousel-pagination flex";
        // Add buttons into the new <div> element
        arrows.innerHTML = '<button type="button" class="btn btn--prev trans--all"><span class="btn__prev-icon">Previous</span></button><button type="button" class="btn btn--next trans--all"><span class="btn__next-icon">Next</span></button>';

        // Loop through object
        for(var i = 0; i < dataLength; i++) {
            // Main list item
            var liItem = document.createElement('li');
            liItem.className = 'trans--all';
            // Add attribute to the new element
            liItem.setAttribute("data-carousel-item", i);
            // Pagination list
            var liPag = document.createElement('li');
            liPag.className = 'trans--all';
            // If it's the first element, add a new class name
            if(i == 0) {
                liItem.className = 'trans--all active';
                liPag.className = 'trans--all active';
            }
            // If number is below 10 include 0 before the number => 01, 02, 03, etc.
            var pageId = (i < 10) ? '0' + (i+1) : i + 1;
            // Add carousel images into <li> element
            liItem.innerHTML = '<div class="img"><span class="res-data" data-srcset="'+jsonData.items[i].url+' 0w" data-lazy="true"></span><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="'+jsonData.items[i].title+'" class="res-img trans--all"></div>';
            // Add pagination button into <li> element
            liPag.innerHTML = '<button type="button" class="btn btn--pagination trans--all" aria-label="Go to slide '+pageId+'" data-pagination="'+i+'">'+pageId+'</button>';
            // Append to <ul> element
            ulEl.appendChild(liItem); 
            pagination.appendChild(liPag); 
        }

        // Append to element
        el.appendChild(ulEl);
        el.appendChild(arrows);
        // Insert the new pagination wrapper after carousel wrapper
        el.parentNode.insertBefore(pagination, el.nextSibling);

        obj.arrows();
        obj.paginationBtn();
    };
    obj.arrows = function () {
        var prevBtn, nextBtn;

        // Recursive function to find the class name
        function getElementInsideElement(baseElement, wantedElementID) {
            var elementToReturn;

            for(var i = 0; i < baseElement.children.length; i++) {
                elementToReturn = baseElement.children[i];

                // Check if class exists
                if (elementToReturn.classList.contains(wantedElementID)) {
                    if(wantedElementID == 'btn--prev') prevBtn = baseElement.childNodes[i];
                    if(wantedElementID == 'btn--next') nextBtn = baseElement.childNodes[i];
                    break;
                } else {
                    // Go inside element and try to find the class name
                    getElementInsideElement(elementToReturn, wantedElementID);
                }
            }
        }
        getElementInsideElement(el,'btn--prev');
        getElementInsideElement(el,'btn--next');

        prevBtn.addEventListener('click', function() {
            if(currentSlide > 0) {
                currentSlide -= 1;
                obj.pagination();
                obj.slides();
            }
        });

        nextBtn.addEventListener('click', function() {
            if(currentSlide >= 0 && currentSlide < dataLength-1) {
                currentSlide += 1;
                obj.pagination();
                obj.slides();
            };
        });
    };
    obj.paginationBtn = function() {
        var childrenEl = el.nextSibling.children;
        
        for(var i = 0; i < childrenEl.length; i++) {
            childrenEl[i].children[0].addEventListener('click', function() {
                currentSlide = parseInt(this.getAttribute('data-pagination'));
                obj.pagination();
                obj.slides();
            });
        }
    };
    obj.pagination = function() {
        var childrenEl = el.nextSibling.children;

        for(var i = 0; i < childrenEl.length; i++) {
            if(childrenEl[i].classList.contains('active')) {
                childrenEl[i].classList.remove('active');
            }
        }

        childrenEl[currentSlide].classList.add('active');
    };
    obj.slides = function() {
        // Recursive function to find the class name
        function showNewSlide(baseElement, wantedElementID) {
            var elementToReturn;

            for(var i = 0; i < baseElement.children.length; i++) {
                elementToReturn = baseElement.children[i];

                // Check if class exists
                if (elementToReturn.classList.contains(wantedElementID)) {
                    for(var c = 0; c < elementToReturn.children.length; c++) {
                        // Delete active and last active class
                        if(elementToReturn.children[c].classList.contains('active')) {
                            elementToReturn.children[c].classList.remove('active');
                        }
                        // Add active class to the new item
                        elementToReturn.children[currentSlide].classList.add('active');
                    }
                    break;
                } else {
                    // Go inside element and try to find the class name
                    showNewSlide(elementToReturn, wantedElementID);
                }
            }
        }

        showNewSlide(el,'carousel');
    };
}

// Load Json and run Carousel
loadJSON(function (response,statusCode) {
    if(statusCode == 200) {
        // Parse JSON string into object
        var jsonData = JSON.parse(response);

        // Run Carousel
        var carouselEl = document.getElementsByClassName('carousel-wrapper')[0];
        // Create a new object instance
        var imgCarousel = new carousel(carouselEl, jsonData);
        // Run carousel with a new namespace
        imgCarousel.init();
    }
});


// -----------------------------------------------
// Responsive image and lazy load
// constructor function
//
function resImg(el) {
    var obj = this,
        windowSizeObj = {};

    obj.id = el;
    obj.init = function () {
        obj.windowSize();
        obj.imgData();
        obj.windowScroll();
        obj.windowResize();
    };
    obj.imgData = function () {
        for (var i = 0; i < obj.id.length; i++) {
            var thisEl = obj.id[i],
                dataLazy = thisEl.getAttribute('data-lazy');

            // Check if it has the lazy attribute
            if (dataLazy !== 'true' || thisEl.parentNode.classList.contains('loaded')) {
                obj.changeUrl(thisEl, obj.bpImg(thisEl));
            } else {
                obj.inView(thisEl);
            }
        }
    };
    obj.bpImg = function (el) {
        // Regex, get breaking points value and image url
        var bp = el.getAttribute('data-srcset').match(/\s([0-9]+)w/g).join().replace(/\s/g, '').split(','),
            bpURL = el.getAttribute('data-srcset').match(/([a-zA-Z0-9/?$.:_-]+)\s/g).join().replace(/\s/g, '').split(',');

        return bpURL[obj.getBp(windowSizeObj.winW, bp)];
    };
    obj.windowSize = function () {
        // Check window width and height
        var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        windowSizeObj.winW = winW;
        windowSizeObj.winH = winH;
    };
    obj.inView = function (el) {
        // This function will check if the image is in the viewport
        // it will also check if the image is in the threshold so that
        // the image can load earlier while scrolling
        var elObj = el.nextElementSibling.getBoundingClientRect(),
            topPos = elObj.top,
            elHeight = elObj.height,
            threshold = 100,
            lazyWin = windowSizeObj.winH + threshold;

        if (topPos >= 0) {
            if (topPos <= lazyWin) obj.changeUrl(el, obj.bpImg(el));
        } else {
            var elInView = topPos + elHeight + threshold;
            if (elInView >= 0) obj.changeUrl(el, obj.bpImg(el));
        }
    };
    obj.getBp = function (vp, arr) {
        // This function will check the closest breaking point
        // it will check the current viewport with the breaking points
        var arrLength = arr.length;
        for (var i = arrLength; i > 0; i--) {
            if (vp >= parseInt(arr[i - 1])) {
                return parseInt(i - 1);
            } else if (vp < arr[0]) {
                return 0;
            }
        }
    };
    obj.changeUrl = function (el, url) {
        // This function will load the image and add it to the dom
        var nextImg = el.nextElementSibling;
        if (nextImg.getAttribute('src') !== url) {
            if (!el.parentNode.classList.contains('loading')) {
                el.parentNode.classList.add('loading');
                var img = new Image();
                img.addEventListener('load', function () {
                    nextImg.setAttribute('src', url);
                    el.parentNode.classList.remove('loading');
                    if (!el.parentNode.classList.contains('loaded')) el.parentNode.classList.add('loaded');
                }, false);
                img.src = url;
            }
        }
    };
    obj.windowScroll = function () {
        // Event listener for scrolling
        window.addEventListener('scroll', function (e) {
            obj.imgData();
        });
    };
    obj.windowResize = function () {
        // This will check if the browser size changed
        // it has a timeout so it don't trigger immediately
        var timeOut;
        window.onresize = function () {
            clearTimeout(timeOut);
            timeOut = setTimeout(run, 100);
        };

        function run() {
            obj.windowSize();
            obj.imgData();
        }
    };
}

var imgSrc = document.getElementsByClassName('res-data');
// Create a new object instance
var responsiveImg = new resImg(imgSrc);
// Run responsive image with a new namespace
responsiveImg.init();

