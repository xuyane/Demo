$(function(){
    // console.log(window.location.search.split('=')[1])
    var number = window.location.search.split('=')[1];
    $.ajax({
        type: "get",  
        url: "http://cgmn.custeel.com/cgnews.mv?method=getNewsDetail&number="+number,
         dataType:"jsonp",   
         jsonp:'callback',  
        success:function(data) {  
            // console.log(data);
            var obj = data.data[0];
            $('.title').html(obj.title);
            $('.top .time').html(obj.pushdate);
            $('.text .textTitle').html(obj.title);
            $('.text .content').html(obj.content);
            // $('.bottom p').eq(1).html(resetTime(obj.pushdate))
         },  
         error:function(request,a,b) {  
            console("数据失败");  
         }  
    })
})
// 截取时间方法
function resetTime(data){
    return data.split(' ')[0];
}