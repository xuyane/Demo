$(function () {
  // $('.navigation ul li').mouseenter(function () {
  //   $(this).addClass('color');
  //   $(this).siblings('li').removeClass('color');
  //   if ($(this).attr('attr') == 'message') {
  //     $(this).find('a').addClass('biaoxun');
  //   }
  //   $(this).find('.elastic').slideDown()
  // })
  // $('.navigation ul li').mouseleave(function () {
  //   $(this).removeClass('color');
  //   if ($(this).attr('attr') == 'message') {
  //     $(this).find('a').removeClass('biaoxun');
  //   }
  //   $(this).find('.elastic').slideUp()
  // })
  // $('.navigation ul li').click(function(){
  //   $(this).addClass('colorOne');
  //   $(this).siblings('li').removeClass('colorOne')
  // })
  // $('.elastic .elastic_left p').mouseenter(function () {
  //   $(this).find('i').addClass('color');
  //   $(this).siblings('p').find('i').removeClass('color');
  // })

  // $('.theme .theme_left .bottom ul li').mouseenter(function () {
  //   $(this).find('a').find('span').addClass('color');
  //   $(this).siblings('li').find('a').find('span').removeClass('color');
  // })

  $('#marquee_slide').marquee({
    auto: true,
    interval: 3000,
    speed: 5000,
    showNum: 8,
    stepLen: 8,
    type: 'vertical',
    duplicated: true, //是否循环播放
  });
  $('.purchasing_information_div .purchasing_information .bottom .purchasing_information_right .rr_top ul li').mouseenter(function () {
    $(this).addClass('color');
    $(this).siblings('li').removeClass('color');
    var index = $(this).index();
    $('.purchasing_information_div .purchasing_information .bottom .purchasing_information_right .rr_bottom ul').eq(index).addClass('show').siblings('ul').removeClass('show');
  })
  $('.dingwei_div .dingwei .iphone').mouseenter(function () {
    // console.log($(this).find('ul'))
    $(this).find('ul').animate({
      "left": "-152px"
    }, "slow");
    // $(this).find('ul').css('left','-152px');
  })
  $('.dingwei_div .dingwei .iphone').mouseleave(function () {
    // console.log($(this).find('ul'))
    $(this).find('ul').animate({
      "left": "90px"
    }, "slow");
    // $(this).find('ul').css('left','-152px');
  })
  $('.dingwei_div .dingwei .weixin').mouseenter(function () {
    // console.log($(this).find('ul'))
    $(this).find('ul').animate({
      "left": "-100px"
    }, "slow");
    // $(this).find('ul').css('left','-152px');
  })
  $('.dingwei_div .dingwei .weixin').mouseleave(function () {
    // console.log($(this).find('ul'))
    $(this).find('ul').animate({
      "left": "100px"
    }, "slow");
    // $(this).find('ul').css('left','-152px');
  })
  $(window).scroll(function () {
    var height = $(document).scrollTop();
    // console.log('height', height);
    if (height > 1000) {
      $('.dingwei_div .huidao').show();
    } else {
      $('.dingwei_div .huidao').hide();
    }
  })

  $('.dingwei_div .dingwei .huidao').click(function () {
     $('html , body').animate({
      scrollTop: 0
    }, 'slow');
  });
})