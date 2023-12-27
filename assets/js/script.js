$(window).on('load', function () {
    $('.counter').counter({
        autoStart: true,           // true/false, default: true
        duration: 2000,             // milliseconds, default: 1500
        countFrom: 0,              // start counting at this number, default: 0
        countTo: 100,                // count to this number, default: 0
        runOnce: true,              // only run the counter once, default: false
        placeholder: "?",           // replace the number with this before counting,
        // most useful with autoStart: false. default: undefined
        easing: "easeOutSine",     // see http://gsgd.co.uk/sandbox/jquery/easing
        // for all available effects, see visual examples:
        // http://easings.net
        // default: "easeOutQuad"
        onStart: function () {
            $('.load-progress').addClass('loading');
        },     // callback on start of the counting
        onComplete: function () {
            $('.load-screen').fadeOut(500);
        },  // callback on completion of the counting
        numberFormatter:            // function used to format the displayed numbers.
            function (number) {
                return Math.floor(number) + "%";
            }
    });
});


$(document).ready(function () {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'assets/particles/particles.json', function () {
        console.log('callback - particles.js config loaded');
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

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 20,
        speed: 10000,
        perspective: 1000
    });

    Fancybox.bind("[data-fancybox]", {
        // options
    });
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