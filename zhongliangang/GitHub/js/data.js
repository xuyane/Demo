
var dom = document.getElementById("marketEchart1");
var myChart = echarts.init(dom);
var app = {};
Date.prototype.dateformat = function(t) {
    var e = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var a in e)
        new RegExp("(" + a + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[a] : ("00" + e[a]).substr(("" + e[a]).length)));
    return t
}

// jQuery('.loading').show()
jQuery('#marketEchart1').hide()
//插入字符方法
function insert(str, flg, sn) {
	var start = str.substr(0, sn);
	var end = str.substr(sn, str.length);
	var newstr = start + flg + end;
	return newstr;
}

//字符串去重排序
Array.prototype.unique3 = function() {
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++) {
		if(!json[this[i]]) {
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res.sort(function(a, b) {
		return a - b
	});
}
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}

//初始状态默认显示条件
var prames_num = 0

var href = 'https://index.mysteel.com/newprice/getChartMultiCity.ms'
var beginTime = new Date();
	beginTime.setFullYear(beginTime.getFullYear()-1);
var startTime = beginTime.dateformat("yyyy-MM-dd")
var endTime = (new Date()).dateformat("yyyy-MM-dd")


var catalog = encodeURI('螺纹钢_:_螺纹钢')        				//品种
var city = encodeURI('上海,北京,广州')							//城市
var spec = encodeURI('HRB400 20MM_:_HRB400_20MM')			//规格
var cityarr = ''
//根据传参跳转
href = getUrlParam('href')||href;							//接口传参
startTime = getUrlParam('startTime')||startTime;			//起始时间
endTime = getUrlParam('endTime')||endTime;					//结束时间
//$('#sStartTime1').val(startTime)							//默认时间
//$('#sEndTime1').val(endTime)								//默认时间

// catalog = getUrlParam('catalog')||catalog;					//品种
// city = getUrlParam('city')||city;							//城市
// //multiCitySelect.bindValue(decodeURI(catalog),decodeURI(spec),decodeURI(city)) //默认被选中
// if(href == 0){ 
// 	href = 'https://index.mysteel.com/newprice/getChartMultiCity.ms'  	//同品种一个或多个城市走势图
// 	spec = encodeURI(decodeURIComponent(getUrlParam('spec')))||spec;	//规格
// 	$('#sStartTime1').val(startTime)
// 	$('#sEndTime1').val(endTime)
// 	multiCitySelect.bindValue(decodeURI(catalog),decodeURI(spec),decodeURI(city))
// }else if(href == 1){
// 	href = 'https://index.mysteel.com/newprice/getChartMultiCatalog.ms' //同城市一个或多个品种走势图
// 	spec = encodeURI(decodeURIComponent(getUrlParam('spec')));	//规格
// //	console.log(decodeURI(catalog))
// //	console.log(spec)
// 	$('#sStartTime2').val(startTime)
// 	$('#sEndTime2').val(endTime)
// 	multiCatalogSelect.bindValue(decodeURI(city),decodeURI(catalog),decodeURI(spec))
// }

//console.log(decodeURI(catalog))
//console.log(spec)
//console.log(href)
//console.log(startTime)
//console.log(endTime)
//console.log(decodeURI(catalog))
//console.log(decodeURI(city))
//console.log(decodeURI(spec))

//multiCitySelect.bindValue('螺纹钢_:_螺纹钢','HRB400 20MM_:_HRB400_20MM','上海,北京,广州')

//同品种一个或多个城市走势图
// jQuery('.leftBar .searchButton').click(function() {
	
// 	jQuery('.loading').show()
// 	href = 'https://index.mysteel.com/newprice/getChartMultiCity.ms'
// 	cityarr = '',
// 	startTime = jQuery('#sStartTime1').val() //开始时间参数
// 	endTime = jQuery('#sEndTime1').val() //结束时间参数
	
// 	$('#sStartTime1').val(startTime)
// 	$('#sEndTime1').val(endTime)
	
// 	catalog = encodeURI(jQuery('#catalog1').val()) //品种参数
// 	spec = encodeURI(jQuery('#spec1').val()) //规格材质参数
// 	jQuery.each(jQuery('#csDiv input:checkbox'), function() {
// 		if(this.checked) {
// 			cityarr += jQuery(this).val().toString() + ','
// 		}
// 	});
// 	cityarr = cityarr.substring(0, cityarr.lastIndexOf(','))
// 	city = encodeURI(cityarr) //所选城市参数
// 	if(checkFrm1() == true) { //验证1 通过
// 		getchart(href, catalog, city, spec, startTime, endTime)
// 	}else{
// 		jQuery('.loading').hide()
// 	}

// })

//同城市一个或多个品种走势图
// jQuery('.rightBar .searchButton').click(function() {
	
// 	jQuery('.loading').show()
// 	var href = 'https://index.mysteel.com/newprice/getChartMultiCatalog.ms'
// 	catalog = ''
// 	spec = ''
// 	startTime = jQuery('#sStartTime2').val() //开始时间参数
// 	endTime = jQuery('#sEndTime2').val() //结束时间参数
// 	$('#sStartTime2').val(startTime)
// 	$('#sEndTime2').val(endTime)
	
// 	city = encodeURI(jQuery('#citySel').val()) //所选城市参数
// 	//循环品种
// 	jQuery.each(jQuery('#pzDiv>input:checkbox'), function() {
// 		if(this.checked) {
// 			catalog += jQuery(this).val().toString() + ','
// 		}
// 	});
// 	catalog = catalog.substring(0, catalog.lastIndexOf(','))
// //	console.log(catalog)
// 	catalog = encodeURI(catalog) //品种参数
// 	//循环规格
// 	jQuery.each(jQuery('#pzDiv>div>input:checkbox'), function() {
// 		if(this.checked) {
// //			console.log(jQuery(this).val().toString())
// 			spec += jQuery(this).val().toString() + ','
// 		}
// 	});
// //	console.log(spec)
// 	spec = spec.substring(0, spec.lastIndexOf(','))
// //	console.log(spec)
// 	spec = encodeURI(spec) //规格材质参数

// 	if(checkFrm2() == true) { //验证2 通过
// //		console.log(decodeURI(catalog))
// //		console.log(decodeURI(city))
// //		console.log(decodeURI(spec))
// 		getchart(href, catalog, city, spec, startTime, endTime)
// 	}else{
// 		jQuery('.loading').hide()
// 	}

// })
getchart(href, catalog, city, spec, startTime, endTime) //数据默认渲染

//数据渲染函数
function getchart(href, catalog, city, spec, startTime, endTime) {
	jQuery.ajax({
		dataType: "jsonp", 
		timeout: "20000",  
		async: !1,  
		jsonpCallback: 'callback',  
		type: 'POST',  
		url:href ,  
		data:{   
		  	catalog : catalog,  
		  	city : city,  
		  	spec : spec,   
		  	startTime : startTime,   
		  	endTime : endTime  
		},   
		success: function(data) { 
//			console.log(data)  
//			console.log(this.url)   
			if(data.data.length == '0') {   
				jQuery('.amition').show()  
				jQuery('.loading').hide()   
				jQuery('#marketEchart1').hide()   
				jQuery('.error').hide()   
			} else {     
				// jQuery('.amition').hide() 
				// jQuery('#marketEchart1').show() 
				// jQuery('.error').hide() 
				function timedate() { //日期数据 取最大数据渲染横坐标 防止数据遗漏渲染报错 
					var timearr = [] 
					var bigtime = [] 
					for(var i = 0; i < data.data.length; i++) { 
						for(var j = 0; j < data.data[i].dateValueMap.length; j++) { 
 
							if(data.data[i].dateValueMap[j].date !== undefined) { 
								timearr.push(data.data[i].dateValueMap[j].date) 
							}

						}
					}

					return timearr.toString().replace(/-/g, '').split(',').unique3() //将时间轴去重排序
				}

				function valdate(n) { //渲染数据函数
					var valarr = []

					for(var i = 0; i < timedate().length; i++) { //for循环进行数据处理
						if(data.data[n].dateValueMap[i] == undefined || data.data[n].dateValueMap[i].date.replace(/-/g, '') !== timedate()[i]) { //该日期没数据 ，将该日期对应的数据填空
							data.data[n].dateValueMap.splice(i, 0, {
								date: timedate()[i],
								value: ''
							})
						}
						valarr.push(data.data[n].dateValueMap[i].value) //取出第n个数组的数放到valarr中
					}
					return valarr
				}
				option = null;
				option = {
					title: {
						text: data.title,
						left: 'center',
						textStyle:{
							color :'#333',
							fontWeight :'normal',
							fontSize :'16'
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'line'
						}
					},
					grid:{
						x:40,  //左
						y:40,  //上
						x2:10, //右
						y2:65  //下
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
						data: timedate(),
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
					// dataZoom: [ //收缩插件
					// 	{ //横向
					// 		type: 'inside',
					// 		start: 0,
					// 		end: 100
					// 	},
					// 	{
					// 		show: true, //纵向
					// 		type: 'slider',
					// 		y: '90%',
					// 		start: 50,
					// 		end: 100
					// 	}
					// ],
					series: [],
					legend: {
						orient: 'horizontal', //水平排列
						bottom: '9.5%', //9.5  12.5 15.5
						data: []
					}

				};
				//			console.log(data.data.length)
				for(i = 0; i < data.data.length; i++) {
//					console.log(data.data[i].lineName)
					option.legend.data[i] = data.data[i].lineName
					option.series.push({
						name: data.data[i].lineName,
						type: 'line',
						//          data: calculateMA(5),
						data: valdate(i),
						smooth: true,
						symbolSize: 1, //坐标点的大小
						//          symbol: 'none',
						connectNulls: true,
						lineStyle: {
							normal: {
								opacity: 0.9
							}
						}
					})
				}

				myChart.setOption(option, true);
				jQuery('.loading').hide()

			}
		},
		error: function() {
			// jQuery('.error').show()
			// jQuery('.loading').hide()
			jQuery('#marketEchart1').hide()
			// jQuery('.amition').hide()
		}
	})
}