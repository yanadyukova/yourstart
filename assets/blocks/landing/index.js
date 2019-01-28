import Swiper from 'swiper/dist/js/swiper.js';
import Visible from '@egjs/visible';
import skrollr from 'skrollr';


export default function(isMobile) {
    if (!isMobile) {
        skrollr.init({
            forceHeight: false
        });
    }

    let visible = (function() {
        let playerContainer = $('#playerPromo'),
            playerContainer2 = $('#playerPromo2');

        if (!playerContainer.length && !playerContainer2.length) {
            return false;
        }

        var visiblePromo = new Visible(document, {
            targetClass : 'landing-section_promo',
            expandSize : 0
        }).on('change', function (e) {
            $(e.visible).addClass("visible");
            $(e.invisible).removeClass("visible");

            if (playerContainer.length && playerContainer.hasClass('ready')) {
                if (e.visible.length) {
                    playerPromo.playVideo();
                } else {
                    playerPromo.pauseVideo();
                }
            }

            if (playerContainer2.length) {
                if (e.visible.length) {
                    playerContainer2[0].play();
                } else {
                    playerContainer2[0].pause();
                }
            }
        });

        visiblePromo.check();


        var timer = null;
        $(window).scroll(function () {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(function() {
                timer = null;

                visiblePromo.check();
            }, 50);
        });
    })(),
    sliders = (function() {
        let slidesPerView = 2,
            slidesPerViewHistory = 3,
            slidesPerViewArticle = 3;
        if (isMobile) {
            slidesPerView = 1;
            slidesPerViewHistory = 1;
            slidesPerViewArticle = 1;
        }

        new Swiper('.jsSliderLandingNews .swiper-container', {
            slidesPerView: slidesPerView,
            loop: true,
            navigation: {
                nextEl: '.jsSliderLandingNews .swiper-next-default',
                prevEl: '.jsSliderLandingNews .swiper-prev-default',
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });

        new Swiper('.jsSliderLandingHistory .swiper-container', {
            slidesPerView: slidesPerViewHistory,
            loop: true,
            navigation: {
                nextEl: '.jsSliderLandingHistory .swiper-next-circle',
                prevEl: '.jsSliderLandingHistory .swiper-prev-circle',
            }
        });

        new Swiper('.jsSliderLandingArticle .swiper-container', {
            slidesPerView: slidesPerViewArticle,
            loop: true,
            navigation: {
                nextEl: '.jsSliderLandingArticle .swiper-next-default',
                prevEl: '.jsSliderLandingArticle .swiper-prev-default',
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });

        $('.jsLandingBusinessToggle').click(function() {
            let index = $(this).index();

            $(this).addClass('active').siblings().removeClass('active');
            $('.jsLandingBusinessItem').removeClass('active').eq(index).addClass('active');

            if (!$('.jsSliderLandingVideos').children().hasClass('swiper-container-horizontal')) {
                new Swiper('.jsSliderLandingVideos .swiper-container', {
                    slidesPerView: slidesPerViewArticle,
                    loop: true,
                    navigation: {
                        nextEl: '.jsSliderLandingVideos .swiper-next-default',
                        prevEl: '.jsSliderLandingVideos .swiper-prev-default',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                    },
                });
            }
            return false;
        });
    })(),
    pinSubscribe = (function() {
        var pin = $('.pin-subscribe');

        var scroll = function (scrollTop) {
            if (scrollTop >= 100) {
                pin.addClass('collapsed');
            } else {
                pin.removeClass('collapsed');
            }
        };

        var waiting = false,
            endScrollHandle;

        $(window).scroll(function () {
            if (waiting) {
                return;
            }
            waiting = true;

            // clear previous scheduled endScrollHandle
            clearTimeout(endScrollHandle);

            scroll($(window).scrollTop());

            setTimeout(function () {
                waiting = false;
            }, 50);

            // schedule an extra execution of scroll() after 200ms
            // in case the scrolling stops in next 100ms
            endScrollHandle = setTimeout(function () {
                scroll($(window).scrollTop());
            }, 200);
        });
    })(),
    notice = (function() {
        var container = $('.poster-notice');

        if (!container.length) {
            return;
        }

        function getRandomInt() {
            var min = 30 * 1000;
            var max = 120 * 1000;
            var value = Math.floor(Math.random() * (max - min + 1)) + min;

            return value;
        }

        function getMessage() {
            $.ajaxPrefilter( function (options) {
              if (options.crossDomain && jQuery.support.cors) {
                var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                //options.url = "http://cors.corsproxy.io/url=" + options.url;
              }
            });

            $.get('https://randus.org/api.php', function (data) {
                if (!data) {
                    console.log('res', res);
                    return false;
                }

                var message = data.fname + ' из г. ' + data.city + ' только что присоединилась к нам!';

                if (data.gender === 'm') {
                    message = data.fname + ' из г. ' + data.city + ' только что присоединился к нам!';
                }

                console.log(message);
                container.text(message).fadeIn(800).delay(5000).fadeOut('400', function() {
                    showNotice();
                });;
            });
        }

        function showNotice() {
            setTimeout(function() { getMessage() }, getRandomInt());
        }

        $(window).on('load', function() {
            getMessage();
        });
    })();
}