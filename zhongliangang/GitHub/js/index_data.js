$(function () {
  // 平台动态/重要通知 开始
  $('.theme_left .imgLoad6').addClass('show');
  var mySwiper = '';
  $.ajax({
    url: api + "/cgnews.mv?method=getCgnewsA",
    dataType: 'jsonp',
    type: "GET",
    data: {
      str: '24,1001'
    },
    jsonp: 'callback',
    success: function (data) {
      // console.log('data平台动态', data, data.data.length)
      var html = ''
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          html += '<div class="swiper-slide">';
          for (var j = 0; j < data.data[i].length; j++) {
            var viewUser = data.data[i][j].viewUser;
            var href = '';
            if(viewUser == 0){
              href = './announcementDetail.html?number=' + data.data[i][j].number;
            }else{  
              href = 'http://cgmn.custeel.com/home/shouye.html';
            }
            html += '<ul><li><a target="_blank" href="'+href+'" ><i></i><span>' + data.data[i][j].title + '</span></a></li></ul>'
          }
          html += '</div>'
        }
        $('.theme_left .imgLoad6').removeClass('show');
        $('#swiper-slide_ul').html(html);
         mySwiper = new Swiper('.swiper-container', {
          autoplay: 2000, //可选选项，自动滑动
          speed: 3000,
          delay: 100,
          loop: true
        })
        
      }
    },
    error: function (request, a, b) {
        alert("数据加载失败");
    }
  });
  $('#swiper-slide_ul').mouseenter(function () {
    // console.log(123);
    mySwiper.stopAutoplay();
  })
  $('#swiper-slide_ul').mouseleave(function () {
    // console.log(456);
    mySwiper.startAutoplay();
  })
  // 平台动态/重要通知 结束
  // 标书信息开始
  $('.info_data .imgLoad2').addClass('show');
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
      // console.log('data标书信息', data, data.data.length)
      // $('#info_data_ul').
      var html = ''
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          var eqname = data.data[i].eqname || '-';
          var cname = data.data[i].cname || '-';
          var putdate = data.data[i].putdate || '-';
          html += '<li><a  target="_blank" href="http://ec.custeel.com/home/member/login.html"><span class="name">' + eqname + '</span><span class="company" title="'+data.data[i].cname+'">' + cutString(data.data[i].cname, 20) + '</span><span class="date">' + putdate + '</span></a></li>'
        }
        $('.info_data .imgLoad2').removeClass('show');
        $('#info_data_ul').html(html);
      }
    },
    error: function (request, a, b) {
        alert("数据加载失败");
    }
  });
  // 标书信息结束
  // 公告快讯开始
  $('.news_flash_bottom .imgLoad1').addClass('show');
  $.ajax({
    url: api + "/cgnews.mv?method=getCgnews",
    dataType: 'jsonp',
    type: "GET",
    data: {
      str: '10,1001,1002'
    },
    jsonp: 'callback',
    success: function (data) {
      // console.log('公告快讯111',data);
      var html = '';
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          var viewUser = data.data[i].viewUser;
            var href = '';
            if(viewUser === '0'){
              href = './announcementDetail.html?number=' + data.data[i].number;
            }else{  
              href = 'http://ec.custeel.com/home/member/login.html';
            }
          html += '<li><a target="_blank" href="'+href+'"><span class="notice">[' + data.data[i].catename + ']</span>' + data.data[i].title + '<span class="date">' + data.data[i].pushdate + '</span></a></li>'

        }
        $('.imgLoad1').removeClass('show');
        $('#news_flash_bottom_ul').html(html);
      }
    },
    error: function (request, a, b) {
        alert("数据加载失败");
    }
  });
  // 公告快讯结束
  $('.supplier_left .imgLoad4').addClass('show');
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
      // console.log('核心供应商data1', data, data.data.length);
      var html = '';
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          for (var j = 0; j < data.data[i].length; j++) {
            html += '<div class="zuo"><ul><li><i class="dian"></i><a href="supplierDesc.html?cid='+data.data[i][j].companyid+'" target="_blank" title="' + data.data[i][j].cname + '">' + cutString(data.data[i][j].cname, 45) + '</a><i class="xing">' + data.data[i][j].countValue + '</i></li></ul></div>'
          }
        }
        $('.supplier_left .imgLoad4').removeClass('show');
        $('#left_bottom_ul').html(html);
      }
    },
    error: function (request, a, b) {
        alert("数据加载失败");
    }
  });

  // 核心供应商/展示 结束

  $('.sales_body .imgLoad3').addClass('show');
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
      // console.log('data111', data);
      var html = '';
      if (data.errorCode == 0) {
        for (var i = 0; i < data.data.length; i++) {
          var eqname = data.data[i].eqname || '-';
          var mrial = data.data[i].mrial || '-';
          var noness = data.data[i].noness || '-';
          var bidAmount = data.data[i].bidAmount || '-';
          var constock = data.data[i].constock || '-';
          var statusS = data.data[i].statusS || '-';
          var cname = data.data[i].cname || '-';
          html += '<li><span class="name">' + eqname + '</span><span class="material">' + mrial + '</span><span class="specifications">' + noness + '</span><span class="weight">' + bidAmount + '</span><span class="stock">' + constock + '</span><span class="state">' + statusS + '</span><span class="Manufactor" title="'+cname+'">' + cutString(cname, 20) + '</span><span class="order"><a a href="http://ec.custeel.com/home/member/login.html" target="_blank">订购</a></span></li>'
        }
        $('.sales_body .imgLoad3').removeClass('show');
        $('#sales_body_ul').html(html);
      }
    },
    error: function (request, a, b) {
        alert("数据加载失败");
    }
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

  $('.right_bottom .imgLoad5').addClass('show');
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
          html += '<li><a href="coreDesc.html?cid='+data.data.list[i].id+'" target="_blank">'+cutString(data.data.list[i].cname,30)+'</a></li>'
        }
        $('.right_bottom .imgLoad5').removeClass('show');
        $('.marquee_slide_ul').html(html);
        $("#marquee_slideOne").slide({
          mainCell:".marquee_slide_ul",
          autoPage:true,
          effect:"topLoop",
          autoPlay:true,
          scroll:8,
          easing:'swing',
          pnLoop:true,
          vis:8,
          interTime:5000,
          delayTime:800
        });
      }
    },
    error: function (request, a, b) {
        alert("数据加载失败");
    }
  });
  // 供应商/准入公示结束
  // 业务总览开始
  $.ajax({
    url: api + "/cgnews.mv?method=getEcCountNows",
    dataType: 'jsonp',
    type: "GET",
    data: {
    },
    jsonp: 'callback',
    success: function (data) {
      // console.log('业务总览11', data);
      var html = '';
      if (data.errorCode == 0) {
        $('#caigouqiye').html(data.data.countValue1);
        $('#gongyingqiye').html(data.data.countValue2);
        $('#zaixianqiye').html(data.data.countValue3);
        $('#jingxingzhongbiaoshu').html(data.data.countValue4);
        $('#jingrijiaoyi').html(data.data.countValue5);
        $('#leijingchengjiao').html(data.data.countValue6);
      }
    },
    error: function (request, a, b) {
        alert("数据加载失败");
    }
  });
  // 业务总览结束
})