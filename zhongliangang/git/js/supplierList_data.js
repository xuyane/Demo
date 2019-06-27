$(function () {
  var name = '';
  var pageNumOne = 1;
  var pageSizeOne = 20;
  $('#search').on('click', function () {
    // $('#p_name').val('');
    name = encodeURIComponent($('#p_name').val());
    console.log('name', name);
    pageNumOne = 1; //每次点击搜索将页码重置为1
    loadTable(pageNumOne, pageSizeOne, name);
  })

  function loadTable(pageNum, pageSize, name) {
    pageSize = pageSize || pageSizeOne;
    $('.body .img').addClass('show');
    $.ajax({
      url: api + "/cgnews.mv?method=getCgsuppersList",
      dataType: 'jsonp',
      type: "GET",
      data: {
        cname: typeof name === 'undefined' ? "" : name,
        pageNum: pageNum,
        pageSize: pageSize
      },
      jsonp: 'callback',
      success: function (data) {
        console.log('data000000000000000', data)
        var obj = [],
          count = data.data.pageSize / 2;
        data.data.list.forEach(function (item, key) {
          // console.log('item',item)
          var str = ((pageNum - 1) * pageSize) + (key + 1) + ' ' + item.cname;
          if (key < count) {
            obj[key] = {
              id: item.id,
              cname1: str,
              companyid1:item.companyid
            };
          } else {
            obj[key - count]['cname2'] = str;
            obj[key - count]['companyid2'] = item.companyid
          }
        })
        console.log('obj', obj)
        renderTable(obj);
        renderPage(data.data.pageNum, data.data.total, data.data.pageSize)

      },
    });
  }

  function renderTable(data) {
    $('.body .img').removeClass('show');
    // console.log('data数据', data);
    var html = '';
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var name1 = data[i].cname1 || '';
        var name2 = data[i].cname2 || '';
        var companyid1 = data[i].companyid1 || '';
        var companyid2 = data[i].companyid2 || '';
        html += '<li><a href="./supplierDesc.html?cid='+companyid1+'">' + name1 + '</a><a href="./supplierDesc.html?cid='+companyid2+'">' + name2 + '</a></li>'
      }
      $('#body_ul_id').html(html);
    } else {
      console.log('空数组');
      $('#body_ul_id').html('<p style="text-align:center;padding-top: 20px;padding-bottom: 10px;">暂无数据</p>');
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

  loadTable(1);

})