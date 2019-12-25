function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
var isShowTip = getUrlParam('isShowTip')
if(isShowTip) {
	$('.tab-top').show()
	$('.lab-left').show()
} else {
	$('.tab-top').hide()
	$('.lab-left').hide()
}
var IntervalId;
var dom = document.getElementById("container");
var myChart = echarts.init(dom);

$('#container').click(function() {
	$(parent)[0].postMessage({
		title: '产销存变化情况',
		path: 'map/index.html?isShowTip=1'
	}, mainHost);
});

var app = {};
option = null;
var geoCoordMap = {
	"海门": [121.15, 31.89],
	"鄂尔多斯": [109.781327, 39.608266],
	"招远": [120.38, 37.35],
	"舟山": [122.207216, 29.985295],
	"齐齐哈尔": [123.97, 47.33],
	"盐城": [120.13, 33.38],
	"赤峰": [118.87, 42.28],
	"青岛": [120.33, 36.07],
	"乳山": [121.52, 36.89],
	"金昌": [102.188043, 38.520089],
	"泉州": [118.58, 24.93],
	"莱西": [120.53, 36.86],
	"日照": [119.46, 35.42],
	"胶南": [119.97, 35.88],
	"南通": [121.05, 32.08],
	"拉萨": [91.11, 29.97],
	"云浮": [112.02, 22.93],
	"梅州": [116.1, 24.55],
	"文登": [122.05, 37.2],
	"上海": [121.48, 31.22],
	"攀枝花": [101.718637, 26.582347],
	"威海": [122.1, 37.5],
	"承德": [117.93, 40.97],
	"厦门": [118.1, 24.46],
	"汕尾": [115.375279, 22.786211],
	"潮州": [116.63, 23.68],
	"丹东": [124.37, 40.13],
	"太仓": [121.1, 31.45],
	"曲靖": [103.79, 25.51],
	"烟台": [121.39, 37.52],
	"福州": [119.3, 26.08],
	"瓦房店": [121.979603, 39.627114],
	"即墨": [120.45, 36.38],
	"抚顺": [123.97, 41.97],
	"玉溪": [102.52, 24.35],
	"张家口": [114.87, 40.82],
	"阳泉": [113.57, 37.85],
	"莱州": [119.942327, 37.177017],
	"湖州": [120.1, 30.86],
	"汕头": [116.69, 23.39],
	"昆山": [120.95, 31.39],
	"宁波": [121.56, 29.86],
	"湛江": [110.359377, 21.270708],
	"揭阳": [116.35, 23.55],
	"荣成": [122.41, 37.16],
	"连云港": [119.16, 34.59],
	"葫芦岛": [120.836932, 40.711052],
	"常熟": [120.74, 31.64],
	"东莞": [113.75, 23.04],
	"河源": [114.68, 23.73],
	"淮安": [119.15, 33.5],
	"泰州": [119.9, 32.49],
	"南宁": [108.33, 22.84],
	"营口": [122.18, 40.65],
	"惠州": [114.4, 23.09],
	"江阴": [120.26, 31.91],
	"蓬莱": [120.75, 37.8],
	"韶关": [113.62, 24.84],
	"嘉峪关": [98.289152, 39.77313],
	"广州": [113.23, 23.16],
	"延安": [109.47, 36.6],
	"太原": [112.53, 37.87],
	"清远": [113.01, 23.7],
	"中山": [113.38, 22.52],
	"昆明": [102.73, 25.04],
	"寿光": [118.73, 36.86],
	"盘锦": [122.070714, 41.119997],
	"长治": [113.08, 36.18],
	"深圳": [114.07, 22.62],
	"珠海": [113.52, 22.3],
	"宿迁": [118.3, 33.96],
	"咸阳": [108.72, 34.36],
	"铜川": [109.11, 35.09],
	"平度": [119.97, 36.77],
	"佛山": [113.11, 23.05],
	"海口": [110.35, 20.02],
	"江门": [113.06, 22.61],
	"章丘": [117.53, 36.72],
	"肇庆": [112.44, 23.05],
	"大连": [121.62, 38.92],
	"临汾": [111.5, 36.08],
	"吴江": [120.63, 31.16],
	"石嘴山": [106.39, 39.04],
	"沈阳": [123.38, 41.8],
	"苏州": [120.62, 31.32],
	"茂名": [110.88, 21.68],
	"嘉兴": [120.76, 30.77],
	"长春": [125.35, 43.88],
	"胶州": [120.03336, 36.264622],
	"银川": [106.27, 38.47],
	"张家港": [120.555821, 31.875428],
	"三门峡": [111.19, 34.76],
	"锦州": [121.15, 41.13],
	"南昌": [115.89, 28.68],
	"柳州": [109.4, 24.33],
	"三亚": [109.511909, 18.252847],
	"自贡": [104.778442, 29.33903],
	"吉林": [126.57, 43.87],
	"阳江": [111.95, 21.85],
	"泸州": [105.39, 28.91],
	"西宁": [101.74, 36.56],
	"宜宾": [104.56, 29.77],
	"呼和浩特": [111.65, 40.82],
	"成都": [104.06, 30.67],
	"大同": [113.3, 40.12],
	"镇江": [119.44, 32.2],
	"桂林": [110.28, 25.29],
	"张家界": [110.479191, 29.117096],
	"宜兴": [119.82, 31.36],
	"北海": [109.12, 21.49],
	"西安": [108.95, 34.27],
	"金坛": [119.56, 31.74],
	"东营": [118.49, 37.46],
	"牡丹江": [129.58, 44.6],
	"遵义": [106.9, 27.7],
	"绍兴": [120.58, 30.01],
	"扬州": [119.42, 32.39],
	"常州": [119.95, 31.79],
	"潍坊": [119.1, 36.62],
	"重庆": [106.54, 29.59],
	"台州": [121.420757, 28.656386],
	"南京": [118.78, 32.04],
	"滨州": [118.03, 37.36],
	"贵阳": [106.71, 26.57],
	"无锡": [120.29, 31.59],
	"本溪": [123.73, 41.3],
	"克拉玛依": [84.77, 45.59],
	"渭南": [109.5, 34.52],
	"马鞍山": [118.48, 31.56],
	"宝鸡": [107.15, 34.38],
	"焦作": [113.21, 35.24],
	"句容": [119.16, 31.95],
	"北京": [116.46, 39.92],
	"徐州": [117.2, 34.26],
	"衡水": [115.72, 37.72],
	"包头": [110, 40.58],
	"绵阳": [104.73, 31.48],
	"乌鲁木齐": [87.68, 43.77],
	"枣庄": [117.57, 34.86],
	"杭州": [120.19, 30.26],
	"淄博": [118.05, 36.78],
	"鞍山": [122.85, 41.12],
	"溧阳": [119.48, 31.43],
	"库尔勒": [86.06, 41.68],
	"安阳": [114.35, 36.1],
	"开封": [114.35, 34.79],
	"济南": [117, 36.65],
	"德阳": [104.37, 31.13],
	"温州": [120.65, 28.01],
	"九江": [115.97, 29.71],
	"邯郸": [114.47, 36.6],
	"临安": [119.72, 30.23],
	"兰州": [103.73, 36.03],
	"沧州": [116.83, 38.33],
	"临沂": [118.35, 35.05],
	"南充": [106.110698, 30.837793],
	"天津": [117.2, 39.13],
	"富阳": [119.95, 30.07],
	"泰安": [117.13, 36.18],
	"诸暨": [120.23, 29.71],
	"郑州": [113.65, 34.76],
	"哈尔滨": [126.63, 45.75],
	"聊城": [115.97, 36.45],
	"芜湖": [118.38, 31.33],
	"唐山": [118.02, 39.63],
	"平顶山": [113.29, 33.75],
	"邢台": [114.48, 37.05],
	"德州": [116.29, 37.45],
	"济宁": [116.59, 35.38],
	"荆州": [112.239741, 30.335165],
	"宜昌": [111.3, 30.7],
	"义乌": [120.06, 29.32],
	"丽水": [119.92, 28.45],
	"洛阳": [112.44, 34.7],
	"秦皇岛": [119.57, 39.95],
	"株洲": [113.16, 27.83],
	"石家庄": [114.48, 38.03],
	"莱芜": [117.67, 36.19],
	"常德": [111.69, 29.05],
	"保定": [115.48, 38.85],
	"湘潭": [112.91, 27.87],
	"金华": [119.64, 29.12],
	"岳阳": [113.09, 29.37],
	"长沙": [113, 28.21],
	"衢州": [118.88, 28.97],
	"廊坊": [116.7, 39.53],
	"菏泽": [115.480656, 35.23375],
	"合肥": [117.27, 31.86],
	"武汉": [114.31, 30.52],
	"大庆": [125.03, 46.58],
	//增加的城市	
	"运城": [110.15, 35.49],
	'新乡': [116.402217, 35.311657],
	'若羌县': [88.17, 39.02],
	'东营': [118.7073, 37.5513],

};
var convertData = function(data) {
	var res = [];
	for(var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].name];
		if(geoCoord) {
			var difference = data[i].value - 100;
			res.push({
				name: data[i].name,
				value: geoCoord.concat(data[i].trip),
				price: data[i].value,
				upDown: data[i].upDown,
				richPrice: data[i].richPrice,
				richFreight: data[i].richFreight,
				trip: data[i].trip
			});
		}
	}
	return res;
};

function getEchart(type, material, standard, frequency) {
	$.ajax({
		type: "get",
		url: "http://192.168.202.149:8080/PriceMap/getList",
		data: {
			type: type || '',
			material: material || '',
			standard: standard || '',
			frequency: frequency || ''
		},
		async: true,
		success: function(result) {
			window.data = result.data
			option = {
				// backgroundColor: '#404a59',
				title: {
					text: '价格地图',
					// subtext: '钢联数据',
					//							sublink: 'http://www.pm25.in',
					left: isShowTip ? 'center' : '40%',
					top: isShowTip ? '100px' : '30px',
					textStyle: {
						color: '#50a3ba',
						fontSize: '19',
					}
				},
				tooltip: {
					padding: 0,
					enterable: true,
					transitionDuration: 1,
					textStyle: {
						color: '#000',
						decoration: 'none',
					},
					formatter: function(params) {
						if(typeof(params.value)[2] == "undefined") {
							return "";
						} else {
							var tipHtml = '';
							tipHtml = '<div style="width:400px;border-radius:5px;background:#fff;box-shadow:0 0 10px 5px #aaa">' +
								'    <div style="height:50px;width:100%;border-radius:5px;background:#F8F9F9;border-bottom:1px solid #F0F0F0">' +
								'        <span style="line-height:50px;margin-left:18px">' + params.data.name + "市" + '</span>' +
								'    </div>' +
								'    <div style="height:130px;width:100%;background:#fff">' +
								'        <div style="padding-left:18px;padding-top:14px">' +
								'            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
								'            <span>城市的理计价格</span>' +
								'            <span style="float:right;margin-right:18px">' + params.data.richPrice + '</span>' +
								'        </div>' +
								'        <div style="padding-left:18px;padding-top:14px">' +
								'            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
								'            <span>运费</span>' +
								'            <span style="float:right;margin-right:18px">' + params.data.richFreight + '</span>' +
								'        </div>' +
								'        <div style="padding-left:18px;padding-top:14px">' +
								'            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
								'            <span>理计价格-运费数值</span>' +
								'            <span style="float:right;margin-right:18px">' + params.data.trip + '</span>' +
								'        </div>' +

								'    </div>'
							'</div>';
							return isShowTip ? tipHtml : '';
						}
					}
				},
				legend: {
					orient: 'vertical',
					bottom: '30px',
					right: '30px',
					data: ['价格'],
					textStyle: {
						color: '#fff',
						fontSize: 16
					}
				},
				visualMap: [{
					min: 0,
					max: 450,
					splitNumber: 3,
					color: ['#d94e5d', '#eac736', '#50a3ba'],
					textStyle: {
						color: '#fff'
					},
					seriesIndex: [0, 1],
					left: "30px",
					bottom: '30px'
				}],
				geo: {
					map: 'china',
					//				      left: '10',
					//				       right: '10',
					center: isShowTip ? [] : [110, 38],
					zoom: 1, // 大小
					label: {
						emphasis: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							areaColor: '#323c48',
							borderColor: '#111'
						},
						emphasis: {
							areaColor: '#2a333d'
						}
					}
				},
				series: [{
						name: '价格',
						//散点（气泡）图
						type: 'scatter', //气泡
						//使用的坐标系，这里用的是“bmap” 即是百度地图
						//'cartesian2d'使用二维的直角坐标系（也称笛卡尔坐标系），通过 xAxisIndex, yAxisIndex指定相应的坐标轴组件。
						// 'polar'
						// 使用极坐标系，通过 polarIndex 指定相应的极坐标组件
						//'geo'  这个地理坐标系很强大的，但是你需要自己导入地图包，比如你是某个省的，你需要去找到某个省的geoJSON
						//使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
						coordinateSystem: 'geo',
						data: convertData(data),
						//								symbolSize: 12,
						symbolSize: function(val) {
							return val[2] / 30;
						},
						label: {
							normal: {
								show: false,
								formatter: function(params) {
									return params.data.name + '\n' + params.data.price + params.data.upDown;
								},
								position: 'right'
							},
							emphasis: {
								show: false
							}
						},

						itemStyle: {
							emphasis: {
								borderColor: '#fff',
								borderWidth: 1
							}
						}
					},
					//前5的则在点的右边显示名称 通过labler.show: true来控制显示出现
					{
						name: '价格',
						//带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
						type: 'effectScatter',
						coordinateSystem: 'geo',
						//帅选出前面5个点，然后进行对其增加涟漪特效
						//          data: convertData(data.sort(function(a, b) {
						//                  return b.value - a.value;
						//              }).slice(0, 5)),
						//						data: convertData(data),
						symbolSize: 20,
						//配置何时显示特效。
						//   可选：
						//'render' 绘制完成后显示特效。
						//'emphasis' 高亮（hover）的时候显示特效。
						showEffectOn: 'render',
						// 涟漪特效相关配置。
						rippleEffect: {
							// 波纹的绘制方式，可选 'stroke' 和 'fill'。
							brushType: 'stroke'
						},
						hoverAnimation: true,
						//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
						label: {
							normal: {
								show: true,
								formatter: function(params) {
									//console.log(params.data.name+'\n'+params.data.price+params.data.upDown)
									return params.data.name + '\n' + params.data.price + params.data.upDown;
								},
								position: 'right'
							},
							emphasis: {
								show: false
							}
						},
						itemStyle: {
							emphasis: {
								borderColor: '#fff',
								borderWidth: 1
							}
						}
					}
				]
			};
			if(option && typeof option === "object") {
				window.onresize = myChart.resize;
				myChart.setOption(option, true);
			}

			clearInterval(IntervalId);

			function showTip(params) {
				if(isShowTip) {
					$('.rightTip').hide()
					myChart.dispatchAction({
						type: 'showTip',
						seriesIndex: 0,
						dataIndex: index
					});
				} else {
					if(params) {
						$('.rightTip').show()
						$('.rightTip .tit').html(params.name + '：' + params.data.price + ' ' + params.data.upDown)
						$('.rightTip .richPrice').html(params.data.richPrice)
						$('.rightTip .richFreight').html(params.data.richFreight)
						$('.rightTip .trip').html(params.data.trip)
					} else {
						$('.rightTip').show()
						$('.rightTip .tit').html(convertData(data)[index].name + '：' + convertData(data)[index].price + ' ' + convertData(data)[index].upDown)
						$('.rightTip .richPrice').html(convertData(data)[index].richPrice)
						$('.rightTip .richFreight').html(convertData(data)[index].richFreight)
						$('.rightTip .trip').html(convertData(data)[index].trip)
					}
				}

				option.series[1].data = [convertData(data)[index]];
				myChart.setOption(option);
			}
			var index = 0; //播放所在下标
			IntervalId = setInterval(function() {
				if(index == data.length) index = 0;
				showTip()
				index++;
			}, 3000)
			myChart.on('mouseover', function(params) {
				console.log(params)
				if(params.componentType != "series") {
					return false;
				}
				clearInterval(IntervalId);
				showTip(params)
				option.series[1].data = [convertData(data)[params.dataIndex]];
				myChart.setOption(option);
			});
			//						
			myChart.on('mouseout', function(params) {
				IntervalId && clearInterval(IntervalId);
				IntervalId = setInterval(function() {
					if(index == data.length) index = 0;
					showTip()
					index++;
				}, 3000);
			});
		}
	});
}

function getTab() {
	$.ajax({
		type: "get",
		url: "//192.168.202.149:8080/PriceMap/getTypes",
		async: true,
		success: function(result) {
			if(result.status == 1) {
				navData = result.data
				var str = ''
				for(var i = 0; i < navData.length; i++) {
					var firstClass = i == 0 ? "active" : ""
					var type = navData[i].type ? navData[i].type : ""
					var material = navData[i].material ? navData[i].material : ""
					var standard = navData[i].standard ? navData[i].standard : ""
					str += '<li class="' + firstClass + '" data-type="' + type + '" data-material="' + material + '" data-standard="' + standard + '">' + (navData[i].type ? navData[i].type : '') + ' ' + (navData[i].material ? navData[i].material : '') + ' ' + (navData[i].standard ? navData[i].standard : '') + '</li>'
				}
				$('.tab-top').html(str)
			}
		}
	})
}
getTab()
getEchart()
$('body').on('click', '.tab-top li', function() {
	$('.tab-top li').removeClass('active')
	$(this).addClass('active')
	var type = $(this).data('type')
	var material = $(this).data('material')
	var standard = $(this).data('standard')
	var frequency = $('.lab-left li.active').data('frequency')
	getEchart(type, material, standard, frequency)
})
$('.lab-left li').click(function() {
	$('.lab-left li').removeClass('active')
	$(this).addClass('active')
	var type = $('.tab-top li.active').data('type')
	var material = $('.tab-top li.active').data('material')
	var standard = $('.tab-top li.active').data('standard')
	var frequency = $(this).data('frequency')
	getEchart(type, material, standard, frequency)
})