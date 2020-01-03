//语言汉语
$.fn.datetimepicker.dates['zh-CN'] = {
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  today: "今天",
  suffix: [],
  meridiem: ["上午", "下午"]
};

//时间格式化
function formatDate(date) { 
  var year=date.getFullYear(); 
  var month=date.getMonth()+1; 
  var day=date.getDate(); 
  var hour=date.getHours(); 
  var minute=date.getMinutes(); 
  var second=date.getSeconds(); 
  return year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' + 
  (String(day).length > 1 ? day : '0' + day) + ' ' + (String(hour).length > 1 ? hour : '0' + hour) + ':' + (String(minute).length > 1 ? minute : '0' + minute)
   + ':' + (String(second).length > 1 ? second : '0' + second)
}

//init
$(function() {

  //全屏展示
  var home = $('#home');
  home.find('.btn').click(function () {
    $('.full-screen').css('visibility', 'visible');
    $('iframe').attr('src',$('iframe').attr('src'));
  });
  $('.full-screen .quxiao').click(function () {
    $('.full-screen').css('visibility', 'hidden');
    $('iframe').attr('src',$('iframe').attr('src'));
  });
  //时间选择
  $(".form_datetime").datetimepicker({
      minView: "month", 
      language:'zh-CN',
      pickerPosition: "bottom-left",
      format:'yyyy-mm-dd',
      autoclose: true,
  }).on('changeDate',function(ev){
     var time = ""
     if(ev.date){
        time = formatDate(ev.date).substring(0,10);
     }
     $.post(kbConfig.api + 'setDate', { date:time }, function (res) {
        if (res.status === 1) {
            $('iframe').attr('src',$('iframe').attr('src'));
        }
     });
  });
  //定时刷新
  setInterval(function(){
    $('iframe').attr('src',$('iframe').attr('src'));
  },8*3600000);

});