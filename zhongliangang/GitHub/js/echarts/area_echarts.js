var geoCoordMap = {};
$.getJSON('http://192.168.20.20:8099/project-2019/zhongliangang/js/echarts/map.json', function (data) {
	$.each(data, function (infoIndex, info) {
		var city = info.children;
		for (var i = 0; i < city.length; i++) {
			var citydetail = new Array();
			var name = city[i].name;
			
			var lat = parseFloat(city[i].lat);
			var log = parseFloat(city[i].log);
			
			citydetail.push(log);
			citydetail.push(lat);
			geoCoordMap[name] = citydetail;
		}
	})
	console.log('geoCoordMap',geoCoordMap)
	map_1_option.series[0].data = convertData(data2.sort(function (a, b) {
			return b.value - a.value;
		})),
		/*            }).slice(0, 6)),
		 */
	console.log(map_1_option.series[0].data)
		map_1.setOption(map_1_option);
});
var data2 = [
	{name: '芜湖', value: 1170},
    {name: '唐山', value: 1190},
    {name: '平顶山', value: 1190},
    {name: '邢台', value: 1190},
    {name: '德州', value: 1200},
    {name: '济宁', value: 1200},
    {name: '荆州', value: 1270},
    {name: '宜昌', value: 1300},
    {name: '义乌', value: 1320},
    {name: '丽水', value: 1330},
    {name: '洛阳', value: 1340},
    {name: '秦皇岛', value: 1360},
    {name: '株洲', value: 1430},
    {name: '石家庄', value: 1470},
    {name: '莱芜', value: 1480},
    {name: '常德', value: 1520},
    {name: '保定', value: 1530},
    {name: '湘潭', value: 1540},
    {name: '金华', value: 1570},
    {name: '岳阳', value: 1690},
    {name: '长沙', value: 1750},
    {name: '衢州', value: 1770},
    {name: '廊坊', value: 1930},
    {name: '菏泽', value: 1940},
    {name: '合肥', value: 2290},
    {name: '武汉', value: 2730},
    {name: '大庆', value: 2790}
];
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
//地图容器
var map_1 = echarts.init(document.getElementById('main'));
//地图容器
//34个省、市、自治区的名字拼音映射数组


//网络零售当期分布
var map_1_option = {

	/*    title: {
	        text: '全国主要城市空气质量',
	        subtext: 'data from PM25.in',
	        left: 'center',
	        textStyle: {
	            color: '#fff'
	        }
	    },*/
	tooltip: {
		trigger: 'item'
	},
	geo: {
		map: 'china',
		label: {
			emphasis: {
				show: false
			}
		},
		roam: false,
		itemStyle: {
			normal: {
				areaColor: '#D3EDFA',
				borderColor: '#064f85',
			},
			emphasis: {
				areaColor: '#D3EDFA'
			}
		}
	},

	series: [{
		name: '成交值',
		type: 'effectScatter',
		coordinateSystem: 'geo',
		data: data2,
		symbolSize: function (val) {
			return val[2] / 100;
		},
		showEffectOn: 'render',
		rippleEffect: {
			brushType: 'stroke'
		},
		hoverAnimation: true,
		itemStyle: {
			normal: {
				color: '#F7A71F',
				shadowBlur: 5,
				shadowColor: '#333'
			}
		}
	},
	
 ]
};

