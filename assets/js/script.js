$(document).ready(function () {
    $('.nc').on('keydown', function (event) {
        if (event.key === "Backspace") {
            if ($(this).val() == "") {
                $($(this).prev()).focus();
            }
        }
    });
    $('.nc').on('keyup', function (event) {
        if (event.key != "Backspace") {
            this.value = this.value.replace(/[^0-9]/g, '');
            if ($(this).val() != "") {
                $($(this).next()).focus();
            }
        }
    });

    $('.set-back').each(function (index, element) {
        $(this).css('background', $(this).attr('backcolor'));
    });

    $('.theme-popup>a').click(function (e) {
        $('.theme-popup .theme-popup-list').slideToggle();
    });
});

function setTheme(theme) {
    for (let i = 0; i < 10; i++) {
        $('body').removeClass('theme' + i);
    }
    $('body').addClass(theme);
}

function openModal(modal) {
    $(modal).toggleClass('opened');
}

function closeModal(modal) {
    $(modal).removeClass('opened');
}

function LayoutChange() {
    if ($(window).width() < 992) {
        $('.main-nav').prependTo('.landing-image');
        $('.landing-tips').appendTo('.landing');
    } else {
        $('.main-nav').prependTo('.header');
        $('.landing-tips').insertAfter('.landing-text > .section-header');
    }
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "light") {
    document.body.classList.add("light-theme");
}

function toggleMode() {
    document.body.classList.toggle("light-theme");
    let theme = "dark";
    if (document.body.classList.contains("light-theme")) {
        theme = "light";
    }
    localStorage.setItem("theme", theme);
}

function toggleTips() {
    $('.landing-tips').toggleClass('closed');
    if ($('.landing-tips').hasClass('closed')) {
        $('.landing-tips .opener').text('نمایش موارد بیشتر');
    } else {
        $('.landing-tips .opener').text('نمایش موارد کمتر');
    }
}