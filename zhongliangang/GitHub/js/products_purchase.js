$(function(){
  
$('.functional_module_div .functional_module .functional_module_right ul.ul li.one p').hover(function(e){
  // $(this).siblings('.zi').slideToggle();
  // $(this).parent('.one').siblings('.one').find('.zi').slideUp()
  // e.stopPropagation();
  // $(this).find('.icon').toggleClass('icon_one');
	// $(this).parent().siblings('.one').find('.zi').slideUp();
  // $(this).parent().siblings('.one').find('.icon').removeClass('icon_one');
  $(this).siblings('.zi').show();
  $(this).parent('.one').siblings('.one').find('.zi').hide()
  e.stopPropagation();
  $(this).find('.icon').addClass('icon_one');
	$(this).parent().siblings('.one').find('.zi').hide();
	$(this).parent().siblings('.one').find('.icon').removeClass('icon_one');
},function(e){
  e.stopPropagation();
  $('.functional_module_div .functional_module .functional_module_right ul.ul ul').hide();
  $('.functional_module_div .functional_module .functional_module_right ul.ul li.one p').parent().siblings('.one').find('.icon').removeClass('icon_one');
})
$(document).click(function(){
  $('.functional_module_div .functional_module .functional_module_right ul.ul ul').hide();
  $('.functional_module_div .functional_module .functional_module_right ul.ul li.one p').parent().siblings('.one').find('.icon').removeClass('icon_one');
});
})