// import Promise from 'es6-promise-promise'; // нужен^ если используется require.ensure, для ie11-
import 'babel-polyfill';
import 'expose-loader?$!expose-loader?jQuery!jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import Modal from 'modal';

import 'jquery-ui/ui/widget.js';
import 'jquery-ui/ui/widgets/autocomplete.js';

// import Cookies from 'js-cookie';

let isMobile = $('body').hasClass('mobile'),
    loader = (function() {
        if ($('[data-page="landing"]').length) {
            require.ensure([], () => {
                require('landing').default(isMobile);
            });
        }

        if ($('[data-page="map"]').length) {
            require.ensure([], () => {
                require('map').default();
            });
        }
    })(),
    modals = (function() {
        $('[data-modal-video]').click(function() {
            new Modal($('.jsModalVideo')).show($(this));

            return false;
        });

        $('.jsModalNewStory').on('show.bs.modal', function () {
            if (!$('.jsModalNewStory').hasClass('initCkeditor')) {
                $('.jsModalNewStory').addClass('initCkeditor');
                CKEDITOR.replace( 'successStory__text',
                {
                    toolbar: [
                        { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                        { name: 'styles', items: [ 'Styles', 'Format' ] },
                        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
                        // { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
                        // { name: 'links', items: [ 'Link', 'Unlink' ] },
                        // { name: 'insert', items: [ 'Image', 'EmbedSemantic', 'Table' ] },
                        { name: 'tools', items: [ 'Maximize' ] },
                        // { name: 'editing', items: [ 'Scayt' ] }
                    ],
                });
            }
        });
    })(),
    header = (function() {
        var container = $('.header');

        var scroll = function (scrollTop) {
            if (scrollTop >= 100) {
                container.addClass('active');
            } else {
                container.removeClass('active');
            }
        };

        if ($('[data-page="map"]').length) {
            return;
        }

        $(window).scroll(function () {
            scroll($(window).scrollTop());

        });
    })(),
    nav = (function() {
        $('.jsNavToggle').click(function() {
            $('.jsNavToggle').toggleClass('active');
            $('.jsNav').toggleClass('active');

            return false;
        });
    })(),
    lang = (function () {
        $('.jsLangToggle').click(function() {
            $('.jsLang').toggleClass('active');
            return false;
        });

        $('.jsModalCountryConfirmListToggle').click(function() {
            $(this).siblings('ul').toggle();
            return false;
        });
    })(),
    form = (function() {
        $('input').keydown(function() {
            $(this).parent().removeClass('error');
        });

        $('.jsShowMoreSocialFileds').click(function() {
            let fileds = $(this).closest('form').find('.form-group_hidden');

            fileds.eq(0).removeClass('form-group_hidden');

            if (fileds.length <= 1) {
                $(this).hide();
            }

            return false;
        });

        $('.jsFormControlToggle').click(function() {
            $(this).hide().siblings('.form-control_hidden').removeClass('form-control_hidden');
            $(this).closest('.form-row_social').addClass('open');
            return false;
        });
    })(),
    sliders = (function() {
        let slidesPerView = 3;
        let slidesPerGroup = 3;
        let navigation = {
            nextEl: '.jsSliderLandingHistory .swiper-next-circle',
            prevEl: '.jsSliderLandingHistory .swiper-prev-circle',
        };

        if(isMobile) {
            slidesPerView = 1;
            slidesPerGroup = 1;
            navigation = {
                nextEl: '.jsSliderLandingHistory .swiper-next-default',
                prevEl: '.jsSliderLandingHistory .swiper-prev-default',
            };
        }
        new Swiper('.jsSliderLandingHistory .swiper-container', {
            slidesPerView: slidesPerView,
            slidesPerGroup: slidesPerGroup,
            autoplay: {
                delay: 5000
            },
            loop: true,
            navigation: navigation
        });

        /*new Swiper('.jsSliderTravelEvents .swiper-container', {
            slidesPerView: slidesPerView,
            loop: true,
            navigation: {
                nextEl: '.jsSliderTravelEvents .swiper-next-default',
                prevEl: '.jsSliderTravelEvents .swiper-prev-default',
            }
        });*/
        if (isMobile) {
            new Swiper('.jsSliderTravelEvents .swiper-container', {
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.jsSliderTravelEvents .swiper-next-default',
                    prevEl: '.jsSliderTravelEvents .swiper-prev-default',
                }
            });
        } else {
            new Swiper('.jsSliderTravelEvents .swiper-container', {
                slidesPerView: 3,
                loop: true,
                navigation: {
                    nextEl: '.jsSliderTravelEvents .swiper-next-default',
                    prevEl: '.jsSliderTravelEvents .swiper-prev-default',
                }
            });
        }

        if (isMobile) {
            new Swiper('.jsSliderArticle .swiper-container', {
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                // autoplay: {
                //     delay: 5000
                // },
                navigation: {
                    nextEl: '.jsSliderArticle .swiper-next-default',
                    prevEl: '.jsSliderArticle .swiper-prev-default',
                }
            });
        } else {
            new Swiper('.jsSliderLandingArticle .swiper-container', {
                slidesPerView: 3,
                slidesPerGroup: 3,
                loop: true,
                // autoplay: {
                //     delay: 5000
                // },
                navigation: {
                    nextEl: '.jsSliderLandingArticle .swiper-next-default',
                    prevEl: '.jsSliderLandingArticle .swiper-prev-default',
                }
            });
        }
    })(),
    mediaTravel = (function() {
        $('.jsSliderTravelToggle').click(function() {
            let index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.jsSliderTravelItem').removeClass('active').eq(index).addClass('active');

            return false;
        });

        new Swiper('.jsSliderTravelVideo .swiper-container', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.jsSliderTravelVideo .swiper-next-video',
                prevEl: '.jsSliderTravelVideo .swiper-prev-video',
            }
        });

        let photoBig = $('.jsGalleryPhoto');
        $('.jsGalleryPhotoToggle').hover(function() {
            let src = $(this).data('src');

            photoBig.attr('src', '').hide();
            photoBig.attr('src', src).show();

            return false;
        });

        let photoItems = $('.jsGalleryModalPhotoToggle'),
            photoPrev = $('.jsGalleryModalPhotoPrev'),
            photoNext = $('.jsGalleryModalPhotoNext');

        function photoBigTo(index, src) {
            photoBigModal.attr('src', src).hide();
            photoBigModal.off('load').on('load', function() {
                $(this).show();
            });

            let current = photoItems.eq(index);

            if (current.prev().length) {
                photoPrev.show();
            } else {
                photoPrev.hide();
            }

            if (current.next().length) {
                photoNext.show();
            } else {
                photoNext.hide();
            }
        }

        let photoBigModal = $('.jsGalleryModalPhoto'),
            photoBigModalPopup = $('.jsGalleryModalPopup, .jsGalleryModalPopupBack');
        $('.jsGalleryModalPhotoToggle').click(function() {
            let index = $(this).index(),
                src = $(this).data('src');

            photoBigTo(index, src);
            $(this).addClass('active').siblings().removeClass('active');

            photoBigModalPopup.fadeIn(200);

            return false;
        });

        photoPrev.click(function() {
            let current = $('.jsGalleryModalPhotoToggle.active');
            current.removeClass('active').prev().addClass('active');
            current = $('.jsGalleryModalPhotoToggle.active');

            let index = current.index(),
                src = current.data('src');

            photoBigTo(index, src);

            return false;
        });

        photoNext.click(function() {
            let current = $('.jsGalleryModalPhotoToggle.active');
            current.removeClass('active').next().addClass('active');
            current = $('.jsGalleryModalPhotoToggle.active');

            let index = current.index(),
                src = current.data('src');

            photoBigTo(index, src);

            return false;
        });

        $('.jsGalleryModalPhotoClose').click(function() {
            photoBigModalPopup.fadeOut(200);
            setTimeout(function() {
                photoBigModal.attr('src', '');
            }, 200);
            return false;
        });
    })(),
    referral = (function() {
        function validateRef(str){var ars = str.replace(/[^0-9a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', '); return ars;}

        // поле для копирования
        $('.jsReferralInput').click(function() {
            $('.jsModalReferalEdit').modal('show');
            setTimeout(function() {
                $('#referral_link').select();
            }, 500);
        });

        // поле для нового реф.кода
        $('#referral_link').keyup(function() {
            $('.jsReferralCheck').siblings('.referal').removeClass('error');
            $('.jsReferralList').hide();

            var val = $(this).val();
            $(this).val(validateRef(val));

            $.post('/change_alias', {'alias': $('#referral_link').val()}, function(data) {
                var obj = JSON.parse(data);
                console.log(obj);

                if (obj.status == "Ok") {

                }

                if (obj.status === "error") {
                    var errors = obj.message;

                    var html = "";

                    $.each( errors, function( key, value ) {
                        html +=  '<li><a data-value="' + value + '" href="#">=' + value + '</a></li>';
                    });

                    $('.jsReferralList ul').html(html);
                    $('.jsReferralList').show();
                    $('#referral_link').closest('.referal').addClass('error');
                }
            });
        });

        $('.jsReferralCheck').click(function() {
            var val = $('#referral_link').val();
            $('#referral_link').val(validateRef(val));

            $.post('/save_alias', {'alias': $('#referral_link').val()}, function(data) {
                var obj = JSON.parse(data);
                console.log(obj);

                if (obj.status == "Ok") {
                    var base = $('.jsReferralInput').data('value-base');

                    $('.jsModalReferalEdit').modal('hide');
                    $('.jsReferralInput').val(base + $('#referral_link').val()).closest('.referal').addClass('accepted');
                    $('.jsReferralInputMobile').val(base + $('#referral_link').val());
                    // $('.jsReferalSocialList a').attr('data-social-share-url', 'https://oriflame-yourstart-pro.uiux.ru/' + $('#referral_link').val()+'/share');
                }

                if (obj.status === "error") {
                    var errors = obj.message;

                    var html = "";

                    $.each( errors, function( key, value ) {
                        html +=  '<li><a data-value="' + value + '" href="#">=' + value + '</a></li>';
                    });

                    $('.jsReferralList ul').html(html);
                    $('.jsReferralList').show();

                    $('#referral_link').closest('.referal').addClass('error');
                }
            });

            return false;
        });

        $(document).on('click', '.jsReferralList ul li a', function() {
            var value = $(this).data('value');
            $('.jsReferralList').hide();
            $('#referral_link').val(value);
            $('.jsReferralCheck').siblings('.referal').removeClass('error');
            return false;
        });

        $('#referral_link').focusout(function() {
            $('.jsReferralList').hide();
        });

        $('.jsReferralCopy').click(function() {
            if (!document.queryCommandSupported('copy')) {
                prompt($('.jsReferralCopyMessage').text(), $('.jsReferralInput').val());
            } else {
                $('.jsReferralInput').select();
                document.execCommand('copy');
            }
        });
    })(),
    scrollTo = (function() {
        const container = $('.jsScrollTo');

        if (!container.length) {
            return;
        }

        container.click(function() {
            let id = $(this).attr('href');

                if (id[0] === '/') {
                    id = id.slice(1);
                }


            let baseAnimate = $('html, body'),
                isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
                offset;

            offset = $(id).offset().top;

            if (isMobile) {
                offset = offset - 50;
            } else {
                offset = offset - 30;
            }

            if (isFirefox) {
                baseAnimate = $('html');
            }

            baseAnimate.animate({scrollTop: offset}, 400);

            return false;
        });
    })(),
    galleryOlapic = (function() {
        $('[data-modal-olapic]').click(function() {
            let modal = $(this).data('modal-class');
            $(modal).modal('show');

            let source = $(modal).find('.modal-gallery-iframe');

            if (!source.attr('src')) {
                source.attr('src', source.data('src'));
            }

            return false;
        });
    })(),
    story = (function() {
        let button = $('.jsNewStoryToggle'),
            checkbox = $('.jsNewStoryCheckbox');

        checkbox.change(function() {
            if ($(this).prop('checked')) {
                button.removeAttr('disabled');
            } else {
                button.attr('disabled', 'disabled');
            }
        });

        button.click(function() {
            if (checkbox.prop('checked')) {
                $('.jsModalInstruction').modal('hide');

                setTimeout(function() {
                    $('.jsModalNewStory').modal('show');
                }, 400);
            }

            return false;
        });
    })();

$(document).on('click', '.personal-story__arrow-more', function() {
    $('.personal-story__content').height("auto");
    //$('.personal-story__content').css('overflow','visible');
    $('.transpar').hide();
    $('.personal-story__arrow-more').hide();
    return false;
});