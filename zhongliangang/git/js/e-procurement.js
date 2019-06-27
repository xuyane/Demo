//取一年数据
function begintime(){
	var myDate = new Date;
	var year = myDate.getFullYear()-1;//获取当前年
	var yue = myDate.getMonth()+1;//获取当前月
	var date = myDate.getDate();//获取当前日
	return year+'-'+yue+'-'+date;
}

// 走势图图表数据渲染
function getchart(char_dom,begintime,title,obj,fun) {
	var dom = document.getElementById(char_dom);
	var myChart = echarts.init(dom);
		var zhibiao = [];
		var zhibiao_name = []
		for(var key in obj){
			zhibiao.push(key)
			zhibiao_name.push(obj[key])
		}
	jQuery.ajax({
		dataType: "jsonp",
		timeout: "20000",
		async: !1,
		url: "https://mysteelapi.steelphone.com/tpl/zhanting_data.html?indexCodes="+zhibiao.toString()+"&startTime="+begintime,
		success: function(data) {
			option = null;
			option = {
				title: {
					text: title,
					left: 'center',
					textStyle:{
					color :'#333',
					fontWeight :'normal',
					fontSize :'16'
				}
				},
				grid:{
				x:40,  //左
				y:40,  //上
				x2:10, //右
				y2:65  //下
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line'
					}
				},
				graphic: [
					{
						type: 'image',
						id: 'logo',
						right: 110,
						top: 110,
						z: -10,
						bounding: 'raw',
						origin: [75,75],
						style: {
							image: '//a.mysteelcdn.com/common/meitan/images/logo.png',
							width: 103,
							height: 59,
							opacity: 0.2
						}
					}
				],
				xAxis: {
					type: 'category',
					data: data.xAxis,
					scale: true,
					boundaryGap: false,
					axisLine: {
						onZero: false
					}, //X/Y轴O刻度是否重合
					splitLine: {
						show: true
					}, //是否显示分割线
					splitNumber: 20, //分割数量
					min: 'dataMin', //坐标轴的最小刻目
					max: 'dataMax'
				},
				yAxis: {
					scale: true,
					splitArea: {
						show: false
					},
					splitLine: {
						show: true
					} //是否显示分割线
				},
				series: [],
				legend: {
					orient: 'horizontal', //水平排列
					x:'center',
					bottom: '0', //9.5  12.5 15.5
					data: zhibiao_name
				}
			};
			if(fun){
				fun(data)
			}
			for(i=0 ;i<data.datas.length; i++){
				option.series.push(
					{
						name:zhibiao_name[i],
						type: 'line',
						data: data.datas[i].yAxis,
						smooth: true,
						symbolSize: 1, //坐标点的大小
						connectNulls: true,
						lineStyle: {
							normal: {
								opacity: 0.7
							}
						}
					}
				)
			}
			myChart.setOption(option, true);
		},
		error: function() {
			$(dom).html('<p style="text-align: center;line-height: 100px;">暂无数据，请稍后重试</p>');
		}
	})
}
    $(function(){
		getchart("marketEchart6",begintime(),"水泥指数变化趋势图",{"BM_0000403253":"水泥指数"})
		ljmZstChart();
		pcmZstChart();
		wymZstChart();
		dlmZstChart();
	})
	function ljmZstChart(){
		getchart(
			'marketEchart7',
			'2017-03-27',
			'炼焦煤价格走势图',
			{
				'CA_0001111466':'吕梁',
				'CA_0001400242':'济宁',
				'CA_0001605141':'澳洲',
				'CA_0001605144':'蒙古国'
			}
		);
	}
	function pcmZstChart(){
		getchart(
			'marketEchart8',
			'2014-07-08',
			'喷吹煤价格走势图',
			{
				'CA_0000103056':'晋城',
				'CA_0000306455':'石嘴山',
				'CA_0000103045':'永城',
				'CA_0000106153':'俄罗斯(A10V10)'
			}
		);
	}
	function dlmZstChart(){
		getchart(
			'marketEchart9',
			'2014-01-01',
			'动力煤价格走势图',
			{
				'CA_0000065751':'秦皇岛港Q5500',
				'CA_0000306440':'鄂尔多斯Q5500',
				'CA_0001740619':'榆林Q6000',
				'CA_0000105766':'广州港Q3800'
			},
			function(){
        option.legend.bottom=0,
        option.legend.itemGap=5,
        option.grid.y2=90
      }
    );
  }
  function wymZstChart(){
		getchart(
			'marketEchart10',
			'2016-04-18',
			'无烟煤价格走势图',
			{
				'CA_0000191984':'晋城(洗小块)',
				'CA_0001111478':'石嘴山(洗中块)',
				'CA_0000191949':'永城(洗小块)'
			}
		);
	}
	// 走势图一级导航切换
	$('.goodsMarket .marketList span').on('hover',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.goodsMarket .marketEchart').eq($(this).index()).addClass('show').siblings().removeClass('show')
	})
	// 走势图二级导航切换
	$('.goodsMarket .marketEchart ul li').on('hover',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.marketEchart').find('.marketEchart2').eq($(this).index()).addClass('show').siblings().removeClass('show')
	})

	// 供应商准入公示
	$.ajax({
        type: "get",  
        url: "http://cgmn.custeel.com/cgnews.mv?method=getCgCompnyAlls",
         dataType:"jsonp",   
         jsonp:'callback',  
        success:function(data) {  
			console.log('供应商准入公示',data);
			ruleRender(data.data.list)
         },  
         error:function(request,a,b) {  
            console("数据失败");  
         }  
	})
	// 供应商准入公示 列表渲染
	function ruleRender(data){
		var str ="";
		for(var i = 0 ; i<data.length;i++){
			str += '<li><a href="./coreDesc.html?cid='+data[i].id+'" target="_blank" title="'+data[i].cname+'">'+data[i].cname+'</a></li>'
		}
		$('.scollList ul').empty();
		$('.scollList ul').prepend(str);
		$(".scollList").slide({
			mainCell:".gy",
			autoPage:true,
			effect:"topLoop",
			autoPlay:true,
			scroll:8,
			easing:'swing',
			pnLoop:true,
			vis:8,
			interTime:5000,
			delayTime:800
		});
	}

	// 平台公告
	try{
		$.ajax({
			type: "get",  
			url: "http://cgmn.custeel.com/cgnews.mv?method=getEcnews&str=10,1001001",
			 dataType:"jsonp",   
			 jsonp:'callback',  
			success:function(data) {  
				// console.log(data);
				var arr =[];
				arr  = data.data;
				var str = '';
				for(var i =0;i<arr.length;i++){
					// console.log('arr[i].viewUser',arr[i].viewUser)
					if(arr[i].viewUser===0){
						// 跳转详情页面
						str += '<li><a href="http://ec.custeel.com/client/news/newsBrowse.jsp?timeNumber='+arr[i].number+'" target="_blank" title="'+arr[i].title+'">'+arr[i].title+'</a></li>'
					}else{
						str+= '<li><a href="http://ec.custeel.com/home/member/login.html" target="_blank" title="'+arr[i].title+'">'+arr[i].title+'</a></li>'
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
			 error:function(request,a,b) {  
				console("数据失败");  
			 }  
		})
	}
	catch(err){
		console.log(err);
	} 

	// 第二栏 采购动态
	$('.noTice  span.noTiceTab').on('click',function(){
		// tab切换
		$(this).addClass('active').siblings().removeClass('active');
		if($(this).index()==0){
			$('.noTice .noTiceTabList').eq(0).addClass('show').siblings().removeClass('show');
		}
		else{
			$('.noTice .noTiceTabList').eq(1).addClass('show').siblings().removeClass('show');
		}
		
	})
	try{
		$.ajax({
			type: "get",  
			url: "http://cgmn.custeel.com/cgnews.mv?method=getEcnews&str=7,1002001",
			 dataType:"jsonp",   
			 jsonp:'callback',  
			success:function(data) {  
				// console.log('采购动态',data.data);
				var arr =[];
				arr = data.data;
				var str = '';
				for(var i = 0;i<arr.length;i++){
					// console.log('arr[i].viewUser',arr[i].viewUser)
					if(arr[i].viewUser==0){
						// 跳转详情页面
						str += '<a href="./announcementDetail.html?number='+arr[i].number+'" target="_blank" title="'+arr[i].title+'"><span>'+(i+1)+'</span>'+
									'<span>'+arr[i].title+'</span>'+
									'<span>'+arr[i].pushdate+'</span>'+
								'</a>';
					}else{
						// 跳转登录界面
						str +='<a href="http://ec.custeel.com/home/member/login.html" target="_blank" title="'+arr[i].title+'"><span>'+(i+1)+'</span>'+
									'<span>'+arr[i].title+'</span>'+
									'<span>'+arr[i].pushdate+'</span>'+
								'</a>';
					}
				}
				// $('.noTice .tab1 table tbody').empty();
				$('.noTice .tab1 .listBody').prepend(str);
			 },  
			 error:function(request,a,b) {  
				console("数据失败");  
			 }  
		})
	}
	catch(err){
		console.log(err);
	}

	// 招标公告
	try{
		$.ajax({
			type: "get",  
			url: "http://cgmn.custeel.com/cgnews.mv?method=getEcnews&str=7,1002001,1002003,1002004,1002005",
			 dataType:"jsonp",   
			 jsonp:'callback',  
			success:function(data) {  
				// console.log('招标公告',data.data);
				var arr =[];
				arr = data.data;
				var str = '';
				for(var i = 0;i<arr.length;i++){
					// console.log('arr[i].viewUser',arr[i].viewUser)
					if(arr[i].viewUser==0){
						// 跳转详情页面
						str += '<a href="./announcementDetail.html?number='+arr[i].number+'" target="_blank" title="'+arr[i].title+'"><span>'+(i+1)+'</span>'+
									'<span>'+arr[i].title+'</span>'+
									'<span>'+arr[i].pushdate+'</span>'+
								'</a>';
					}else{
						// 跳转登录界面
						str += '<a href="http://ec.custeel.com/home/member/login.html" target="_blank" title="'+arr[i].title+'"><span>'+(i+1)+'</span>'+
									'<span>'+arr[i].title+'</span>'+
									'<span>'+arr[i].pushdate+'</span>'+
								'</a>';
					}
				}
				// $('.noTice .tab1 table tbody').empty();
				$('.noTice .tab2 .listBody').prepend(str);
			 },  
			 error:function(request,a,b) {  
				console("数据失败");  
			 }  
		})
	}
	catch(err){
		console.log()
	}

	// 中标公告
	try{
		$.ajax({
			type: "get",  
			url: "http://cgmn.custeel.com/cgnews.mv?method=getEcnews&str=7,1002002",
			 dataType:"jsonp",   
			 jsonp:'callback',  
			success:function(data) {  
				// console.log('中标公告',data.data);
				var arr =[];
				arr = data.data;
				var str = '';
				for(var i = 0;i<arr.length;i++){
					// console.log('arr[i].viewUser',arr[i].viewUser)
					if(arr[i].viewUser==0){
						// 跳转详情页面
						str += '<a href="./announcementDetail.html?number='+arr[i].number+'" target="_blank" title="'+arr[i].title+'"><span>'+(i+1)+'</span>'+
									'<span>'+arr[i].title+'</span>'+
									'<span>'+arr[i].pushdate+'</span>'+
								'</a>';
					}else{
						// 跳转登录界面
						str +='<a href="http://ec.custeel.com/home/member/login.html" target="_blank" title="'+arr[i].title+'"><span>'+(i+1)+'</span>'+
									'<span>'+arr[i].title+'</span>'+
									'<span>'+arr[i].pushdate+'</span>'+
								'</a>';
					}
				}
				// $('.noTice .tab1 table tbody').empty();
				$('.publicity .publicitybList .listBody ').prepend(str);
			 },  
			 error:function(request,a,b) {  
				console("数据失败");  
			 }  
		})
	}
	catch(err){
		console.log(err);
	}

	// 标书信息
	try{
		$.ajax({
			type: "get",  
			url: "http://cgmn.custeel.com//cgnews.mv?method=getCgbids&status=0&rows=13",
			 dataType:"jsonp",   
			 jsonp:'callback',  
			success:function(data) {  
				// console.log('标书信息',data.data);
				var arr =[];
				arr = data.data;
				var str = '';
				for(var i = 0;i<arr.length;i++){
					// console.log('arr[i].viewUser',arr[i].viewUser)
					// 跳转详情页面
					str += '<a href="javascript:;" title="'+arr[i].eqname+'"><span>'+arr[i].eqname+'</span>'+
									'<span>'+arr[i].cname+'</span>'+
									'<span>'+arr[i].putdate+'</span>'+
								'</a>';
				}
				// $('.noTice .tab1 table tbody').empty();
				$('.tenderInformation .tenderInformationList .listBody').prepend(str);
			 },  
			 error:function(request,a,b) {  
				console("数据失败");  
			 }  
		})
	}
	catch(err){
		console.log(err);
	}
