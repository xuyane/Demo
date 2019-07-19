// 平台公告
try {
    $.ajax({
        type: "get",
        url: baseUrl+"/cgnews.mv?method=getEcnews&str=10,1001001",
        dataType: "jsonp",
        jsonp: 'callback',
        success: function (data) {
            // console.log(data);
            var arr = [];
            arr = data.data;
            var str = '';
            for (var i = 0; i < arr.length; i++) {
                // console.log('arr[i].viewUser',arr[i].viewUser)
                if (arr[i].viewUser == 0) {
                    // 跳转详情页面
                    str += '<li><a href="./announcementDetail.html?number=' + arr[i].number + '" target="_blank" title="' + arr[i].title + '">' + arr[i].title + '</a></li>'
                } else {
                    str += '<li><a href="./login.html" target="_blank" title="' + arr[i].title + '">' + arr[i].title + '</a></li>'
                }
            }
            $('.announcementList ul').empty();
            $('.announcementList ul').prepend(str);
            $('.announcementList').slide({
                mainCell: ".gd2",
                autoPlay: true,
                effect: "leftLoop",
                vis: 5,
                interTime: 1500
            });
            // ruleRender(data.data.list)
        },
        error: function (request, a, b) {
            console("数据失败");
        }
    })
} catch (err) {
    console.log(err);
}
function resetTime(data){
    return data.split(' ')[0];
}
try {
    $.ajax({
        type: "get",
        url: baseUrl+"/cgnews.mv?method=getEcnews&str=8,1001001",
        dataType: "jsonp",
        jsonp: 'callback',
        success: function (data) {
            console.log('公示公告',data);
            var arr = [];
            arr = data.data;
            var str = '';
            for (var i = 0; i < arr.length; i++) {
                // console.log('arr[i].viewUser',arr[i].viewUser)
                if (arr[i].viewUser == 0) {
                    // 跳转详情页面
                    str += '<li><a href="./announcementDetail.html?number=' + arr[i].number + '" target="_blank" title="' + arr[i].title + '">' + arr[i].title + '</a><span>'+resetTime(arr[i].pushdate)+'</span></li>'
                } else {
                    str += '<li><a href="./login.html" target="_blank" title="' + arr[i].title + '">' + arr[i].title + '</a><span>'+resetTime(arr[i].pushdate)+'</span></li>'
                }
            }
            $('.business .scoll1 ul').empty();
            $('.business .scoll1 ul').prepend(str);
            $('.scoll1').slide({
                mainCell: ".gy",
                // autoPage:true,
                effect: "topLoop",
                autoPlay: true,
                // scroll: 5,
                vis: 5,
                interTime: 3000,
            });
            // ruleRender(data.data.list)
        },
        error: function (request, a, b) {
            console("数据失败");
        }
    })
} catch (err) {
    console.log(err);
}