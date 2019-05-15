$(function(){
  
$('.functional_module_div .functional_module .functional_module_right ul.ul li.one p').click(function(e){
  $(this).siblings('.zi').slideToggle();
  $(this).parent('.one').siblings('.one').find('.zi').slideUp()
  e.stopPropagation();
})
$(document).click(function(){
  $('.functional_module_div .functional_module .functional_module_right ul.ul ul').slideUp();
});
})