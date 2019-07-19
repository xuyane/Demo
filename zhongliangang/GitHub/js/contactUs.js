var userServiceId = ''; //公司服务账号ID
$(function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !
        isOpera; //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion <= 9) {
            $('#file').attr({
                'disabled': true
            })
            $('.ie9Text').show();
        }
    }
})
// 判断字符串输入长度
function getStrleng(str, maxstrlen) {
    var myLen = 0;
    var str = str.toString();
    for (i = 0;
        (i < str.length) && (myLen <= maxstrlen * 2); i++) {
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
    if ($('#number').val() == '') {
        $('.errText').html('用户名不能为空');
        $('#number').focus();
        return false
    } else {
        var regu = '[0-9a-zA-Z_@]+$';
        var re = new RegExp(regu);
        if (re.test($('#number').val())) {
            var len = getStrleng($('#number').val(), 32);
            if (len < 6 || len > 32) {
                $('.errText').html('账号输入长度为6-32个字符');
                $('#number').focus();
                return false;
            } else {
                return true;
            }
        } else {
            $('.errText').html('账号输入不合法');
            $('#number').focus();
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
        var regu = '[0-9a-zA-Z_-]+$';
        var re = new RegExp(regu);
        if (re.test($('#password').val())) {
            var len = getStrleng($('#password').val(), 16);
            if (len < 6 || len > 16) {
                $('.errText').html('密码输入长度为6-16个字符');
                $('#password').focus();
                return false;
            } else {
                return true;
            }
        } else {
            $('.errText').html('密码输入不合法');
            $('#password').focus();
            return false;
        }
    }
}
// 判断验证码
function judgeCode() {
    console.log($('#code').val().toLowerCase())
    console.log($('.random').html().toLowerCase())
    $('.errText').html('');
    if ($('#code').val() == "") {
        $('.errText').html('验证码不能为空');
        $('#code').focus();
        return false;
    } else {
        if ($('#code').val().toLowerCase() !== $('.random').html().toLowerCase()) {
            $('.errText').html('验证码错误');
            $('#code').focus();
            $('#code').val('')
            initCode(); //重置验证码
            return false;
        } else {
            $('.errText').html('');
            return true;
        }
    }
}
//   点击验证码 重置
$('.random').on('click', function () {
    initCode();
})
// 生成验证码
function initCode() {
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    // var randomArr=[];
    var str = '';
    for (var i = 0; i < 4; i++) {
        var random = Math.floor(Math.random() * 62);
        str += arr[random];
    }
    // console.log(str);
    $('.random').html(str);
}
initCode()
// 点击登录按钮，出现登录弹窗
$('.loginBtn').on('click', function () {
    $('.loginForm').show();
})
$('.loginForm .form .formTitle i').on('click', function () {
    $('.loginForm').hide();
})
// 点击弹窗登录按钮
var isLogin = true; //定义全局变量 防止重复点击登录按钮
$('.loginFormBtn').on('click', function () {
    if (judgeUserName() && judgePwd() && judgeCode() && isLogin) {
        isLogin = false;
        $('.loginFormBtn').css('background', '#ccc')
        $.ajax({
            type: "GET",
            url: baseUrl + "/callours.mv?method=callUsLogin",
            dataType: "jsonp",
            jsonp: 'callback',
            data: {
                username: encodeURIComponent($('#number').val()),
                password: encodeURIComponent($('#password').val())
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("REFERER", baseUrl);
            },
            success: function (data) {
                // console.log('登录返回', data);
                if (data.errorCode == 0) {
                    $.ajax({
                        type: 'get',
                        url: baseUrl + '/callours.mv?method=getUserInfo',
                        async: true,
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        data: {
                            uname: $('#number').val(),
                        },
                        success: function (res) {
                            console.log('res', res)
                            console.log(res.data.length)
                            if (res.data.length > 0) {
                                $('.logintext').hide();
                                $('.loginForm').hide();
                                var obj = res.data[0];
                                userServiceId = obj.usid;
                                $('.userMessage .number').html($('#number').val());
                                $('.userMessage .cname').html(obj.cname);
                                $('.userMessage .userinfo .name').html(obj.oname);
                                $('.userMessage .userinfo .phone').html(obj.phone);
                                $('.userMessage .userinfo .email').html(obj.email);
                                $('.userMessage').show()
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                } else {
                    $('.errText').html(data.errorMessage);

                }
            },
            error: function (res) {
                console.log(res);
            },
            complete: function () {
                isLogin = true;
                $('.loginFormBtn').css('background', '#0074ff')
            }
        })
    }
})
// 点击文件上传按钮
$('.submit').on('click', function () {
    // 判断文件类型
    var flag = true;

    console.log("$('#file').val()", $('#file'))
    if ($('#file').val() != '') {
        var fileType = $('#file')[0].files[0].type;
        if (fileType == 'image/jpeg' || fileType == 'image/png') {
            if ($('#file')[0].files[0].name.length < 30) {
                var fileSize = $('#file')[0].files[0].size / 1024 / 1024;
                if (fileSize <= 5) {
                    var formData = new FormData();
                    formData.append('file', $('#file')[0].files[0]);
                    // formData.append('userServiceId',userServiceId);
                    if (flag) {
                        flag = false;
                        $('.userMessage .file .submit').css('background', '#ccc')
                        $.ajax({
                            type: 'POST',
                            url: baseUrl + '/fileUpload.mv?userServiceId=' +
                                userServiceId,
                            data: formData,
                            cache: false, //上传文件无需缓存
                            processData: false, //用于对data参数进行序列化处理 这里必须false
                            contentType: false, //必须
                            success: function (res) {
                                console.log(res);
                                res = JSON.parse(res);
                                if (res.errorCode == 0) {
                                    alert('恭喜上传回执成功')
                                } else {
                                    alert('上传失败，请重新上传')
                                }
                            },
                            error: function (res) {
                                console.log(res)
                            },
                            complete: function () {
                                flag = true;
                                $('.userMessage .file .submit').css('background', '#0074ff')
                            }
                        })
                    }
                } else {
                    alert('上传文件大小应小于5M')
                }
            } else {
                alert('文件名长度不能大于30')
               
            }
        } else {
            alert('上传的文件仅限图片（.jpg/.png） 格式!')
        }
    } else {
        alert('您还未选择需要上传的文件哦！')
    }

})
// 文件上传输入框点击事件
function inputChange() {
    console.log($('#file'))
    // console.log($('#file')[0].files[0].size);
    $('.userMessage .file .upLoadfile i').css({
        'display': 'inline-block'
    });
    console.log($('#file')[0].files[0].name.length);
    $('.fileName').html($('#file')[0].files[0].name)
    $('.fileName').attr('title', $('#file')[0].files[0].name)
}
// 取消文件上传事件
$('.userMessage .file .upLoadfile i').on('click', function () {
    $('#file').val('');
    $('.fileName').html('');
    $(this).hide();
})

// 窗口关闭事件
window.onbeforeunload = function(e){
    e=e||window.event;
    // debugger;
    // console.log("11111111111111111111"); 
    e.returnValue = "FF没什么好办法"; 
     //这里可以放置你想做的操作代码 
     $.ajax({
         url:baseUrl+'/callours.mv?method=getLogout',
         type: 'get',
         dataType: 'jsonp',
         jsonp: 'callback',
         success:function(res){
             console.log(res);
             
         }
     })
    //  debugger;
  } 