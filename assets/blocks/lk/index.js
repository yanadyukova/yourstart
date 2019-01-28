import Scroller from 'scroller';
import Swiper from 'swiper/dist/js/swiper.js';
import Cookies from 'js-cookie';

import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';

export default function() {
    let scroller = new Scroller();
    scroller.init();

    // $('select').selectize();

    let notify = (() => {
        $('.jsNotifyToggle').click(function() {
            $('.jsNotify').toggleClass('active');

            return false;
        });
    })(),
    locale = (() => {
        let lang = $('html').attr('lang')

        return {
            getLocale() {
                return lang;
            },
            getLocaleDatePicker() {
                var value;

                switch (this.getLocale()) {
                    case 'ru':
                    case 'ru-RU':
                    case 'by-BY':
                    case 'ua-RU':
                    case 'kz-RU':
                    case 'am-RU':
                    case 'kg-RU':
                    case 'md-RU':
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min.js');
                        value = 'ru';
                        break;
                    case 'ua-UA':
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.uk.min.js');
                        value = 'uk';
                        break;
                    case 'kz-KZ':
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.kk.min.js');
                        value = 'kk';
                        break;
                    case 'am-AM':
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.hy.min.js');
                        value = 'hy';
                        break;
                    case 'az-AZ':
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.az.min.js');
                        value = 'az';
                        break;
                    case 'mn-MN':
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.mn.min.js');
                        value = 'mn';
                        break;
                    case 'md-MD':
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.ro.min.js');
                        value = 'ro';
                        break;
                    case 'ge-GE':
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.ka.min.js');
                        value = 'ka';
                        break;
                    default:
                        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min.js');
                        value = 'ru';
                }

                return value;
            }
        }
    })(),
    date = (() => {
        let container = $('.jsDatepicker'),
            lang = locale.getLocaleDatePicker();

        container.datepicker({
            language: lang,
            autoclose: true,
            maxViewMode: 1
        });
    })(),
    mobileHeader = (() => {
        $('.jsMobileNavToggle').click(function() {
            $(this).toggleClass('active');
            $('.jsMobileNav').toggleClass('active');

            $('.jsMobileSearchToggle').removeClass('active');
            $('.jsMobileSearch').removeClass('active');
            return false;
        });

        $('.jsMobileNavLkToggle').click(function() {
            $(this).toggleClass('active');
            $('.jsMobileNavLk').toggleClass('active');
            return false;
        });

        $('.jsMobileSearchToggle').click(function() {
            $(this).toggleClass('active');
            $('.jsMobileSearch').toggleClass('active');

            $('.jsMobileNavToggle').removeClass('active');
            $('.jsMobileNav').removeClass('active');
            return false;
        });

        function viewToggle(_this) {
            $('.jsMobileViewList, .jsMobileViewMap').removeClass('active');
            if (_this.hasClass('active')) {
                Cookies.set('lk_view_mode', 'map');
                $('.jsMobileViewMap').addClass('active');
                setTimeout(function() {
                    if (!mapInit) {
                        initMap();
                    }
                }, 0);
            } else {
                Cookies.set('lk_view_mode', 'list');
                $('.jsMobileViewList').addClass('active');
            }
        }

        // if (Cookies.get('lk_view_mode') === 'map') {
        //     $('.jsMobileViewToggle').addClass('active');
        // }

        viewToggle($('.jsMobileViewToggle'));
        $('.jsMobileViewToggle').click(function() {
            $(this).toggleClass('active');
            viewToggle($(this));

            $('.jsMobileNavToggle').removeClass('active');
            $('.jsMobileNav').removeClass('active');
            return false;
        });

    })(),
    personal = (() => {
        $('.jsPersonalFormInputEnable').click(function() {
            $(this).closest('.personal__row').find('input').prop('readonly', false).select().focus();
            $(this).hide();
            return false;
        });

        $('.jsPersonalEventToggle').click(function() {
            let index = $(this).index();

            $(this).addClass('active').siblings().removeClass('active');
            $('.jsPersonalEventItem').removeClass('active').eq(index).addClass('active');
            return false;
        });
    })(),
    card = (() => {
        $('.jsEventCardFavoriteToggle').click(function() {
            $(this).toggleClass('active');
            return false;
        });
    })(),
    filter = (() => {
        $('.jsFilterToggle').click(function() {
            $(this).toggleClass('active').closest('.filter').toggleClass('active');
            $('.jsFilter').toggle();
            return false;
        });

        $('.filter-extended__inner button[type="reset"], .filter-head button[type="reset"]').click(function() {
            $('.filter-extended__list input[type="checkbox"]').each(function(index, el) {
                $(this).removeAttr('checked');
            });
        });
    })(),
    map = (() => {
        $('.jsMapContentToggle').click(function() {
            $(this).toggleClass('active');
            $('.jsMapContent').toggleClass('full');
            setTimeout(function() {
                scroller.update();
                scroller.update();
            }, 500);
            return false;
        });
    })(),
    event = (() => {
        let galleryInit = false,
            galleryBig,
            galleryThumbs,
            slideActive = 0;

        let options1 = {
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 10
            },
            slidesPerView: 5,
            slidesPerColumn: 2,
            navigation: {
              nextEl: $('.jsSliderEventGallery').find('.swiper-next'),
              prevEl: $('.jsSliderEventGallery').find('.swiper-prev'),
            }
        };

        if ($('body').hasClass('mobile')) {
            options1.slidesPerView = 3;
            options1.slidesPerColumn = 1;
        }

        new Swiper ($('.jsSliderEventGallery').find('.swiper-container'), options1);

        $('.jsSliderEventGallery .swiper-slide > a').click(function() {
            let index = $(this).parent().index();

            slideActive = index;
            $('.jsModalGallery').modal('show');

            if (galleryInit) {
                galleryThumbs.slideTo(slideActive, 0);
            }

            return false;
        });

        function gallerySlidersInit() {
            if (galleryInit) return false;

            galleryInit = true;

            let options1 = {
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 10
                },
                slidesPerView: 1,
                initialSlide: slideActive,
                navigation: {
                  nextEl: $('.jsModalGalleryBig').find('.swiper-next'),
                  prevEl: $('.jsModalGalleryBig').find('.swiper-prev'),
                }
            };

            galleryBig = new Swiper ($('.jsModalGalleryBig').find('.swiper-container'), options1);

            galleryThumbs = new Swiper ($('.jsModalGalleryThumb').find('.swiper-container'), {
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 10
                },
                // slidesPerView: 6,
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                preloadImages: true,
                updateOnImagesReady: true,
                initialSlide: slideActive,
                navigation: {
                  nextEl: $('.jsModalGalleryThumb').find('.swiper-next'),
                  prevEl: $('.jsModalGalleryThumb').find('.swiper-prev'),
                }
            });

            galleryBig.controller.control = galleryThumbs;
            galleryThumbs.controller.control = galleryBig;
        }

        $('.jsModalGallery').on('shown.bs.modal', function (e) {
            gallerySlidersInit();
        });

        $('.jsModalGalleryThumb .swiper-slide > a').click(function() {
            let index = $(this).parent().index();

            galleryThumbs.slideTo(index);
            return false;
        });
    })(),
    mapButtons = (() => {
        $('.jsEventSubscribeToggle').click(function() {
            $('.jsEventSubscribe').toggleClass('active');

            return false;
        });

        $('.jsEventShareToggle').click(function() {
            $('.jsEventShare').toggleClass('active');

            return false;
        });
    })(),
    hint = (() => {
        let container = $('.jsHint');

        if (!container.length) return;

        container.each(function() {
            let name = $(this).data('cookie');
            if (Cookies.get(name) !== 'viewed') {
                $(this).addClass('active');
            }
        });

        $('.jsHintClose').click(function() {
            let name = $(this).closest('.hint').data('cookie');

            $(this).closest('.hint').removeClass('active');
            Cookies.set(name, 'viewed');

            return false;
        });
    })(),
    photo = (() => {
        $('.jsModalPhotoToggle').click(function() {
            let src = $(this).data('src');

            $('.jsModalPhotoPic').attr('src', src)
            $('.jsModalPhoto').modal('show');
            return false;
        });
    })();
}