<template>
    <div style="width:100%;height:100%;" id="comparisonHistogram"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'comparisonHistogram',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            let comparisonHistogram = echarts.init(document.getElementById('comparisonHistogram'));
            
            let labelRight = {
                    normal: {
                        position: 'right'
                    }
                };

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                // title:{
                //     text:'月度新增产品',
                //     left:'center',
                //     textStyle:{
                //         color:'#000',
                //         fontStyle:'normal',
                //         fontWeight:'normal',
                // 　　　　 fontSize:18
                //     }
                // },
               tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
     legend: {
        data:['产品使用用户量TOP10', '产品使用用户量LAST10']
    },
                 grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        
    },

    xAxis: {
        type : 'value',
        position: 'top',
        splitLine: {lineStyle:{type:'dashed'}},
        name:'单位：位',
        axisLabel: {
            formatter: function(x){
               return Math.abs(x);
            }
        }
    },
    yAxis: {
        type : 'category',
        axisLine: {show: false},
        axisLabel: {show: false},
        axisTick: {show: false},
        splitLine: {show: false},
        data : ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
    },
    
    series : [{
            name:'产品使用用户量LAST10',
            type:'bar',
            stack: '总量',
            barWidth: '30%',
            //color:'#548eef',
            label: {
                normal: {
                    show: true,
                   
                     position: 'right'
                }
            },
            data:[320, 302, 341, 374, 390, 450, 420,320, 302, 341,]
        },{
            name:'产品使用用户量TOP10',
            type:'bar',
            stack: '总量',
            barWidth: '30%',
           // color:'#ef6119',
            label: {
                normal: {
                    show: true,
                   
                    position: 'left'
                }
            },
            data:[-120, -132, -101, -134, -390, -450, -210,-120, -132, -101]
        }
    ]
            };

            comparisonHistogram.setOption(option);

            window.addEventListener('resize', function () {
                comparisonHistogram.resize();
            });
        });
    }
};
</script>
