$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: 2000, //可选选项，自动滑动
    speed: 3000,
    delay: 100,
    loop: true
  })
  $('.business_div .business .business_left .bottom ul').mouseenter(function () {
    mySwiper.stopAutoplay();
  })
  $('.business_div .business .business_left .bottom ul').mouseleave(function () {
    mySwiper.startAutoplay();
  })

  $('#marquee_slide_div').marquee({
    auto: true,
    interval: 3000,
    speed: 7000,
    showNum: 3,
    stepLen: 3,
    type: 'horizontal'
  });
})