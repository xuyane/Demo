    var categoryID = ''; //定义一个全局变量 保存公告类型
    var title = ''; //同上 保存公告搜索标题
    var cname = ''; //同上 保存 搜索条件-发布单位
    var putdate = ''; //保存 搜索条件 - 发布时间
    var pageSize = 20; //
    var pageNum = 1;

    // 公告类型切换事件
    $('.wrap .left ul li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        categoryID = $(this).attr('data-val');
        // 在切换公告类型时 将搜索条件都置空
        $('#title').val('');
        $('#cname').val('');
        $('#pubDate').val('');
        title = '';
        cname = '';
        putdate = '';
        pageNum = 1;
        getData(categoryID, '1', cname, putdate, pageNum, pageSize, true)
    })
    // 点击搜索按钮事件
    $('#searchBtn').on('click', function () {
        title = $('#title').val();
        cname = $('#cname').val();
        putdate = $('#pubDate').val();
        // console.log(title)
        // console.log(cname)
        // console.log(cname);
        pageNum = 1; //每次点击搜索将页码重置为1
        getData(categoryID, title, cname, putdate, pageNum, pageSize, true)
    })

    function RenderLaypage(count) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                count: count, //数据总数，从服务端得到
                theme: '#0074ff',
                limit: 20,
                groups: 3,
                layout: ['limit', 'prev', 'page', 'next', 'skip'], //分页布局，上一页、页码区域、下一页、页码跳转
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    //首次不执行
                    if (!first) {
                        // console.log('11111111111111111111')
                        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        // console.log(obj.limit); //得到每页显示的条数
                        pageSize = obj.limit
                        pageNum = obj.curr
                        getData(categoryID, title, cname, putdate, obj.curr, pageSize, false)
                    }
                }
            });
        });
    }
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#pubDate', //指定元素
            range: '~',
            btns: ['clear', 'now', 'confirm'],
            theme: '#0074ff',
            done: function (value, date, endDate) {
                // console.log(value); //得到日期生成的值，如：2017-08-18
                // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            }
        });
    });
    // 请求数据封装方法
    function getData(categoryID, title, cname, putdate, pageNum, pageSize, ispage) {
        $('.noticeList .noticeListBody').empty();
        $('.noticeList .noticeListBody').prepend('<p style="text-align:center;padding-top:20px">数据加载中.....</p>');
        // 参数分别对应：新闻子编码(公告类型)，搜索标题，发布单位，发布时间，页数，每页条数 ,是否需要初始化分页插件
        $.ajax({
            type: "get",
            url: "http://cgmn.custeel.com/cgnews.mv?method=getCgnewAlls",
            data: {
                categoryID: categoryID,
                title: encodeURIComponent(title),
                cname: encodeURIComponent(cname),
                putdate: putdate,
                pageNum: pageNum,
                pageSize: pageSize
            },
            dataType: "jsonp",
            jsonp: 'callback',
            success: function (data) {
                console.log(data);
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
    // 渲染列表方法
    function drawingList(data) {
        var str = '';
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].level == 0) {
                    str += '<a href="./announcementDetail.html?number=' + data[i].number + '"target="_blank"  title="' + data[i].title + '">' +
                        '<span>' + (pageSize * (pageNum - 1) + i + 1) + '</span>' +
                        ' <span>' + data[i].title + '</span>' +
                        '<span>' + data[i].cname + '</span>' +
                        '<span>' + data[i].putdate + '</span>' +
                        '</a>'
                } else {
                    str += '<a href="http://ec.custeel.com/home/member/login.html" target="_blank" title="' + data[i].title + '">' +
                        '<span>' + (pageSize * (pageNum - 1) + i + 1) + '</span>' +
                        ' <span>' + data[i].title + '</span>' +
                        '<span>' + data[i].cname + '</span>' +
                        '<span>' + data[i].putdate + '</span>' +
                        '</a>'
                }
            }
            $('.noticeList .noticeListBody').empty();
            $('.noticeList .noticeListBody').prepend(str);
        }else{
            str='<p style="text-align:center;padding-top:20px">暂无数据</p>';
            $('.noticeList .noticeListBody').empty();
            $('.noticeList .noticeListBody').prepend(str);
        }
    }
    // 发送默认请求
    getData(categoryID, title, cname, putdate, pageNum, pageSize, true)