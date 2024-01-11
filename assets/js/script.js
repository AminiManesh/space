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

    await delay(1500);
    new WOW().init();
});

function navbarCheck() {
    if ($(window).scrollTop() >= 20) {
        $('.navbar').addClass('active');
    } else if ($(window).scrollTop() === 0) {
        $('.navbar').removeClass('active');
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