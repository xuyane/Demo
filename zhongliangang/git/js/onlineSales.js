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
    type: 'horizontal',
    // direction: 'left',//滚动方向
    duplicated: true,//是否循环播放
  });

  $('.marketing_news_div .marketing_news .marketing_news_right .r_bottom .rr_top ul li').mouseenter(function(){
    $(this).addClass('color');
    $(this).siblings('li').removeClass('color');
    var index = $(this).index();
    $('.marketing_news_div .marketing_news .marketing_news_right .r_bottom ul').eq(index+1).addClass('show').siblings('ul').removeClass('show');
  })
})