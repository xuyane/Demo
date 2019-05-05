<template>
    <div style="width:100%;height:100%;" id="customAccount"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'customAccount',
    props: ["getUserManagerVO"],
    data () {
        return {
           userManagerVOData:{}
        };
    },
    methods:{
        getechartdata(){
            this.$nextTick(() => {
            let customAccount = echarts.init(document.getElementById('customAccount'));
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
                    show: false,
                    text:'月度新增产品',
                    left:'center',
                    textStyle:{
                        color:'#000',
                        fontStyle:'normal',
                        fontWeight:'normal',
                　　　　 fontSize:18,
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
                    name:'单位：位',
                },
                xAxis: {
                    type: 'category',
                    data: ['近期登陆', '待续入客户', '免费客户', '近期未联系', '3个月即将到期', '竞争对手用户', '无效客户'],
                    nameTextStyle: {
                        color: '#c3c3c3'
                    }
                },
                series: [
                    {
                        name: '数量',
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
                            {value: this.userManagerVOData.recentLoginUser, name: '近期登陆',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: this.userManagerVOData.beContinedUser, name: '待续入客户',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: this.userManagerVOData.freeUser, name: '免费客户', barWidth :10,itemStyle: {normal: {color: '#5284e5'}}},
                            {value: this.userManagerVOData.notConnectionUser, name: '近期未联系',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: this.userManagerVOData.threeMonthUser, name: '3个月即将到期',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: this.userManagerVOData.completedUser, name: '竞争对手用户',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                            {value: this.userManagerVOData.invalidUser, name: '无效客户',barWidth :10, itemStyle: {normal: {color: '#5284e5'}}},
                        ]
                    }
                ]
            };

            customAccount.setOption(option);

            window.addEventListener('resize', function () {
                customAccount.resize();
            });
        });
        }
    },
    mounted () {
        
    },
    watch:{
        getUserManagerVO(newval,oldval){
            this.userManagerVOData=newval;
            this.getechartdata();
        }
    }
};
</script>
