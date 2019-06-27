var time = null; //定义一个全局变量 用来保存计时器
var categoryID = ''; //定义一个全局变量 保存标讯类型
var tname = ''; //同上 保存标讯搜索标题
var cname = 'jtgssbb'; //同上 保存 搜索条件-发布单位
var putdate = ''; //保存 搜索条件 - 发布时间
var pageSize = 20; //
var pageNum = 1;
var dataArr = [];//定义一个全局变量数组，用来保存列表数据
var dataTypearr=['邀请(合格用户)','公开标书']
var index = 0;//定义一个全局变量 保存当前点击的序列值

//定义一个公共方法 用来切割时间字符串
function resetDataTime(data){
    return data.substr(0,16);
}
// 单击事件
$('.noticeList').on('click', 'table>tbody>tr', function () {
    //   clearTimeout(time);
    var _this = $(this);
    var privateData='';
    // 检测当前点击标讯列是否为投标中
    if (_this.html().indexOf('underway') > -1) {
        clearTimeout(time);
        // 检测投标中的标讯是否为公开标讯
        if($('.noticeList>table>tbody>tr.newTr').html() && _this.index()>$('.newTr').index()){
            index = _this.index() -1;
        }else{
            index = _this.index();
        }
        if(dataArr[index].apMode==0){
            // 如果是邀请标书
             privateData = '<tr>' +
            '<td class="explain" colspan="6">' +
            '(此标书为邀请投标，请 &nbsp;&nbsp; <a class="more" href="http://ec.custeel.com/home/member/login.html" target="_blank">登录</a>&nbsp;&nbsp;查看 )' +
            '</td></tr>';
        }else{
            // 如果是公开标书
            $.ajax({
                type: "get",
                url: "http://cgmn.custeel.com//cgnews.mv?method=getbidsDetail",
                data: {
                    number: dataArr[index].number,
                },
                dataType: "jsonp",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data);
                    var obj = data.data[0];
                    privateData='<tr>' +
                    '<td>1</td>' +
                    '<td>'+obj.ename+'</td>' +
                    '<td>'+obj.sname+'</td>' +
                    '<td>'+obj.bamount+'</td>' +
                    '<td>'+obj.bDate+'</td>' +
                    '<td>'+obj.memo+'</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>2</td>' +
                    '<td>...</td>' +
                    '</tr>'+
                    '<tr>' +
                    '<td class="explain" colspan="6">' +
                    '(更多规格详情，请 &nbsp;&nbsp; <a class="more" href="http://ec.custeel.com/home/member/login.html" target="_blank">登录</a>&nbsp;&nbsp;查看 )' +
                    '</td></tr>';
                },
                error: function (request, a, b) {
                    console("数据失败");
                }
            })
            
        }
        time = setTimeout(function () {
            _this.addClass('checked').siblings().removeClass('checked');
            var str = '<tr class="newTr">' +
                '<td colspan="5">' +
                '<table>' +
                '<tr>' +
                '<td><span class="bold">[标书名称]:</span><span class="markName">'+dataArr[index].bname+'</span> </td>' +
                '<td><span class="bold">[标书编号]:</span><span class="markNum">'+dataArr[index].numberShow+'</span></td>' +
                '<td><span class="bold">[选择客户方式]:</span><span class="markName">'+dataTypearr[dataArr[index].apMode]+'</span></td>' +
                '</tr>' +
                '<tr>' +
                '<td> <span class="bold">[投标开始时间]:</span> <span class="markBeginTime">'+resetDataTime(dataArr[index].bsTime)+'</span></td>' +
                '<td><span class="bold"> [投标截止时间]:</span> <span class="markEndTime">'+resetDataTime(dataArr[index].beTime)+'</span></td>' +
                '<td><span class="bold"> [发布单位]:</span> <span class="markdanwei">'+dataArr[index].cname+'</span> </td>' +
                '</tr>' +
                '<tr class="dataTr">' +
                '<td colspan="3">' +
                '<table>' +
                '<thead>' +
                '<tr>' +
                '<th>[序号]</th>' +
                '<th>[规格名称]</th>' +
                '<th>[规格型号]</th>' +
                '<th>[数量](单位)</th>' +
                '<th>[交货期]</th>' +
                '<th>[备注]</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +privateData+
               '</tbody></table></td></tr></table></td></tr>';
            //                 console.log($('.noticeList>table>tbody>tr.newTr').html())
            //                 $('.noticeList>table>tbody>tr').eq($(this).index()).after(str)
            // console.log($('.noticeList>table>tbody>tr.newTr'))
            if ($('.noticeList>table>tbody>tr.newTr').html()) {
                if (Math.abs(_this.index() - $('.noticeList>table>tbody>tr.newTr').index()) > 1) {
                    $('.noticeList>table>tbody>tr.newTr').remove();
                    $('.noticeList>table>tbody>tr').eq(_this.index()).after(str)
                } else if (_this.index() > $('.noticeList>table>tbody>tr.newTr').index() && (_this.index() - $('.noticeList>table>tbody>tr.newTr').index() == 1)) {
                    $('.noticeList>table>tbody>tr.newTr').remove();
                    $('.noticeList>table>tbody>tr').eq(_this.index()).after(str)
                } else {
                    $('.noticeList>table>tbody>tr.newTr').remove();
                }
            } else {
                $('.noticeList>table>tbody>tr').eq(_this.index()).after(str)
            }
        }, 250)
    }


})
// 双击事件
$('.noticeList').on('dblclick', 'table>tbody>tr', function () {
    clearTimeout(time);
    // console.log("双击事件触发")
    // window.location.href = 'http://ec.custeel.com/home/member/login.html';
    // 只针对ie9以上有效
    var a = $("<a href='http://ec.custeel.com/home/member/login.html' target='_blank'>0.0</a>").get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);
})
// 左侧标讯类型切换事件
$('.wrap .left ul li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
})
// 初始化分页插件
function RenderLaypage(count) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'page', //注意，这里的 page 是 ID，不用加 # 号
            count: count, //数据总数，从服务端得到
            theme: '#0074ff',
            limit: 20,
            groups: 3,
            layout: ['limit', 'prev', 'page', 'next', 'skip'], //分页布局，上一页、页码区域、下一页、页码跳转
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                //首次不执行
                if (!first) {
                    //do something
                    pageSize = obj.limit
                    pageNum = obj.curr
                    getData(tname, cname, putdate, obj.curr, pageSize, false)
                }
            }
        });
    });
}

// 时间选择插件
layui.use('laydate', function () {
    var laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
        elem: '#pubDate', //指定元素
        range: '~',
        btns: ['clear', 'now', 'confirm'],
        theme: '#0074ff',
        done: function (value, date, endDate) {
            putdate = value;
            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date ); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });
});
// 渲染列表方法
function drawingList(data) {
    var str = '';
    if(data.length>0){
        for (var i = 0; i < data.length; i++) {
            var status = '';
            if (data[i].status <= 2) {
                // 如果状态值小于2是投标中 
                status = '<td class = "underway">投标中</td>';
            } else {
                status = '<td>已完成</td>';
            }
            str += '<tr><td>' + (pageSize * (pageNum - 1) + i + 1) + '</td><td><a href="###" target="_blank" title="' + data[i].bname + '">' + data[i].bname + '</a> </td><td>' + data[i].numberShow + '</td>' + status + '<td>' + data[i].beTime + '</td></tr>';
        }
    }else{
        str = '<tr><td colspan="5">暂无数据</td></tr>'
    }
    
    $('.noticeList table tbody').empty();
    $('.noticeList table tbody').prepend(str);

}
// 点击搜索按钮方法
$('#searchBtn').on('click', function () {
    tname = encodeURIComponent($('#tname').val());
    pageNum = 1;
    putdate = putdate.replace(/\s/g, "")
    getData(tname, cname, putdate, pageNum, pageSize, true)
})
// 请求数据封装方法
function getData(tname, cname, putdate, pageNum, pageSize, ispage) {
    // 参数分别对应：，搜索标题，发布单位，发布时间，页数，每页条数 ,是否需要初始化分页插件
    if (putdate) {
        // console.log('putdate:', putdate)
    }
    $('.noticeList table tbody').empty();
    $('.noticeList table tbody').prepend('<tr><td colspan="5">数据加载中....</td></tr>');
    $.ajax({
        type: "get",
        url: "http://cgmn.custeel.com/cgnews.mv?method=getBidsAlls",
        data: {
            tname: tname,
            cname: cname,
            putdate: putdate,
            pageNum: pageNum,
            pageSize: pageSize
        },
        dataType: "jsonp",
        jsonp: 'callback',
        success: function (data) {
            console.log('列表数据',data);
            dataArr=[];
            dataArr = data.data.list;//每次请求将数组暂时存在全局变量中
            if (ispage) {
                RenderLaypage(data.data.total)
            }
            drawingList(data.data.list)
        },
        error: function (request, a, b) {
            console("数据失败");
        }
    })
}

$(function(){
    var url = window.location.href;
    if(url.indexOf('cname')>-1){
        cname = window.location.search.split('=')[1];
    }else{
        cname='';
        }
    // 发送默认请求
    getData(tname, cname, putdate, pageNum, pageSize, true)
})
// 左侧点击全部事件 
$('.wrap .left .typeList ul li').eq(0).on('click',function(){
    window.location.href=window.location.href.split('?')[0];
})
// 左下角公开标书
$.ajax({
    type: "get",
    url: "http://cgmn.custeel.com/cgnews.mv?method=getBidsAlls&apmode=1&pageSize=5",
    dataType: "jsonp",
    jsonp: 'callback',
    success: function (data) {
        // console.log(data)
        var newData = data.data.list
        var str = '';
        for (var i = 0; i < newData.length; i++) {
            str += '<li><a href="http://ec.custeel.com/home/member/login.html" target="_blank">' + newData[i].bname + '</a></li>';
        }
        str += '<li>快来参与吧！</li>';
        $('.left .publiceMarkList ul').empty();
        $('.left .publiceMarkList ul').prepend(str);
    },
    error: function (request, a, b) {
        console("数据失败");
    }
})