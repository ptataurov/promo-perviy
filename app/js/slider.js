// class Slider {
//     constructor(slider) {
//         this.slideNow = 1;
//         this.translateWidth = 0;
//         this.viewport = $('.slider__viewport', slider);
//         this.wrap = $('.slider__wrap', slider);
//         this.btnPrev = $('.slider__btn-prev', slider);
//         this.btnNext = $('.slider__btn-next');
//         this.sliderCount = this.wrap.children().length;
//     }
//
//     nextSlide() {
//         if (this.slideNow === this.sliderCount || this.slideNow <= 0 || this.slideNow > this.sliderCount) {
//             this.wrap.css({
//                 'transform': `translateX(${this.translateWidth}px)`,
//                 '-webkit-transform': `translateX(${this.translateWidth}px)`,
//                 '-ms-transform': `translateX(${this.translateWidth}px)`,
//             });
//             this.slideNow = 1;
//         } else {
//             this.translateWidth = -this.viewport.width() * (this.slideNow);
//             this.wrap.css({
//                 'transform': `translateX(${this.translateWidth}px)`,
//                 '-webkit-transform': `translateX(${this.translateWidth}px)`,
//                 '-ms-transform': `translateX(${this.translateWidth}px)`,
//             });
//             this.slideNow++;
//         }
//     }
//
//     prevSlide() {
//         if (this.slideNow === 1 || this.slideNow <= 0 || this.slideNow > this.sliderCount) {
//             this.translateWidth = -this.viewport.width() * (this.sliderCount - 1);
//             this.wrap.css({
//                 'transform': `translateX(${this.translateWidth}px)`,
//                 '-webkit-transform': `translateX(${this.translateWidth}px)`,
//                 '-ms-transform': `translateX(${this.translateWidth}px)`,
//             });
//             this.slideNow = this.sliderCount;
//         }  else {
//             this.translateWidth = -this.viewport.width() * (this.slideNow - 2);
//             this.wrap.css({
//                 'transform': `translateX(${this.translateWidth}px)`,
//                 '-webkit-transform': `translateX(${this.translateWidth}px)`,
//                 '-ms-transform': `translateX(${this.translateWidth}px)`,
//             });
//             this.slideNow--;
//         }
//     }
//
//     init() {
//         this.btnPrev.click(this.prevSlide);
//         this.btnNext.click(this.nextSlide);
//     }
// }

let slideNow = 1;
let translateWidth = 0;
const $sliderViewport = $('.slider__viewport', '.apartment');
const $sliderWrap = $('.slider__wrap', $sliderViewport);
const $sliderBtnPrev = $('.slider__btn-prev', $sliderViewport);
const $sliderBtnNext = $('.slider__btn-next', $sliderViewport);
const sliderCount = $sliderWrap.children().length;

const nextSlide = () => {
    if (slideNow === sliderCount || slideNow <= 0 || slideNow > sliderCount) {
        $sliderWrap.css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$sliderViewport.width() * (slideNow);
        $sliderWrap.css({
            'transform': `translate(${translateWidth}px, 0)`,
            '-webkit-transform': `translate(${translateWidth}px, 0)`,
            '-ms-transform': `translate(${translateWidth}px, 0)`,
        });
        slideNow++;
    }
};

const prevSlide = () => {
    if (slideNow === 1 || slideNow <= 0 || slideNow > sliderCount) {
        translateWidth = -$sliderViewport.width() * (sliderCount - 1);
        $sliderWrap.css({
            'transform': `translate(${translateWidth}px, 0)`,
            '-webkit-transform': `translate(${translateWidth}px, 0)`,
            '-ms-transform': `translate(${translateWidth}px, 0)`,
        });
        slideNow = sliderCount;
    }  else {
        translateWidth = -$sliderViewport.width() * (slideNow - 2);
        $sliderWrap.css({
            'transform': `translate(${translateWidth}px, 0)`,
            '-webkit-transform': `translate(${translateWidth}px, 0)`,
            '-ms-transform': `translate(${translateWidth}px, 0)`,
        });
        slideNow--;
    }
};

$sliderBtnPrev.click(() => {
    prevSlide();
});

$sliderBtnNext.click(() => {
    nextSlide();
});
