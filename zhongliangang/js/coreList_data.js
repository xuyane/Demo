$(function () {
  var listData = ''
  // layui.use('table', function(){
  //   var table = layui.table;

  //   //第一个实例
  //   table.render({
  //     elem: '#table'
  //     ,height: 312
  //     // ,url:  api +'/cgnews.mv?method=getCgCompnyAlls' //数据接口
  //     ,url:  '/demo/table/user/'
  //     ,page: true //开启分页
  //     ,cols: [[ //表头
  //       {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
  //       ,{field: 'username', title: '用户名', width:80}
  //       ,{field: 'sex', title: '性别', width:80, sort: true}
  //       ,{field: 'city', title: '城市', width:80} 
  //       ,{field: 'sign', title: '签名', width: 177}
  //       ,{field: 'experience', title: '积分', width: 80, sort: true}
  //       ,{field: 'score', title: '评分', width: 80, sort: true}
  //       ,{field: 'classify', title: '职业', width: 80}
  //       ,{field: 'wealth', title: '财富', width: 135, sort: true}
  //     ]],
  //       : function(res){ //res 即为原始返回的数据
  //       console.log('res', res);
  //       return {
  //         // "code": res.status, //解析接口状态
  //         // "msg": res.message, //解析提示文本
  //         "count": res.data.total, //解析数据长度
  //         "data": res.data.list //解析数据列表
  //       };
  //     } 
  //   });

  // });

  // layui.use('table', function(){
  //   var table = layui.table;

  //   //第一个实例
  //   table.render({
  //     elem: '#table'
  //     ,height: 312
  //     ,contentType: 'application/json'
  //     ,url:  '/demo/table/user/'
  //     // http://cgmn.custeel.com/cgnews.mv?method=getCgCompnyAlls&pageNum=1&pageSize=20
  //     // ,url:  '/api/cgnews.mv?method=getCgCompnyAlls&pageNum=1&pageSize=20'
  //     ,page: true //开启分页
  //     ,cols: [[ //表头
  //       {field: 'cname', title: '【核心供应商】公司名称'},
  //       {field: 'id', title: '【核心供应商】公司名称'}
  //     ]],
  //      parseData: function(res){ //res 即为原始返回的数据
  //       console.log('redsadasds', res);
  //       return {
  //         // "code": res.status, //解析接口状态
  //         // "msg": res.message, //解析提示文本
  //         "count": res.data.total, //解析数据长度
  //         "data": res.data.list //解析数据列表
  //       };
  //     },

  //     done: function(res, curr, count){
  //       //如果是异步请求数据方式，res即为你接口返回的信息。
  //       //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
  //       console.log('done', res);

  //       //得到当前页码
  //       console.log('done', curr); 

  //       //得到数据总量
  //       console.log('done', count);
  //     }
  //   });

  // });

  // 准入公示列表开始
  $.ajax({
    url: api + "/cgnews.mv?method=getCgCompnyAlls",
    dataType: 'jsonp',
    type: "GET",
    data: {
      cname: '',
      pageNum: 1,
      pageSize: 16
    },
    jsonp: 'callback',
    success: function (data) {
      console.log('准入公示列表', data);
      if (data.errorCode == 0) {
        listData = data.data.list;
        console.log('listData', listData);
        renderTable(data.data.list,data.data.pageNum,data.data.pageSize)
      }
    }
  });
  function renderTable(data, pageNum, totalpage) {
    var table = layui.table
    table.render({
      elem: '#table',
      cols: [],
      data: data,
      page: {
        count: totalpage,
        curr: pageNum,
        jump: function (obj, first) {
          loadAgain(obj.curr)
        }
      },

    })
  }

})