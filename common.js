//WOW - delay animation when scrolling
var wow = new WOW(
  {
    boxClass:     'wow',
    animateClass: 'animated',
    offset:       250,
    mobile:       false,
    live:         true,
    callback:     function(box) {
    },
    scrollContainer: null,
    resetAnimation: true,
  }
);
wow.init();

//Event by clicking navigation link 
$(function() {
  $('a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    var section = $(this).attr("href"),
        top = $(section).offset().top;
    $('html, body').animate({scrollTop: top}, 400);
  });
  $('.header-icon').on('click', function() {
    $('.header').toggleClass('header-open');
  });
  $('.header-nav-item').on('click', function () {
    $('.header').removeClass('header-open');
  });
});

$(function(){
  $(window).scroll(function(){
    if ($(window).scrollTop() > $('main').height()){
      $('.header').addClass('scroll');
    }
    else {
      $('.header').removeClass('scroll')
  }
  });
});