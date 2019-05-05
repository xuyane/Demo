<template>
    <div style="width:100%;height:100%;" id="productAccount"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'productAccount',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            let productAccount = echarts.init(document.getElementById('productAccount'));
            let xAxisData = [];
            let data1 = [];
            let data2 = [];
            for (let i = 0; i < 20; i++) {
                xAxisData.push('类目' + i);
                data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
            }

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                title:{
                    text:'月度新增产品',
                    left:'center',
                    textStyle:{
                        color:'#000',
                        fontStyle:'normal',
                        fontWeight:'normal',
                　　　　 fontSize:18
                    }
                },
                // toolbox:{
                //     show: true,
                //     feature: {
                //         myTool: {
                //             show: true,
                //             title: '详细数据',
                //             icon:'image:../../assets/images/xxsjicon.png',
                //             z:'999',
                //             left:'right',
                //         }
                //     }
                // },
                grid: {
                    top: 30,
                    left: '2%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    name:'单位：种',
                    max:5000,
                },
                xAxis: {
                    type: 'category',
                    data: ['2018.01', '2018.02', '2018.03', '2018.05', '2018.06', '2018.07'],
                    nameTextStyle: {
                        color: '#c3c3c3'
                    }
                },
                series: [
                    {
                        name: '种类',
                        type: 'bar',
                        barWidth: '20%',
                        label:{
                            normal:{
                                show:true,            //显示数字
                                position: 'top'  ,      //这里可以自己选择位置
                                color:'#000',
                            }
                        },
                        data: [
                            {value: 1852, name: '2018.01',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: 1753, name: '2018.02',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: 3426, name: '2018.03', barWidth :10,itemStyle: {normal: {color: '#5284e5'}}},
                            {value: 2895, name: '2018.04',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: 4015, name: '2018.05',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: 3894, name: '2018.06',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                        ]
                    }
                ]
            };

            productAccount.setOption(option);

            window.addEventListener('resize', function () {
                productAccount.resize();
            });
        });
    }
};
</script>
