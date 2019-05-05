<template>
    <div style="width:100%;height:100%;" id="MDaccountStatistics"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "MDaccountStatistics",
  data() {
    return {
      //
    };
  },
  mounted() {
    this.$nextTick(() => {
      let MDaccountStatistics = echarts.init(
        document.getElementById("MDaccountStatistics")
      );
      let xAxisData = [];
      let data1 = [];
      let data2 = [];
      for (let i = 0; i < 20; i++) {
        xAxisData.push("类目" + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }

      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["1", "2",'3','4'],
          // y:'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataZoom: { show: true },
            dataView: { show: true },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        dataZoom: {
          show: true,
          realtime: true,
          start: 20,
          end: 80
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push("2013-03-" + i);
              }
              return list;
            })()
          }
        ],
        yAxis: [
          {
            type: "value",
            name:'单位：万元'
          }
        ],
        series: [
          {
            name: "1",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#8bc0f2",
                lineStyle: {
                  color: "#8bc0f2"
                }
              }
            },
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 30));
              }
              return list;
            })()
          },
          {
            name: "2",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#548eef",
                lineStyle: {
                  color: "#548eef"
                }
              }
            },
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 10));
              }
              return list;
            })()
          },
          {
            name: "3",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#ef6019",
                lineStyle: {
                  color: "#ef6019"
                }
              }
            },
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 30));
              }
              return list;
            })()
          },
          {
            name: "4",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#394882",
                lineStyle: {
                  color: "#394882"
                }
              }
            },
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 10));
              }
              return list;
            })()
          }
        ]
      };

      MDaccountStatistics.setOption(option);

      window.addEventListener("resize", function() {
        MDaccountStatistics.resize();
      });
    });
  }
};
</script>
