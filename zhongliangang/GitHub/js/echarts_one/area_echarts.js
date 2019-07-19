$.getJSON('/test/zhongliangang/js/echarts_one/map.json', function (data) {
// $.getJSON('/js/echarts_one/map.json', function (data) {
	$.each(data, function (infoIndex, info) {
		var city = info.children;
		for (var i = 0; i < city.length; i++) {
			var citydetail = new Array();
			var name = city[i].name;
			geoCoordMap[name] = citydetail;
			var lat = parseFloat(city[i].lat);
			var log = parseFloat(city[i].log);
			citydetail.push(log);
			citydetail.push(lat);
		}
	})
	map_1_option.series[0].data = convertData(data2.sort(function (a, b) {
			return b.value - a.value;
		})),
		/*            }).slice(0, 6)),
		 */
		map_1.setOption(map_1_option);
});

// 添加开始
var hT = 3600 * 1000;
var timeStepList = [
	{name: '0:00-6:00', start: 0, end: 6 * hT},
	{name: '6:00-8:00', start: 6 * hT, end: 8 * hT},
	{name: '8:00-10:00', start: 8 * hT, end: 10 * hT},
	{name: '10:00-12:00', start: 10 * hT, end: 12 * hT},
	{name: '12:00-14:00', start: 12 * hT, end: 14 * hT},
	{name: '14:00-16:00', start: 14 * hT, end: 16 * hT},
	{name: '16:00-18:00', start: 16 * hT, end: 18 * hT},
	{name: '18:00-0:00', start: 18 * hT, end: 24 * hT},
]
var currentTime = null;
var initSize = 6; // 初始大小
var radix = 2; // 基数


function getCurrentTime() {
	var timeStamp = +new Date;
  var zeroTime = +new Date(new Date().toLocaleDateString());
  console.log('timeStamp,zeroTime',timeStamp,zeroTime,new Date().toLocaleDateString());
	var current = timeStepList.filter(function(item, index) {
		if ( zeroTime + item.start <= timeStamp && timeStamp < zeroTime + item.end) {
			return true;
		}
		return false;
  });
  
	if (current) {
		currentTime = current[0];
  };
  // console.log('curent',current,currentTime)
}

function getDynamicSize(val) {
  // console.log('123',val);
	if (val && val.length) {
		!currentTime && getCurrentTime();
		if (currentTime && currentTime.name) {
			// 获取时间段activity
			/* 
				val 格式 【91.11, 29.97, {name:}, {name:}, {name:}】
			*/
			var ary = val.filter(function(item, index) {
				if (
					typeof item === 'object' &&
					item.name &&
					item.name === currentTime.name
				) {
					return true;
				}
			});
			if (ary) {
				var index = ary[0]['Activity'];
				var size = initSize + radix * index;
				size = Math.min(26, Math.max(6, size));
				// console.log(size);
				return size
			}
		}
	}
	return initSize;
}
// 添加结束

var geoCoordMap = {};
function renderItem(params, api) {
    var coords = [
        [116.7,39.53],
        [103.73,36.03],
        [112.91,27.87],
        [120.65,28.01],
        [119.57,39.95]
    ];
    var points = [];
    for (var i = 0; i < coords.length; i++) {
        points.push(api.coord(coords[i]));
    }
    var color = api.visual('color');

    return {
        type: 'polygon',
        shape: {
            points: echarts.graphic.clipPointsByRect(points, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            })
        },
        style: api.style({
            fill: color,
            stroke: echarts.color.lift(color)
        })
    };
}
var data2 = [
	
	{name:"石家庄",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"太原",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:1},
		{name:'8:00-10:00',Activity:2},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:3},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:5},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"济南",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:4},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:3},
		{name:'12:00-14:00',Activity:3},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"沈阳",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:4},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:4},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:3},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"上海",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"南京",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:3},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:3},
		{name:'18:00-0:00',Activity:4},
	]},
    {name:"北京",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:0},
		{name:'12:00-14:00',Activity:4},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:3},
		{name:'18:00-0:00',Activity:1},
	]},
    {name:"武汉",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:2},
		{name:'10:00-12:00',Activity:0},
		{name:'12:00-14:00',Activity:3},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:0},
	]},
    {name:"天津",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:0},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:2},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"南京",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:3},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:1},
	]},
    {name:"杭州",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:2},
	]},
    {name:"西安",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:3},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:3},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"长春",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:4},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:3},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:4},
	]},
    {name:"重庆",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:4},
		{name:'18:00-0:00',Activity:1},
	]},
    {name:"成都",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:4},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:1},
	]},
    {name:"长沙",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:2},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"郑州",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:4},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"合肥",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:1},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:2},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"哈尔滨",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:1},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:3},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"福州",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:2},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:4},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"广州",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:1},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:2},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"南昌",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:3},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:2},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"贵阳",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:2},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"昆明",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:4},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"呼和浩特",value:[
		{name:'0:00-6:00',Activity:6},
		{name:'6:00-8:00',Activity:1},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"海口",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:6},
		{name:'8:00-10:00',Activity:2},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:3},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"南宁",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:6},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:1},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"西宁",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:6},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"银川",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:1},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:6},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"乌鲁木齐",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:7},
		{name:'16:00-18:00',Activity:2},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"拉萨",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:4},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:8},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"台北",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:3},
		{name:'10:00-12:00',Activity:2},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:7},
	]},
    {name:"香港",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:3},
		{name:'12:00-14:00',Activity:7},
		{name:'14:00-16:00',Activity:3},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
    {name:"澳门",value:[
		{name:'0:00-6:00',Activity:0},
		{name:'6:00-8:00',Activity:3},
		{name:'8:00-10:00',Activity:4},
		{name:'10:00-12:00',Activity:7},
		{name:'12:00-14:00',Activity:1},
		{name:'14:00-16:00',Activity:1},
		{name:'16:00-18:00',Activity:1},
		{name:'18:00-0:00',Activity:3},
	]},
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
	// console.log('res',res);
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
		// enterable:true,
        trigger: 'item',
		formatter:function(params)//数据格式
		{
			var relVal='';
			var $name = params.name;
			// console.log('params:',params)
			for(var i=0;i<data2.length;i++){
				if($name == data2[i].name){
          // relVal = data2[i].name+'：<br /> '+table(data2[i].value);
          // relVal = data2[i].name+'的活跃度';
					// console.log(data[i])
					break;
				}
			}
			return relVal;
			// return `loading`;
		}
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

	series: [
		{
			name: '成交值',
			type: 'effectScatter',
			coordinateSystem: 'geo',
			data: data2,
			// symbolSize: function (val) {
			// 	return val[2] / 100;
			// },
			symbolSize:getDynamicSize,
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

function table(table_data){
	// console.log('table_data',table_data);
	var html = '<ul>';
	html+='<li class="li"><span class="date">时间段</span><span class="num">总体活跃度(0-4级)</span></li>';
	for(var i = 0 ; i<table_data.length;i++){
		html += '<li class="li"><span class="date">'+table_data[i].name+'</span><span class="num">'+table_data[i].Activity+'</span></li>';
  }
  
	return html
}
