// 单y轴数据
function singleyAxisChartData(echObj,datas) {
    var line_option_single = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:40,
            right:40,
            bottom:0,
            containLabel: true
        },
        title: {
            x: 'left',
            text: '',
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:16,
            },
            itemGap:5,       //每个item之间的距离
            itemHeight:12,     //item图案大小
            itemWidth:32,
            data:datas.legendData,
            top:'50',
            padding:[0,0,0,150]
        },
        xAxis: {
            type: 'category',
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                margin:14,
                rotate:datas.rotate,
                showMaxLabel:true,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                }
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        yAxis: [{
            type: 'value',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:false,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        }],
        series:datas.seriesArr
    };
    echObj.setOption(line_option_single);
}

function dyAxisChartData(echObj,datas) {
    var line_option_single = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:40,
            right:40,
            bottom:0,
            containLabel: true
        },
        title: {
            x: 'left',
            text: '',
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:16,
            },
            itemGap:5,       //每个item之间的距离
            itemHeight:12,     //item图案大小
            itemWidth:32,
            data:datas.legendData,
            top:'50',
            padding:[0,0,0,150]
        },
        xAxis: {
            type: 'category',
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                margin:14,
                rotate:datas.rotate,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                }
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        yAxis: [{
            type: 'value',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:false,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        },{
            type: 'value',
            name: '',
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:false,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        }],
        series:datas.seriesArr
    };
    echObj.setOption(line_option_single);
}

// 双Y轴echart表
function doubleyAxisChartData(echObj,datas) {
    var line_option = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:52,
            right:40,
            bottom:0,
            containLabel: true
        },
        title: {
            x: 'left',
            text: '',
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend:[
            {
                x:'center',
                top:'50',
                textStyle: {
                    color: '#fff',
                    fontSize:16,
                },
                // padding:[0,0,0,150],
                itemGap:5,       //每个item之间的距离
                data:datas.legendData[0],
            },
            {
                x:'center',
                top:'70',
                textStyle: {
                    color: '#fff',
                    fontSize:16,
                },
                itemGap:5,       //每个item之间的距离
                data:datas.legendData[1],
            }
        ],
        xAxis: {
            type: 'category',
            // position:'bottom',
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                rotate:datas.rotate,
                showMaxLabel:true,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                },
                margin:14
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                },
                onZero: false
            },
            axisTick:{           //坐标轴刻度相关设置
                show:true,
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        yAxis: [{
            type: 'value',
            name: datas.yAxisName[0],
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:true,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        },{
            type: 'value',
            name: datas.yAxisName[1],
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,10,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:true,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        }],
        series:datas.seriesArr
    };
    echObj.setOption(line_option);
}


// 双Y轴echart表--含有%
function doubleyAxisBaiChartData(echObj,datas) {
    var line_option = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:40,
            right:40,
            bottom:10,
            containLabel: true
        },
        title: {
            x: 'center',
            top:20,
            // y:'bottom',
            // bottom:0,
            text: datas.title,
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                }
            },
            formatter: function (params) {
                var shower=params[0].axisValue+'<br />';
                for(var i=0;i<params.length;i++){
                    if(params.length<4){
                        if(i==1){
                            if(params[i].value==''){
                                shower+=params[i].marker+params[i].seriesName+' : /<br />';
                            }else{
                                shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'%<br />';
                            }
                        }else{
                            if(params[i].value==''){
                                shower+=params[i].marker+params[i].seriesName+' : /<br />';
                            }else{
                                shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'<br />';
                            }
                        }
                    }else{
                        if(i==2||i==3){
                            if(params[i].value==''){
                                shower+=params[i].marker+params[i].seriesName+' : /<br />';
                            }else{
                                shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'%<br />';
                            }
                        }else{
                            if(params[i].value==''){
                                shower+=params[i].marker+params[i].seriesName+' : /<br />';
                            }else{
                                shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'<br />';
                            }
                        }
                    }
                }
                return shower;
            }
        },
        legend: [
            {
                x:'center',
                top:'50',
                textStyle: {
                    color: '#fff',
                    fontSize:16,
                },
                itemGap:5,       //每个item之间的距离
                data:datas.legendData[0],
            },
            {
                x:'center',
                top:'70',
                textStyle: {
                    color: '#fff',
                    fontSize:16,
                },
                itemGap:5,       //每个item之间的距离
                data:datas.legendData[1],
            }
        ],
        xAxis: {
            type: 'category',
            splitLine: { //分割线的颜色
                show:false
            },
            position:'bottom',
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:17,      //x轴，y轴的文字大小，
                rotate:datas.rotate,
                interval:0,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                },
                margin:14
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                },
                onZero: false
            },
            axisTick:{           //坐标轴刻度相关设置
                show:true,
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        yAxis: [{
            type: 'value',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0],
                width:12
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:datas.YscaleFlag01,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16,
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        },{
            type: 'value',
            name: '',
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 18
            },
            scale:datas.YscaleFlag02,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: function (val) {
                    return val + '%';
                },
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        }],
        series:datas.seriesArr
    };
    echObj.setOption(line_option);
}
// 双Y轴echart表--含有% 2.5专用
function doubleyAxisBaiChartData2(echObj,datas) {
    var line_option = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:68,
            right:40,
            bottom:10,
            containLabel: true
        },
        title: {
            x: 'center',
            top:40,
            // y:'bottom',
            // bottom:0,
            text: datas.title,
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                }
            },
            formatter: function (params) {
                var shower=params[0].axisValue+'<br />';
                for(var i=0;i<params.length;i++){
                    if(params.length<4){
                        if(i==1){
                            if(params[i].value==''){
                                shower+=params[i].marker+params[i].seriesName+' : /<br />';
                            }else{
                                shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'%<br />';
                            }
                        }else{
                            if(params[i].value==''){
                                shower+=params[i].marker+params[i].seriesName+' : /<br />';
                            }else{
                                shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'<br />';
                            }
                        }
                    }else{
                        if(i==2||i==3){
                            if(params[i].value==''){
                                shower+=params[i].marker+params[i].seriesName+' : /<br />';
                            }else{
                                shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'%<br />';
                            }
                        }else{
                            if(params[i].value==''){
                                shower+=params[i].marker+params[i].seriesName+' : /<br />';
                            }else{
                                shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'<br />';
                            }
                        }
                    }
                }
                return shower;
            }
        },
        legend: [
            {
                x:'center',
                top:'70',
                textStyle: {
                    color: '#fff',
                    fontSize:16,
                },
                itemGap:5,       //每个item之间的距离
                data:datas.legendData[0],
            },
            {
                x:'center',
                top:'90',
                textStyle: {
                    color: '#fff',
                    fontSize:16,
                },
                itemGap:5,       //每个item之间的距离
                data:datas.legendData[1],
            }
        ],
        xAxis: {
            type: 'category',
            splitLine: { //分割线的颜色
                show:false
            },
            position:'bottom',
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:17,      //x轴，y轴的文字大小，
                rotate:datas.rotate,
                interval:0,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                },
                margin:14
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                },
                onZero: false
            },
            axisTick:{           //坐标轴刻度相关设置
                show:true,
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        yAxis: [{
            type: 'value',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0],
                width:12
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:datas.YscaleFlag01,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16,
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        },{
            type: 'value',
            name: '',
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 18
            },
            scale:datas.YscaleFlag02,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: function (val) {
                    return val + '%';
                },
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        }],
        series:datas.seriesArr
    };
    echObj.setOption(line_option);
}

// Y轴数据为日期，X轴为value
function doubleXAxisChartData(echObj,datas){
    var line_option = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:40,
            right:40,
            bottom:0,
            containLabel: true
        },
        title: {
            x: 'left',
            text: '',
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    type : 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:16,
            },
            itemGap:5,       //每个item之间的距离
            itemHeight:12,     //item图案大小
            itemWidth:32,
            data:datas.legendData,
            top:'50',
            padding:[0,0,0,150]
        },
        xAxis: [
            {
                type: 'value',
                // min:function(value){
                //     return value.min - 2;
                // },
                name:'',
                nameTextStyle: {
                    color: '#fbfbfd',
                    fontSize: 18,
                    fontWeight:'bold',
                    padding:[0,80,0,0]
                },
                nameLocation:'end',
                nameGap:40,                  //轴名称离轴的距离
                scale:false,   //数值是否从0开始，true：不从零开始
                axisLabel:{
                    color:'#fefeff',      //x轴，y轴的文字颜色，
                    fontSize:18,      //x轴，y轴的文字大小，
                    formatter: '{value}',
                    margin:16
                },
                axisLine: { // x轴，y轴的轴线颜色
                    lineStyle: {
                        color: "#c4cdd4"
                    }
                },
                axisTick:{           //坐标轴刻度相关设置
                    length:8,
                    lineStyle:{
                        color:'#6f7889',
                    }
                },
                splitLine: { //分割线的颜色
                    show: false,
                    lineStyle: {
                        color: '#545b6b'
                    }
                }
            }
        ],
        yAxis: {
            type: 'category',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                rotate:datas.rotate,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                },
                margin:14
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                show:true,
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        series:datas.seriesArr
    };
    echObj.setOption(line_option);
}


// Y轴数据为日期，X轴为value -x轴含有最小值
function XAxisMinChartData(echObj,datas){
    var line_option = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:40,
            right:40,
            bottom:0,
            containLabel: true
        },
        title: {
            x: 'left',
            text: '',
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    type : 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:16,
            },
            itemGap:5,       //每个item之间的距离
            itemHeight:12,     //item图案大小
            itemWidth:32,
            data:datas.legendData,
            top:'50',
            padding:[0,0,0,150]
        },
        xAxis: [
            {
                type: 'value',
                min:function(value){
                    return value.min - 10;
                },
                name:'',
                nameTextStyle: {
                    color: '#fbfbfd',
                    fontSize: 18,
                    fontWeight:'bold',
                    padding:[0,80,0,0]
                },
                nameLocation:'end',
                nameGap:40,                  //轴名称离轴的距离
                scale:false,   //数值是否从0开始，true：不从零开始
                axisLabel:{
                    color:'#fefeff',      //x轴，y轴的文字颜色，
                    fontSize:18,      //x轴，y轴的文字大小，
                    formatter: '{value}',
                    margin:16
                },
                axisLine: { // x轴，y轴的轴线颜色
                    lineStyle: {
                        color: "#c4cdd4"
                    }
                },
                axisTick:{           //坐标轴刻度相关设置
                    length:8,
                    lineStyle:{
                        color:'#6f7889',
                    }
                },
                splitLine: { //分割线的颜色
                    show: false,
                    lineStyle: {
                        color: '#545b6b'
                    }
                }
            }
        ],
        yAxis: {
            type: 'category',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                rotate:datas.rotate,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                },
                margin:14
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                show:true,
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        series:datas.seriesArr
    };
    echObj.setOption(line_option);
}

// Y轴在中间，数据左右显示
function XAxisChartDataTwo(echObj,datas){
    var line_option = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:40,
            right:40,
            bottom:10,
            containLabel: true
        },
        title: {
            x: 'left',
            text: '',
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    type : 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
                    backgroundColor: '#6a7985',
                }
            },
            formatter: function (params) {
                var shower=params[0].axisValue+'<br />';
                for(var i=0;i<params.length;i++){
                    if(params[i].value<0){
                        shower+=params[i].marker+params[i].seriesName+': '+ (-params[i].value)+'<br />';
                    }else{
                        shower+=params[i].marker+params[i].seriesName+': '+params[i].value+'<br />';
                    }
                }
                return shower;
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:16,
            },
            itemGap:5,       //每个item之间的距离
            itemHeight:12,     //item图案大小
            itemWidth:32,
            data:datas.legendData,
            top:'50',
            padding:[0,0,0,150]
        },
        xAxis: [
            {
                type: 'value',
                name:datas.yAxisName,
                nameTextStyle: {
                    color: '#fbfbfd',
                    fontSize: 18,
                    fontWeight:'bold',
                    padding:[120,80,0,0],
                },
                nameLocation:'end',
                nameGap:-60,                  //轴名称离轴的距离
                scale:true,   //数值是否从0开始，true：不从零开始
                axisLabel:{
                    color:'#fefeff',      //x轴，y轴的文字颜色，
                    fontSize:18,      //x轴，y轴的文字大小，
                    formatter: function(value){
                        if(value<0){
                            return -value
                        }else{
                            return value
                        }
                    },
                    margin:16
                },
                axisLine: { // x轴，y轴的轴线颜色
                    lineStyle: {
                        color: "#596174"
                    }
                },
                axisTick:{           //坐标轴刻度相关设置
                    length:8,
                    lineStyle:{
                        color:'#6f7889',
                    }
                },
                splitLine: { //分割线的颜色
                    show: false,
                    lineStyle: {
                        color: '#545b6b'
                    }
                }
            }
        ],
        yAxis: {
            type: 'category',
            name: '',
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0],
                align:'right'
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:true,   //数值是否从0开始，true：不从零开始
            position:'left',
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                rotate:datas.rotate,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                },
                margin:14
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                show:true,
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        series:datas.seriesArr
    };
    echObj.setOption(line_option);
}

// 双X轴数据
function doubleXAxis(echObj,datas){
    var line_option = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:40,
            right:40,
            bottom:0,
            containLabel: true
        },
        title: {
            x: 'left',
            text: '',
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    type : 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:16,
            },
            itemGap:5,       //每个item之间的距离
            itemHeight:12,     //item图案大小
            itemWidth:32,
            data:datas.legendData,
            top:'50',
            padding:[0,0,0,150]
        },
        xAxis: [
            {
                type: 'value',
                min: function(value) {
                    return value.min - 20;
                },
                position:'bottom',
                name:'',
                nameTextStyle: {
                    color: '#fbfbfd',
                    fontSize: 18,
                    fontWeight:'bold',
                    padding:[0,80,0,0]
                },
                nameLocation:'end',
                nameGap:40,                  //轴名称离轴的距离
                scale:true,   //数值是否从0开始，true：不从零开始
                inverse:true,
                axisLabel:{
                    color:'#fefeff',      //x轴，y轴的文字颜色，
                    fontSize:18,      //x轴，y轴的文字大小，
                    formatter: '{value}',
                    margin:16
                },
                axisLine: { // x轴，y轴的轴线颜色
                    lineStyle: {
                        color: "#c4cdd4"
                    }
                },
                axisTick:{           //坐标轴刻度相关设置
                    length:8,
                    lineStyle:{
                        color:'#6f7889',
                    }
                },
                splitLine: { //分割线的颜色
                    show: false,
                    lineStyle: {
                        color: '#545b6b'
                    }
                }
            },{
                type: 'value',
                min: function(value) {
                    return value.min - 20;
                },
                name:'',
                position:'bottom',
                nameTextStyle: {
                    color: '#fbfbfd',
                    fontSize: 18,
                    fontWeight:'bold',
                    padding:[0,80,0,0]
                },
                nameLocation:'end',
                nameGap:40,                  //轴名称离轴的距离
                yAxisIndex:1,
                scale:true,   //数值是否从0开始，true：不从零开始
                axisLabel:{
                    color:'#fefeff',      //x轴，y轴的文字颜色，
                    fontSize:18,      //x轴，y轴的文字大小，
                    formatter: '{value}',
                    margin:16
                },
                axisLine: { // x轴，y轴的轴线颜色
                    lineStyle: {
                        color: "#c4cdd4"
                    }
                },
                axisTick:{           //坐标轴刻度相关设置
                    length:8,
                    lineStyle:{
                        color:'#6f7889',
                    }
                },
                splitLine: { //分割线的颜色
                    show: false,
                    lineStyle: {
                        color: '#545b6b'
                    }
                },
                // data:[1243,2015,6854,5425,8461]
                // data:datas.xAxisData02
            }
        ],
        yAxis: {
            type: 'category',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                rotate:datas.rotate,
                formatter:function(val){
                    if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                        return val.slice(2,7);
                    }else{
                        return val
                    }
                },
                margin:14
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                show:true,
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: ['10-15','10-15','10-15','10-15','10-15']
            // data: datas.xAxisDate
        },
        // series:datas.seriesArr
    };
    echObj.setOption(line_option);
}
// 单轴含有%
function singleBAIFenBiFun(echObj,datas){
    var line_option_single = {
        color:datas.colors,
        grid: {
            x:'center',
            top: '110px',
            left:40,
            right:40,
            bottom:10,
            containLabel: true
        },
        title: {
            x: 'center',
            y:'bottom',
            bottom:0,
            text: datas.title,
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            formatter: function (params) {
                var shower=params[0].axisValue+'<br />';
                for(var i=0;i<params.length;i++){
                    if(params[i].value==''){
                        shower+=params[i].marker+params[i].seriesName+' : -<br />';
                    }else{
                        shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'%<br />';
                    }
                }
                return shower;
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:14,
            },

            itemGap:10,       //每个item之间的距离
            itemHeight:12,     //item图案大小
            itemWidth:32,
            data:datas.legendData,
            top:'50',
            padding:[0,0,0,350]
        },
        xAxis: {
            type: 'category',
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                margin:14,
                rotate:datas.rotate,
                showMaxLabel:true,
                formatter:function(val){
                    if(val.length>5){
                        if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                            return val.slice(2,7);
                        }else{
                            return val
                        }
                    }else{
                        switch(val.slice(0,2)){
                            case '01':
                                return '一月' ;
                                break;
                            case '02':
                                return '二月' ;
                                break;
                            case '03':
                                return '三月' ;
                                break;
                            case '04':
                                return '四月' ;
                                break;
                            case '05':
                                return '五月' ;
                                break;
                            case '06':
                                return '六月' ;
                                break;
                            case '07':
                                return '七月' ;
                                break;
                            case '08':
                                return '八月' ;
                                break;
                            case '09':
                                return '九月' ;
                                break;
                            case '10':
                                return '十月' ;
                                break;
                            case '11':
                                return '十一月' ;
                                break;
                            case '12':
                                return '十二月' ;
                                break;
                        }
                    }
                }
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        yAxis: {
            type: 'value',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:true,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        },
        series:datas.seriesArr
    };
    echObj.setOption(line_option_single);
}
// 显示1--12月份用
function singleBAIFenBiFunMonth(echObj,datas){
    var line_option_single = {
        color:datas.colors,
        grid: {
            top: '110px',
            left:100,
            right:40,
            bottom:10,
            containLabel: true
        },
        title: {
            x: 'center',
            // y:'bottom',
            top:40,
            text: datas.title,
            textStyle: {
                color: '#fff',
                fontWeight:'normal',
                fontSize:22
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            formatter: function (params) {
                var shower=params[0].axisValue+'<br />',nullNum=0;
                for(var i=0;i<params.length;i++){
                    if(params[i].value==''){
                        shower+=params[i].marker+params[i].seriesName+' : /<br />';
                        nullNum++;
                    }else{
                        shower+=params[i].marker+params[i].seriesName+' : '+params[i].value+'%<br />';
                    }
                }
                if(nullNum==params.length){
                    return
                }else{
                    return shower;
                }
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:16,
            },
            itemGap:5,       //每个item之间的距离
            itemHeight:12,     //item图案大小
            itemWidth:32,
            data:datas.legendData,
            top:'100',
            padding:[0,0,0,150]
        },
        xAxis: {
            type: 'category',
            splitLine: { //分割线的颜色
                show:false
            },
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:16,      //x轴，y轴的文字大小，
                margin:24,
                rotate:datas.rotate,
                align:'center',
                interval:function(index,value){
                    if(value!=undefined&&value.length==5){
                        switch(value){
                            case '01-01':
                                return true;
                                break;
                            case '02-01':
                                return true;
                                break;
                            case '03-01':
                                return true;
                                break;
                            case '04-01':
                                return true;
                                break;
                            case '05-01':
                                return true;
                                break;
                            case '06-01':
                                return true;
                                break;
                            case '07-01':
                                return true;
                                break;
                            case '08-01':
                                return true;
                                break;
                            case '09-01':
                                return true;
                                break;
                            case '10-01':
                                return true;
                                break;
                            case '11-01':
                                return true ;
                                break;
                            case '12-01':
                                return true ;
                                break;
                            default:
                                return false;
                                break;
                        }
                    }else{
                        return 'auto';
                    }
                },
                formatter:function(val){
                    if(val.length>5){
                        if(/^(\d{4})(-)(\d{2})(-)(\d{2})$/g.test(val)){
                            return val.slice(2,7);
                        }else{
                            return val
                        }
                    }else{
                        switch(val.slice(0,2)){
                             case '01':
                                return 'Jan' ;
                                break;
                            case '02':
                                return 'Feb' ;
                                break;
                            case '03':
                                return 'Mar' ;
                                break;
                            case '04':
                                return 'Apr' ;
                                break;
                            case '05':
                                return 'May' ;
                                break;
                            case '06':
                                return 'Jun' ;
                                break;
                            case '07':
                                return 'Jul' ;
                                break;
                            case '08':
                                return 'Aug' ;
                                break;
                            case '09':
                                return 'Sep' ;
                                break;
                            case '10':
                                return 'Oct' ;
                                break;
                            case '11':
                                return 'Nov' ;
                                break;
                            case '12':
                                return 'Dec' ;
                                break;
                            default:
                                return 'Dec';
                                break;
                        }
                    }
                }
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4",
                    fontSize:18
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            boundaryGap: true,   //true：不包含零刻度；false：包含零刻度
            data: datas.xAxisDate
        },
        yAxis: {
            type: 'value',
            name: datas.yAxisName,
            nameTextStyle: {
                color: '#fbfbfd',
                fontSize: 16,
                fontWeight:'bold',
                padding:[0,80,0,0]
            },
            nameLocation:'end',
            nameGap:40,                  //轴名称离轴的距离
            scale:true,   //数值是否从0开始，true：不从零开始
            axisLabel:{
                color:'#fefeff',      //x轴，y轴的文字颜色，
                fontSize:18,      //x轴，y轴的文字大小，
                formatter: '{value}',
                margin:16
            },
            axisLine: { // x轴，y轴的轴线颜色
                lineStyle: {
                    color: "#c4cdd4"
                }
            },
            axisTick:{           //坐标轴刻度相关设置
                length:8,
                lineStyle:{
                    color:'#6f7889',
                }
            },
            splitLine: { //分割线的颜色
                show: false,
                lineStyle: {
                    color: '#545b6b'
                }
            }
        },
        series:datas.seriesArr
    };
    echObj.setOption(line_option_single);
}
// ajax请求
function ajaxFun(ajaxUrl,params,sucFun){
    //线性图和柱状图
    var random=(Math.random()*100000000).toFixed(0);
    $.ajax({
        url: ajaxUrl,
        dataType: "jsonp",
        timeout:"20000",
        data:params,
        jsonpCallback:"lineData"+random,
        success: function(data){
            sucFun(data);
        }
    })

}