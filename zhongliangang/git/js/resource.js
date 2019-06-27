

// 请求下拉框选项数据
// 定义一个渲染下拉框的公共方法
function renderOptions(data,id){
    var str = '<option value="">全部</option>';
    for(var i=0;i<data.length;i++){
        str+='<option value="'+data[i].fname+'">'+data[i].fname+'</option>';
    }
    // console.log(str);
    $(id).prepend(str);
}
$.ajax({
    type: "get",  
    url: "http://cgmn.custeel.com/cgnews.mv?method=getCgxsSearch",
     dataType:"jsonp",   
     jsonp:'callback',  
    success:function(data) {  
        console.log(data);
        // 渲染最小宽度
        renderOptions(data.data.bidWidth,'#minBreadth');
        // 渲染最大宽度
        renderOptions(data.data.bidWidth,'#maxBreadth');
        // 渲染品名
        renderOptions(data.data.equipmentName,'#brand');
        // 渲染牌号
        renderOptions(data.data.material,'#mark');
        // 渲染最小直径
        renderOptions(data.data.normalThichness,'#minDiameter');
        // 渲染最大直径
        renderOptions(data.data.normalThichness,'#maxDiameter');
        // 渲染仓库
        renderOptions(data.data.stlcst,'#warehouse');
        // $('.bottom p').eq(1).html(resetTime(obj.pushdate))
     },  
     error:function(request,a,b) {  
        console("数据失败");  
     }  
})
var ename='';//全局变量 品名
var mtial='';//全局变量 牌名
var normtness=''//厚度拼接下拉框内容（默认为空）（格式：26~201）
var bwidth = '';//宽度拼接下拉框内容（默认为空）（格式：26~201）
var stlcst =''; //仓库下拉框内容（默认为空）
var pageNum = 1;//页码 默认为1
var pageSize=20;// 每页条数 默认20

// 封装获取列表数据的方法
function getListData(ename,mtial,normtness,bwidth,stlcst,pageNum,pageSize,isPage){
    $.ajax({
        type: "get",  
        url: "http://cgmn.custeel.com/cgnews.mv?method=getCgxs",
         dataType:"jsonp", 
         data:{
            ename:encodeURIComponent(ename),
            mtial:mtial,
            normtness:normtness,
            bwidth:bwidth,
            stlcst:stlcst,
            pageNum:pageNum,
            pageSize:pageSize
         },  
         jsonp:'callback',  
        success:function(data) {  
            console.log(data);
            renderList(data.data.list);
            if(isPage){
                // 根据变量决定是否要初始化页码插件
                RenderLaypage(data.data.total);
            }
         },  
         error:function(request,a,b) {  
            console("数据失败");  
         }  
    })
}
// 初始化页码插件
function RenderLaypage(count){
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
                    //do something
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数
                    pageNum = obj.curr;
                    pageSize = obj.limit;
                    getListData(ename,mtial,normtness,bwidth,stlcst,pageNum,pageSize,false)
                }
            }
        });
    });
}
// 渲染列表
function renderList(data){
    var str = '';
    for(var i =0;i<data.length;i++){
        str+='<li>'+
                '<span>'+(pageSize*(pageNum-1)+ i+1)+'</span>'+
                '<span title="'+data[i].ename+'">'+judgeIsNull(data[i].ename)+'</span>'+
                '<span>'+judgeIsNull(data[i].mtial)+'</span>'+
                '<span>'+judgeIsNull(data[i].normtness)+'</span>'+
               ' <span>'+judgeIsNull(data[i].bwidth)+'</span>'+
                '<span>'+judgeIsNull(data[i].bamount)+'</span>'+
                '<span>'+judgeIsNull(data[i].bprice)+'</span>'+
                '<span>'+judgeIsNull(data[i].stlcst)+'</span>'+
            '</li>';
    }
    $('.dataList .listBody ul').empty();
    $('.dataList .listBody ul').prepend(str);
}
// 定义一个 判断数据是否为空的方法
function judgeIsNull(data){
    if(data == ''){
        return '-'
    }else{
        return data
    }
}
// 点击搜索按钮事件
$('.searchBtn').on('click',function(){
    ename = $('#brand option:selected').val();
    mtial = $('#mark option:selected').val();
    if($('#minDiameter option:selected').val()!=''&& $('#maxDiameter option:selected').val()!=''){
         normtness = $('#minDiameter option:selected').val()+'~'+$('#maxDiameter option:selected').val();
    }else{
        normtness='';
    }
    if($('#minBreadth option:selected').val()!=''&& $('#maxBreadth option:selected').val()!=''){
        bwidth = $('#minBreadth option:selected').val() +'~'+$('#maxBreadth option:selected').val()
    }else{
        bwidth='';
    }
    
    stlcst = $('#warehouse option:selected').val();
    pageNum =1;
    getListData(ename,mtial,normtness,bwidth,stlcst,pageNum,pageSize,true)
})
getListData('','','','','',1,20,true);

