$(document).ready(() => {
    // $(window).enllax();

    $('.events__item')
        .filter(':even')
        .addClass('revealator-slideright revealator-delay2 revealator-duration15 revealator-once')
        .addBack()
        .filter(':odd')
        .addClass('revealator-slideleft revealator-delay2 revealator-duration15 revealator-once');

    $('.apartment button').click(function(e) {
        $('.apartment .active').removeClass('active');
        $(this).addClass('active');
        const tab = $(this).data('content');
        $('.apartment__tabs').children().not(`.apartment__${tab}`).css({'display':'none'});
        // $(`.apartment__${tab}`).fadeIn(400);
        $(`.apartment__${tab}`).css({
            'display': 'block'
        });
    });

    $('.up').click(function(e) {
        $('html, body').stop().animate({scrollTop: 0}, 500, 'swing');
    });

    $(window).scroll(function(e) {
        if($(this).scrollTop() > 100) {
            $('.up').show(300)
        } else {
            $('.up').hide(300);
        }
    });

    $('.apartment__document-img').click(function(e) {
        $('.apartment__document').toggleClass('apartment__document--zoom');
        $('body').toggleClass('scroll-fix');
        $(this).toggleClass('apartment__document-img--zoom');
    });

    function come(elem) {
        var docViewTop = $(window).scrollTop(),
            docViewBottom = docViewTop + $(window).height(),
            elemTop = $(elem).offset().top,
            elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $(window).scroll(() => {
        if (come(".counter__load")) {
            $('.counter__load-fill').animate({
                width: '400px',
                specialEasing: {
                    width: "easeOutBounce"
                }
            }, 3000, () => {
                $('.counter__load-num').css({
                    display: 'flex'
                });
            })
        }
    });

});
