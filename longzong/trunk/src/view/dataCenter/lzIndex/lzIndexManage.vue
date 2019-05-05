<style lang="less" scoped>

</style>
<template>
    <Row>
        <Col span="24">
			<Row class-name="current-position">
				当前位置：隆众指数 &nbsp;&nbsp;>>&nbsp;&nbsp;指数管理
			</Row>
		</Col>
			<Col span="24" class="search-form">
				<Form :label-width="100">
					<Row>
					<Col span="8">
						<FormItem label="指数名称：">
							<Input type="text" v-model="formItems.indexName" class="search-input"  placeholder="请输入指数名称"/>
						</FormItem>
					</Col>
					<Col span="8">
						<FormItem label="钢联指标：">
							<Input type="text" v-model="formItems.mysteelDataCode" class="search-input" placeholder="请输入钢联指标"/>
						</FormItem>
					</Col>
					<Col span="8">
						<FormItem label="品种：">
							<Input type="text" v-model="formItems.varietiesName" class="search-input" placeholder="请输入品种名称"/>
						</FormItem>
					</Col>
					<Col span="24" class="text-right" style="margin-bottom:20px;">
						<Button type="primary" @click="searchbtn">查询</Button>
						<Button @click="reset">重置</Button>
					</Col>
				</Row>
			</Form>
		</Col>
		<Col span="24" class="table-con">
			<Button type="primary" style="margin-bottom:20px;" @click="getAdd">添加</Button>
			<Table :columns="columns3" :data="tableData"></Table>
			<oil-page
				:total="total"
				:page-num="formItems.pageNum"
				:page-size="formItems.pageSize"
				@page-change="pageChange"
				:page-size-opts="pageSizeOpts"
				:show-sizer="showSizer">
			</oil-page>
		</Col>
		<!-- 新增弹窗开始 -->
		<Modal v-model="formModal" :title="titleName" width="600">
			<Row>
				<Form :label-width="160" :model="formItem" ref="formItem" :rules="addruleValidate">
					<FormItem label="指数名称:" prop="indexName">
						<Input type="text" v-model="formItem.indexName" :autofocus="codeFocus" @on-blur="onBlurName" class="search-input"  placeholder="请输入指数名称"/>
					</FormItem>
					<FormItem label="钢联指标:" prop="mysteelDataCode">
						<Input type="text" v-model="formItem.mysteelDataCode" class="search-input"  placeholder="请输入钢联指标" />
					</FormItem>
					<FormItem prop="varietiesName" label="品种:">
						<Select
                v-model="formItem.varietiesId"
                ref="input1"
                @on-query-change="emptyQuery2"
                class="search-input"
                filterable
                remote
                transfer
                label-in-value
                @on-change="change1"
                :remote-method="remoteMethod1"
                :loading="loading">
                <Option v-for="(option, index) in varietiesNameList" :value="option.id" :key="index">{{option.text}}                                   </Option>
              </Select>
						<!-- <associate-Search @query-list="getVarieties" :dataUrl="url" ref="VarietiesRef"></associate-Search> -->
					</FormItem>
				</Form>
			</Row>
			<div slot="footer">
				<i-button type="primary" @click="addbtn" class="search-btn">确定</i-button>
				<i-button @click="formModal=false" class="search-btn">取消</i-button>
			</div>
		</Modal>
    </Row>
</template>
<script>
import OilPage from "../../components/page/page.vue"; // dataCenterCodeUniq
import { dclzindexList,dclzindexSave,dclzindexDelete,dclzindexInfo,dclzindexUpdate,getDataCenterBreedList,dataCenterIndexNameUniq} from '../../components/axios/dataCenter.js';
import { formData } from "../../../assets/js/common.js";
import associateSearch from "../../components/associateSearch/associateSearchColl.vue";
import { valid } from 'semver';
export default {
	name: 'lzIndexManage',
	components:{
		OilPage,
		associateSearch
	},
	watch:{
		formModal(newVal, oldVal) {
      if (newVal == true) {
				this.$refs["formItem"].resetFields();
				this.formItem.indexName="",
				this.formItem.mysteelDataCode="",
				this.formItem.varietiesId=""
      }
    },
	},
  data(){
		const indexValidte=(rule,value,callback)=>{
			let params = {
				id: this.editId == undefined ? "" : this.editId,
				name:this.formItem.indexName,
			}
			if(this.formItem.indexName===''){
				callback(new Error('指数名称不能为空'))
			}
			dataCenterIndexNameUniq(params).then(res=>{
				if(res.status=="200" && res.response==1){
					callback("该指数名称已存在，请重新输入")
				}else {
					callback();
				}
			})
		}
		const DataCodeValidte = (rule, value, callback) => {
			if (this.formItem.mysteelDataCode === '') {
					callback(new Error('钢联指标不能为空'));
			}else {
				callback();
			}
    };
		const varietiesNameValidte = (rule, value, callback) => {
			var varietiesId = this.formItem.varietiesId;
			if (!varietiesId) {
				callback(new Error('品种不能为空'));
			}else {
				callback();
			}
		};
    return {
			addruleValidate:{
				indexName:[{ required: true, validator: indexValidte, trigger: "blur" },
				{
            type: "string",
            max: 30,
            message: "指数名称不能超过30个字符",
            trigger: "blur"
          }],
				mysteelDataCode:[{ required: true, validator: DataCodeValidte,trigger: "blur", },
				{
            type: "string",
            max: 20,
            message: "钢联指标不能超过20个字符",
            trigger: "blur"
          }],
				varietiesName:[{ required: true, validator:varietiesNameValidte, trigger: "change" },],
			},
			formItems:{
				pageNum: 1,
				pageSize: 10
			},
			titleName:"新增",
			loading:false,
			submitAdd:true,
			name:'',
			varietiesNameList:{},
			total: 0,
			formModal:false,
			codeFocus:false,
      showSizer: true,
			pageSizeOpts: [10,15,20,40,50,100,200],
			addModal:false,
			edit:{
				varietiesId:"",
				varietiesName:'',
				indexName:'',
				mysteelDataCode:''
			},
			copy:{
				varietiesId:"",
				varietiesName:'',
				indexName:'',
				mysteelDataCode:''
			},
			breedList: [],
			editId:'',
			copyid:'',
			varietiesId:'',
			formItem:{
				varietiesId:"",
				varietiesName:'',
				indexName:'',
				mysteelDataCode:''
			},
			tableData:[],
			columns3:[
					{
						key:'id',
						title:'ID',
						minWidth: 60,
						align: 'center'
					},
					{
						title: '指数名称',
						minWidth: 120,
						key:'indexName',
						align: 'center'
					},{
						title:'钢联指标',
						minWidth:120,
						key:'mysteelDataCode',
						align:'center'
					},{
						title:'品种',
						minWidth:120,
						key:'varietiesName',
						align:'center'
					},{
						title:'创建人',
						minWidth:120,
						key:'creatorName',
						align:'center'
					},{
						title:'创建时间',
						minWidth:150,
						key:'createTime',
						align:'center'
					},
					{
				title: "操作",
				align: "center",
				minWidth: 200,
				render: (h, data) => {
					return h("div", [
						h(
							"a",
							{
								style: {
									marginRight: "20px",
									textDecoration: "none",
								},
								on: {
									click: () => {
										this.titleName="修改"
										this.formModal=true;
										this.editId = data.row.id,
										this.getDetail(data.row.id)
									}
								}
							},
							"修改"
						),
						h(
							"a",
							{
								style: {
									marginRight: "20px",
									textDecoration: "none",
								},
								on: {
									click: () => {
										this.confirm(data.row.id);
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
										this.titleName="复制"
										this.formModal=true;
										this.getDetail(data.row.id)
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
	methods:{
		remoteMethod1(query){
      if (query !== "") {
        this.loading = false;
        let params = {
          name: query
        }
         setTimeout(() => {
          this.loading = false;
          getDataCenterBreedList(formData(params)).then(res => {
            this.varietiesNameList = res.response;
            // console.log(this.varietiesNameList)
          });
        }, 200);
      } else {
        this.options1 = []
      }
		},
		change1(option){
      this.formItem.varietiesId = option.value
      this.formItem.varietiesName = option.label
		},
		emptyQuery2(query){
      if(query == ''){
        this.$refs.input1.query=''
        this.formItem.varietiesId = ''
      }
		},
		// 失去焦点时验证指数名称唯一性
		onBlurName(){
			// dataCenterIndexNameUniq(params).then(res=>{
      //   if(res.status=="200" && res.response==1){
      //     this.$Message.warning("该指数名称已存在，请重新输入");
      //   }else if(res.status=="200" && res.response==0){
      //     let that=this;
      //     setTimeout(function(){
      //       that.codeFocus=true;
      //     },1500)
      //   }
      // })
		},
		// 分页
		pageChange(page, size) {
      if (size) {
        this.formItems.pageNum = 1;
        this.formItems.pageSize = size;
      } else {
        this.formItems.pageNum = page;
      }
      this.getTableList();
		},
		//查询
		searchbtn(){
			this.formItems.pageNum=1;
			this.formItems.pageSize=10;
			this.getTableList();
		},
		// 列表
		getTableList(){
			this.$Spin.show();
			let params = {
        pageSize: this.formItems.pageSize,
				pageNum: this.formItems.pageNum,
				indexName: this.formItems.indexName,
				mysteelDataCode: this.formItems.mysteelDataCode,
				varietiesName: this.formItems.varietiesName,
			};
			dclzindexList(params).then(res=>{
				// console.log(res)
				this.$Spin.hide();
				this.tableData = res.response.list || [];
				this.total = res.response.total;
				// console.log("tableData",this.tableData)
			})
		},
		getAdd(){
			this.formModal=true;
			this.titleName="新增"
		},
		// 根据ID获取数据
		getDetail(data){
			dclzindexInfo({id:data}).then(res=>{
				res.response.varietiesName = res.response.varietiesName +"",
				this.formItem = res.response;
				this.varietiesNameList=[
          {
            id:this.formItem.varietiesId,
            text:this.formItem.varietiesName
          }
        ];  
				// console.log(this.formItem.varietiesName)
			})
		},
		// 重置
		reset(){
			this.formItems = {
				pageNum: 1,
				pageSize: 10,
				indexName:"",
				varietiesName:'',
				mysteelDataCode:''
			}
			this.getTableList();
		},
		// 删除（list表格）
    confirm(dt){
      let that=this;
      this.$Modal.confirm({
				title: '提示信息：',
				content: '<p>您确定要删除？</p>',
				onOk:()=>{
					dclzindexDelete({id:dt}).then(res=>{
						if(res.status=="200"){
						this.$Message.success("删除成功！");
						that.getTableList();
						}
					})
				},
				onCancel:()=> {
				
				}
      });
		},
		// 新增/修改/复制
		addbtn(){
			let _this = this;
			this.$refs.formItem.validate(valid =>{
				if(valid){
					if(this.submitAdd){
						this.submitAdd = false;
						// console.log(valid);
						let params = {
							"id": this.editId ? this.editId : '',
							"indexName": this.formItem.indexName,
							"lastAccess": this.formItem.lastAccess,
							"mysteelDataCode": this.formItem.mysteelDataCode,
							"varietiesId": this.formItem.varietiesId,
							"varietiesName": this.formItem.varietiesName,
							"version": 0
						};
						if(this.titleName=='新增' || this.titleName=="复制"){
              dclzindexSave(params).then(res=>{
                this.formModal=false;
                if(res.status=="200"){
                  this.$Message.success("添加成功！");
                  this.getTableList();
                }
              })
            }else if(this.titleName=="修改"){
              //调用修改接口  
              dclzindexUpdate(params).then(res=>{
                  this.formModal = false;
                  if(res.status=="200"){
                    this.$Message.success("修改成功！");
                    this.getTableList();
                  }
              })
            }
					}else {
							this.$Message.error(res.message);
						}
						this.submitAdd = true;
				}
			})
		},
	},
	mounted() {
    this.getTableList()
  }
}
</script>
