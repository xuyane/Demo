$(function(){
    // console.log(window.location.search.split('=')[1])
    var number = window.location.search.split('=')[1];
    $('.wrap .errtip').show();
    $.ajax({
        type: "get",  
        url: baseUrl+"/cgnews.mv?method=getNewsDetail&number="+number,
         dataType:"jsonp",   
         jsonp:'callback',  
        success:function(data) {  
            console.log(data);
            if (data.data.length > 0) {
                var obj = data.data[0];
                $('.title').html(obj.title);
                $('.top .time').html(obj.pushdate);
                $('.text .textTitle').html(obj.title);
                $('.text .content').html(obj.content);
                if(obj.fileUrl){
                    $('.wrap .bottom').html('附件下载：<a href="'+baseUrl+obj.fileUrl+'" download="'+obj.fileName+'" target="_blank">'+obj.fileName+'</a>');
                }else{
                    $('.wrap .bottom').hide();
                }
            }
            // $('.bottom p').eq(1).html(resetTime(obj.pushdate))
         },  
         error:function(request,a,b) {  
            console("数据失败");  
         },
         complete:function(){
            $('.wrap .errtip').hide();
         }
    })
})
// 截取时间方法
function resetTime(data){
    return data.split(' ')[0];
}