$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: 2000, //可选选项，自动滑动
    speed: 3000,
    delay: 100,
    loop: true
  })
  var mySwiperOne = new Swiper('.swiper-container-right', {
    loop: true, //设置为true，则开启loop（环路）模式，默认为false
    speed: 3000, //滑动速度
    delay: 100,
    autoplay: 2000, //自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
    autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay，默认为true：停止。
    //--  如果需要分页器 --
    pagination: '.swiper-pagination-right',
    paginationClickable: true
  });
  $('.swiper-button-prev').click(function () {
    mySwiperOne.swipePrev();
  })
  $('.swiper-button-next').click(function () {
    mySwiperOne.swipeNext();
  })
  $('.swiper-container-right').mouseenter(function () {
    $('.swiper-button-prev,.swiper-button-next').show();
    mySwiperOne.stopAutoplay();
  })
  $('.swiper-container-right').mouseleave(function () {
    $('.swiper-button-prev,.swiper-button-next').hide();
    mySwiperOne.startAutoplay();
  })
  $('.theme .theme_left .bottom ul li a span').mouseenter(function () {
    $(this).addClass('color');
    $(this).parents('li').siblings('li').find('span').removeClass('color');
  })
  $('.theme .theme_left .bottom ul li a span').mouseleave(function () {
    $(this).removeClass('color');
  })
  $('.swiper-container .swiper-slide ul').mouseenter(function () {
    mySwiper.stopAutoplay();
  })
  $('.swiper-container .swiper-slide ul').mouseleave(function () {
    mySwiper.startAutoplay();
  })
 
})