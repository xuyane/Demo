<style lang="less" scoped>
.tab {
  padding: 20px 50px 0 50px ;
}
.text-right {
  text-align: right;
}
.my-account-conter {
  background: #fff;
}
.font-14 {
  font-size: 14px;
}
.font-c-blue {
  color: #145edb;
}
.mrb-20 {
  margin-bottom: 20px;
}
.mrb-10 {
  margin-bottom: 10px;
}
.mrl-45{
  margin-left: 45px;
}
.font-w{
  font-weight: 600;
}
@media screen and (max-width: 1400px) {
	.ivu-col-span-3 {
		display: block;
		width: 25%;
	}
}
</style>

<template >
  <Row class='varietybox'>
    <Col span="24" class-name="search-form">
        <Form ref="form" :model="form" :label-width="120">
            <Row type="flex" justify="space-between">
                <Col span='6'>
                  <FormItem label="日期:" :label-width="100">
                    <DatePicker v-model="form.dateRange" @on-change="dateChange" type="daterange" :clearable = "false" split-panels class="search-input" placement="bottom-end" placeholder="选择统计时间范围" ></DatePicker>
                  </FormItem>
                </Col>
                <Col span='6'>
                  <FormItem label="产业链:" :label-width="100">
                    <Input type="text" v-model="form.modelName" class="search-input" readonly @on-focus="getBranchDataValue" placeholder="请选择部门"></Input>
                  </FormItem>
                </Col>
                <Col span='6'>
                  <FormItem label="姓名:" :label-width="100">
                     <associatereport-Search @query-list="adminFunction" :dataUrl="urlAdmin" :orgIdList="branchIds" ref="adminRef" class="form-select"></associatereport-Search>
                  </FormItem>
                </Col>
                <Col span="6" class="text-right">
                    <Button type="primary" @click="search">查询</Button>
                    <Button style="margin-left: 8px" @click="reset">重置</Button>
                </Col>
            </Row>
             <!-- 产业链树 -->
          <Modal v-model="BranchModel" @on-cancel="cancel" @on-ok="onOk">
            <div style="max-height: 300px;overflow: auto;">
              <Tree
                :data="BranchDataTree" ref="branchRef" :load-data="loadBranchData" show-checkbox  @on-check-change="onCheckChange"
              ></Tree>
            </div>
          </Modal>
        </Form>
    </Col>
    <Col span="24">
        <Row class-name="table-con tab">
          <Col span="24 mrb-20">
            <Button  type="primary" @click="exportReport">导出</Button>
          </Col>
          <Row class="font-14 mrb-10 mrl-45" v-for="item in accountForm" :key="item.index"> 
            <Col span="3 font-w">{{dataType[item.fblx]}}</Col>
              <Col span="3">应发布单元数: <span class="font-c-blue">{{item.yfbcs}}</span> </Col>
            <Col span="3">实际发布单元数: <span class="font-c-blue">{{item.sjfbcs}}</span> </Col>
            <Col span="3">异常发布次数: <span class="font-c-blue">{{item.ycfbcs}}</span> </Col>
            <Col span="3">发布任务完成率: <span class="font-c-blue">{{((item.wcl)*100).toFixed(2) + '%'}}</span> </Col>
            <Col span="3">发布任务合格率: <span class="font-c-blue">{{((item.hgl)*100).toFixed(2) + '%'}}</span> </Col>
            <Col span="3">质检错误次数: <span class="font-c-blue">{{item.zjcwcs}}</span> </Col>
            <Col span="3">投诉次数: <span class="font-c-blue">{{item.khtscs}}</span> </Col>
          </Row>
          <Col span="24">
            <Table class="tableCommon" border :columns="columns" :data="tableData"></Table>
          </Col>
          <div class="page-con">
              <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
          </div>
        </Row>
    </Col>
    <!-- 异常次数弹窗开始 -->
	<Modal v-model="yccsValueModal"  title="异常发布信息" width="1000">
		<Table class="tableCommon" border :columns="columns1" :data="tableData1"></Table>
		<div class="page-con">
			<oil-page :total="total1" :page-num="pageNum1" :page-size="pageSize1" @page-change="pageChange1" :page-size-opts="pageSizeOpts1" :show-sizer="showSizer1"></oil-page>
		</div>
		<div slot="footer">
			<i-button type="primary" @click="yccsValueModal=false">返回</i-button>
		</div>
	</Modal>
    <!-- 异常次数弹窗结束 -->

	<!-- 客户投诉次数弹窗开始 -->
	<Modal v-model="khtscsValueModal"  title="投诉信息" width="1000">
		<Table class="tableCommon" border :columns="columns2" :data="tableData2"></Table>
		<div class="page-con">
			<oil-page :total="total2" :page-num="pageNum2" :page-size="pageSize2" @page-change="pageChange2" :page-size-opts="pageSizeOpts2" :show-sizer="showSizer2"></oil-page>
		</div>
		<div slot="footer">
			<i-button type="primary" @click="khtscsValueModal=false">返回</i-button>
		</div>
	</Modal>
    <!-- 客户投诉次数弹窗结束 -->

	<!-- 质量检测错误弹窗开始 -->
	<Modal v-model="zljccsValueModal"  title="质检信息" width="1200">
		<Table class="tableCommon" border :columns="columns3" :data="tableData3"></Table>
		<div class="page-con">
			<oil-page :total="total3" :page-num="pageNum3" :page-size="pageSize3" @page-change="pageChange3" :page-size-opts="pageSizeOpts3" :show-sizer="showSizer3"></oil-page>
		</div>
		<div slot="footer">
			<i-button type="primary" @click="zljccsValueModal=false">返回</i-button>
		</div>
	</Modal>
  <!-- 质量检测错误弹窗结束 -->
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { querySingleMsgPublish, singleFbExcept,list_page_single, list_page_single_zjcwcs, list_page_single_khtscs } from "../../components/axios/produceReport.js";
import { formData,formatTime,formatTime33 } from "../../../assets/js/common.js";
import associatereportSearch from "../../components/associateSearch/associateReportSearch.vue";
export default {
  name: "infoPersonCollectionReport",
  components: {
    oilPage,
    associatereportSearch
  },
  data() { 
    return {
		loading: false,
    accountForm:[],
		pageSizeOpts: [10, 20, 50, 100, 200],
		showSizer: true,
		loading:false,
		pageSize: 10,
		pageNum: 1,
    total: 0,
    total1:0,
		total2:0,
    total3:0,
    	pageSizeOpts1: [10, 20, 50, 100, 200],
		showSizer1: true,
		pageSize1: 10,
		pageNum1: 1,
		pageSizeOpts2: [10, 20, 50, 100, 200],
		showSizer2: true,
		pageSize2: 10,
		pageNum2: 1,
		pageSizeOpts3: [10, 20, 50, 100, 200],
		showSizer3: true,
		pageSize3: 10,
    pageNum3: 1,
		yccsValueModal:false,
		khtscsValueModal:false,
		zljccsValueModal:false,
    urlAdmin:"/report/zxbjxxfb/queryEmpByOrgId",
		BranchDataTree:[],
    treeData: [],
    tableData1: [],
		tableData2: [],
		tableData3: [],
    branchIds : [],
    branchTitle : [],
		BranchModel: false,
		qType:"",
		qId:"",
		yId:"",
		yType:"",
		tId:"",
		tType:"",
    form: {
      userId: "",
      type: "",
      dateRange: [],
      endTime: '',
      startTime: '',
      modelName: ""
    },
    tableData: [],
    	columns2:[
				{
					title: "序号",
					align: "center",
					render: (h,data) => {
						let showIndex = data.index+((this.pageNum2-1)*this.pageSize2)+1;
						return h('span',showIndex);
					}
				},
				{
					key:"employeeName",
					title: "发布人",
					align: "center",
					width:200,
				},
				{
					key:"errorUrl",
					title: "异常地址",
					align: "center",
					width:200,
				},
				{
					key:"errorDesp",
					title: "异常描述",
					width:150,
					align: "center",
				},
				{
					key:"supportName",
					title: "反馈人",
					width:150,
					align: "center",
				},
				{
					key:"indexTime",
					title: "反馈时间",
					align: "center",
					width:200,
					render:(h,data) =>{
						return h('span',{},formatTime(data.row.indexTime))
					}
				},
			],
			columns3:[
				{
					title: "序号",
					align: "center",
					render: (h,data) => {
						let showIndex = data.index+((this.pageNum3-1)*this.pageSize3)+1;
						return h('span',showIndex);
					}
				},
				{
					key:"employeeName",
					title: "发布人",
					align: "center",
					width:200,
				},
				{
					key:"orgWname",
					title: "所在部门",
					align: "center",
					width:200,
				},
				{
					key:"indexTime",
					title: "发布时间",
					width:150,
					align: "center",
					render:(h,data) =>{
						return h('span',{},formatTime(data.row.indexTime))
					}
				},
				{
					key:"errorUrl",
					title: "对应地址",
					width:150,
					align: "center",
				},
				{
					key:"errorDesp",
					title: "异常原因",
					align: "center",
					width:200,
				},
				{
					key:"supportName",
					title: "质检员",
					width:150,
					align: "center",
				},
			],
			columns1:[
				{
					title: "序号",
					align: "center",
					render: (h,data) => {
						let showIndex = data.index+((this.pageNum1-1)*this.pageSize1)+1;
						return h('span',showIndex);
					}
				},
				{
					key:"executorName",
					title: "责任人",
					align: "center",
					width:200,
				},
				{
					key:"publisherName",
					title: "发布人",
					align: "center",
					width:200,
				},
				{
					key:"publishDate",
					title: "应发布时间",
					width:150,
					align: "center",
					render:(h,data) =>{
						return h('span',{},formatTime33(data.row.publishDate))
					}
				},
				{
					key:"realPublishTime",
					title: "实际发布时间",
					width:150,
					align: "center",
					render:(h,data) =>{
						return h('span',{},formatTime33(data.row.realPublishTime))
					}
				},
				{
					key:"invalidReason",
					title: "无效原因",
					align: "center",
					width:200,
				},
			],
		columns: [
			{
				key:"empName",
				title: "姓名",
        align: "center",
        width:100,
        fixed: "left"
			},
			{
				key:"orgName",
				title: "所属产业链",
        align: "center",
        width:100,
        fixed: "left"
			},
			{	
				key:"jobTime",
				title: "入职时间",
        align: "center",
        width:100,
        fixed: "left",
				render(h,data){
					return h("span",{},formatTime(data.row.jobTime))
				}
			},
				{
			title: "文章发布",
			align: "center",
			children:[
			{
				key:"wzfbyfbcs",
				width:100,
				title: "单元应发数",
				align: "center",
				render:(h,data) =>{
				return h("span",{},Number(data.row.wzfbyfbcs) == 0 ? 0 : data.row.wzfbyfbcs)
				}
			},
			{
				key:"wzfbsjfbcs",
				width:100,
				title: "单元实发数",
				align: "center",
				render:(h,data) =>{
				return h("span",{},Number(data.row.wzfbsjfbcs) == 0 ? 0 : data.row.wzfbsjfbcs)
				}
			},
			{
				key:"wzfbycfbcs",
				width:100,
				title: "异常次数",
				align: "center",
				render:(h,data) =>{
				return h("a",{
							on: {
							click:()=>{
								console.log('111',data.row)
								this.abnormal(Number(data.row.wzfbycfbcs),0,data.row.empId)
							}	
							},
				},Number(data.row.wzfbycfbcs) == 0 ? 0 : data.row.wzfbycfbcs)
				}
			},
			{
				key:"wzfbwcl",
				width:100,
						title: "完成率",
				align: "center",
				render: (h, data) => {
				return h("span",{},Number(data.row.wzfbwcl) == 0 ? 0 + '%' : (data.row.wzfbwcl * 100).toFixed(2) + '%');
				}
			},
			{
				width:100,
				key:"wzfbhgl",
						title: "合格率",
				align: "center",
				render: (h, data) => {
				return h("span",{},Number(data.row.wzfbhgl) == 0 ? 0 + '%' : (data.row.wzfbhgl * 100).toFixed(2) + '%');
				}
			},
			{
				width:100,
				key:"wzfbkhtscs",
						title: "客户投诉次数",
				align: "center",
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.custComplaint(Number(data.row.wzfbkhtscs),0,data.row.empId)
						}
					}	
				},Number(data.row.wzfbkhtscs) == 0 ? 0 : data.row.wzfbkhtscs)
				}
			},
			{
				key:"wzfbzjcwcs",
				width:100,
				title: "质检错误次数",
				align: "center",
				render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.qualityError(Number(data.row.wzfbzjcwcs),0,data.row.empId)
						}
					}	
				},Number(data.row.wzfbzjcwcs) == 0 ? 0 : data.row.wzfbzjcwcs)
				}
			},
			]
				},
				{
					title: "行情发布",
			align: "center",
			children:[
			{
				key:"hqfbyfbcs",
				title: "单元应发数",
				width:100,
				align: "center",
				render:(h,data) =>{
				return h("span",{},Number(data.row.hqfbyfbcs) == 0 ? 0 : data.row.hqfbyfbcs)
				}
			},
			{
				key:"hqfbsjfbcs",
				title: "单元实发数",
				width:100,
				align: "center",
				render:(h,data) =>{
				return h("span",{},Number(data.row.hqfbsjfbcs) == 0 ? 0 : data.row.hqfbsjfbcs)
				}
			},
			{
				key:"hqfbycfbcs",
				title: "异常次数",
				width:100,
				align: "center",
				render:(h,data) =>{
				return h("a",{
							on: {
								click:()=>{
									this.abnormal(Number(data.row.hqfbycfbcs),1,data.row.empId)
								}	
							},},Number(data.row.hqfbycfbcs) == 0 ? 0 : data.row.hqfbycfbcs)
				}
			},
			{
				key:"hqfbwcl",
						title: "完成率",
				width:100,
				align: "center",
				render: (h, data) => {
					// console.log("hqfb",)
				return h("span",{},Number(data.row.hqfbwcl) == 0 ? 0 + '%' : (data.row.hqfbwcl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"hqfbhgl",
						title: "合格率",
				width:100,
				align: "center",
				render: (h, data) => {
				return h("span",{},Number(data.row.hqfbhgl) == 0 ? 0 + '%' : (data.row.hqfbhgl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"hqfbkhtscs",
				title: "客户投诉次数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.custComplaint(Number(data.row.hqfbkhtscs),1,data.row.empId)
						}
					}	
				},Number(data.row.hqfbkhtscs) == 0 ? 0 : data.row.hqfbkhtscs)
				}
			},
			{
				key:"hqfbzjcwcs",
				title: "质检错误次数",
				width:100,
				align: "center",
				render:(h,data) =>{
					return h("a",{
						on: {
						click:()=>{
							this.qualityError(Number(data.row.hqfbzjcwcs),1,data.row.empId)
						}
					}	
					},Number(data.row.hqfbzjcwcs) == 0 ? 0 : data.row.hqfbzjcwcs)
				}
			},
			]
				},
				{
					title: "价格汇总",
			align: "center",
			children:[
			{
				key:"jgfbyfbcs",
						title: "单元应发数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("span",{},Number(data.row.jgfbyfbcs) == 0 ? 0 : data.row.jgfbyfbcs)
				}
			},
			{
				key:"jgfbsjfbcs",
						title: "单元实发数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("span",{},Number(data.row.jgfbsjfbcs) == 0 ? 0 : data.row.jgfbsjfbcs)
				}
			},
			{
				key:"jgfbycfbcs",
						title: "异常次数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
						this.abnormal(Number(data.row.jgfbycfbcs),2,data.row.empId)
						}	
						}
				},Number(data.row.jgfbycfbcs) == 0 ? 0 : data.row.jgfbycfbcs)
				}
			},
			{
				key:"jgfbwcl",
				width:100,
						title: "完成率",
				align: "center",
				render: (h, data) => {
				return h("span",{},Number(data.row.jgfbwcl) == 0 ? 0 + '%' : (data.row.jgfbwcl * 100).toFixed(2) + '%');
				}

			},
			{
				key:"jgfbhgl",
						title: "合格率",
				width:100,
				align: "center",
				render: (h, data) => {
				return h("span",{},Number(data.row.jgfbhgl) == 0 ? 0 + '%' : (data.row.jgfbhgl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"jgfbkhtscs",
				width:100,
				title: "客户投诉次数",
				align: "center",
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.custComplaint(Number(data.row.jgfbkhtscs),2,data.row.empId)
						}
					}	
				},Number(data.row.jgfbkhtscs) == 0 ? 0 : data.row.jgfbkhtscs)
				}
			},
			{
				key:"jgfbzjcwcs",
						title: "质检错误次数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.qualityError(Number(data.row.jgfbzjcwcs),2,data.row.empId)
						}
					}	
				},Number(data.row.jgfbzjcwcs) == 0 ? 0 : data.row.jgfbzjcwcs)
				}
			},
			]
		},
			{
					title: "数据采集发布",
			align: "center",
			children:[
			{
				key:"cjfbyfbcs",
						title: "单元应发数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("span",{},Number(data.row.cjfbyfbcs) == 0 ? 0 : data.row.cjfbyfbcs)
				}
			},
			{
				key:"cjfbsjfbcs",
						title: "单元实发数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("span",{},Number(data.row.cjfbsjfbcs) == 0 ? 0 : data.row.cjfbsjfbcs)
				}
			},
			{
				key:"cjfbycfbcs",
						title: "异常次数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
						this.abnormal(Number(data.row.cjfbycfbcs),3,data.row.empId)
						}	
						}
				},Number(data.row.cjfbycfbcs) == 0 ? 0 : data.row.cjfbycfbcs)
				}
			},
			{
				key:"cjfbwcl",
				width:100,
						title: "完成率",
				align: "center",
				render: (h, data) => {
				return h("span",{},Number(data.row.cjfbwcl) == 0 ? 0 + '%' : (data.row.cjfbwcl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"cjfbhgl",
						title: "合格率",
				width:100,
				align: "center",
				render: (h, data) => {
				return h("span",{},Number(data.row.cjfbhgl) == 0 ? 0 + '%' : (data.row.cjfbhgl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"cjfbkhtscs",
				width:100,
				title: "客户投诉次数",
				align: "center",
				render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.custComplaint(Number(data.row.cjfbkhtscs),3,data.row.empId)
						}
					}	
				},Number(data.row.cjfbkhtscs) == 0 ? 0 : data.row.cjfbkhtscs)
				}
			},
			{
				key:"cjfbzjcwcs",
						title: "质检错误次数",
				width:100,
				align: "center",
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.qualityError(Number(data.row.cjfbzjcwcs),3,data.row.empId)
						}
					}	
				},Number(data.row.cjfbzjcwcs) == 0 ? 0 : data.row.cjfbzjcwcs)
				}
			},
			]
				},
			
			{
					title: "短讯发布",
			align: "center",
			children:[
			{
				key:"dxunyfbcs",
						title: "单元应发数",
				width:100,
				align: "center",
				render:(h,data) =>{
				return h("span",{},Number(data.row.dxunyfbcs) == 0 ? 0 : data.row.dxunyfbcs)
				}
			},
			{
				key:"dxunsjfbcs",
						title: "单元实发数",
				width:100,
				align: "center",
				render:(h,data) =>{
				return h("span",{},Number(data.row.dxunsjfbcs) == 0 ? 0 : data.row.dxunsjfbcs)
				}
			},
			{
				key:"dxunycfbcs",
						title: "异常次数",
				align: "center",
				width:100,
				render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.abnormal(Number(data.row.dxunycfbcs),5,data.row.empId)
						}	
						}
				},Number(data.row.dxunycfbcs) == 0 ? 0 : data.row.dxunycfbcs)
				}
			},
			{
				key:"dxunwcl",
						title: "完成率",
				align: "center",
				width:100,
				render: (h, data) => {
				return h("span",{},Number(data.row.dxunwcl) == 0 ? 0 + '%' : (data.row.dxunwcl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"dxunhgl",
						title: "合格率",
				align: "center",
				width:100,
				render: (h, data) => {
				return h("span",{},Number(data.row.dxunhgl) == 0 ? 0 + '%' : (data.row.dxunhgl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"dxunkhtscs",
						title: "客户投诉次数",
				align: "center",
				width:100,
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.custComplaint(Number(data.row.dxunkhtscs),5,data.row.empId)
						}
					}	
				},Number(data.row.dxunkhtscs) == 0 ? 0 : data.row.dxunkhtscs)
				}
			},
			{
				key:"dxunzjcwcs",
						title: "质检错误次数",
				align: "a",
				width:100,
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.qualityError(Number(data.row.dxunzjcwcs),5,data.row.empId)
						}
					}	
				},Number(data.row.dxunzjcwcs) == 0 ? 0 : data.row.dxunzjcwcs)
				}
			},
			]
				},
					{
					title: "短信发布",
			align: "center",
			children:[
			{
				key:"dxinyfbcs",
						title: "单元应发数",
				align: "center",
				width:100,
					render:(h,data) =>{
				return h("span",{},Number(data.row.dxinyfbcs) == 0 ? 0 : data.row.dxinyfbcs)
				}
			},
			{
				key:"dxinsjfbcs",
						title: "单元实发数",
				align: "center",
				width:100,
					render:(h,data) =>{
				return h("span",{},Number(data.row.dxinsjfbcs) == 0 ? 0 : data.row.dxinsjfbcs)
				}
			},
			{
				key:"dxinycfbcs",
						title: "异常次数",
				align: "center",
				width:100,
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.abnormal(Number(data.row.dxinycfbcs),4,data.row.empId)
						}	
						}
				},Number(data.row.dxinycfbcs) == 0 ? 0 : data.row.dxinycfbcs)
				}
			},
			{
				key:"dxinwcl",
						title: "完成率",
				width:100,
				align: "center",
				render: (h, data) => {
				return h("span",{},Number(data.row.dxinwcl) == 0 ? 0 + '%' : (data.row.dxinwcl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"dxinhgl",
						title: "合格率",
				align: "center",
				width:100,
				render: (h, data) => {
				return h("span",{},Number(data.row.dxinhgl) == 0 ? 0 + '%' : (data.row.dxinhgl * 100).toFixed(2) + '%');
				}
			},
			{
				key:"dxinkhtscs",
						title: "客户投诉次数",
				align: "center",
				width:100,
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.custComplaint(Number(data.row.dxinkhtscs),4,data.row.empId)
						}
					}	
				},Number(data.row.dxinkhtscs) == 0 ? 0 : data.row.dxinkhtscs)
				}
			},
			{
				key:"dxinzjcwcs",
				title: "质检错误次数",
				align: "center",
				width:100,
					render:(h,data) =>{
				return h("a",{
					on: {
						click:()=>{
							this.qualityError(Number(data.row.wzfbzjcwcs),4,data.row.empId)
						}
					}	
				},Number(data.row.dxinzjcwcs) == 0 ? 0 : data.row.dxinzjcwcs)
				}
			},
			]
			},
		],
    
    }
  },
  created() {
		this.initDateRange();
    this.queryData();
    this.dataType = {
      '0': '文章发布',
      '1': '行情发布',
      '2': '价格汇总',
			'3': '数据采集',
			'4': '短信发布',
      '5': '短讯发布',
    };
  },
  methods: {
    //查询功能
    search() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.queryData();
    },
    //重置
    reset() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.form.dateRange = [];
        this.form.startTime = "";
        this.form.endTime = "";
        this.form.modelName = "";
        this.$refs.adminRef.$refs.select.clearSingleSelect();
        this.form.userId = "";
				this.form.userName = "";
				this.initDateRange();
				this.branchIds = [];
    },
    //数据列表
    queryData() {
		var that = this;
		var params = {
			pageNum: that.pageNum,
      pageSize: that.pageSize,
      //传日期
      startTime: that.form.startTime,
      endTime: that.form.endTime,
      //传id
      orgIdList:that.branchIds,
      userId:that.form.userId
		};
		this.$Spin.show();
		querySingleMsgPublish(params).then(res => {
      let arr = [];
			that.tableData = res.response.reportXxfbVOList.list;
      that.total = res.response.reportXxfbVOList.total;
			that.accountForm = res.response.reportSumXxfbVOList;
			that.accountForm.sort((a,b) =>{
				return a.fblx-b.fblx
			})
      that.accountForm.forEach(item => {
        if(this.dataType[item.fblx]){
          arr.push(item.fblx.toString());
        }
      })
      for(const attr in this.dataType){
        if(arr.indexOf(attr) === -1){
          that.accountForm.push({
              fblx: attr,
              yfbcs: 0,
              sjfbcs: 0,
              ycfbcs: 0,
              wcl: 0,
              hgl: 0,
              zjcwcs: 0,
              khtscs: 0
            });
        }
      };
			that.loading = false;
		}).catch(() => {that.loading = false;});
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.queryData();
  },
  //异常次数列表获取
		getAbnormalList(data,id){
			let that =this;
			let from ={
				checkTimeS: that.form.startTime,
				checkTimeE: that.form.endTime,
				pageNum:that.pageNum1,
				pageSize:that.pageSize1,
				informationTypeEnum:data,
				empId:id
			};
			list_page_single(from).then(res =>{
				if(res.response.list){
					that.tableData1 = res.response.list;
					that.total1 = res.response.total
				}
			})
		},
			//异常弹窗
		abnormal(yccs,type,id){
			if(yccs === 0){
				this.$Message.warning("无异常");
			}else{
				this.yccsValueModal=true;
				this.yId = id;
				this.yType = type;
				this.pageNum1 = 1;
				this.pageSize1 = 10;
				this.getAbnormalList(this.yType,this.yId);
			}
		},
		//异常分页
		pageChange1(page, pageSize) {
		if (page) {
			this.pageNum1 = page;
		}
		if (pageSize) {
			this.pageSize1 = pageSize;
		}
		this.getAbnormalList(this.yType,this.yId);
		},
		//客户投诉次数列表获取
		getCustComplaint(data,id){
			let that =this;
			let from ={
				indexTimeS:that.form.startTime,
				indexTimeE:that.form.endTime,
				pageNum:that.pageNum2,
				pageSize:that.pageSize2,
				msgTypeEnum:data,
				employeeId:id
			};
			list_page_single_khtscs(from).then(res =>{
						if(res.response.list){
							that.tableData2 = res.response.list;
							that.total2 = res.response.total
						}
			})
		},
		//客户投诉弹窗
		custComplaint(khts,type,id){
			if(khts === 0){
				this.$Message.warning("无客户投诉");
			}else{
				this.khtscsValueModal=true;
				this.tId = id;
				this.tType = type;
				this.pageNum2 = 1;
				this.pageSize2 = 10;
				this.getCustComplaint(this.tType,this.tId);
			}
		},
		//客户投诉分页
		pageChange2(page, pageSize) {
		if (page) {
			this.pageNum2 = page;
		}
		if (pageSize) {
			this.pageSize2 = pageSize;
		}
		this.getCustComplaint(this.tType,this.tId);
		},
		//质检错误次数列表获取
		getQualityError(data,id){
			let that =this;
			let from ={
				indexTimeS:that.form.startTime,
				indexTimeE:that.form.endTime,
				pageNum:that.pageNum3,
				pageSize:that.pageSize3,
				msgTypeEnum:data,
				employeeId:id
			};
			list_page_single_zjcwcs(from).then(res =>{
				if(res.response.list){
						that.tableData3 = res.response.list;
						that.total3 = res.response.total
				}
			})
		},
		//质检错误弹窗
		qualityError(zjcw,type,id){
			if(zjcw === 0){
				this.$Message.warning("无质检错误");
			}else{
				this.zljccsValueModal=true;
				this.qType = type;
				this.qId = id;
				this.pageNum3 = 1;
				this.pageSize3 = 10;
				this.getQualityError(this.qType,this.qId);
			}
		},
		//质检错误分页
		pageChange3(page, pageSize) {
		if (page) {
			this.pageNum3 = page;
		}
		if (pageSize) {
			this.pageSize3 = pageSize;
		}
		this.getQualityError(this.qType,this.qId);
		},
	//部门树复选框选中
     onCheckChange(param) {
      this.treeData = param;
    },
    //部门树点击确定
    onOk() {
      this.form.modelName = '';
      this.branchTitle = [];
      this.branchIds = [];
      this.$refs.adminRef.$refs.select.clearSingleSelect();
      this.form.userId = "";
      this.form.userName = "";
      let branchList = this.$refs.branchRef.getCheckedNodes();
          for (let i = 0; i < branchList.length; i++) {
            
           this.branchTitle.push(branchList[i].title)
            
            this.branchIds.push(branchList[i].id)
            } 
      this.form.modelName = this.branchTitle.join();
    },
    //点击取消
    cancel(){
       this.form.modelName = "";
       this.BranchModel = false;
    },
    loadBranchData(){

    },
    //产业链（部门树）获取焦点
    getBranchDataValue(){
       this.BranchModel = true;
       this.getBranchData()
    },
     // 获取部门信息
      getBranchData() {
        let that = this;
        let form = {
          type: 2
        }
        axios({
          url:'/report/PfCommonTree/orgTree?type=2',
          type:'get',
        }).then(function (res) {
          let dataValue = JSON.parse(res.data.response);
          that.BranchDataTree = that.branch(dataValue);
        })
        
      },
      //判断分支
        branch(data){
         let dataDb = data.map(item => {
         if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            disableCheckbox: false,
            id: item.id,
            children: this.branch(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            disableCheckbox: false
          };
        }
      });
      return dataDb;
    },
    //初始化时间
    initDateRange() {
            let currentDate = new Date();
            let lastMonth = currentDate.getMonth()-1;
            let currentMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            let lastMonthFirstDay = new Date(currentDate.getFullYear(), lastMonth, 1);
            let lastMonthlastDay = new Date(currentMonthFirstDay-1);
          //  let currentMonthLastDay = new Date(nextMonthFirstDay - 1);
            this.form.dateRange = [lastMonthFirstDay, lastMonthlastDay];
            this.form.startTime = new Date(this.form.dateRange[0]).getTime();
            this.form.endTime = new Date(this.form.dateRange[1]).getTime();
        }, 
     // 监听选择日期
        dateChange (date) {
            this.form.startTime = new Date(date[0]).getTime() - 8 * 1000 * 60 * 60
            this.form.endTime = new Date(date[1]).getTime() + 16 * 1000 * 60 * 60 - 1000
        },
    //获取从姓名传过来的值
    adminFunction(data) {
      if(data){
        this.form.userId = data.value;
        this.form.userName = data.label;
      }
    },
    //导出
    exportReport(){
      let that = this;
      let params ={
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        orgIdList:this.branchIds,
        userId:this.form.userId
      }
      this.$Spin.show();
      singleFbExcept(formData(params)).then(res=>{ 
        if(res.status==200){
          window.location.href = res.response; 
        }else{
          that.$Message.warning(res.message);
        }
      })
    }
  },
  
  mounted(){
     // this.initDateRange();

    }
};

</script>
