$(function () {
  var name = '';
  var pageNumOne = 1;
  var pageSizeOne = 20;
  var dateOne = '';
  $('#search').on('click', function () {
    console.log('dateOne', dateOne);
    name = encodeURIComponent($('#p_name').val());
    console.log('name', name);
    pageNumOne = 1; //每次点击搜索将页码重置为1
    loadTable(pageNumOne, pageSizeOne, name);
  })
  layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
      elem: '#test6',
      range: true,
      done: function (value, date, endData) {
        console.log('value', value);
        dateOne = value
      }
    });
  })
  // 中联钢动态开始
  $.ajax({
    url: api + "/cgnews.mv?method=getCgZpic",
    dataType: 'jsonp',
    type: "GET",
    data: {},
    jsonp: 'callback',
    success: function (data) {
      console.log('data111000', data);
      var html = ''
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          html += '<div class="left_one"><img src="'+api+data.data[i].fileUrl+'" alt=""><p class="title">'+data.data[i].title+'</p></div>'
        }
        $('#steelLinkage_left_data').html(html);
      }
    },
  });
  // 

  // 列表开始

  function loadTable(pageNumOne, pageSizeOne, name) {
    $.ajax({
      url: api + "/cgnews.mv?method=getnewAllZ",
      dataType: 'jsonp',
      type: "GET",
      data: {
        title: name,
        putdate: dateOne,
        pageNum: pageNumOne,
        pageSize: pageSizeOne
      },
      jsonp: 'callback',
      success: function (data) {
        console.log('data列表', data);
        renderTable(data.data.list);
        renderPage(data.data.pageNum, data.data.total, data.data.pageSize)
      },
    });
  }

  function renderTable(data) {
    layui.use('table', function () {
      var table = layui.table
      // console.log('table', data);
      table.render({
        elem: '#table',
        data: data,
        cols: [
          [ //标题栏
            {
              field: 'id',
              title: '[序号]',
              type: 'numbers',
              width: 310
            }, {
              field: 'title',
              title: '[新闻标题]'
            },
            {
              field: 'pushdate',
              title: '[发布时间]'
            }
          ]
        ]

      })
    })
  }

  function renderPage(pageNum, total, pageSize) {
    layui.use(['laypage', 'layer'], function () {
      var laypage = layui.laypage,
        layer = layui.layer;
      console.log('pageSize', pageSize);
      //完整功能
      laypage.render({
        elem: 'page_table_one',
        count: total,
        curr: pageNum,
        limit: pageSize,
        limits: [5, 10, 20],
        layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'],
        jump: function (obj, first) {
          // console.log(obj)
          if (!first) {
            loadTable(obj.curr, obj.limit, name);
          }
        }
      });
    });
  }
  // 列表结束
  loadTable(1);
})