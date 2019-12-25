$(function () {
  console.log('产销存');
  var myChart = echarts.init($('#cxc .box .chart')[0]);
  $(window).resize(function () {
    myChart.resize();
  });
  $('#cxc .box .chart').click(function () {
    console.log('click 产销存 chart');
    $(parent)[0].postMessage({
      title: '产销存变化',
      path: 'cxc-change'
    }, mainHost);
  });

  var options = {
    baseOption: {
      legend: [
        {
          data: ["实际生产", "计划生产"],
          textStyle: {
            color: "#fff",
            fontSize: "12"
          },
          left: "5%",
          itemHeight: 15,
          itemWidth: 28
        },
        {
          data: ["实际销量", "计划销量"],
          textStyle: {
            color: "#fff",
            fontSize: "12"
          },
          top: "22%",
          left: "5%",
          itemHeight: 15,
          itemWidth: 28
        },
        {
          data: ["当日库存", "合理库存"],
          textStyle: {
            color: "#fff",
            fontSize: "12"
          },
          top: "44%",
          left: "5%",
          itemHeight: 15,
          itemWidth: 28
        },
      ],
      grid: [
        {
          left: '15%',
          top: "5%",
          height: "10%"
        },
        {
          left: '15%',
          top: "28%",
          height: "10%"
        },
        {
          left: '15%',
          top: "50%",
          height: "10%"
        },
      ],
      tooltip: {
        formatter: "Group {a}: ({c})"
      },
      xAxis: [
        {
          gridIndex: 0,
          min: 0,
          max: 180000,
          show: false
        },
        {
          gridIndex: 1,
          min: 0,
          max: 600000,
          show: false
        },
        {
          gridIndex: 2,
          min: 0,
          max: 100000,
          show: false
        },
      ],
      yAxis: [
        {
          type: "category",
          data: ['计划生产', "实际生产"],
          gridIndex: 0,
          show: false
        },
        {
          type: "category",
          data: ["计划销量", '实际生产'],
          gridIndex: 1,
          show: false
        },
        {
          type: "category",
          data: ["当日库存", "合理库存"],
          gridIndex: 2,
          show: false
        },
      ],
      graphic: [
        {
          type: "image",
          id: "logo0",
          left: "8%",
          top: '6%',
          style: {
            image: "../../images/y轴.png",
            width: 40,
            height: 40,
            opacity: 0.4
          }
        },
        {
          type: "image",
          id: "logo1",
          left: "8%",
          top: '29%',
          style: {
            image: "../../images/y轴.png",
            width: 40,
            height: 40,
            opacity: 0.4
          }
        },
        {
          type: "image",
          id: "logo2",
          left: "8%",
          top: '51%',
          style: {
            image: "../../images/y轴.png",
            width: 40,
            height: 40,
            opacity: 0.4
          }
        },
        {
          id: 'txt0',
          type: "text",
          left: "3%",
          top: "7.4%",
          style: {
            fill: "#029aff",
            text: '产量',
            font: "14px Microsoft YaHei"
          }
        },
        {
          id: 'txt1',
          type: "text",
          left: "3%",
          top: "31%",
          style: {
            fill: "#029aff",
            text: '销量',
            font: "14px Microsoft YaHei"
          }
        },
        {
          id: 'txt2',
          type: "text",
          left: "3%",
          top: "53%",
          style: {
            fill: "#029aff",
            text: '库存',
            font: "14px Microsoft YaHei"
          }
        },
        {
          id: 'gp0',
          type: "group",
          right: '16%',
          top: "1%",
          children: [
            {
              type: "rect",
              left: "center",
              top: "middle",
              shape: {
                width: 40,
                height: 24
              },
              style: {
                fill: "#082a5a",
                stroke: "#0a43bc",
                lineWidth: 2,
                shadowBlur: 8,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: "rgba(0,0,0,0.3)"
              }
            },
            {
              type: "text",
              left: "center",
              top: -6,
              style: {
                fill: "#01eaed",
                text: [],
                font: "14px Microsoft YaHei"
              }
            }
          ]
        },
        {
          id: 'gp1',
          type: "group",
          right: '16%',
          top: "22%",
          children: [
            {
              type: "rect",
              left: "center",
              top: "middle",
              shape: {
                width: 40,
                height: 24
              },
              style: {
                fill: "#082a5a",
                stroke: "#0a43bc",
                lineWidth: 2,
                shadowBlur: 8,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: "rgba(0,0,0,0.3)"
              }
            },
            {
              type: "text",
              left: "center",
              top: -6,
              style: {
                fill: "#01eaed",
                text: [],
                font: "14px Microsoft YaHei"
              }
            }
          ]
        },
        {
          id: 'gp2',
          type: "group",
          right: '16%',
          top: "44%",
          children: [
            {
              type: "rect",
              left: "center",
              top: "middle",
              shape: {
                width: 40,
                height: 24
              },
              style: {
                fill: "#082a5a",
                stroke: "#0a43bc",
                lineWidth: 2,
                shadowBlur: 8,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: "rgba(0,0,0,0.3)"
              }
            },
            {
              type: "text",
              left: "center",
              top: -6,
              style: {
                fill: "#01eaed",
                text: [],
                font: "14px Microsoft YaHei"
              }
            }
          ]
        },
      ],
    },
    media: [
      {
        query: { maxWidth: 650 },
        option: {
          legend: [
            {
              top: '0'
            },
            {
              top: "32%",
            },
            {
              top: "66%",
            },
          ],
          grid: [
            {
              top: "10%",
              left: '20%',
              height: '20%'
            },
            {
              top: "44%",
              left: '20%',
              height: '20%'
            },
            {
              top: "76%",
              left: '20%',
              height: '20%'
            },
          ],
          graphic: [
            {
              top: '13%',
              left: "12%",
              style: {
                image: "../../images/y轴.png",
                width: 20,
                height: 30,
                opacity: 0.4
              }
            },
            {
              top: '47%',
              left: "12%",
              style: {
                image: "../../images/y轴.png",
                width: 20,
                height: 30,
                opacity: 0.4
              }
            },
            {
              top: '80%',
              left: "12%",
              style: {
                image: "../../images/y轴.png",
                width: 20,
                height: 30,
                opacity: 0.4
              }
            },
            {
              id: 'txt0',
              type: "text",
              left: "3%",
              top: "16%",
              style: {
                fill: "#029aff",
                text: '产量',
                font: "14px Microsoft YaHei"
              }
            },
            {
              id: 'txt1',
              type: "text",
              left: "3%",
              top: "50%",
              style: {
                fill: "#029aff",
                text: '销量',
                font: "14px Microsoft YaHei"
              }
            },
            {
              id: 'txt2',
              type: "text",
              left: "3%",
              top: "82%",
              style: {
                fill: "#029aff",
                text: '库存',
                font: "14px Microsoft YaHei"
              }
            },
            {
              id: 'gp0',
              type: "group",
              right: '16%',
              top: "1%",
              children: [
                {
                  type: "rect",
                  left: "center",
                  top: "middle",
                  shape: {
                    width: 40,
                    height: 18
                  },
                  style: {
                    fill: "#082a5a",
                    stroke: "#0a43bc",
                    lineWidth: 2,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: "rgba(0,0,0,0.3)"
                  }
                },
                {
                  type: "text",
                  left: "center",
                  top: -6,
                  style: {
                    fill: "#01eaed",
                    text: [],
                    font: "14px Microsoft YaHei"
                  }
                }
              ]
            },
            {
              id: 'gp1',
              type: "group",
              right: '16%',
              top: "32%",
              children: [
                {
                  type: "rect",
                  left: "center",
                  top: "middle",
                  shape: {
                    width: 40,
                    height: 18
                  },
                  style: {
                    fill: "#082a5a",
                    stroke: "#0a43bc",
                    lineWidth: 2,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: "rgba(0,0,0,0.3)"
                  }
                },
                {
                  type: "text",
                  left: "center",
                  top: -6,
                  style: {
                    fill: "#01eaed",
                    text: [],
                    font: "14px Microsoft YaHei"
                  }
                }
              ]
            },
            {
              id: 'gp2',
              type: "group",
              right: '16%',
              top: "66%",
              children: [
                {
                  type: "rect",
                  left: "center",
                  top: "middle",
                  shape: {
                    width: 40,
                    height: 18
                  },
                  style: {
                    fill: "#082a5a",
                    stroke: "#0a43bc",
                    lineWidth: 2,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: "rgba(0,0,0,0.3)"
                  }
                },
                {
                  type: "text",
                  left: "center",
                  top: -6,
                  style: {
                    fill: "#01eaed",
                    text: [],
                    font: "14px Microsoft YaHei"
                  }
                }
              ]
            },
          ],
          series: [
            {
              label: {
                normal: {
                  textStyle: {
                    fontSize: 14
                  }
                }
              }
            },
            {
              label: {
                normal: {
                  textStyle: {
                    fontSize: 14
                  }
                }
              }
            },
            {
              label: {
                normal: {
                  textStyle: {
                    fontSize: 14
                  }
                }
              }
            },
            {
              label: {
                normal: {
                  textStyle: {
                    fontSize: 14
                  }
                }
              }
            },
            {
              label: {
                normal: {
                  textStyle: {
                    fontSize: 14
                  }
                }
              }
            },
            {
              label: {
                normal: {
                  textStyle: {
                    fontSize: 14
                  }
                }
              }
            },
          ]
        }
      }
    ]
  };
  var types = ['合计'];
  var params = { type: '合计', frequency: 'month' };
  var datas = {};
  getTypes();
  getDatas();

  var currentTypeIndex = 0;
  $('#cxc .type').on('click', 'li', function () {
    var index = $(this).index();
    if (currentTypeIndex !== index) {
      $('#cxc .type li').eq(currentTypeIndex).removeClass('active');
      $(this).addClass('active');
      currentTypeIndex = index;
    }
    params.type = types[currentTypeIndex];
    getDatas();
  });

  var frequencies = ['month', 'week', 'day'];
  var currentFrequencyIndex = 0;
  $('#cxc .box .left ul li').click(function () {
    var index = $(this).index();
    if (currentFrequencyIndex !== index) {
      $('#cxc .box .left ul li').eq(currentFrequencyIndex).removeClass('active');
      $(this).addClass('active');
      currentFrequencyIndex = index;
    }
    params.frequency = frequencies[currentFrequencyIndex];
    getDatas();
  });


  function getTypes() {
    // console.log('aa');
    $.get('http://192.168.202.149:8080/Sales/getTypes', function (data) {
      if (data.status === 1) {
        types = types.concat(data.data);
      }
      renderTypes();
    });
  }

  function renderTypes() {
    var html = '';
    types.forEach(function (item) {
      var cls = item === '合计' ? 'active' : '';
      var widthPer = Math.floor((100 / types.length)) + '%'
      html += '<li class="'+ cls +'">'+ item +'</li>'
    });
    $('#cxc .type').html(html);
  }

  function getDatas() {
    $.get('http://192.168.202.149:8080/Sales/getData', params, function (data) {
      if (data.status === 1) {
        datas = data.data;
        if (!$.isEmptyObject(datas)) {
//      console.log(datas);
          setChart();
          setValueChanges();
        }
      } else {
        console.error('数据获取失败', data);
      }
    });
  }

  function setValueChanges() {
    var changes = [datas.produceSalesRate + '%', datas.produceSalesGap, datas.stockChange];
    $('#cxc .box .right ul li .val').each(function (key, item) {
      $(item).text(changes[key]);
    });
  }

  function setChart() {
    var rates = [
      Math.round((datas.produceFact / datas.producePlan) * 100),
      Math.round((datas.salesFact / datas.salesPlan) * 100),
      Math.round((datas.stockToday / datas.stockReason) * 100)
    ];
    [options.baseOption.graphic, options.media[0].option.graphic].forEach(function (grap) {
      grap.forEach(function (item) {
        if (item.type === 'group') {
          console.log(item.id.slice(-1), item.id);
          item.children[1].style.text = rates[item.id.slice(-1)] + '%';
        }
      });
    });
    options.baseOption.series = [
      {
        name: "实际生产",
        type: "bar",
        stack: "生产",
        data: ['', datas.produceFact],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#950c22"
              },
              {
                offset: 1,
                color: "#ea4d5f"
              }
            ])
          }
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#0ca7b8",
              fontSize: 20,
              fontWeight: "bold"
            },
            position: "right"
          }
        },
        barWidth: 14
      },
      {
        name: "计划生产",
        type: "bar",
        stack: "生产",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#0167e8"
              },
              {
                offset: 1,
                color: "#13abe8"
              }
            ])
          }
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#0ca7b8",
              fontSize: 20,
              fontWeight: "bold"
            },
            formatter: function(data) {
              return data.value;
            },
            position: "right"
          }
        },
        barWidth: 14,
        data: [datas.producePlan, ''],
      },
      {
        name: "实际销量",
        type: "bar",
        stack: "销量",
        data: ['', datas.salesFact],
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#950c22"
              },
              {
                offset: 1,
                color: "#ea4d5f"
              }
            ])
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#0ca7b8",
              fontSize: 20,
              fontWeight: "bold"
            },
            position: "right"
          }
        },
        barWidth: 14
      },
      {
        name: "计划销量",
        type: "bar",
        stack: "销量",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#0167e8"
              },
              {
                offset: 1,
                color: "#13abe8"
              }
            ])
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#0ca7b8",
              fontSize: 20,
              fontWeight: "bold"
            },
            formatter: function(data) {
              return data.value;
            },
            position: "right"
          }
        },
        data: [datas.salesPlan, ''],
        barWidth: 14
      },
      {
        name: "当日库存",
        type: "bar",
        stack: "库存",
        data: ['', datas.stockToday],
        xAxisIndex: 2,
        yAxisIndex: 2,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#950c22"
              },
              {
                offset: 1,
                color: "#ea4d5f"
              }
            ])
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#0ca7b8",
              fontSize: 20,
              fontWeight: "bold"
            },
            position: "right"
          }
        },
        barWidth: 14
      },
      {
        name: "合理库存",
        type: "bar",
        stack: "库存",
        data: [datas.stockReason, ''],
        xAxisIndex: 2,
        yAxisIndex: 2,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#0167e8"
              },
              {
                offset: 1,
                color: "#13abe8"
              }
            ])
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#0ca7b8",
              fontSize: 20,
              fontWeight: "bold"
            },
            position: "right"
          }
        },
        barWidth: 14
      },
    ];
    myChart.setOption(options, true);
  }
});