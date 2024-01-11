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


var allFilters = $('input[type="checkbox"]');

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

    $('input[type="checkbox"]').on('change', function () {
        addSelectedFilter($(this).attr("id"));
    });


    $.each(allFilters, function (indexInArray, valueOfElement) {
        var searchItem = document.createElement('li');
        $(searchItem).addClass('search-in-filters-dropdown-list-item');
        $(searchItem).text($(this).parent().find('label').text());
        $(searchItem).attr('for', this.id);
        $('.search-in-filters-dropdown-list').append(searchItem);
    });

    $('.search-in-filters-dropdown-list-item').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('for');
        var checkbox = document.getElementById(id);
        checkbox.checked = true
        var event = new Event('change');
        checkbox.dispatchEvent(event);

        var search = $('input.search-in-filters')[0];
        $(search).val('');
        var event2 = new Event('keyup');
        search.dispatchEvent(event2);
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

function showFilter(e, mode) {

    var target = $(e).parent().parent().parent().find('.filter-section-which');

    switch (mode) {
        case "no":
            $(target).slideUp(300);
            $(target.find('input')).each(function (index, element) {
                this.checked = false;
                var event = new Event('change');
                this.dispatchEvent(event);
            });
            break;

        case "has":
            $(target).slideDown(300);
            break;

        case "all":
            $(target).slideDown(300);
            $(target.find('input')).each(function (index, element) {
                var dataConnect = this.id;
                removeSelectedFilter(dataConnect)
                this.checked = true;
                var event = new Event('change');
                this.dispatchEvent(event);
            });
            break;

        default:
            break;
    }
}

// an async function for set delay
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function addSelectedFilter(id) {
    var checked = document.getElementById(id).checked;
    var text = $('#' + id).parent().find('label').text();
    var name = document.getElementById(id).name;

    if (checked) {
        var notLikeThis = $('.selected-filter[data-connect="' + id + '"]')
        console.log(notLikeThis.length)
        if (notLikeThis.length === 0) {
            var selectedFilter = document.createElement('span');
            $(selectedFilter).addClass('selected-filter');
            $(selectedFilter).addClass(name);

            var selectedFilterText = document.createElement('span');
            $(selectedFilterText).addClass('selected-filter-text');

            var selectedFilterIcon = document.createElement('span');
            $(selectedFilterIcon).addClass('bi');
            $(selectedFilterIcon).addClass('bi-x');
            $(selectedFilterIcon).addClass('vertical-center');

            $(selectedFilter).append(selectedFilterText);
            $(selectedFilter).append(selectedFilterIcon);

            $(selectedFilterText).text(text + " ");
            $(selectedFilter).attr("data-connect", id);
            selectedFilter.addEventListener('click', function () {
                var dataConnect = $(this).attr('data-connect');
                removeSelectedFilter(dataConnect);
            });

            $('.selected-filters').prepend(selectedFilter);
        }
    } else {
        $('.selected-filter[data-connect="' + id + '"]').remove();
    }
}

function removeSelectedFilter(dataConnect) {
    document.getElementById(dataConnect).checked = false;
    var event = new Event('change');
    document.getElementById(dataConnect).dispatchEvent(event);
}

function searchInFilters(inputValue) {

    if (inputValue) {
        $('.search-in-filters-dropdown').fadeIn(300);
    } else {
        $('.search-in-filters-dropdown').fadeOut(300);
    }

    filter = inputValue.toUpperCase();
    var searchItems = document.getElementsByClassName('search-in-filters-dropdown-list-item');

    for (i = 0; i < searchItems.length; i++) {
        txtValue = $(searchItems[i]).text();
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            searchItems[i].style.display = "";
        } else {
            searchItems[i].style.display = "none";
        }
    }
}