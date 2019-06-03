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
})