<template>
    <div style="width:100%;height:100%;" id="CSaimEchart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "CSaimEchart",
  data() {
    return {
      //
    };
  },
  mounted() {
    this.$nextTick(() => {
      let CSaimEchart = echarts.init(document.getElementById("CSaimEchart"));
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
          data: ["新入金额", "续入金额"],
          x: "right",
          y: 0
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "2018.01",
              "2018.02",
              "2018.03",
              "2018.05",
              "2018.06",
              "2018.07",
              "2018.08"
            ],
            nameTextStyle: {
              color: "#c3c3c3"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name : '单位（万元）',
          }
        ],
        series: [
          {
            name: "新入金额",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#4280e8",
                lineStyle: {
                  color: "#4280e8"
                }
              }
            },

            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "续入金额",
            type: "line",
            itemStyle: {
              normal: {
                color: "#f1ac45",
                lineStyle: {
                  color: "#f1ac45"
                }
              }
            },
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };

      CSaimEchart.setOption(option);

      window.addEventListener("resize", function() {
        CSaimEchart.resize();
      });
    });
  }
};
</script>
