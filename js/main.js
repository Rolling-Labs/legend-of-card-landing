let audioPlayFirst = false;
/* Scroll animation text */
$.fn.isInViewport = function (top) {
    const elementTop = $(this).offset().top + top;
    const elementBottom = elementTop + $(this).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function audioPlay() {
    const audio = $('#sm_audio');
    audio[0].play();
    $('.sm_audio-reset').show();
    $('.sm_audio-play').hide();
}

function audioReset() {
    const audio = $('#sm_audio');
    if (audioPlayFirst) {
        audio[0].pause();
        audio[0].currentTime = 0;
        $('.sm_audio-reset').hide();
        $('.sm_audio-play').show();
    }else {
        audio[0].play();
        audioPlayFirst = true;
    }
}

$(document).ready(function () {
    /* Handle menu mobile */
    $('.navbar-toggler').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('open-mobile-menu');
        $('[data-main-menu]').toggleClass('nav-open');
    });

    // Handle preventDefault when click menu #
    $('.nav-item a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    /* Handle click menu sticky */
    $('.scroll-menu a').on('click', function (e) {
        e.preventDefault();

        const target = $(this).attr("href");
        const targetOffset = $(target).offset().top - 113;
        
        $('body').removeClass('open-mobile-menu');
        $('[data-main-menu]').removeClass('nav-open');
        
        $('html, body').stop().animate({
            scrollTop: targetOffset
        }, 600);
    });

    $('.sm__accordion-header').on('click', function () {
        const self = $(this);
        elAccordion = self.parents('.sm__accordion');

        self.addClass('disable');

        if (self.hasClass('active')) {
            self.removeClass('active');
            self.siblings('.collapse').slideUp(200);
        } else {
            elAccordion.find('.sm__accordion-header').removeClass('active');
            elAccordion.find('.collapse').slideUp(200);
            self.addClass('active');
            self.siblings('.collapse').slideDown(200);
        }
        $(this).removeClass('disable');
    });

    /* audio */
    $('.sm_audio-play').on('click', function () {
        audioPlay();
    });
    $('.sm_audio-reset').on('click', function () {
        audioReset();
    });
    if ($(window).width() <= 567) {
        $('.content__wrap-list .item').on('click', function () {
            if (!$(this).hasClass('active')) {
                $('.content__wrap-list .item').removeClass('active');
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }
        });
    }
});

$(window).on("load resize", function () {
    if ($(window).width() > 767) {
        /* Banner top - scroll set opacity */
        const bannerTopTarget = $('.jarallax');
        const bannerTopTargetHeight = bannerTopTarget.outerHeight();
        $(document).scroll(function () {
            const scrollPercent = (1.6 - ((bannerTopTargetHeight - window.scrollY) / bannerTopTargetHeight)) * 100;
            if (scrollPercent >= 0) {
                $('.section__cardslingers').css('box-shadow', `0px -100px 100px 10px rgb(0 0 0 / ${scrollPercent}%)`);
            }
        });
    } else {
        $('.section__roadmap .item-card-light').on('click', function () {
            if (!$(this).hasClass('action-mb')) {
                $('.section__roadmap .item-card-light').removeClass('action-mb');
                $(this).addClass('action-mb');
            }
        });
    }

});

$(window).on("load resize scroll", function () {

    if ($(window).width() > 567) {
        const prallaxST = $(this).scrollTop();
        const prallaxNow = -prallaxST/5;
        $(".jarallax video").css({"transform": "translate3d(0px, " + prallaxNow + "px, 0px)"});
    }

    if ($(window).width() > 567) {

        const aniOffsetTop = 30;
        $('[data-text-animation]').each(function () {
            if ($(this).data('offset') == 0) {
                if ($(this).isInViewport(0)) {
                    const getDelay = $(this).data('delay') ? $(this).data('delay') : 0.2;
                    const getSpeed = $(this).data('speed') ? $(this).data('speed') : 1.5;
                    TweenMax.to($(this), getSpeed, { clipPath: "polygon(0% 0%, 100% 0%, 100% 150%, 0% 150%)" }).delay(getDelay);
                }
            }else {
                if ($(this).isInViewport(aniOffsetTop)) {
                    const getDelay = $(this).data('delay') ? $(this).data('delay') : 0.2;
                    const getSpeed = $(this).data('speed') ? $(this).data('speed') : 1.5;
                    TweenMax.to($(this), getSpeed, { clipPath: "polygon(0% 0%, 100% 0%, 100% 150%, 0% 150%)" }).delay(getDelay);
                }
            }
        });

        // handle active menu sticky
        $('[data-page-section]').each(function (i) {
            if ($(this).isInViewport(0)) {
                const dataAnchor = $(this).data('section-anchor');
                $('.section__sticky-menu a.active').removeClass('active');
                $('.section__sticky-menu ul').find(`a[href$="${dataAnchor}"]`).addClass('active');
                return false;
            }
        });
    }else {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > 25) {
            $('header.navbar').addClass('header-fix');
        }else {
            $('header.navbar').removeClass('header-fix');
        }
    }
});

$(document).ready(function () {
    const modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    if(!span || !modal) return;

    // When the user clicks the button, open the modal
    $('.sm_open_modal').on('click', function (e) {
        e.preventDefault();
        $('.sm_modal').show();
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})