$(function () {
  // console.log(window.location.search.split('=')[1])
  var number = window.location.search.split('=')[1];
  $.ajax({
    type: "get",
    url: api + "/cgnews.mv?method=getNewsDetail&number=" + number,
    dataType: "jsonp",
    jsonp: 'callback',
    success: function (data) {
      console.log(data,data.data[0]);
      if (data.errorCode == 0) {
        var obj = data.data[0];
        if (obj) {
          $('.title').html(obj.title);
          $('.top .time').html(obj.pushdate);
          $('.text .textTitle').html(obj.title);
          $('.text .content').html(obj.content);
        } else {
          $('#wapData').html('<p style="min-height:200px;line-height:200px;text-align:center">暂无数据</p>')
        }


      }
      // $('.bottom p').eq(1).html(resetTime(obj.pushdate))
    },
    error: function (request, a, b) {
      console("数据失败");
    }
  })
})
// 截取时间方法
function resetTime(data) {
  return data.split(' ')[0];
}