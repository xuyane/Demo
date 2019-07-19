$(function () {
  var string = getParamValue('cid');
  console.log('string', string);
  if (string) {
    $.ajax({
      url: api + "/cgnews.mv?method=getCompanyDetail",
      dataType: 'jsonp',
      type: "GET",
      data: {
        cid: string
      },
      jsonp: 'callback',
      success: function (data) {
        // console.log('data', data.data.length);
        var html = ''
        if (data.errorCode == 0) {
          if(data.data.length>0){
            $('#gongshimingcheng').html(data.data[0].cname);
            $('#jingyingfanwei').html(data.data[0].businessArea);
            $('#qiyeleibei').html(data.data[0].btype);
            $('#qiyexingzhi').html(data.data[0].ctype);
            $('#guoji').html(data.data[0].country);
            $('#diqu').html(data.data[0].district);
            $('#sheng').html(data.data[0].province + '/'+ data.data[0].country);
            $('#farendaibiao').html(data.data[0].ownership);
            $('#qiyedaima').html(data.data[0].sCode);
            $('#shuiwudengjihao').html(data.data[0].taxCode);
            $('#gongshidizhi').html(data.data[0].address);
            $('#youbian').html(data.data[0].zipCode);
            $('#lianxidianhua').html(data.data[0].phone);
            $('#chuanzhen').html(data.data[0].fax);
            $('#wangzhi').html(data.data[0].website);
            $('#yuangongrenshu').html(data.data[0].employees);
            $('#yingyee').html(data.data[0].revenue);
          }else{
            // console.log(123);
            $('.supplierdesc_div').html('<p style="text-align:center;padding-top: 20px;padding-bottom: 10px;min-height:300px;line-height:300px">暂无数据</p>');
          }
        }
      },
      error: function (request, a, b) {
          alert("数据加载失败");
      }
    });
  }else{
    // console.log('1234');
    $('.supplierdesc_div').html('<p style="text-align:center;padding-top: 20px;padding-bottom: 10px;min-height:300px;line-height:300px">暂无数据</p>');
  }

  function getParamValue(name) {
    var paramsArray = getUrlParams();
    if (paramsArray != null) {
      for (var i = 0; i < paramsArray.length; i++) {
        for (var j in paramsArray[i]) {
          if (j == name) {
            return paramsArray[i][j];
          }
        }
      }
    }
    return null;
  }

  // 获取地址栏的参数数组
  function getUrlParams() {
    var search = window.location.search;
    // 写入数据字典
    var tmparray = search.substr(1, search.length).split("&");
    var paramsArray = new Array;
    if (tmparray != null) {
      for (var i = 0; i < tmparray.length; i++) {
        var reg = /[=|^==]/; // 用=进行拆分，但不包括==
        var set1 = tmparray[i].replace(reg, '&');
        var tmpStr2 = set1.split('&');
        var array = new Array;
        array[tmpStr2[0]] = tmpStr2[1];
        paramsArray.push(array);
      }
    }
    // 将参数数组进行返回
    return paramsArray;
  }

})