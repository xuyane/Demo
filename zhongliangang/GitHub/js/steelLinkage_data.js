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
      range: '~',
      done: function (value, date, endData) {
        console.log('value1', date,endData);
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
          html += '<div class="left_one"><a href="./steelLinkageDesc.html?number='+data.data[i].number+'" target="_blank" ><img src="'+api+data.data[i].fileUrl+'" alt=""><p class="title">'+data.data[i].title+'</p></a></div>'
        }
        $('#steelLinkage_left_data').html(html);
      }
    },
    error: function (request, a, b) {
			console("数据加载失败");
		}
  });
  // 

  // 列表开始

  function loadTable(pageNumOne, pageSizeOne, name) {
    $('.body .img').addClass('show');
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
        renderTable(data.data.list,data.data.pageNum,data.data.pageSize);
        renderPage(data.data.pageNum, data.data.total, data.data.pageSize)
      },
      error: function (request, a, b) {
        console("数据加载失败");
      }
    });
  }

  function renderTable(data,Num,Size) {
    $('.body .img').removeClass('show');
    console.log('data数据1',data);
    var html = '';
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var numIndex = (Num-1)*Size + i+1;
        var id =  Number(data[i].id || '') + 1;
        var title = data[i].title || '';
        var pushdate = data[i].pushdate || '';
        var number = data[i].number || '';
        html += '<li><a href="" class="one">'+numIndex+'</a><a href="./steelLinkageDesc.html?number='+number+'" target="_blank" class="two">'+title+'</a><a href="" class="three">'+pushdate+'</a></li>'
      }
      $('.body_ul_id').html(html);
    }else{
      console.log('空数组');
      $('.body_ul_id').html('<p style="text-align:center;padding-top: 20px;padding-bottom: 10px;">暂无数据</p>');
    }
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
        limits: [10, 20],
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