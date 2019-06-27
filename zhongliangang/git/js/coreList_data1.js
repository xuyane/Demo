$(function () {
    var name = '';
    var pageNumOne = 1;
    var pageSizeOne = 20;
    $('#search').on('click', function () {
        name = encodeURIComponent($('#p_name').val());
        console.log('name', name);
        pageNumOne = 1; //每次点击搜索将页码重置为1
        loadTable(pageNumOne, pageSizeOne, name);
    })

    function loadTable(pageNum, pageSize, name) {
        pageSize = pageSize || pageSizeOne;
        $.ajax({
            url: api + "/cgnews.mv?method=getCgCompnyAlls",
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
                    var str =  ((pageNum-1) * pageSize) + (key + 1) + ' ' + item.cname;
                    if (key < count) {
                        obj[key] = {
                            id: item.id,
                            cname1: str
                        };
                    } else {
                        obj[key - count]['cname2'] = str
                    }
                })
                console.log('obj', obj)
                renderTable(obj);
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
                            field: 'cname1',
                            title: '【核心供应商】公司名称'
                        }, {
                            field: 'cname2',
                            title: '【核心供应商】公司名称'
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