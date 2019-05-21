$(function () {
  layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage,
      layer = layui.layer;

    //完整功能
    laypage.render({
      elem: 'page_table',
      count: 100,
      layout: ['count', 'prev', 'page', 'next', 'skip'],
      jump: function (obj) {
        console.log(obj)
      }
    });
  });
  
})