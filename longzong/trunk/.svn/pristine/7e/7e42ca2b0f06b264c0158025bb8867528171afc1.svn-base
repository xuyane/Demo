<style lang="less" scoped>
.staticsdetail{
	margin-bottom:15px;
	display: flex;
	justify-content: space-between;
}
.staticsdetail span{
	font-size: 14px;
}
.page {
    margin: 10px 0;
    text-align: right;
   padding-right: 18px;
  }
	.time{
		width:45%;
	}
</style>
<template>
<Row>

	<i-col span="24">
		<Row class-name="current-position">
			当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;绩效查询
		</Row>
	</i-col>

	<Col span='24'>
		<Form class="search-form">
			<Row type="flex" justify="space-between">
				<Col span="7">
					<FormItem label="姓名 ： "  :label-width="80">
						<Select v-model="seltctValue1" filterable class="search-input" @on-query-change="getEmployee" placeholder="请输入姓名">
						  <Option v-for="item in employees" :value="item.key" :key="item.key">{{ item.value }}</Option>
					  </Select>
					</FormItem>
				</Col>
				<Col span="7">
					<FormItem label="部门 ： "  :label-width="120">
						<bu-men @data-list="departDatas"  :emptyModel='seltctValue2'></bu-men>
					</FormItem>
				</Col>
				<Col span="8">
					<FormItem label="考核周期： "  :label-width="100">
						<DatePicker type="month" format="yyyy/MM" v-model="startTime" placement="bottom" placeholder="请选择开始周期" class="time search-input "></DatePicker>
						<span>-</span>
						<DatePicker type="month" format="yyyy/MM" v-model="endTime" placement="bottom"  placeholder="请选择结束周期" class="time search-input"></DatePicker>
						<!-- <DatePicker format="yyyy-MM" v-model="seltctValue3Time" type="daterange" placement="bottom-end" placeholder="请选择周期"  class="search-input"></DatePicker> -->
					</FormItem>
				</Col>
				<Col span="24" class="text-right">
					<Button type="primary" @click="onSearch" style="margin-right:20px">查询</Button>
					<Button type="primary" @click="clear">重置</Button>
				</Col>
			</Row>
		</Form>
	</Col>
	<Col span='24' class="table-con">
		<Button type="primary" style="margin-bottom:20px" @click="exportData"> 导出</Button>
		<Table class="tableCommon"	:data="tableData1"	:columns="columns1" ref="table">
			<div class="page" slot="footer">
        <Page :total="dataCount" show-elevator show-total show-sizer :page-size="dataForm.pageSize"
        :page-size-opts="pageSizeOpt" @on-change="changePageNum" @on-page-size-change="changePageSize" />
      </div>
		</Table>
		<!-- <oil-page
			:total="total"
			:page-size="pageSize"
			@page-change="pageChange"
			:page-size-opts="pageSizeOpts"
			:show-sizer="showSizer">
		</oil-page> -->
	</Col>

	<!-- 分值明细弹窗开始 -->
	<Modal v-model="performanceValueModal" title="绩效分值详情(查看考核标准)" width='1200'>
		<div class="staticsdetail">
			<span style="margin-right:100px;">计算时间：{{scoreTime}}</span>
			<span>总分：{{sumScore}}</span>
		</div>
		<Table class="tableCommon"	:data="tableData2"	:columns="columns2">
			<div class="page" slot="footer">
        <Page :total="dataValue" show-elevator show-total :show-sizer="showSizer2" :page-size="dataVaForm.pageSize"
        :page-size-opts="pageSizeOpt" @on-change="changePageNum2" @on-page-size-change="changePageSize2" />
      </div>
		</Table>
		<div slot="footer">
			<i-button type="primary" @click="performanceValueModal=false">返回</i-button>
		</div>
	</Modal>
  <!-- 分值明细弹窗结束 -->

	<!-- 考核评语弹窗开始 -->
	<Modal v-model="assessmentCommentsModal" title="考核评语" width='1000'>
		<Table class="tableCommon"	:data="tableData3"	:columns="columns3"> </Table>
		<div slot="footer">
			<i-button type="primary" @click="assessmentCommentsModal=false">返回</i-button>
		</div>
	</Modal>
  <!-- 考核评语弹窗结束 -->

</Row>
</template>
<script>
import OilPage from '../../components/page/page.vue'
import { pfListPage, scoreItemPage, assessmentCommentsList, pfExport, employeeSelect } from "../../components/axios/performanceManagement.js";
import { formData,formatStamp } from "../../../assets/js/common.js";
import buMen from '../../components/jiXiao/buMen.vue';
export default {
	name:'performanceeQuery',
	components:{
			OilPage,
			buMen
			},
	data(){
		return{
			startTime:"",
			endTime:"",
			dataForm:{  //列表查询表单
				pageNum: 1,
        pageSize: 10
			},
			dataVaForm:{  // 绩效分值查询
				pageNum: 1,
        pageSize: 10
			},
			dataRow:'',//存储绩效分值的row值
			sumScore:'',
			scoreTime:'',
			seltctValue1:'',
			seltctValue2:'',
			seltctValue3Time:[],
			employees: [],
			departData: [],
			performanceValueModal:false,
			assessmentCommentsModal:false,
			total:12,
			showSizer: true,
      dataCount: 0, //总条数
			pageSizeOpt: [10, 20, 50],
			pageSizeOpt2: [10, 20 ,50],
			dataValue:0,  // 绩效分值条数
			showSizer2:true,
			showSizer:true,
			assessmentCycle:[{
				value:'all',
				label:'2018年1月~2018年06月'
			}],
			department:[{
				value:'prohibit',
				label:'部门树'
			}],
			cycle:[{
				value:'year',
				label:'月度'
			},{
				value:'month',
				label:'年度'
			}],
			columns1:[{
        title:'姓名',
				key:'employeeName',
				width:150
      },{
        title:'所在部门',
				key:'orgWname',
				width:300
      },{
        title:'考核周期',
				key:'indexTime',
				minWidth:150
      },{
        title:'考核模板',
				key:'modelName',
				width:300
      },{
        title:'同级排名',
				key:'sameLevelRanking',
				width:80
      },{
        title:'部门排名',
				key:'departmentRanking',
				width:80
      },{
        title:'考核分值',
				key:'totalScore',
				minWidth:100
      },{
        title:'考核等级',
				key:'pfLevel',
				minWidth:80
      },{
        title:'分值明细',
				key:'valueDetail',
				minWidth:100,
				render: (h, data) => {
				return h('div', [
					h('a', {
						style:{

							},
						on: {
							click: () => {
								this.dataRow = data
								this.performanceValueModal=true;
								this.sumScore = data.row.totalScore
								this.scoreTime = data.row.indexTime
								this.getPfItemPage(this.dataRow)
							}
						},
					},'查看'),
					])
				}
      },{
        title:'考核评语',
				key:'assessmentComment',
				minWidth:100,
				render: (h, data) => {
				return h('div', [
					h('a', {
						style:{

							},
						on: {
							click: () => {
								this.assessmentCommentsModal=true;
								this.getPfAssessmentList(data)
							}
						},
					},'查看')
				])
				}
      }],
      tableData1:[],
			columns2:[{
        title:'考核指标',
				key:'pfIndexName',
				align:'center',
				minWidth:200
      },{
        title:'分级方案',
				key:'pfGradeType',
				align:'center',
				width:150
			},
			// {
      //   title:'基准值',
			// 	key:'standardValue',
			// 	align:'center',
			// 	width:120
			// },
			{
        title:'实际达成',
				key:'actualValue',
				align:'center',
				width:120
      },{
        title:'所达级别',
				key:'detailLevel',
				align:'center',
				width:120
      },{
        title:'分值',
				key:'detailScore',
				align:'center',
				width:120
      },{
        title:'所占权重(%)',
				key:'weight',
				align:'center',
				width:120
      },{
        title:'权重分值',
				key:'weightScore',
				align:'center',
				width:120
			}],
			tableData2:[],
			columns3:[{
        title:'序号',
				key:'assessmentIndex',
				type:'index',
				width:80
      },{
        title:'评定人',
				key:'auditor',
				width:150
      },{
        title:'评定时间',
				key:'auditTime',
				align:'center',
				width:200
      },{
        title:'考核等级',
				key:'level',
				align:'center',
				width:150
      },{
        title:'评语',
				key:'content',
				align:'center',
				minWidth:350
      }],
			tableData3:[],
		}
	},
	created (){
    //this.getModuleTree();
    this.getPfListPage();
		this.departDatas()
  },
	methods:{
		loadData (item, callback) {

      callback(data);
    },
		// 获取部门列表
    departDatas (deptLabel,deptId,deptCode){
       this.departData = deptId ? deptId : null;
		},
		onSearch(){
			this.dataForm.pageNum = 1;
			this.dataForm.pageSize = 10;
			this.getPfListPage()
		},
		// 绩效列表
		getPfListPage(){
			this.$Spin.show();
				let form = {
					employeeId: this.seltctValue1,
					// indexStartTime: formatStamp(this.seltctValue3Time[0]),
					// indexEndTime: formatStamp(this.seltctValue3Time[1]),
					indexStartTime: formatStamp(this.startTime),
					indexEndTime: formatStamp(this.endTime),
					orgIds: this.departData,
					pageNum: this.dataForm.pageNum,
					pageSize: this.dataForm.pageSize,
					sign: ''
				};
				pfListPage(form).then(res => {
					this.tableData1 = res.response.list
					this.dataCount = res.response.total
					this.$Spin.hide();
				});
		},
		// 绩效明细分页
		getPfItemPage(data){
			this.$Spin.show();
				let form = {
					applyId: data.row.id,
					pageNum: this.dataVaForm.pageNum,
					pageSize: this.dataVaForm.pageSize,
					sign: ''
				};
				scoreItemPage(form).then(res => {
					if(res.response.list==null){
						this.tableData2 = []
					}else{
						this.tableData2 = res.response.list
						this.tableData2.map(item=>{
							item.weight=item.weight*100
						})
					}
					this.dataValue = res.response.total
					this.$Spin.hide();
				});
		},
		// 考核评语
		getPfAssessmentList(data){
			this.$Spin.show();
				let form = {
					employeeId:data.row.employeeId,
					id: data.row.id,
					key: data.row.workflowKey
				};
				assessmentCommentsList(form).then(res => {
					this.tableData3 = res.response
					//this.total = res.response.total
					this.$Spin.hide();
				});
		},
		//员工下拉列表
		getEmployeeData(name) {
			let form = {
				name: name ? name : ' '
			}
			employeeSelect(form).then(res => {
				this.employees = res.response
			})
		},
		getEmployee(data) {
			this.getEmployeeData(data)
		},
		changePageNum(current) {
      this.dataForm.pageNum = current;
      this.getPfListPage();
    },
    // 监听修改显示条数
    changePageSize(size) {
      this.dataForm.pageSize = size;
      this.getPfListPage();
		},
		changePageNum2(current) {  //绩效分值
			this.dataVaForm.page = current;
			this.dataVaForm.pageNum=current;
      this.getPfItemPage(this.dataRow);
    },
    // 监听修改显示条数
    changePageSize2(size) {
      this.dataVaForm.pageSize = size;
      this.getPfItemPage(this.dataRow);
    },
		//导出
		exportData(){
      if (this.dataCount >= 10000) {
        this.$Message.warning({
          content: '数据超过1万条，请分批导出',
          duration: 2
        });
      }else if (this.dataCount <= 0) {
        this.$Message.warning({
          content: '无数据',
          duration: 2
        })
      }else {
        let startTime = isNaN(formatStamp(this.startTime)) ? '' : formatStamp(this.startTime);
        let endTime = isNaN(formatStamp(this.endTime)) ? '' : formatStamp(this.endTime);
        let orgIds = "";
        if(this.departData != null) {
          orgIds = "&orgIds=" + this.departData ;
        }
        window.location.href = '/report/pfList/export?employeeId='+this.seltctValue1+ orgIds + '&indexStartTime='+startTime+'&indexEndTime='+ endTime;
      }
		},
		//重置
    clear(){
      this.seltctValue1 = '';
			// this.seltctValue3Time = [];
			this.startTime="";
			this.endTime=""
			this.seltctValue2 = [];
			this.departData=[];
    }

	}

}
</script>
