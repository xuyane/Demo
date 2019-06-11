$(function () {
  // 平台动态/重要通知 开始
  $.ajax({
    url: api + "/cgnews.mv?method=getCgnewsA",
    dataType: 'jsonp',
    type: "GET",
    data: {
      str: '24,1001'
    },
    jsonp: 'callback',
    success: function (data) {
      console.log('data平台动态', data, data.data.length)
      var html = ''
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          html += '<div class="swiper-slide">';
          for (var j = 0; j < data.data[i].length; j++) {
            html += '<ul><li><a href=""><i></i><span>' + data.data[i][j].title + '</span></a></li></ul>'
          }
          html += '</div>'
        }
        $('#swiper-slide_ul').html(html);
        var mySwiper = new Swiper('.swiper-container', {
          autoplay: 2000, //可选选项，自动滑动
          speed: 3000,
          delay: 100,
          loop: true
        })
      }
    },
  });
  // 平台动态/重要通知 结束
  // 标书信息开始
  $.ajax({
    url: api + "/cgnews.mv?method=getCgbids",
    dataType: 'jsonp',
    type: "GET",
    data: {
      rows: '11',
      status: '0'
    },
    jsonp: 'callback',
    success: function (data) {
      console.log('data', data, data.data.length)
      // $('#info_data_ul').
      var html = ''
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          html += '<li><span class="name">' + data.data[i].eqname + '</span><span class="company">' + cutString(data.data[i].cname, 20) + '</span><span class="date">' + data.data[i].putdate + '</span></li>'
        }
        $('#info_data_ul').html(html);
      }
    },
  });
  // 标书信息结束
  // 公告快讯开始
  $.ajax({
    url: api + "/cgnews.mv?method=getCgnews",
    dataType: 'jsonp',
    type: "GET",
    data: {
      str: '10,1001,1002'
    },
    jsonp: 'callback',
    success: function (data) {
      var html = '';
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          html += '<li><span class="notice">[' + data.data[i].catename + ']</span><a href="" class="text">' + data.data[i].title + '</a><span class="date">' + data.data[i].pushdate + '</span></li>'
        }
        $('#news_flash_bottom_ul').html(html);
      }
    },
  });
  // 公告快讯结束

  // 核心供应商/展示 开始
  $.ajax({
    url: api + "/cgnews.mv?method=getCgsuppers",
    dataType: 'jsonp',
    type: "GET",
    data: {
      status: 5,
      rows: 16
    },
    jsonp: 'callback',
    success: function (data) {
      console.log('核心供应商data', data, data.data.length);
      var html = '';
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          for (var j = 0; j < data.data[i].length; j++) {
            html += '<div class="zuo"><ul><li><i class="dian"></i><a href="" title="' + data.data[i][j].cname + '">' + cutString(data.data[i][j].cname, 45) + '</a><i class="xing">' + data.data[i][j].countValue + '</i></li></ul></div>'
          }
        }
        $('#left_bottom_ul').html(html);
      }
    },
  });

  // 核心供应商/展示 结束


  // 销售资源开始
  $.ajax({
    url: api + "/cgnews.mv?method=getCgbids",
    dataType: 'jsonp',
    type: "GET",
    data: {
      status: 1,
      rows: 10
    },
    jsonp: 'callback',
    success: function (data) {
      console.log('data111', data);
      var html = '';
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          html += '<li><span class="name">' + data.data[i].eqname + '</span><span class="material">' + data.data[i].mrial + '</span><span class="specifications">' + data.data[i].noness + '</span><span class="weight">' + data.data[i].bidAmount + '</span><span class="stock">' + data.data[i].constock + '</span><span class="state">' + data.data[i].status + '</span><span class="Manufactor">' + cutString(data.data[i].cname, 20) + '</span><span class="order"><a href="">订购</a></span></li>'
        }
        $('#sales_body_ul').html(html);
      }
    },
  });
  // 销售资源结束
  function cutString(str, len) {
    if (str.length * 2 <= len) {
      return str;
    }
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
      s = s + str.charAt(i);
      if (str.charCodeAt(i) > 128) {
        strlen = strlen + 2;
        if (strlen >= len) {
          return s.substring(0, s.length - 1) + "...";
        }
      } else {
        strlen = strlen + 1;
        if (strlen >= len) {
          return s.substring(0, s.length - 2) + "...";
        }
      }
    }
    return s;
  }


  //  供应商/准入公示开始
  $.ajax({
    url: api + "/cgnews.mv?method=getCgCompnyAlls",
    dataType: 'jsonp',
    type: "GET",
    data: {
      cname: '',
      pageNum: 1,
      pageSize:20
    },
    jsonp: 'callback',
    success: function (data) {
      // console.log('data11123121', data.data.list);
      var html = '';
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.list.length; i++) {
          html += '<li><a href="">'+cutString(data.data.list[i].cname,30)+'</a></li>'
        }
        $('.marquee_slide_ul').html(html);
      }
    },
  });
  // 供应商/准入公示结束
})