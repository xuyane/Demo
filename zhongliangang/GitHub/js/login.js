 // 判断字符串输入长度
 var flag=true;//防止重复提交变量
 function getStrleng(str,maxstrlen) {
    var  myLen = 0;
    var str = str.toString();
    for (i = 0;(i < str.length) && (myLen <= maxstrlen * 2); i++) {
        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
            myLen++;
        else
            myLen += 2;

    }
    return myLen;
}
// 判断用户名是否输入正确
function judgeUserName() {
    $('.errText').html('');
    if ($('#username').val() == '') {
        $('.errText').html('用户名不能为空');
        $('#username').focus();
        return false
    } else {
        var regu ='[0-9a-zA-Z_@]+$';
        var re = new RegExp(regu);    
        if(re.test($('#username').val())){
           var len = getStrleng($('#username').val(),32);
           if(len<6 || len >32){
                $('.errText').html('账号输入长度为6-32个字符');
                $('#username').focus();
                return false;
           }else{
               return true;
           }
        }else{
            $('.errText').html('账号输入不合法');
            $('#username').focus();
            return false;
        }
    }
}
// 判断输入密码是否输入正确
function judgePwd() {
    $('.errText').html('');
    if ($('#password').val() == '') {
        $('.errText').html('密码不能为空');
        $('#password').focus();
        return false
    } else {
        var regu ='[0-9a-zA-Z_-]+$';
        var re = new RegExp(regu);
        if(re.test($('#password').val())){
           var len = getStrleng($('#password').val(),16);
           if(len<6 || len >16){
                $('.errText').html('密码输入长度为6-16个字符');
                $('#password').focus();
                return false;
           }else{
               return true;
           }
        }else{
            $('.errText').html('密码输入不合法');
            $('#password').focus();
            return false;
        }
    }
}
$('.btn').on('click', function () {
    if (judgeUserName() && judgePwd()&&flag) {
        flag=false;
        $('.content .btn').css('background','#ccc')
        $.ajax({
            type: "GET",
            url: "http://192.168.205.2/callours.mv?method=callUsLogin",
            dataType: "jsonp",
            jsonp: 'callback',
            data:{
                username:encodeURIComponent($('#number').val()),
                password:encodeURIComponent($('#password').val())
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("REFERER", "http://192.168.205.2");
            },
            success:function(data){
                console.log(data);
                if(data.errorCode==0){
                  console.log('登录成功');
                //   跳转会员中心页
                  window.location.href='http://ec.custeel.com/home/member/index.html'
                }else{
                    $('.errText').html(data.errorMessage);
                }
            },
            error:function(res){
                console.log(res);
            },
            complete:function(){
                flag=true;
                $('.content .btn').css('background','#0074ff')
            }
        })
    }
})