var current; //current image being viewed as int from 1
var slideTime = 800; //ms
var animating = false; //cheap stop for double forward/backward animations.

function fullScreen(element){
    var elem = document.getElementById("main");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
}


function slideAt(i){
    return $("img:nth-child("+i+")");
}

function slideNext(){
    //slide current left, make next visible, hide old current. slide new from right
    animating = true;
    (function(currentSliding){
        slideAt(currentSliding).animate({left: -$(document).width()}, slideTime, function(){
            slideAt(currentSliding).removeClass("show");
            animating = false;
        });
    })(current);
    
    current++;
    

    (function(newSliding){
        slideAt(newSliding).css({left: $(document).width()+"px", top: "0px"});
        slideAt(newSliding).addClass("show");
        slideAt(newSliding).animate({left: 0}, slideTime, function(){
            animating = false;
        });
    })(current);
}

function slidePrev(){
    //slide current right, make prev visible, hide old current. slide old from left
    animating = true;
    (function(currentSliding){
        slideAt(currentSliding).animate({left: $(document).width()}, slideTime, function(){
            slideAt(currentSliding).removeClass("show");
            animating = false;
        });
    })(current);
    
    current--;

    (function(newSliding){
        slideAt(newSliding).css({left: -$(document).width()+"px", top: "0px"});
        slideAt(newSliding).addClass("show");
        slideAt(newSliding).animate({left: 0}, slideTime, function(){
            animating = false;
        });
    })(current);
}

//jquery init bindings
$(function(){
    $('img').click(function(e){
        var posX = e.pageX - $(this).position().left;
        var widthHalf = $(this).width() / 2;
        if(widthHalf <= posX){
            slideNext();
	    console.log($("#leaves").exifAll());
        } else {
            slidePrev();
        }
    });
    
    $(document).bind('keydown', function(e) {
        if(animating){
            return false;
        }
        if(e.which == 70){
            fullScreen($("body"));
        } else if(e.which == 39) {
            var count = $(".gallery img").length;
            if(current == count){
                //last slide can't go more
                reachedEndAnimate(true);
            } else {
                slideNext();
            }
        } else if (e.which == 37){
            if(current == 1){
                //first slide, no perv
                reachedEndAnimate(false);
            } else {
                slidePrev();
            }
        }
    });
    
    derpInit();
});

function derpInit(){
    current = 1;
    slideAt(current).addClass("show");
}

function reachedEndAnimate(end){
    if(end){
        $(slideAt(current)).animate({left: "-50px"}, 200, function(){
            $(slideAt(current)).animate({left: "0px"}, 100);
        });
    } else {
        $(slideAt(current)).animate({left: "50px"}, 200, function(){
            $(slideAt(current)).animate({left: "0px"}, 100);
        });
    }
}
