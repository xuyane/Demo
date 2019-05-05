<style lang="less" scoped>
  .modalInput{
		width:300px;
	}
</style>
<template>
<Row>
	<Col span="24">
		<Row class-name="current-position">
			当前位置：原油整点&nbsp;&nbsp;>>&nbsp;&nbsp;原油变化率监控						
		</Row>
	</Col>
	<Col span="24" class="search-form">
		<Form :label-width="100">
			<Row>
				<Col span="24">
					<FormItem label="美国时间">
							<DatePicker type="date" @on-change="changeSourseTime" :value="searchTime.searchSatatTime" style="width: 200px"></DatePicker>
							&nbsp;&nbsp;至&nbsp;&nbsp;
							<DatePicker type="date" :options="optionsAmerican" @on-change="changeEndTime" :value="searchTime.searchEndTime" style="width: 200px"></DatePicker>
					</FormItem>    
				</Col>
				<Col span="24" class="text-right" style="margin-bottom:20px;">
					<Button type="primary" @click="search()" style="margin-right:20px;">查询</Button>
					<Button @click="reset()">重置</Button>
				</Col>
			</Row>           
		</Form>      
	</Col>
	<Col span="24" class="table-con">
		<Button type="primary" style="margin-bottom:20px;" @click="addFun()">添加</Button>
		<Table :columns="columns3" :data="data1"></Table>
		<oil-page
			:total="total"
			:page-num="params.pageNum"
			:page-size="params.pageSize"
			@page-change="pageChange"
			:page-size-opts="pageSizeOpts"
			:show-sizer="showSizer">
		</oil-page>
	</Col>
	<!-- 新增弹窗开始 -->
	<Modal v-model="addModal" title="新增" width="600"> 
		<Row>
			<Form :label-width="160" :model="addparams" ref="addFormValidate" :rules="addruleValidate">							
				<FormItem label="美国时间:" prop="americanTime">
					<DatePicker type="date" @on-change="addAmericanTime" :value="offerdata.AmericanTime"  class="modalInput"></DatePicker>
					当前日期减一天
				</FormItem> 
				<FormItem label="原油变化率:" prop="oilChageRate">
					<Input type="text" v-model="addparams.oilChageRate" class="search-input" style="width:300px"/>
					%
				</FormItem>  							
				<FormItem label="涨跌幅:" prop="riseAndFall">
					<Select style="width:300px" v-model="addparams.riseAndFall" >
						<Option v-for="item in updown" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="对应调整幅度:" prop="adjustmentRange">
					<Input v-model="addparams.adjustmentRange" class="search-input" style="width:300px"/>
					元/吨
				</FormItem>
				<FormItem label="监测日期:" prop="monitorTime">
					<Input v-model="addparams.monitorTime" class="search-input" style="width:300px"/>
					天  / 每10天一周期
				</FormItem>
				<FormItem label="下次调价时间:" prop="nextPriceTime">
					<DatePicker type="date" :options="options1" @on-change="addNextPrice" :value="addparams.nextPriceTime"  format="yyyy-MM-dd HH:mm:ss" class="modalInput"></DatePicker>
				</FormItem>
				<FormItem label="上一轮调价基础:" prop="lastPrice">
					<Input v-model="addparams.lastPrice" class="search-input" style="width:300px"/>
					美元/桶
				</FormItem>
				<FormItem label="备注:" prop="remark">
					<Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="addparams.remark" style="width:300px"/>
				</FormItem>
			</Form>
		</Row>
		<div slot="footer">
			<i-button type="primary" @click="submitAdd('addFormValidate')" class="search-btn">确定</i-button>
			<i-button @click="addModal=false" class="search-btn">取消</i-button>
		</div>
	</Modal>
	<!-- 新增弹窗结束 -->
	<!-- 修改弹窗开始 -->
	<Modal v-model="editModal" title="修改" width="600"> 
		<Row>
			<Form :label-width="160" :model="editparams" ref="editFormValidate" :rules="editruleValidate">							
				<FormItem label="美国时间:" prop="americanTime">
					<DatePicker type="date" @on-change="editAmericanTime" :value="offerdata1.AmericanTime"  style="width:300px"></DatePicker>
					当前日期减一天
				</FormItem> 
				<FormItem label="原油变化率:" prop="oilChageRate">
					<Input type="text" v-model="editparams.oilChageRate" class="search-input" style="width:300px"/>
					%
				</FormItem>  							
				<FormItem label="涨跌幅:" prop="riseAndFall">
					<Select style="width:300px" v-model="editparams.riseAndFall" >
						<Option v-for="item in updown" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="对应调整度:" prop="adjustmentRange">
					<Input v-model="editparams.adjustmentRange" class="search-input" style="width:300px"/>
					元/吨
				</FormItem>
				<FormItem label="监测日期:" prop="monitorTime">
					<Input v-model="editparams.monitorTime" class="search-input" style="width:300px"/>
					天  / 每10天一周期
				</FormItem>
				<FormItem label="下次调价时间:" prop="nextPriceTime">
					<DatePicker type="date" :options="options2" @on-change="editNextPrice" :value="editparams.nextPriceTime" format="yyyy-MM-dd HH:mm:ss" style="width:300px"></DatePicker>
				</FormItem>
				<FormItem label="上一轮调价基础:" prop="lastPrice">
					<Input v-model="editparams.lastPrice" class="search-input" style="width:300px"/>
					美元/桶
				</FormItem>
				<FormItem label="备注:" prop="remark">
					<Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="editparams.remark" style="width:300px"/>
				</FormItem>
			</Form>
		</Row>
		<div slot="footer">
			<i-button type="primary" @click="submitEdit('editFormValidate')" class="search-btn">确定</i-button>
			<i-button @click="editModal=false" class="search-btn">取消</i-button>
		</div>
	</Modal>
	<!-- 修改弹窗结束 -->
</Row>    
</template>
<script>
import OilPage from "../../components/page/page.vue";
import {
	dataCenterDcoilrateList,
	dataCenterDcoilrateSave,
	dataCenterDcoilrateInfo,
	dataCenterDcoilrateUpdate,
	dataCenterDcoilrateDelete
} from "../../components/axios/dataCenter.js";
import { formData,formatStamp,formatTime,formatTime2} from "../../../assets/js/common.js";
export default {
	name: 'oilChangeControl',
	components:{
		OilPage
	},
	watch:{
		// editModal(newVal,oldVal){
		// 	if(newVal == true){
    //     this.$refs['addFormValidate'].resetFields()
		// 	}
		// },
		addModal(newVal,oldVal){
			if(newVal == true){
				this.$refs['addFormValidate'].resetFields()
			}
		}
	},
  data(){
		const addvalidAmericanTime=(rule ,value , callback)=>{
			if(this.addparams.americanTime==""){
				callback(new Error('美国时间不能为空'))
			}else{
				callback();
			}
		};
		const addvalidOilChageRate=(rule ,value , callback)=>{
			var regwti2 = /^-?[0-9]*\.?[0-9]*[0-9]$/g;		
			var str2 = value.indexOf('-');
			var str1 = value.trim();
			var str3 = value.indexOf('.')
			let str4 = value.indexOf('0')
			console.log(str3)
			if(str1==""){
				callback(new Error('原油变化率不能为空'))
			}else if(!regwti2.test(str1)){
				callback(new Error('请输入正确的数字'))
			}else if(str2 != -1 && str1.length > 11){
				callback(new Error('原油变化率不超过10位'))
			}else if(str2 == -1 && str1.length > 10){
				callback(new Error('原油变化率不超过10位'))
			}else if( str3==0){
				callback(new Error('请输入正确数字'))
			}else if(str2 != -1 && str3==1){
				callback(new Error('请输入正确数字'))
			}else if( str2==0 && str3==-1 && str4==1){
				callback(new Error('请输入正确数字'))
			}else if(str2==-1 && str3==-1 && str4==0){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
		};
		const addvalidRiseAndFall=(rule , value , callback)=>{
			if(value === ""){
				callback(new Error('涨跌幅不能为空'))
			}else{
				callback();
			}
		};
		const addvalidAdjustmentRange=(rule , value , callback )=>{
			var regRange2 = /^[0-9]*\.?[0-9]*[0-9]$/g;		
			let str1 = value.trim()
			var str3 = value.indexOf('.')
			let str2 = value.indexOf('0')
			if(str1==""){
				callback(new Error('对应调整幅度不能为空'))
			}else if( !regRange2.test(str1)){
				callback(new Error('请输入至多10位数字'))
			}else if(str1.length>10){
				callback(new Error('最多输入10位'))
			}else if( str3==0){
				callback(new Error('请输入正确数字'))
			}else if( str2==0 && str3==-1){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
			
		};
		const addvalidMonitorTime=(rule ,value , callback)=>{
			var regwti2 = /^[0-9][0-9]*$/g;
			var regwti= /^\s*$/g;
			let str=value.indexOf('0')
			console.log(str)
			if(value === ""){
				callback(new Error('监测日期不能为空'))
			}else if( regwti.test(value) ){
				callback(new Error('监测日期不能为空'))
			}else if( value > 10 ){
				callback(new Error('监测日期不大于10天'))
			}else if( !regwti2.test(value)){
				callback(new Error('监测日期为正整数'))
			}else if( value.length==2 && str==0 ){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
		};
		const addvalidNextPriceTime=(rule ,value , callback)=>{
			if(this.addparams.nextPriceTime==""){
				callback(new Error('下次调价时间不能为空'))
			}else{
				callback();
			}
		};
		const addvalidLastPrice=(rule ,value , callback)=>{
			var regPrice2 = /^[0-9]*\.?[0-9]*[0-9]$/g;
			let str = value.indexOf('.')		
			let str1 = value.trim()
			let str2 = value.indexOf('0')
			if(str1==""){
				callback(new Error('上一轮调价基础不能为空'))
			}else if( !regPrice2.test(str1)){
				callback(new Error('请输入至多10位数字'))
			}else if(str1.length>10){
				callback(new Error('最多输入10位'))
			}else if( str==0 ){
				callback(new Error('请输入正确数字'))
			}else if( str2==0 && str==-1){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
		};
		const editvalidAmericanTime=(rule ,value , callback)=>{
			if(this.editparams.americanTime==""){
				callback(new Error('美国时间不能为空'))
			}else{
				callback();
			}
		};
		const editvalidOilChageRate=(rule ,value , callback)=>{
			var regwti2 = /^-?[0-9]*\.?[0-9]*[0-9]$/g;		
			var str2 = value.indexOf('-');
			var str1 = value.trim();
			var str3 = value.indexOf('.')
			let str4 = value.indexOf('0')
			console.log(str3)
			if(str1==""){
				callback(new Error('原油变化率不能为空'))
			}else if(!regwti2.test(str1)){
				callback(new Error('请输入正确的数字'))
			}else if(str2 != -1 && str1.length > 11){
				callback(new Error('原油变化率不超过10位'))
			}else if(str2 == -1 && str1.length > 10){
				callback(new Error('原油变化率不超过10位'))
			}else if( str3==0){
				callback(new Error('请输入正确数字'))
			}else if(str2 != -1 && str3==1){
				callback(new Error('请输入正确数字'))
			}else if( str2==0 && str3==-1 && str4==1){
				callback(new Error('请输入正确数字'))
			}else if(str2==-1 && str3==-1 && str4==0){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
		};
		const editvalidRiseAndFall=(rule , value , callback)=>{
			if(value === ""){
				callback(new Error('涨跌幅不能为空'))
			}else{
				callback();
			}
		};
		const editvalidAdjustmentRange=(rule , value , callback )=>{
			var regRange2 = /^[0-9]*\.?[0-9]*[0-9]$/g;		
			let str1 = value.trim()
			var str3 = value.indexOf('.')
			if(str1==""){
				callback(new Error('对应调整幅度不能为空'))
			}else if( !regRange2.test(str1)){
				callback(new Error('请输入至多10位数字'))
			}else if(str1.length>10){
				callback(new Error('最多输入10位'))
			}else if( str3==0){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
			
		};
		const editvalidMonitorTime=(rule ,value , callback)=>{
		var regwti2 = /^[0-9][0-9]*$/g;
			var regwti= /^\s*$/g;
			let str=value.indexOf('0')
			console.log(str)
			if(value === ""){
				callback(new Error('监测日期不能为空'))
			}else if( regwti.test(value) ){
				callback(new Error('监测日期不能为空'))
			}else if( value > 10 ){
				callback(new Error('监测日期不大于10天'))
			}else if( !regwti2.test(value)){
				callback(new Error('监测日期为正整数'))
			}else if( value.length==2 && str==0 ){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
		};
		const editvalidNextPriceTime=(rule ,value , callback)=>{
	
			if(this.editparams.nextPriceTime==""){
				callback(new Error('下次调价时间不能为空'))
			}else{
				callback();
			}
		};
		const editvalidLastPrice=(rule ,value , callback)=>{
		  	var regPrice2 = /^[0-9]*\.?[0-9]*[0-9]$/g;
			let str = value.indexOf('.')		
			let str1 = value.trim()
			let str2 = value.indexOf('0')
			if(str1==""){
				callback(new Error('上一轮调价基础不能为空'))
			}else if( !regPrice2.test(str1)){
				callback(new Error('请输入至多10位数字'))
			}else if(str1.length>10){
				callback(new Error('最多输入10位'))
			}else if( str==0 ){
				callback(new Error('请输入正确数字'))
			}else if( str2==0 && str==-1){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
		};
    return {
			addruleValidate:{
				americanTime:[
					{ required: true,validator:addvalidAmericanTime, trigger: "change" },
					{
            type: "number",
            message:"美国时间不能为空",
            trigger: "change"
          }
				],
				oilChageRate:[
					{ required: true,validator:addvalidOilChageRate, trigger: "change" },
					{
            type: "string",
            message:"原油变化率不能为空",
            trigger: "change"
          }
				],
				riseAndFall:[
					{ required: true,validator:addvalidRiseAndFall, trigger: "change" },
					{
            type: "number",
            message:"涨跌幅不能为空",
            trigger: "change"
          }
				],
				adjustmentRange:[
					{ required: true,validator:addvalidAdjustmentRange, trigger: "blur" },
					{
            type: "string",
            message:"对应调整度不能为空",
            trigger: "blur"
          }
				],
				monitorTime:[
					{ required: true,validator:addvalidMonitorTime, trigger: "blur" },
					{
            type: "string",
            message:"监测日期不能为空",
            trigger: "blur"
          }
				],
				nextPriceTime:[
					{ required: true,validator:addvalidNextPriceTime, trigger: "blur" },
					{
            type: "string",
            message:"下次调价时间不能为空",
            trigger: "blur"
          }
				],
				lastPrice:[
					{ required: true,validator:addvalidLastPrice, trigger: "blur" },
					{
            type: "string",
            message:"上一轮调价基础不能为空",
            trigger: "blur"
          }
				],
				remark:[
					{ required: false, trigger: "blur" },
					{
						type: "string",
						max:30,
            message:"不超过30个字符",
            trigger: "blur"
          }
				],
			},
			editruleValidate:{
				americanTime:[
					{ required: true,validator:editvalidAmericanTime, trigger: "change" },
					{
            type: "number",
            message:"美国时间不能为空",
            trigger: "change"
          }
				],
				oilChageRate:[
					{ required: true,validator:editvalidOilChageRate, trigger: "change" },
					{
            type: "string",
            message:"原油变化率不能为空",
            trigger: "change"
          }
				],
				riseAndFall:[
					{ required: true,validator:editvalidRiseAndFall, trigger: "change" },
					{
            type: "number",
            message:"涨跌幅不能为空",
            trigger: "change"
          }
				],
				adjustmentRange:[
					{ required: true,validator:editvalidAdjustmentRange, trigger: "blur" },
					{
            type: "string",
            message:"对应调整度不能为空",
            trigger: "blur"
          }
				],
				monitorTime:[
					{ required: true,validator:editvalidMonitorTime, trigger: "blur" },
					{
            type: "string",
            message:"监测日期不能为空",
            trigger: "blur"
          }
				],
				nextPriceTime:[
					{ required: true,validator:editvalidNextPriceTime, trigger: "blur" },
					{
            type: "string",
            message:"下次调价时间不能为空",
            trigger: "blur"
          }
				],
				lastPrice:[
					{ required: true,validator:editvalidLastPrice, trigger: "blur" },
					{
            type: "string",
            message:"上一轮调价基础不能为空",
            trigger: "blur"
          }
				],
				remark:[
					{ required: false, trigger: "blur" },
					{
						max:30,
            type: "string",
            message:"不超过30个字符",
            trigger: "blur"
          }
				],
			},
			total: 10, 
      showSizer: true,
			pageSizeOpts: [10,15,20,40,50,100,200],
			searchTime:{
				searchSatatTime:'',
				searchEndTime:''
			},
			params:{
				americanEndTime:'',
				americanStartTime:'',
				pageNum:1,
				pageSize:10,
				sign:''
			},
			offerdata:{
				AmericanTime:"",
			},
			offerdata1:{
				AmericanTime:"",
			},
			offerdata2:{
				AmericanTime:"",
			},
			addModal:false,
			addparams:{
				americanTime: "",
				oilChageRate: "",
				riseAndFall: "",
				adjustmentRange: "",
				monitorTime: "",
				nextPriceTime: "",		
				lastPrice: "",							
				remark: "",			
				version: 0
			},
			editModal:false,
			editparams:{
				id:'',
				americanTime: "",
				oilChageRate: "",
				riseAndFall: "",
				adjustmentRange: "",
				monitorTime: "",
				nextPriceTime: "",		
				lastPrice: "",							
				remark: "",			
				version: 0
			},
			updown:[
				{
					value:0,
					label:'上调',
				},
				{
					value:1,
					label:'下调',
				}
			],
			optionsAmerican:{
				disabledDate:date=> {
											return date && date.valueOf() <this.params.americanStartTime;
									}
			},
			options1:{
									disabledDate:date=> {
											return date && date.valueOf() <this.addparams.americanTime+24*60*60;
									}
							},
			options2:{
					disabledDate: date =>{
							return date && date.valueOf() < this.editparams.americanTime+24*60*60;
					}
			},
			data1:[],
			columns3:[
					{
						title:'ID',     
						key:'id',
						minWidth: 70,
						align: 'center'
					},
					{
						title: '美国时间',
						minWidth:100,
						key:'americanTime',
						align: 'center',
						render:(h,data)=>{
							
							const result=data.row.americanTime ? formatTime(data.row.americanTime) : "";
            	return h('div',{},result)
						}
					},{
						title:'原油变化率(%)',
						width:85,
						key:'oilChageRate',
						align:'center',
						render: (h,data)=>{
							const result =data.row.oilChageRate + '%'
							return h('div',{},result)
						}     
					},{
						title:'涨跌幅',
						width:60,
						key:'riseAndFall',
						align:'center' ,
						render:(h,data)=>{
							const updown={
								"0":"上调",
								"1":"下调"
							}
							const result=updown[data.row.riseAndFall] ? updown[data.row.riseAndFall] : '' ;
							return h('div',{},result)
						}  
					},{
						title:'对应调整幅度(元/吨)',
						width:100,
						key:'adjustmentRange',
						align:'center'
					},{
						title:'监测日期',
						minWidth:50,
						key:'monitorTime',
						align:'center'
					},{
						title:'下次调价时间',
						minWidth:100,
						key:'nextPriceTime',
						align:'center'   
					},{
						title:'上一轮调价基准(美元/桶)',
						width:110,
						key:'lastPrice',
						align:'center'  
					},{
						title:'备注',
						minWidth:80,
						key:'remark',
						align:'center',
						render:(h,data)=>{
							let result=""
							if(data.row.remark){
								if(data.row.remark.length>8){							
									result = data.row.remark.substr(0,8)+"..."							
								}else{
									result = data.row.remark
								}
							}
							return h('Tooltip',{
								props:{
												content: data.row.remark,
												placement:"left-start",
												maxWidth:"200px",
											}
							},result)						
						}
					},{
						title:'创建人',
						minWidth:70,
						key:'creatorName',
						align:'center'  
					},{
						title:'创建时间',
						minWidth:100,
						key:'createTime',
						align:'center'  
					},{
				title: "操作",
				align: "center",
				width: 115,
				render: (h, data) => {
					return h("div", [
						h(
							"a",
							{
								style: {
									marginRight: "5px",
									textDecoration: "none",
								},
								on: {
									click: () => {
										this.editModal=true;
										this.editFun(data)
									}
								}
							},
							"修改"
						),
						h(
							"a",
							{
								style: {
									marginRight: "5px",
									textDecoration: "none",
								},
								on: {
									click: () => {
										this.deleteFun(data)
									}
								}
							},
							"删除"
						),
						h(
							"a",
							{
								style: {
									textDecoration: "none",
								},
								on: {
									click: () => {
										this.copyFun(data);									
									}
								}
							},
							"复制"
						)
					]);
				}
			}],

    }
	},
	mounted(){
		this.tableList();
	},
	methods:{
		pageChange(page,size){
			if(size){
				this.params.pageNum=1;
				this.params.pageSize=size;
				this.tableList();
			}else{
				this.params.pageNum=page;
				this.tableList();
			}
			
		},
		tableList(){
			this.params.pageNum=this.params.pageNum;
			this.params.pageSize=this.params.pageSize;
			this.params.americanStartTime=this.params.americanStartTime;
			this.params.americanEndTime=this.params.americanEndTime;
			this.searchTime.searchSatatTime=this.searchTime.searchSatatTime;
			this.searchTime.searchEndTime=this.searchTime.searchEndTime;
			dataCenterDcoilrateList(this.params).then(res=>{
				if(res.response.list){
					this.total=res.response.total
					this.data1=res.response.list  
					this.params.pageSize=res.response.pageSize
				}else{
					this.data1=[];
					this.total=0;
					this.params.pageNum=1;
				}
				
			})
		},
		//起始日期
		changeSourseTime(a){
			this.params.americanStartTime=formatStamp(a) - 8 * 1000 * 60 * 60;
			console.log(this.params.americanStartTime)
			this.searchTime.searchSatatTime=a
			this.params.americanEndTime='';
			this.searchTime.searchEndTime='';
		},
		//结束日期
		changeEndTime(b){			
			this.params.americanEndTime=formatStamp(b) + 16 * 1000 * 60 * 60 - 1000;
			console.log(this.params.americanEndTime)
			this.searchTime.searchEndTime=b
		},
		//查询
		search(){
			this.params.pageNum=1;
			this.params.pageSize=10;
			this.tableList();
		},
		//重置
		reset(){
			this.params.pageNum=1;
			this.params.pageSize=10;
			this.params.americanStartTime="";
			this.params.americanEndTime="";
			this.searchTime.searchSatatTime="";
			this.searchTime.searchEndTime="";
			this.tableList();
		},
		//新增弹层打开
		addFun(){
			this.addModal=true;
			this.addparams={
				americanTime: "",
				oilChageRate: "",
				riseAndFall: "",
				adjustmentRange: "",
				monitorTime: "",
				nextPriceTime: "",		
				lastPrice: "",							
				remark: "",			
				version: 0
			}
		  this.offerdata={
				AmericanTime:"",
				MonitorTime:"",
				NextPrice:"",
			}
		},
		addAmericanTime(data){		
			this.addparams.americanTime=formatStamp(data) - 8 * 1000 * 60 * 60;
			this.offerdata.AmericanTime=data;
			console.log(this.addparams.americanTime)   
			this.addparams.nextPriceTime=""  
		},
		addNextPrice(data){	
			this.addparams.nextPriceTime=data
		},
		//确认保存
		submitAdd(name){
			let contrast=this.addparams.oilChageRate.indexOf('-');
			let reference=this.addparams.riseAndFall

			this.$refs[name].validate((valid)=>{
				if(valid){
					if(contrast!=-1 && reference==0){
						this.$Message.error('原油变化率与涨跌幅不符,请重新输入')
					}else if(contrast==-1 && reference==1){
						this.$Message.error('原油变化率与涨跌幅不符,请重新输入')
					}else{
						dataCenterDcoilrateSave(this.addparams).then(res=>{
							if(res.status==200){
								this.addModal=false;
								this.$Message.success('添加成功')
								this.tableList();
							}else{
								this.$Message.error(res.message)
							}
				
						})
					}					
					
				}
			})
			

		},
		editFun(data){
			//console.log(data)
		 dataCenterDcoilrateInfo({id:data.row.id}).then(res=>{
			 this.editparams.id=res.response.id
			 this.editparams.americanTime=res.response.americanTime;
			 this.editparams.oilChageRate=res.response.oilChageRate;
			 this.editparams.riseAndFall=res.response.riseAndFall;
			 this.editparams.adjustmentRange=res.response.adjustmentRange;
			 this.editparams.monitorTime=res.response.monitorTime.toString();
			 this.editparams.nextPriceTime=res.response.nextPriceTime;
			 this.editparams.lastPrice=res.response.lastPrice;
			 this.editparams.lastPrice=res.response.lastPrice;
			 this.editparams.remark=res.response.remark;
			 this.offerdata1.AmericanTime=formatTime(res.response.americanTime)
		 })
	
		},
		editAmericanTime(data){		
			this.editparams.americanTime=formatStamp(data) - 8 * 1000 * 60 * 60;
			this.offerdata1.AmericanTime=data;
      this.editparams.nextPriceTime=""
		},
		editNextPrice(data){	
			this.editparams.nextPriceTime=data
		},
		submitEdit(a){
			let contrast=this.editparams.oilChageRate.indexOf('-');
			let reference=this.editparams.riseAndFall
			//console.log('原油变化率：',contrast,'涨跌幅：',reference)
			this.$refs[a].validate((valid)=>{
				if(valid){
					if(contrast!=-1 && reference==0){
						this.$Message.error('原油变化率与涨跌幅不符,请重新输入')
					}else if(contrast==-1 && reference==1){
						this.$Message.error('原油变化率与涨跌幅不符,请重新输入')
					}else{
						dataCenterDcoilrateUpdate(this.editparams).then(res=>{
							if(res.status==200){
								this.editModal=false;
								this.$Message.success('修改成功')
								this.tableList();
							}
						})
					}
					
				}
			})
			
		},
		deleteFun(data){
			 var config = {
          title: "提示信息",
					content: "您确定删除此条数据？",
					onOk:()=>{
				    dataCenterDcoilrateDelete({id:data.row.id}).then(res=>{
							if(res.status==200){
								this.$Message.success('删除成功')
								this.tableList();
							}else{
								this.$Message.error(res.message);
							}
						})
					}
			 }
			this.$Modal.confirm(config);
		},
		copyFun(data){
			this.addModal=true;
			dataCenterDcoilrateInfo({id:data.row.id}).then(res=>{
			 this.addparams.americanTime=res.response.americanTime;
			 this.addparams.oilChageRate=res.response.oilChageRate;
			 this.addparams.riseAndFall=res.response.riseAndFall;
			 this.addparams.adjustmentRange=res.response.adjustmentRange;
			 this.addparams.monitorTime=res.response.monitorTime.toString();
			 this.addparams.nextPriceTime=res.response.nextPriceTime;
			 this.addparams.lastPrice=res.response.lastPrice;
			 this.addparams.lastPrice=res.response.lastPrice;
			 this.addparams.remark=res.response.remark;
			 this.offerdata.AmericanTime=formatTime(res.response.americanTime)
		 })
		},
	}
}   
</script>