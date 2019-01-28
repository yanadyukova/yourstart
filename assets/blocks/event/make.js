import Swiper from 'swiper/dist/js/swiper.js';
import mask from 'jquery.maskedinput/src/jquery.maskedinput.js';

function form() {
    // $("input[name='hero_phone']").mask("+7 (999) 999-9999");
    $("input[name='time'], input[name='time_end']").mask("99:99");
    $("input[name='day'], input[name='day_end']").mask("99");
    $("input[name='month'], input[name='month_end']").mask("99");
    $("input[name='year']").mask("2019");

    $('.jsEventFormType a').click(function() {
        let index = $(this).closest('li').index(),
            indexCover;

        $(this).closest('li').addClass('active').siblings().removeClass('active');
        $('.jsEventFormTypeItem').removeClass('active').eq(index).addClass('active');
        $('.jsEventFormTypeItemDesc').removeClass('active').eq(index).addClass('active');

        indexCover = $('.jsSliderEventCover').eq(index).find('.swiper-slide.active').index();

        $('.jsEventFormTypeInput').val(index + 1);
        $('.jsEventFormCoverTypeInput').val(indexCover + 1);
        return false;
    });

    $('.jsEventFormDescEdit').click(function() {
        $(this).hide();
        $(this).parent().siblings('textarea').removeAttr('readonly').focus();
        $(this).closest('.readonly').removeClass('readonly');
        return false;
    });


    $('.jsSliderEventCover').each(function() {
        let slider = new Swiper ($(this).find('.swiper-container'), {
            slidesPerView: 'auto',
            observer: true,
            observeParents: true,
            navigation: {
              nextEl: $(this).find('.swiper-next'),
              prevEl: $(this).find('.swiper-prev'),
            }
        });
    });

    let sliderModalInit = false;
    $('.jsModalEventEditStep2').on('shown.bs.modal', function (e) {
        if (sliderModalInit) return;

        sliderModalInit = true;

        new Swiper ($('.jsSliderEventCoverModal').find('.swiper-container'), {
            slidesPerView: 'auto',
            navigation: {
              nextEl: $('.jsSliderEventCoverModal').find('.swiper-next'),
              prevEl: $('.jsSliderEventCoverModal').find('.swiper-prev'),
            }
        });
    });


    $('.jsSliderEventCoverType').click(function() {
        let indexCover = $(this).parent().index();
        $(this).parent().addClass('active').siblings().removeClass('active');

        $('.jsEventFormCoverTypeInput').val(indexCover + 1)
        return false;
    });

    $('.jsEventPriceToggle').click(function() {
        let index = $(this).parent().index();

        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.jsEventPriceInput').val(index + 1);
        return false;
    });

    $('.jsEventFormPagination a').click(function() {
        let index = $(this).parent().index();
        $(this).parent().addClass('active').siblings().removeClass('active');

        $('.jsEventFormStage').removeClass('active').eq(index).addClass('active');

        if (index) {
            $('.jsEventFormBack').removeClass('hidden');
        } else {
            $('.jsEventFormBack').addClass('hidden');
        }
        return false;
    });
}

export { form }