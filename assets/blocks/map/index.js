import Scroller from 'scroller';

export default function() {
    let scroller = new Scroller();
    scroller.init();

    $('.jsMapContentToggle').click(function() {
        $(this).toggleClass('active');
        $('.jsMapContent').toggleClass('full');
        setTimeout(function() {
            scroller.update();
            scroller.update();
        }, 500);
        return false;
    });

    $('.jsMapViewToggle').click(function() {
        $('.jsMapViewToggle').toggleClass('active');
        $('.jsMapView').toggle();
        return false;
    });

    $('.jsMapSortingToggle').click(function() {
        $('.jsMapSorting').toggle();
        $('.jsMapSearch').hide();
        return false;
    });

    $('.jsMapSearchToggle').click(function() {
        $('.jsMapSearch').toggle();
        $('.jsMapSorting').hide();
        return false;
    });
}