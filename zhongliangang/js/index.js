$(function () {
  $('.navigation ul li').mouseenter(function () {
    $(this).addClass('color');
    $(this).siblings('li').removeClass('color');
    if ($(this).attr('attr') == 'message') {
      $(this).find('a').addClass('biaoxun');
    }
    $(this).find('.elastic').slideDown()
  })
  $('.navigation ul li').mouseleave(function () {
    $(this).removeClass('color');
    if ($(this).attr('attr') == 'message') {
      $(this).find('a').removeClass('biaoxun');
    }
    $(this).find('.elastic').slideUp()
  })
  // $('.navigation ul li').click(function(){
  //   $(this).addClass('colorOne');
  //   $(this).siblings('li').removeClass('colorOne')
  // })
  $('.elastic .elastic_left p').mouseenter(function () {
    $(this).find('i').addClass('color');
    $(this).siblings('p').find('i').removeClass('color');
  })

  $('.theme .theme_left .bottom ul li').mouseenter(function () {
    $(this).find('a').find('span').addClass('color');
    $(this).siblings('li').find('a').find('span').removeClass('color');
  })

  $('#marquee_slide').marquee({
    auto: true,
    interval: 3000,
    speed: 5000,
    showNum: 8,
    stepLen: 1,
    type: 'vertical'
  });
})