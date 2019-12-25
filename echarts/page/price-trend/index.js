$(function () {
  console.log('价格');
  var areas = [];
  var currentAreaIndex = 0;

  var periods = ['custom', 'year', 'halfYear', 'month'];
  var currentPeriodIndex = 3;
  var params = { date: 'month', area: '', dateStart: '', dateEnd: '' };
  var legends = [];
  var datas = [];


  var options = {
    baseOption: {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: []
      },
      grid: {
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: [],
        scale: true,
        axisLabel: {
          color: '#fff',
          rotate: 45,
          // fontSize: 12
        }
      },
      yAxis: [
        {
          scale: true,
          name: '单位：元/吨',
          axisLabel: {
            color: '#fff'
          },
          nameTextStyle: {
            color: '#fff'
          }
        },
        {
          show: false,
          scale: true,
          offset: 10,
          name: '',
          nameLocation: 'end',
          axisLabel: {
            color: '#fff'
          }
        },
      ],
      series: []
    },
    media: [
      {
        query: { maxWidth: 650 },
        option: {
          grid: {
            bottom: '26%'
          }
        }
      }
    ]
  };

  var myChart = echarts.init($('#price-trend .chart')[0]);
  $(window).resize(function () {
    myChart.resize();
  });

  // get区域
  $.get('http://192.168.202.149:8080/PriceTrend/getAreas', function (res) {
    if (res.status === 1) {
      areas = res.data || [];
      if (areas.length) {
        var html = '';
        _(areas).forEach(function (item, key) {
          var cls = key === currentAreaIndex ? 'active' : '';
          html += '<li class="' + cls + '">' + item + '</li>';
        });
        $('#price-trend .area').html(html);
        params.area = areas[currentAreaIndex];
        getDatas();
      }
    }
  });

  // 选区域
  $('#price-trend .area').on('click', 'li', function () {
    var index = $(this).index();
    if (currentAreaIndex !== index) {
      $('#price-trend .tab li').eq(currentAreaIndex).removeClass('active');
      $(this).addClass('active');
      currentAreaIndex = index;
    }
    params.area = areas[currentAreaIndex];
    getDatas();
  });


  // 选时间
  $('#price-trend .period li').click(function () {
    var index = $(this).index();
    if (currentPeriodIndex !== index) {
      $('#price-trend .period li').eq(currentPeriodIndex).removeClass('active');
      $(this).addClass('active');
      currentPeriodIndex = index;
      var period = periods[index];
      if (period !== 'custom') {
        $('#price-trend .date-pick').hide();
        params.date = period;
        params.dateStart = params.dateEnd = '';
        getDatas();
      } else {
        console.log('custom');
        $('#price-trend .date-pick').show();
        params.date = '';
      }
    }
  });
  $('#price-trend .chart').click(function () {
    console.log('click 走势 chart');
    $(parent)[0].postMessage({
      title: '分区域价格走势',
      path: 'price-trend'
    }, mainHost);
  });

  function getDatas() {
    $.get('http://192.168.202.149:8080/PriceTrend/getList', params, function (res) {
      if (res.status === 1 && !_.isEmpty(res.data)) {
        var data = res.data;
        legends = _.keys(data);
        datas = [];
        _(legends).forEach(function (legend) {
          // console.log(data[legend]);
          datas.push({
            legend: legend,
            keys: _.keys(data[legend]),
            values: _.values(data[legend]),
          });
        });
        // console.log(datas);
        setCharts();
      }
    });
  }

  function setCharts() {
    options.baseOption.legend.data = legends;
    options.baseOption.xAxis.data = datas[0].keys;
    options.baseOption.series = [];
    var yAxisIndex = 0;
    console.log(datas);
    _(datas).forEach(function (value) {
      var legend = value.legend;
      if (legend === 'Myspic普钢绝对价格指数') {
        options.baseOption.yAxis[1].show = true;
        yAxisIndex = 1;
      }
      options.baseOption.series.push({
        name: value.legend,
        type: 'line',
        data: value.values,
        smooth: true,
        yAxisIndex: yAxisIndex,
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      })
    });
    myChart.setOption(options, true);
  }

  $('#price-trend .date-pick .action-date').daterangepicker({
    applyClass: 'btn-primary',
    cancelClass: 'btn-primary',
    opens: 'center',
    drops: 'up',
    maxDate: moment(),
    linkedCalendars: false,
    showDropdowns: true,
    locale: {
      format: 'YYYY-MM-DD',
      separator: " - ",
      applyLabel: "确定",
      cancelLabel: "取消",
      fromLabel: "起始时间",
      toLabel: "结束时间'",
      customRangeLabel: "自定义",
      weekLabel: "W",
      daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      firstDay: 1
    }
  }, function(start, end) {
    // console.log(start, end);
    params.dateStart = start.format('YYYY-MM-DD');
    params.dateEnd = end.format('YYYY-MM-DD');
    getDatas();
  });
});