/**
 * Created by DELL on 2019/1/28.
 */
$(document).ready(function(){
    getcodekey();
    getcountry();
    $('.s-sel').on('click',function(ev){
        $('#sex').val($(this).attr("data-link"));
        $(this).addClass('now').siblings().removeClass('now');

    });
    $("#ShowvKey").click(function(ev){
        $("#vKeyStr").click();
        ev.preventDefault();
    });
    $("#vKeyStr").click(function(ev) {
        //$.ajax({
        //    url: "/reg/GetC1de.shtml?nt=" + Math.random(),
        //    type: "POST",
        //    dataType: "html",
        //    success: function (data, textStatus) {
        //        var c = jQuery.trim(data);
        //        if (c != "") {
        //            $("#vKeyStr").html(c);
        //        }
        //    },
        //    complete: function (req, err) {
        //        //$("#loginDIv").unmask();
        //    },
        //    error: function () {
        //        //	alert("未知错误!")
        //    }
        //});
    })
    //用户名获取焦点
    $('#UserName').focus(function(){
        $(this).addClass('input_focus')
        $(this).css('color','rgb(153, 153, 153)')
        $('#UserNameTip').html('<span class="onFocus"><span class="onFocus_top">6-15 alphanumeric characters, not case-sensitive</span><span class="onFocus_bot"></span></span>')
        $('#UserNameTip').show();
    });
    //用户名失去焦点
    $('#UserName').blur(function(){
        $(this).removeClass('input_focus');
        var val=$(this).val();
        if(val){
            var reg = /^[a-zA-Z0-9]{6,15}$/;
            var that=$(this);
            if(reg.test(val)){
                $.ajax({
                    url:api+"/user/english/check-username",
                    dataType:'jsonp',
                    type:"GET",
                    data:{
                        username:val
                    },
                    jsonp:'callback',
                    success:function(data) {
                        console.log(data)
                        if(data.status==200){
                            if(data.response==true){
                                that.addClass('input_error');
                                $('#UserNameTip').html('<span class="onError"><span class="onError_top"> The username has been registered!</span><span class="onError_bot"></span></span>')
                            }else {
                                that.attr('class','ipt-txt')
                                $('#UserNameTip').html('<span class="onCorrect"></span>')
                            }
                        }
                    },
                });
            }else{
                $(this).addClass('input_error');
                $('#UserNameTip').html('<span class="onError"><span class="onError_top">The username you entered is illegal</span><span class="onError_bot"></span></span>')
            }
        }else{
            $(this).addClass('input_error');
            $('#UserNameTip').html('<span class="onError"><span class="onError_top">The username you entered is illegal</span><span class="onError_bot"></span></span>')
        }
    });
    //密码获取焦点
    $('#PassWord').focus(function(){
        $(this).addClass('input_focus')
        $(this).css('color','rgb(153, 153, 153)')
        $('#PassWordTip').html('<span class="onFocus"><span class="onFocus_top">7-18 alphanumeric characters, case-sensitive</span><span class="onFocus_bot"></span></span>')
        $('#PassWordTip').show();
    });
    //密码失去焦点
    $('#PassWord').blur(function(){
        $(this).removeClass('input_focus');
        var val=$(this).val();
        if(val){
            var that=$(this);
            var enoughRegex = /^[A-Za-z0-9]{7,18}$/;
            if(enoughRegex.test(val)){
                that.attr('class','ipt-txt')
                $('#PassWordTip').html('<span class="onCorrect"></span>')
            }else{
                $(this).addClass('input_error');
                $('#PassWordTip').html('<span class="onError"><span class="onError_top">7-18 alphanumeric characters, case-sensitive</span><span class="onError_bot"></span></span>')
            }
        }else{
            $(this).addClass('input_error');
            $('#PassWordTip').html('<span class="onError"><span class="onError_top">7-18 alphanumeric characters, case-sensitive</span><span class="onError_bot"></span></span>')
        }
    });
    //邮箱获取焦点
    $('#WorkEmail').focus(function(){
        $(this).addClass('input_focus')
        $(this).css('color','rgb(153, 153, 153)')
        $('#WorkEmailTip').html('<span class="onFocus"><span class="onFocus_top">please enter your email address</span><span class="onFocus_bot"></span></span>')
        $('#WorkEmailTip').show();
    });
    //邮箱失去焦点
    $('#WorkEmail').blur(function(){
        $(this).removeClass('input_focus');
        var val=$(this).val();
        if(val){
            var that=$(this);
            var enoughRegex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
            if(enoughRegex.test(val)){
                that.attr('class','ipt-txt')
                $('#WorkEmailTip').html('<span class="onCorrect"></span>')
            }else{
                $(this).addClass('input_error');
                $('#WorkEmailTip').html('<span class="onError"><span class="onError_top">Please enter a valid email address</span><span class="onError_bot"></span></span>')
            }
        }else{
            $(this).addClass('input_error');
            $('#WorkEmailTip').html('<span class="onError"><span class="onError_top">Please enter a valid email address</span><span class="onError_bot"></span></span>')
        }
    });
    //二次密码获取焦点
    $('#PassWord1').focus(function(){
        $(this).addClass('input_focus')
        $(this).css('color','rgb(153, 153, 153)')
        $('#PassWord1Tip').html('<span class="onFocus"><span class="onFocus_top">7-18 alphanumeric characters, case-sensitive</span><span class="onFocus_bot"></span></span>')
        $('#PassWord1Tip').show();
    });
    //二次密码失去焦点
    $('#PassWord1').blur(function(){
        $(this).removeClass('input_focus');
        var val=$(this).val();
        if(val){
            var that=$(this);
            if(val==$('#PassWord').val()){
                that.attr('class','ipt-txt')
                $('#PassWord1Tip').html('<span class="onCorrect"></span>')
            }else{
                $(this).addClass('input_error');
                $('#PassWord1Tip').html('<span class="onError"><span class="onError_top">Re-typed password and password do not match</span><span class="onError_bot"></span></span>')
            }
        }else{
            $(this).addClass('input_error');
            $('#PassWord1Tip').html('<span class="onError"><span class="onError_top">7-18 alphanumeric characters, case-sensitive</span><span class="onError_bot"></span></span>')
        }
    });
    //联系人获取焦点
    $('#RegName').focus(function(){
        $(this).addClass('input_focus')
        $(this).css('color','rgb(153, 153, 153)')
        $('#RegNameTip').html('<span class="onFocus"><span class="onFocus_top">2-20 characters, case sensitive</span><span class="onFocus_bot"></span></span>')
        $('#RegNameTip').show();
    });
    //联系人失去焦点
    $('#RegName').blur(function(){
        $(this).removeClass('input_focus');
        var val=$(this).val();
        if(val){
            var that=$(this);
            if(val.length>1&&val.length<21){
                that.attr('class','ipt-txt wd220 ipt-txt')
                $('#RegNameTip').html('<span class="onCorrect"></span>')
            }else{
                $(this).addClass('input_error');
                $('#RegNameTip').html('<span class="onError"><span class="onError_top">2-20 characters, case sensitive</span><span class="onError_bot"></span></span>')
            }
        }else{
            $(this).addClass('input_error');
            $('#RegNameTip').html('<span class="onError"><span class="onError_top">2-20 characters, case sensitive</span><span class="onError_bot"></span></span>')
        }
    });
    //企业名称获取焦点
    $('#Company').focus(function(){
        $(this).addClass('input_focus')
        $(this).css('color','rgb(153, 153, 153)')
        $('#CompanyTip').html('<span class="onFocus"><span class="onFocus_top">4-50 characters, case sensitive</span><span class="onFocus_bot"></span></span>')
        $('#CompanyTip').show();
    });
    //企业名称失去焦点
    $('#Company').blur(function(){
        $(this).removeClass('input_focus');
        var val=$(this).val();
        if(val){
            var that=$(this);
            if(val.length>3&&val.length<51){
                $.ajax({
                    url:api+"/user/english/check-member",
                    dataType:'jsonp',
                    data:{
                        memberName:val
                    },
                    jsonp:'callback',
                    success:function(data) {
                        console.log(data)
                        if(data.status==200){
                            if(data.response==true){
                                that.addClass('input_error');
                                $('#CompanyTip').html('<span class="onError"><span class="onError_top">The company has been registered.</span><span class="onError_bot"></span></span>')
                            }else {
                                that.attr('class','ipt-txt')
                                $('#CompanyTip').html('<span class="onCorrect"></span>')
                            }
                        }
                    },
                });
                //that.attr('class','input_public')
                //$('#CompanyTip').html('<span class="onCorrect"></span>')
                //that.attr('class','ipt-txt')
                //$('#CompanyTip').html('<span class="onCorrect"></span>')
            }else{
                $(this).addClass('input_error');
                $('#CompanyTip').html('<span class="onError"><span class="onError_top">4-50 characters, case sensitive</span><span class="onError_bot"></span></span>')
            }
        }else{
            $(this).addClass('input_error');
            $('#CompanyTip').html('<span class="onError"><span class="onError_top">4-50 characters, case sensitive</span><span class="onError_bot"></span></span>')
        }
    });
    //验证码获取焦点
    var imgistrue=false;
    $('#vkey').focus(function(){
        $(this).addClass('input_focus')
        $(this).css('color','rgb(153, 153, 153)')
        $('#vkeyTip').html('<span class="onFocus"><span class="onFocus_top" style="padding-left:35px !important;">Please enter the validation code</span><span class="onFocus_bot"></span></span>')
        $('#vkeyTip').show();
    });
    //验证码失去焦点
    $('#vkey').blur(function(){

        $(this).removeClass('input_focus');
        var val=$(this).val();
        if(val){
            var that=$(this);
            var key=$('#codeimg').attr('data-key')
            $.ajax({
                type:"GET",
                url:api+"/user/english/check-code-image", //访问的链接
                dataType:"jsonp",  //数据格式设置为jsonp
                jsonp:"callback",  //Jquery生成验证参数的名称
                data:{
                    imageCode:$.md5(val),
                    key:$.md5(key)
                },
                success:function(data){  //成功的回调函数
                    console.log(data)
                    if(data.response){
                        imgistrue=true;
                        that.attr('class','ipt-txt wdt60')
                        $('#vkeyTip').html('<span class="onCorrect"></span>')

                    }else{
                        imgistrue=false;
                        that.addClass('input_error');
                        $('#vkeyTip').html('<span class="onError"><span class="onError_top">Verification Code is error！</span><span class="onError_bot"></span></span>')
                    }
                },
                error: function (e) {
                }
            });
        }else {
            $(this).addClass('input_error');
            $('#vkeyTip').html('<span class="onError"><span class="onError_top">Please enter the validation code</span><span class="onError_bot"></span></span>')
        }
    });
    $('#checkboxbox').click(function(){
        var value=$('#agree').is(':checked')
        if(value){
            $('#agreeTip').html('<span class="onCorrect"></span>')
            $('#agreeTip').show()
        }else{
            $('#agreeTip').show()
            $('#agreeTip').html('<span class="onError"><span class="onError_top">You must agree and be willing to comply with the use agreement</span><span class="onError_bot"></span></span>')

        }
    });
    $('#regbtn').click(function(){
        $('#UserNameTip').show();
        $('#WorkEmailTip').show();
        $('#PassWordTip').show();
        $('#PassWord1Tip').show();
        $('#CompanyTip').show();
        $('#RegNameTip').show();
        $('#RegHandsetTip').show();
        $('#vkeyTip').show();
        //$('#sjdhTip').show();
        $('#agreeTip').show();
        var length=$('.onError').length;
        if(length==0){
            $(this).attr('disabled','true')
            var formData = new FormData();
            //formData.append('cellPhone', getCookie('tel'));
            formData.append('memberName', $('#Company').val());//公司名字
            formData.append('imageCode', $.md5($('#vkey').val()));//图片验证码
            formData.append('key', $.md5($('#codeimg').attr('data-key')));
            formData.append('email', $('#WorkEmail').val());//邮箱
            formData.append('contacterName', $('#RegName').val());//联系人
            formData.append('password', $.md5($('#PassWord').val()));//密码
            formData.append('address',$('#User_CityName').val()) ;
            formData.append('username', $('#UserName').val());//用户名
            formData.append('sex', $('#sex').attr('value')||'');//性别
            formData.append('stateCode', $('#CountryCode').val());//国家
            $.ajax({
                url:api+"/user/english/register", //访问的链接
                type: 'POST',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success:function(data){  //成功的回调函数
                    $(this).attr('disabled','false')
                    if(data.status==200){
                        window.location.href ="//en.oilchem.net/";
                    }else{
                        alert(data.message)
                    }
                },
                error: function (e) {
                    $(this).attr('disabled','false')
                }
            });
        }
    });
});
function getcodekey(){
    $.ajax({
        type:"GET",
        url:api+"/user/english/get-random-num", //访问的链接
        dataType:"jsonp",  //数据格式设置为jsonp
        jsonp:"callback",  //Jquery生成验证参数的名称
        data:{
            count:4
        },
        success:function(data){  //成功的回调函数
            $('#codeimg').attr('src', api+"/user/english/generate-code-image?key=" + data.response)
            $('#codeimg').attr('data-key',data.response);
            $('#vkey').val('');
            $('#vkeyTip').hide();
            $('#vkeyTip').html('<span class="onError"><span class="onError_top">Please enter the validation code</span><span class="onError_bot"></span></span>')
        },
        error: function (e) {

        }
    });
}
function getcountry(){
    $.ajax({
        type:"GET",
        url:api+"/user/english/query-area-tree", //访问的链接
        dataType:"jsonp",  //数据格式设置为jsonp
        jsonp:"callback",  //Jquery生成验证参数的名称
        success:function(data){  //成功的回调函数
            if(data.status=='200'){
                var html="<option value=''>Select a Country/Region</option>";
                for(var i=0;i<data.response.length;i++){
                    html+="<option value='"+data.response[i].code+"'  >"+data.response[i].foreigns+"</option>"
                }
                $('#CountryCode').html(html)
            }
        },
        error: function (e) {

        }
    });
}