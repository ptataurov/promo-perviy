const navList = $('.video-slider__nav-list');
const navItems = $('.video-slider__nav-item');
const navBtnPrev = $('.video-slider__btn-prev');
const navBtnNext = $('.video-slider__btn-next');
let videoTranslateWidth = 0;
let countLeft = 0;
let countRight = navItems.length - 6;

navItems.click(function(e) {
    const th = $(this);
    const clone = $('.video-slider iframe').clone().attr('src', th.children().data('link')).css('opacity', '0');
    if ($(this).children().data('link') === $('.video-slider iframe').attr('src')) {
        return false;
    }
    $('.video-slider iframe').animate({
            'opacity': 0
        }, 300, () => {
        $('.lds-ellipsis').animate({
            'opacity': 1
        }, 300, () => {
            $('.video-slider iframe').remove();
            $('.video-slider__viewport').append(clone);
            setTimeout(() => {
                $('.lds-ellipsis').animate({
                    'opacity': 0
                }, 1000, () => {
                    $('.video-slider iframe').animate({
                        'opacity': 1
                    }, 300)
                });
            }, 300);

        });
    });
});

const videoNextSlide = () => {
    if (countRight > 0) {
        videoTranslateWidth -= navItems.width() + 16;
        navList.css('transform', `translateX(${videoTranslateWidth}px)`);
        countRight--;
        countLeft++;
    } else {
        videoTranslateWidth = 0;
        navList.css('transform', `translateX(0)`);
        countRight = navItems.length - 6;
        countLeft = 0;
    }
};

const videoPrevSlide = () => {
    if (countLeft > 0) {
        videoTranslateWidth += navItems.width() + 16;
        navList.css('transform', `translateX(${videoTranslateWidth}px)`);
        countRight++;
        countLeft--;
    } else {
        videoTranslateWidth = -(navItems.width() + 16) * (navItems.length - 6);
        navList.css('transform', `translateX(${videoTranslateWidth}px)`);
        countRight = 0;
        countLeft = navItems.length - 6;
    }
};

navBtnNext.click(() => {
    videoNextSlide();
});

navBtnPrev.click(() => {
    videoPrevSlide();
});
