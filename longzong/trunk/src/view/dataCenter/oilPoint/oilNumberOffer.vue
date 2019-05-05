<style lang="less" scoped>
  
</style>
<template>
    <Row>
        <Col span="24">
					<Row class-name="current-position">
						当前位置：原油整点&nbsp;&nbsp;>>&nbsp;&nbsp;原油整点报盘						
					</Row>
				</Col>
        <Col span="24" class="search-form">
					<Form :label-width="100">
            <Row>
							<Col span="24">
								<FormItem label="报盘日期：">
										<DatePicker type="date" @on-change="changeSourseTime" :value="searchTime.searchSatatTime" style="width: 200px"></DatePicker>
										&nbsp;&nbsp;至&nbsp;&nbsp;
										<DatePicker type="date" :options="options" @on-change="changeEndTime" :value="searchTime.searchEndTime" style="width: 200px"></DatePicker>
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
					<Table :columns="columns" :data="data1"></Table>
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
							<FormItem label="报盘日期:" prop="offerData">
								<DatePicker type="date" @on-change="addofferdata" :value="offerdata1.adddata"  style="width:300px"></DatePicker>
							</FormItem>  							
							<FormItem label="整点时间:" prop="offerpointTime">
								<Select style="width:300px" v-model="addparams.offerPointTime" >
									<Option v-for="item in wholeTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</FormItem>
							<FormItem label="当前WTI合约月份:" prop="wtiDate">
								<DatePicker type="month" @on-change="addwtidata" format="yyyy-MM" :value="addparams.wtiDate" style="width:300px"></DatePicker>
							</FormItem>
							<FormItem label="WTI:" prop="wti">
								<Input v-model="addparams.wti" class="search-input" style="width:300px"/>
							</FormItem>
							<FormItem label="当前布伦特合约月份:" prop="bltDate">
								<DatePicker type="month" @on-change="addbltdata" format="yyyy-MM" :value="addparams.bltDate" style="width: 300px"></DatePicker>
							</FormItem>
							<FormItem label="布伦特:" prop="blt">
								<Input v-model="addparams.blt" class="search-input" style="width:300px"/>
							</FormItem>
						</Form>
					</Row>
					<div slot="footer">
						<i-button type="primary" @click="submitAdd('addFormValidate')" class="search-btn">确定</i-button>
						<i-button @click="addCancel()" class="search-btn">取消</i-button>
					</div>
				</Modal>
    		<!-- 新增弹窗结束 -->
				<!-- 修改弹窗开始 -->
				<Modal v-model="editModal" title="修改" width="600"> 
					<Row>
						<Form :label-width="160" :model="editparams" ref="editFormValidate" :rules="editruleValidate">							
							<FormItem label="报盘日期:" prop="offerData">
								<DatePicker type="date" @on-change="editofferdata" :value="offerdata1.editdata" style="width:300px"></DatePicker>
							</FormItem>  							
							<FormItem label="整点时间:" prop="offerpointTime">
								<Select style="width:300px" v-model="editparams.offerPointTime" >
									<Option v-for="item in wholeTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</FormItem>
							<FormItem label="当前WTI合约月份:" prop="wtiDate">
								<DatePicker type="month" @on-change="editwtidata"  :value="editparams.wtiDate" style="width:300px"></DatePicker>
							</FormItem>
							<FormItem label="WTI:" prop="wti">
								<Input v-model="editparams.wti" class="search-input" style="width:300px"/>
							</FormItem>
							<FormItem label="当前布伦特合约月份:" prop="bltDate">
								<DatePicker type="month" @on-change="editbltdata"  :value="editparams.bltDate"  style="width:300px"></DatePicker>
							</FormItem>
							<FormItem label="布伦特:" prop="blt">
								<Input v-model="editparams.blt" class="search-input" style="width:300px"/>
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
import {
	dataCenterDcoilpointList,
	dataCenterDcoilpointSave,
	dataCenterDcoilpointInfo,
	dataCenterDcoilpointDelete,
	dataCenterDcoilpointEdit
} from "../../components/axios/dataCenter.js"
import OilPage from "../../components/page/page.vue";
import { formData,formatStamp,formatTime } from "../../../assets/js/common.js";
export default {
	name: 'oilNumberOffer',
	components:{
		OilPage
	},
	watch:{
		editModal(newVal,oldVal){
			if(newVal == true){
        this.$refs['addFormValidate'].resetFields()
			}
		},
		addModal(newVal,oldVal){
			if(newVal == true){
				this.$refs['addFormValidate'].resetFields()
			}
		}
	},
  data(){
		const addvalidOfferDate=(rule ,value , callback)=>{

			var offerDate = this.addparams.offerDate 
      if(offerDate==""){
				callback(new Error('报盘日期不能为空'))
			}
			if(isNaN(offerDate)){
				callback(new Error('报盘日期不能为空'))
			}
			else{
				callback();
			}
		};
		const addvalidOfferPointTime=(rule ,value , callback)=>{
			if(this.addparams.offerPointTime==""){
				callback(new Error('整点时间不能为空'))
			}else{
				callback();
			}
		};
		const addvalidWtiDate=(rule , value , callback)=>{
			if(this.addparams.wtiDate==""){
				callback(new Error('当前WTI合约日期不能为空'))
			}else{
				callback();
			}
		};
		const addvalidWti=(rule , value , callback )=>{
			var regwti2 = /^[0-9]*\.?[0-9]*[0-9]$/g;		
			let str1 = value.trim()
			let str2 = value.indexOf('.')
			let str3 = value.indexOf('0')
			if(str1==""){
				callback(new Error('wti不能为空'))
			}else if( !regwti2.test(str1)){
				callback(new Error('请输入正确数字'))
			}else if(str1.length>10){
				callback(new Error('最多输入10位'))
			}else if(str2==0){
				callback(new Error('请输入正确数字'))
			}else if(str2==-1 && str3==0){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
			
		};
		const addvalidbltDate=(rule ,value , callback)=>{
			if(this.addparams.bltDate==""){
				callback(new Error('当前布伦特不能为空'))
			}else{
				callback();
			}
		};
		const addvalidblt=(rule ,value , callback)=>{
			var regblt2 = /^[0-9]*\.?[0-9]*[0-9]$/g;		
			let str1 = value.trim()
			let str2 = value.indexOf('.')
			let str3 = value.indexOf('0')
			if(str1==""){
				callback(new Error('布伦特不能为空'))
			}else if( !regblt2.test(str1)){
				callback(new Error('请输入正确数字'))
			}else if(str1.length>10){
				callback(new Error('最多输入10位'))
			}else if(str2==0){
				callback(new Error('请输入正确数字'))
			}else if(str2==-1 && str3==0){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
		};
		const editvalidOfferDate=(rule ,value , callback)=>{
			var offerDate = this.editparams.offerDate 
      if(offerDate==""){
				callback(new Error('报盘日期不能为空'))
			}
			if(isNaN(offerDate)){
				callback(new Error('报盘日期不能为空'))
			}
			else{
				callback();
			}
		};
		const editvalidOfferPointTime=(rule ,value , callback)=>{
			if(this.editparams.offerPointTime==""){
				callback(new Error('整点时间不能为空'))
			}else{
				callback();
			}
		};
		const editvalidWtiDate=(rule , value , callback)=>{
			if(this.editparams.wtiDate==""){
				callback(new Error('当前WTI合约日期不能为空'))
			}else{
				callback();
			}
		};
		const editvalidWti=(rule , value , callback )=>{
			var regwti2 = /^[0-9]*\.?[0-9]*[0-9]$/g;		
			let str1 = value.trim()
			let str2 = value.indexOf('.')
			let str3 = value.indexOf('0')
			if(str1==""){
				callback(new Error('wti不能为空'))
			}else if( !regwti2.test(str1)){
				callback(new Error('请输入正确数字'))
			}else if(str1.length>10){
				callback(new Error('最多输入10位'))
			}else if(str2==0){
				callback(new Error('请输入正确数字'))
			}else if(str2==-1 && str3==0){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
			
		};
		const editvalidbltDate=(rule ,value , callback)=>{
			if(this.editparams.bltDate==""){
				callback(new Error('当前布伦特时间不能为空'))
			}else{
				callback();
			}
		};
		const editvalidblt=(rule ,value , callback)=>{
			var regblt2 = /^[0-9]*\.?[0-9]*[0-9]$/g;		
			let str1 = value.trim()
			let str2 = value.indexOf('.')
			let str3 = value.indexOf('0')
			if(str1==""){
				callback(new Error('布伦特不能为空'))
			}else if( !regblt2.test(str1)){
				callback(new Error('请输入正确数字'))
			}else if(str1.length>10){
				callback(new Error('最多输入10位'))
			}else if(str2==0){
				callback(new Error('请输入正确数字'))
			}else if(str2==-1 && str3==0){
				callback(new Error('请输入正确数字'))
			}else{
				callback();
			}
		};
    return {
			addruleValidate:{
				offerData:[
					{ required: true,validator:addvalidOfferDate, trigger: "change" },
					{
            type: "number",
            message:"报盘日期不能为空",
            trigger: "change"
          }
				],
				offerpointTime:[
					{ required: true,validator:addvalidOfferPointTime, trigger: "change" },
					{
            type: "string",
            message:"整点时间不能为空",
            trigger: "change"
          }
				],
				wtiDate:[
					{ required: true,validator:addvalidWtiDate, trigger: "change" },
					{
            type: "string",
            message:"当前WTI合约日期不能为空",
            trigger: "change"
          }
				],
				wti:[
					{ required: true,validator:addvalidWti, trigger: "blur" },
					{
            type: "string",
            message:"WTI不能为空",
            trigger: "blur"
          }
				],
				bltDate:[
					{ required: true,validator:addvalidbltDate, trigger: "change" },
					{
            type: "string",
            message:"当前布伦特合约日期不能为空",
            trigger: "change"
          }
				],
				blt:[
					{ required: true,validator:addvalidblt, trigger: "blur" },
					{
            type: "string",
            message:"布伦特不能为空",
            trigger: "blur"
          }
				]

			},
			editruleValidate:{
				offerData:[
					{ required: true,validator:editvalidOfferDate, trigger: "change" },
					{
            type: "number",
            message:"报盘日期不能为空",
            trigger: "change"
          }
				],
				offerpointTime:[
					{ required: true,validator:editvalidOfferPointTime, trigger: "change" },
					{
            type: "string",
            message:"整点时间不能为空",
            trigger: "change"
          }
				],
				wtiDate:[
					{ required: true,validator:editvalidWtiDate, trigger: "change" },
					{
            type: "string",
            message:"当前WTI合约日期不能为空",
            trigger: "change"
          }
				],
				wti:[
					{ required: true,validator:editvalidWti, trigger: "blur" },
					{
            type: "string",
            message:"WTI不能为空",
            trigger: "blur"
          }
				],
				bltDate:[
					{ required: true,validator:editvalidbltDate, trigger: "change" },
					{
            type: "string",
            message:"当前布伦特合约日期不能为空",
            trigger: "change"
          }
				],
				blt:[
					{ required: true,validator:editvalidblt, trigger: "blur" },
					{
            type: "string",
            message:"布伦特不能为空",
            trigger: "blur"
          }
				]

			},
			total: 10, 
      showSizer: true,
			pageSizeOpts: [10,15,20,40,50,100,200],
			searchTime:{
				searchSatatTime:'',
				searchEndTime:''
			},
			addModal:false,
			params:{
				offerDateStartTime:'',
				offerDateEndTime:'',
				pageNum:1,
				pageSize:10,
				sign:""
			},
			addparams:{
				blt: "",
				bltDate: "",
				offerDate: "",
				offerPointTime: "",
				wti: "",
				wtiDate: ""
			},
			offerdata1:{
				adddata:"",
				editdata:"",
				copy:"",
			},
			editModal:false,
			editparams:{
				blt: "",
				bltDate: "",
				createTime: "",
				creatorId: "",
				creatorName: "",
				id: "",
				lastAccess: "",
				offerDate: "",
				offerPointTime: "",
				operatorId: "",
				operatorName: "",
				sign: "",
				version: "",
				wti: "",
				wtiDate: ""
			},		
			wholeTime:[
				{
					value:"6:00",
					label:'6:00',
				},
				{
					value:'7:00',
					label:'7:00',
				},
				{
					value:'8:00',
					label:'8:00',
				},
				{
					value:'9:00',
					label:'9:00',
				},
				{
					value:'10:00',
					label:'10:00',
				},
				{
					value:'11:00',
					label:'11:00',
				},
				{
					value:'12:00',
					label:'12:00',
				},
				{
					value:'13:00',
					label:'13:00',
				},
				{
					value:'14:00',
					label:'14:00',
				},
				{
					value:'15:00',
					label:'15:00',
				},
				{
					value:'16:00',
					label:'16:00',
				},
				{
					value:'17:00',
					label:'17:00',
				}
			],
			sureSubmit:true,
			data1:[],
			columns:[
					{
						title:'ID',     
						key:'id',
						width: 80,
						align: 'center'
					},
					{
						title: '报盘日期',
						minWidth: 100,
						key:'offerDateDesc',
						align: 'center'
					},{
						title:'整点时间',
						width:80,
						key:'offerPointTime',
						align:'center'       
					},{
						title:'前WTI合约月份',
						minWidth:120,
						key:'wtiDate',
						align:'center'
					},{
						title:'WTI',
						minWidth:80,
						key:'wti',
						align:'center'
					},{
						title:'当前布伦特合约月份',
						minWidth:130,
						key:'bltDate',
						format:"yyyy-MM",
						align:'center'
					},{
						title:'布伦特',
						minWidth:80,
						key:'blt',
						align:'center'   
					},{
						title:'创建人',
						minWidth:100,
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
										this.editFun(data);
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
			options: {
					disabledDate :(date)=> {
							return date && date.valueOf() < this.params.offerDateStartTime;
					}
			},
    }
	},
	mounted(){
		this.tableList();
	},
	methods:{
		//获取列表
		tableList(){
			this.params={
				offerDateStartTime:undefined ? '' : this.params.offerDateStartTime,
				offerDateEndTime:undefined ? '' : this.params.offerDateEndTime,
				pageNum:this.params.pageNum,
				pageSize:this.params.pageSize,
			}
			dataCenterDcoilpointList(this.params).then(res=>{
				//console.log(res.response)
				if(res.response.list){
					this.total=res.response.total;
					this.params.pageSize=res.response.pageSize
					this.data1=res.response.list
				}else{	
					this.total=0;
					this.params.pageSize=10
					this.data1=[]
				}
				
			})
		},
		//分页
		pageChange(page,size){
		  if(size){
				this.params.pageNum=1;
				this.params.pageSize=size
			}else{
				this.params.pageNum=page;
			}
			this.tableList();
		},
		//起始日期
		changeSourseTime(a){
			this.params.offerDateStartTime=formatStamp(a) - 8 * 1000 * 60 * 60;
			console.log(this.params.offerDateStartTime)
			this.searchTime.searchSatatTime=a
			this.params.offerDateEndTime=''
			this.searchTime.searchEndTime=''
		},
		//结束日期
		changeEndTime(b){			
			this.params.offerDateEndTime=formatStamp(b) + 16 * 1000 * 60 * 60 - 1000;
			//console.log(this.params.offerDateEndTime)
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
			this.params.offerDateStartTime="";
			this.params.offerDateEndTime="";
			this.searchTime.searchSatatTime="";
			this.searchTime.searchEndTime="";
			this.tableList();
		},
		copyFun(data){
			this.addModal=true;
			dataCenterDcoilpointInfo({id:data.row.id}).then(res=>{
				 //console.log(res)
				 this.addparams={
					 	blt: res.response.blt,
						bltDate: res.response.bltDate,
						offerDate: res.response.offerDate,
						offerPointTime: res.response.offerPointTime,
						sign: res.response.sign,
						wti: res.response.wti,
						wtiDate: res.response.wtiDate
				 }
				 this.offerdata1.adddata=formatTime(res.response.offerDate);
			 })

		},
		addFun(){
			this.addModal=true;
			this.addparams={
				blt: "",
				bltDate: "",
				offerDate: "",
				offerPointTime: "",
				wti: "",
				wtiDate: ""
			}
			this.offerdata1={
				adddata:"",
				editdata:"",
				copy:"",
			}
		},
		addofferdata(data){
			
			this.addparams.offerDate=formatStamp(data) - 8 * 1000 * 60 * 60;
			this.offerdata1.adddata=data;
      
		},
		addwtidata(data){
			this.addparams.wtiDate=data
		},
		addbltdata(data){
			this.addparams.bltDate=data
		},
		submitAdd(name){
			//console.log(this.addparams.offerDate)
			this.$refs[name].validate((valid)=>{
				if(valid){
					dataCenterDcoilpointSave(this.addparams).then(res=>{
						//console.log(this.addparams)
						//console.log(res)
						if(res.status==200){
							this.addModal=false;
							this.$Message.success('添加成功')
							this.tableList();
						}else{
							this.$Message.error(res.message)
						}
					})
	
				}
			})

		},
		//新增取消
		addCancel(){
			this.addModal=false;
			this.addparams={
				blt: "",
				bltDate: "",
				offerDate: "",
				offerPointTime: "",
				wti: "",
				wtiDate: ""
			}
		},
		//修改
		editFun(data){
			 this.editModal=true;
			 dataCenterDcoilpointInfo({id:data.row.id}).then(res=>{
				
				 this.editparams={
					 	blt: res.response.blt,
						bltDate: res.response.bltDate,
						createTime: res.response.createTime,
						creatorId: res.response.creatorId,
						creatorName: res.response.creatorName,
						id: res.response.id,
						lastAccess: res.response.lastAccess,
						offerDate: res.response.offerDate,
						offerPointTime: res.response.offerPointTime,
						operatorId: res.response.operatorId,
						operatorName: res.response.operatorName,
						sign: res.response.sign,
						version: res.response.version,
						wti: res.response.wti,
						wtiDate: res.response.wtiDate
				 }
				 this.offerdata1.editdata=formatTime(res.response.offerDate);
				 //console.log(this.editparams)
			 })
		},
		editofferdata(data){		
			this.editparams.offerDate=formatStamp(data) - 8 * 1000 * 60 * 60;
			this.offerdata1.editdata=data;
      
		},
		editwtidata(data){
			this.editparams.wtiDate=data
		},
		editbltdata(data){
			this.editparams.bltDate=data
		},
		//修改确定
		submitEdit(a){
			console.log(this.editparams)
			this.$refs[a].validate((valid)=>{
				if(valid){
					dataCenterDcoilpointEdit(this.editparams).then(res=>{
						console.log(res)
						if(res.status==200){
							this.editModal=false;
							this.$Message.success('修改成功')
							this.tableList();
						}
					})
				}
			})		
		},
		deleteFun(data){
			console.log(data)
			 var config = {
          title: "提示信息",
					content: "您确定删除此条数据？",
					onOk:()=>{
				    dataCenterDcoilpointDelete({id:data.row.id}).then(res=>{
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
		

	}
}   
</script>