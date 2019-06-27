$(function () {
  // $('.navigation ul li').mouseenter(function () {
  //   $(this).addClass('color');
  //   $(this).siblings('li').removeClass('color');
  //   if ($(this).attr('attr') == 'message') {
  //     $(this).find('a').addClass('biaoxun');
  //   }
  //   $(this).find('.elastic').slideDown()
  // })
  // $('.navigation ul li').mouseleave(function () {
  //   $(this).removeClass('color');
  //   if ($(this).attr('attr') == 'message') {
  //     $(this).find('a').removeClass('biaoxun');
  //   }
  //   $(this).find('.elastic').slideUp()
  // })
  // $('.navigation ul li').click(function(){
  //   $(this).addClass('colorOne');
  //   $(this).siblings('li').removeClass('colorOne')
  // })
  // $('.elastic .elastic_left p').mouseenter(function () {
  //   $(this).find('i').addClass('color');
  //   $(this).siblings('p').find('i').removeClass('color');
  // })

  // $('.theme .theme_left .bottom ul li').mouseenter(function () {
  //   $(this).find('a').find('span').addClass('color');
  //   $(this).siblings('li').find('a').find('span').removeClass('color');
  // })

  $('#marquee_slide').marquee({
    auto: true,
    interval: 3000,
    speed: 5000,
    showNum: 8,
    stepLen: 8,
    type: 'vertical',
    duplicated: true, //是否循环播放
  });
  // $('.purchasing_information_div .purchasing_information .bottom .purchasing_information_right .rr_top ul li').mouseenter(function () {
  //   $(this).addClass('color');
  //   $(this).siblings('li').removeClass('color');
  //   var index = $(this).index();
  //   $('.purchasing_information_div .purchasing_information .bottom .purchasing_information_right .rr_bottom ul').eq(index).addClass('show').siblings('ul').removeClass('show');
  // })
  $('.dingwei_div .dingwei .iphone').mouseenter(function () {
    // console.log($(this).find('ul'))
    $(this).find('ul').animate({
      "left": "-152px"
    }, "slow");
    // $(this).find('ul').css('left','-152px');
  })
  $('.dingwei_div .dingwei .iphone').mouseleave(function () {
    // console.log($(this).find('ul'))
    $(this).find('ul').animate({
      "left": "90px"
    }, "slow");
    // $(this).find('ul').css('left','-152px');
  })
  $('.dingwei_div .dingwei .weixin').mouseenter(function () {
    // console.log($(this).find('ul'))
    $(this).find('ul').animate({
      "left": "-100px"
    }, "slow");
    // $(this).find('ul').css('left','-152px');
  })
  $('.dingwei_div .dingwei .weixin').mouseleave(function () {
    // console.log($(this).find('ul'))
    $(this).find('ul').animate({
      "left": "100px"
    }, "slow");
    // $(this).find('ul').css('left','-152px');
  })
  $(window).scroll(function () {
    var height = $(document).scrollTop();
    // console.log('height', height);
    if (height > 1000) {
      $('.dingwei_div').show();
    } else {
      $('.dingwei_div').hide();
    }
  })

  $('.dingwei_div .dingwei .huidao').click(function () {
     $('html , body').animate({
      scrollTop: 0
    }, 'slow');
  });
})


// 走势图模块
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
	$('.purchasing_information_div .rr_top ul li').on('hover',function(){
		$(this).addClass('color').siblings().removeClass('color');
		$('.rr_bottom .marketEchart').eq($(this).index()).addClass('show').siblings().removeClass('show')
	})
	// 走势图二级导航切换
	$('.rr_bottom .marketEchart ul li').on('hover',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.marketEchart').find('.marketEchart2').eq($(this).index()).addClass('show').siblings().removeClass('show')
	})
