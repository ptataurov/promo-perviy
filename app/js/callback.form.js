const callback = $('.callback');

$('.header__btn').click(function(e) {
    $('html, body').stop().animate({scrollTop: 0}, 500, 'swing');
    callback.css('display', 'flex').animate({
        'opacity': '1'
    }, 300);
    $('body').toggleClass('scroll-fix');

});

$('.callback__form-call-input').mask("+7 (000) 000-00-00", {
    placeholder: "+7 (999) 000-00-00"
});

$('.callback__form-call-input').click(function (e) {
    $(this).val('+7 (');
});

$('.callback__form-message-input-mail').blur(function(e) {
    if(!$(this).val()) {
        $(this).addClass('callback--error');
    } else {
        $(this).removeClass('callback--error');
    }
});

$('.callback__form-call-input').blur(function(e) {
    if($(this).val().length < 18) {
        $(this).addClass('callback--error');
    } else {
        $(this).removeClass('callback--error');
    }
});

$('.callback__form-call-btn').click(function(e) {
    if($('.callback__form-call-input').val().length < 18) {
        $('.callback__form-call-input').addClass('callback--error');
        return false
    }
    const userPhone = $('.callback__form-call-input').val();

    $.ajax({
        url: "phone.php", // куда отправляем
        type: "post", // метод передачи
        dataType: "json", // тип передачи данных
        data: { // что отправляем
            "user_phone": userPhone,
        },
        // после получения ответа сервера
        success: function(data){
            const clone = $('.callback__wrap').clone(true, true);
            const cloneIconClose = $('.callback__icon-close').clone(true);
            $('.callback__wrap').html($('.callback__success'));
            $('.callback__success').show();

            setTimeout(() => {
                callback.fadeOut(300, () => {
                    $('.callback').html(clone);
                    $('.callback').prepend(cloneIconClose);
                });
                $('body').toggleClass('scroll-fix');
            }, 3000);
        }
    });
    return false;
});

$('.callback__form-message-btn').click(function(){
    const userEmail = $('.callback__form-message-input-mail').val();
    const textComment = $('.callback__form-message-input-text').val();
    if (!userEmail) {
        $('.callback__form-message-input-mail').addClass('callback--error');
        return false;
    } else if (!textComment) {
        $('.callback__form-message-input-text').addClass('callback--error');
        return false;
    }

    $.ajax({
        url: "mail.php", // куда отправляем
        type: "post", // метод передачи
        dataType: "json", // тип передачи данных
        data: { // что отправляем
            "user_email": userEmail,
            "text_comment": textComment
        },
        // после получения ответа сервера
        success: function(data){
            const clone = $('.callback__wrap').clone(true, true);
            const cloneIconClose = $('.callback__icon-close').clone(true);
            $('.callback__wrap').html($('.callback__success'));
            $('.callback__success').show();

            setTimeout(() => {
                callback.fadeOut(300, () => {
                    $('.callback').html(clone);
                    $('.callback').prepend(cloneIconClose);
                });
                $('body').toggleClass('scroll-fix');
            }, 3000);
        }
    });
    return false;
});

$('.callback__form-message-input-text').text('Я хочу стать партнером!');

$('.callback__icon-close').click(function(e) {
    callback.animate({
       'opacity': '0'
    }, 300, () => {
        $('.callback').css('display', 'none');
    });
    $('body').toggleClass('scroll-fix');
});

