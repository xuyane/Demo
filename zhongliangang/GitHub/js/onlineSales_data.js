$(function () {
	//取一年数据
	function begintime() {
		var myDate = new Date;
		var year = myDate.getFullYear() - 1; //获取当前年
		var yue = myDate.getMonth() + 1; //获取当前月
		var date = myDate.getDate(); //获取当前日
		return year + '-' + yue + '-' + date;
	}

	// 走势图图表数据渲染
	function getchart(char_dom, begintime, title, obj, fun) {
		var dom = document.getElementById(char_dom);
		var myChart = echarts.init(dom);
		var zhibiao = [];
		var zhibiao_name = []
		for (var key in obj) {
			zhibiao.push(key)
			zhibiao_name.push(obj[key])
		}
		jQuery.ajax({
			dataType: "jsonp",
			timeout: "20000",
			async: !1,
			url: "https://mysteelapi.steelphone.com/tpl/zhanting_data.html?indexCodes=" + zhibiao.toString() + "&startTime=" + begintime,
			success: function (data) {
				option = null;
				option = {
					title: {
						text: title,
						left: 'center',
						textStyle: {
							color: '#333',
							fontWeight: 'normal',
							fontSize: '16'
						}
					},
					grid: {
						x: 40, //左
						y: 40, //上
						x2: 10, //右
						y2: 65 //下
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'line'
						}
					},
					graphic: [{
						type: 'image',
						id: 'logo',
						right: 110,
						top: 110,
						z: -10,
						bounding: 'raw',
						origin: [75, 75],
						style: {
							image: '//a.mysteelcdn.com/common/meitan/images/logo.png',
							width: 103,
							height: 59,
							opacity: 0.2
						}
					}],
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
						x: 'center',
						bottom: '0', //9.5  12.5 15.5
						data: zhibiao_name
					}
				};
				if (fun) {
					fun(data)
				}
				for (i = 0; i < data.datas.length; i++) {
					option.series.push({
						name: zhibiao_name[i],
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
					})
				}
				myChart.setOption(option, true);
			},
			error: function () {
				$(dom).html('<p style="text-align: center;line-height: 100px;">暂无数据，请稍后重试</p>');
			}
		})
	}
	$(function () {
		getchart("marketEchart6", begintime(), "水泥指数变化趋势图", {
			"BM_0000403253": "水泥指数"
		})
		ljmZstChart();
		pcmZstChart();
		wymZstChart();
		dlmZstChart();
	})

	function ljmZstChart() {
		getchart(
			'marketEchart7',
			'2017-03-27',
			'炼焦煤价格走势图', {
				'CA_0001111466': '吕梁',
				'CA_0001400242': '济宁',
				'CA_0001605141': '澳洲',
				'CA_0001605144': '蒙古国'
			}
		);
	}

	function pcmZstChart() {
		getchart(
			'marketEchart8',
			'2014-07-08',
			'喷吹煤价格走势图', {
				'CA_0000103056': '晋城',
				'CA_0000306455': '石嘴山',
				'CA_0000103045': '永城',
				'CA_0000106153': '俄罗斯(A10V10)'
			}
		);
	}

	function dlmZstChart() {
		getchart(
			'marketEchart9',
			'2014-01-01',
			'动力煤价格走势图', {
				'CA_0000065751': '秦皇岛港Q5500',
				'CA_0000306440': '鄂尔多斯Q5500',
				'CA_0001740619': '榆林Q6000',
				'CA_0000105766': '广州港Q3800'
			},
			function () {
				option.legend.bottom = 0,
					option.legend.itemGap = 5,
					option.grid.y2 = 90
			}
		);
	}

	function wymZstChart() {
		getchart(
			'marketEchart10',
			'2016-04-18',
			'无烟煤价格走势图', {
				'CA_0000191984': '晋城(洗小块)',
				'CA_0001111478': '石嘴山(洗中块)',
				'CA_0000191949': '永城(洗小块)'
			}
		);
	}
	// 平台公告开始
	$.ajax({
		type: "get",
		url: api+"/cgnews.mv?method=getEcnews&str=10,1001001",
		dataType: "jsonp",
		jsonp: 'callback',
		success: function (data) {
			console.log(data);
			var arr = data.data;
			var str = '';
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].viewUser == 0) {
					// 跳转详情页面
					str += '<li><a href="./announcementDetail.html?number=' + arr[i].number + '" target="_blank" title="' + arr[i].title + '">' + arr[i].title + '</a></li>'
				} else {
					str += '<li><a href="http://ec.custeel.com/home/member/login.html" target="_blank" title="' + arr[i].title + '">' + arr[i].title + '</a></li>'
				}
			}
			$('.marquee_slide_div ul').empty();
			$('.marquee_slide_div ul').prepend(str);
			$('.marquee_slide_div').slide({
				mainCell: ".list",
				autoPlay: true,
				effect: "leftLoop",
				vis: 5,
				interTime: 1500
			});
		},
		error: function (request, a, b) {
			console("数据加载失败");
		}
	})
	// 平台公告结束
	$('.info_data .imgLoad1').addClass('show');
	// 营销快讯开始
	$.ajax({
		url: api + "/cgnews.mv?method=getEcnews",
		dataType: 'jsonp',
		type: "GET",
		data: {
			str: '7,1002005'
		},
		jsonp: 'callback',
		success: function (data) {
			console.log('data1', data, data.data.length)
			var html = ''
			if (data.errorCode == 0) {
				for (var i = 0; i < data.data.length; i++) {
					var viewUser = data.data[i].viewUser;
            var href = '';
            if(viewUser == 0){
              href = './announcementDetail.html?number=' + data.data[i].number;
            }else{  
              href = 'http://ec.custeel.com/home/member/login.html';
            }
					html += '<li><a target="_blank" href="'+href+'"><span class="name">' + (i + 1) + '</span><span class="new">' + data.data[i].title + '</span><span class="date">' + data.data[i].pushdate + '</span></a></li>'
				}
				$('.info_data .imgLoad1').removeClass('show');
				$('#info_data_ul').html(html);
			}
		},
		error: function (request, a, b) {
			console("数据加载失败");
		}
	});
	// 营销快讯结束

	// 最新资源开始
	$('.sales_body .imgLoad2').addClass('show');
	$.ajax({
		url: api + "/cgnews.mv?method=getCgbids",
		dataType: 'jsonp',
		type: "GET",
		data: {
			status: 1,
			rows: 10
		},
		jsonp: 'callback',
		success: function (data) {
			console.log('data111', data);
			var html = '';
			if (data.errorCode == 0) {
				for (var i = 0; i < data.data.length; i++) {
					var eqname = data.data[i].eqname || '-';
					var mrial = data.data[i].mrial || '-';
					var noness = data.data[i].noness || '-';
					var bidAmount = data.data[i].bidAmount || '-';
					var constock = data.data[i].constock || '-';
					var statusS = data.data[i].statusS || '-';
					var cname = data.data[i].cname || '-';
					html += '<li><span class="name">' + eqname + '</span><span class="material">' + mrial + '</span><span class="specifications">' + noness + '</span><span class="weight">' + bidAmount + '</span><span class="stock">' + constock + '</span><span class="state">' + statusS + '</span><span class="Manufactor" title=' + cname + '>' + cutString(cname, 20) + '</span><span class="order"><a href="http://ec.custeel.com/home/member/login.html" target="_blank">订购</a></span></li>'
				}
				$('.sales_body .imgLoad2').removeClass('show');
				$('#sales_body_ul').html(html);
			}
		},
		error: function (request, a, b) {
			console("数据加载失败");
		}
	});
	// 最新资源结束
	function cutString(str, len) {
		if (str.length * 2 <= len) {
			return str;
		}
		var strlen = 0;
		var s = "";
		for (var i = 0; i < str.length; i++) {
			s = s + str.charAt(i);
			if (str.charCodeAt(i) > 128) {
				strlen = strlen + 2;
				if (strlen >= len) {
					return s.substring(0, s.length - 1) + "...";
				}
			} else {
				strlen = strlen + 1;
				if (strlen >= len) {
					return s.substring(0, s.length - 2) + "...";
				}
			}
		}
		return s;
	}
	// 最新竞卖开始
	$('.a_bottom .imgLoad3').addClass('show');
	$.ajax({
		url: api + "/cgnews.mv?method=getBidsAlls",
		dataType: 'jsonp',
		type: "GET",
		data: {
			sFlag: 9,
			pageSize: 3
		},
		jsonp: 'callback',
		success: function (data) {
			// console.log('data111竞卖', data, data.data.list);
			var html = '';
			if (data.errorCode == 0) {
				for (var i = 0; i < data.data.list.length; i++) {
					console.log('1', data.data.list[i].statusFlag);
					if (data.data.list[i].statusFlag == -1) {
						html += '<li><a href="markList.html?cname=' + data.data.list[i].mainId + '" target="_blank"><p class="a_left"><img src="./image/jingmai.png" alt=""></p><div class="a_right"><p>' + data.data.list[i].bname + '</p><p title="'+data.data.list[i].cname+'">' + cutString(data.data.list[i].cname,30) + '</p><p>开始时间：' + data.data.list[i].bsTime + '</p><p>结束时间：' + data.data.list[i].bsTime + '</p></div></a></li>'
					}
					if (data.data.list[i].statusFlag == 0) {
						html += '<li><a href="markList.html?cname=' + data.data.list[i].mainId + '" target="_blank"><p class="a_left"><img src="./image/jingmai.png" alt=""></p><div class="a_right"><p>' + data.data.list[i].bname + '</p><p title="'+data.data.list[i].cname+'">' + cutString(data.data.list[i].cname,30) + '</p><p class="color">进行中</p><p>结束时间：：' + data.data.list[i].bsTime + '</p></div></a></li>'
					}
					if (data.data.list[i].statusFlag == 1) {
						html += '<li><a href="markList.html?cname=' + data.data.list[i].mainId + '" target="_blank"><p class="a_left"><img src="./image/jingmai.png" alt=""></p><div class="a_right"><p>' + data.data.list[i].bname + '</p><p title="'+data.data.list[i].cname+'">' + cutString(data.data.list[i].cname,30) + '</p><p>结束时间：' + data.data.list[i].bsTime + '</p><p class="color">已结束</p></div></a></li> '
					}
				}
				$('.a_bottom .imgLoad3').removeClass('show');
				$('#a_bottom_data').html(html);
			}
		},
		error: function (request, a, b) {
			console("数据加载失败");
		}
	});
	// 最新竞卖结束
	function cutString(str, len) {
		if (str.length * 2 <= len) {
			return str;
		}
		var strlen = 0;
		var s = "";
		for (var i = 0; i < str.length; i++) {
			s = s + str.charAt(i);
			if (str.charCodeAt(i) > 128) {
				strlen = strlen + 2;
				if (strlen >= len) {
					return s.substring(0, s.length - 1) + "...";
				}
			} else {
				strlen = strlen + 1;
				if (strlen >= len) {
					return s.substring(0, s.length - 2) + "...";
				}
			}
		}
		return s;
	}
})