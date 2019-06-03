$(function(){
  
$('.functional_module_div .functional_module .functional_module_right ul.ul li.one p').click(function(e){
  $(this).siblings('.zi').slideToggle();
  $(this).parent('.one').siblings('.one').find('.zi').slideUp()
  e.stopPropagation();
  $(this).find('.icon').toggleClass('icon_one');
	$(this).parent().siblings('.one').find('.zi').slideUp();
	$(this).parent().siblings('.one').find('.icon').removeClass('icon_one');
})
$(document).click(function(){
  $('.functional_module_div .functional_module .functional_module_right ul.ul ul').slideUp();
  $('.functional_module_div .functional_module .functional_module_right ul.ul li.one p').parent().siblings('.one').find('.icon').removeClass('icon_one');
});
})