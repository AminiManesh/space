$(window).on('load', function () {

    $('.counter').counter({
        autoStart: true,
        duration: 1500,
        countFrom: 0,
        countTo: 100,
        runOnce: true,
        placeholder: "?",
        easing: "easeOutSine",


        onStart: function () {
            $('.load-progress').addClass('loading');
        },
        onComplete: function () {
            $('.load-screen').fadeOut(500);
        },
        numberFormatter:
            function (number) {
                return Math.floor(number) + "%";
            }
    });
});

$(window).on('scroll', function () {

    navbarCheck();
    $('.anim').each(function (index, element) {
        if (isInViewport(this)) {
            $(this).addClass('animate__animated');
            $(this).addClass('show');
            $(this).addClass($(this).attr("animMode"));
            $(this).addClass($(this).attr("animDuration"));
            $(this).addClass($(this).attr("animDelay"));
        }
    });
});

$(window).on('resize', function () {

});


$(document).ready(async function () {

    particlesJS.load('particles-js', 'assets/particles/particles.json', function () {
        console.log('callback - particles.js config loaded');
    });

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 20,
        speed: 10000,
        perspective: 1000
    });

    Fancybox.bind("[data-fancybox]", {
        // options
    });

    $('.canvas-item.parent a').click(function (e) {
        var target = $(this).parent().find('.canvas-menu.child')[0];
        $(target).slideToggle();
        $('.canvas-menu.child').each(function (index, element) {
            if (!target.isEqualNode(element)) {
                $(element).slideUp();
            }
        });
    });

    // switching language
    $('.switch-lang').click(function (e) { 
        $(this).toggleClass('changed');
        // switch language api
    });

    $('.other-images-item img').click(function (e) {
        e.preventDefault();

        $('.other-images-item img').each(function (index, element) {
            $(this).removeClass('selected');
        });

        var item = $(this);
        $(item).addClass('selected');
        var data_fanybox = $(item).attr('data-fancybox');
        var data_caption = $(item).attr('data-caption');
        var src = $(item).attr('src');
        var post = $('.post-image');
        $(post).attr('data-fancybox', data_fanybox);
        $(post).attr('data-caption', data_caption);
        $(post).attr('src', src);
    });


    $('.des-expand').click(function (e) {
        var iUp = document.createElement('i');
        var iDown = document.createElement('i');
        $(iUp).addClass('bi bi-chevron-up vertical-center');
        $(iDown).addClass('bi bi-chevron-down vertical-center');
        console.log(iUp)
        console.log(iDown)

        if ($('.full-description .text').hasClass('closed')) {
            $('.des-expand').text('Read less ');
            $('.des-expand').append(iUp);
        } else {
            $('.des-expand').text('Read more ');
            $('.des-expand').append(iDown);
        }
        $('.full-description .text').toggleClass('closed');
    });

    var perView = 0;
    if ($(window).width() >= 1200) {
        $('.others-swiper').height($('.general-content').height());
        var heightAll = parseInt($('.other-posts').height());
        var heightOther = parseInt($('.other-posts-item').height());
        perView = Math.floor(heightAll / heightOther);
    } else {
        perView = 4;
    }
    console.log(perView);
    var othersSwiper = new Swiper(".others-swiper", {
        direction: "vertical",
        slidesPerView: perView,
        allowTouchMove: true,
        draggable: true,
        mousewheel: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
    });

    $('.show-replies').click(function (e) {
        $(this).parent().parent().parent().find('.comment-replies').slideToggle();
    });

    await delay(1500);
    new WOW().init();
});

function navbarCheck() {
    if ($(window).scrollTop() >= 20) {
        $('.navbar').addClass('active');
        $('.canvas-float-btn').addClass('move');
    } else if ($(window).scrollTop() === 0) {
        $('.navbar').removeClass('active');
        $('.canvas-float-btn').removeClass('move');
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// an async function for set delay
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}