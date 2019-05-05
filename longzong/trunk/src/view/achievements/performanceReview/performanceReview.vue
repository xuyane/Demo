<style lang="less" scoped>
	.mar-top-20 {
		margin-top: 20px;
	}

	.page {
		margin: 10px 0;
		text-align: right;
		padding-right: 18px;
	}
</style>
<template>
	<Row>

		<i-col span="24">
			<Row class-name="current-position">
				当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;绩效点评
			</Row>
		</i-col>

		<Col span='24'>
		<Form class="search-form" :model="formDatas">
			<Row type="flex" justify="space-between">
				<Col span="7">
				<FormItem label="考核模板 ： " :label-width="100">
					<Select v-model="formDatas.modelId" placeholder="请选择考核模板">
						<Option v-for="item in models" :value="item.key" :key="item.key">{{ item.value }}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="7">
				<FormItem label="姓名 ： " :label-width="120">
					<Select v-model="formDatas.employeeId" filterable class="search-input" @on-query-change="getEmployee" placeholder="请输入姓名">
						<Option v-for="item in employees" :value="item.key" :key="item.key">{{ item.value }}</Option>
					</Select>
				</FormItem>
				</Col>
				<!-- <Col span="7">
				<FormItem label="状态 ： " :label-width="120">
					<Select v-model="formDatas.status" placeholder="请选择状态">
						<Option value="-1">全部</Option>
						<Option value="0">提报中</Option>
						<Option value="1">上级主管审核</Option>
					</Select>
				</FormItem>
				</Col> -->
				<Col span="7">
				<FormItem label="考核月份 ： " :label-width="100">
					<DatePicker type="month" placeholder="请选择考核月份" class="search-input" v-model="formDatas.indexTime"></DatePicker>
				</FormItem>
				</Col>
				<Col span="24" class="text-right" style="margin-bottom: 20px">
				<Button type="primary" style="margin-right:20px" @click="onSearch">查询</Button>
				<Button @click="reset">重置</Button>
				</Col>
			</Row>
		</Form>
		</Col>

		<Col span='24' class="mar-top-20">
		<Row class="table-con">
			<Button type="primary" style="margin-bottom:20px;" @click="batchThrough">批量通过</Button>
			<Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange">
				<div class="page" slot="footer">
					<Page :total="dataCount" show-elevator show-total :show-sizer="showSizer1" :page-size="formDatas.pageSize" :page-size-opts="pageSizeOpt"
					 @on-change="changePageNum" @on-page-size-change="changePageSize" />
				</div>
			</Table>
		</Row>
		</Col>

		<!-- 批量提交弹窗开始 -->
		<Modal v-model="batchThoughModal" title="提示信息">
			<div style="text-align:center;font-size:14px;">
				<p>批量通过将全部沿用上一级审核意见，请确认。</p>
			</div>
			<div slot="footer">
				<i-button type="primary" @click="doPfAuditBatch">确定</i-button>
				<i-button @click="batchThoughModal=false">取消</i-button>
			</div>
		</Modal>
		<!-- 批量提交弹窗结束 -->

		<!-- 分值明细弹窗开始 -->
		<Modal v-model="valueDetailModal" title="绩效分值详情（查看考核标准）" width='850'>
			<div style="margin-bottom:20px;font-size:14px;">
				<span style="margin-right:30px;">计算时间：{{countTime}}</span>
				<span>总分：{{totalScore}}</span>
			</div>
			<Table class="tableCommon" :columns="columns2" :data="tableData2">
				<div class="page" slot="footer">
					<Page :total="total2" 
					show-elevator show-total 
					:show-sizer="showSizer2" 
					:page-size="table2Form.pageSize"
					:page-size-opts="pageSizeOpt2"
					:current.sync="currentPage"
					ref="pager"
					 @on-change="changePageNum2" @on-page-size-change="changePageSize2" />
				</div>
			</Table>
			<!-- <oil-page :total="total2" :page-size="pageSize2" @page-change="pageChange2" :page-size-opts="pageSizeOpts2" :show-sizer="showSizer2">
			</oil-page> -->
			<div slot="footer">
				<i-button @click="valueDetailModal=false">返回</i-button>
			</div>
		</Modal>
		<!-- 分值明细弹窗结束 -->

		<!-- 审核流程弹窗开始 -->
		<Modal v-model="processModal" title="审核流程" width='850'>
			<Table class="tableCommon" :columns="columns3" :data="tableData3"></Table>
			<div slot="footer">
				<i-button @click="processModal=false">返回</i-button>
			</div>
		</Modal>
		<!-- 审核流程弹窗结束 -->

		<!-- 考核点评弹窗开始 -->
		<Modal v-model="checkCommentModal" title="通过" width='650'>
			<Form ref="pfForm" class="search-form" :model="pfForm" :rules="formRoles">
				<FormItem label="考核意见 ： " :label-width="100" prop="pfLevel">
					<Select v-model="pfForm.pfLevel" placeholder="请选择考核等级">
						<Option v-for="item in checkselect" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem prop="content">
					<Input v-model="pfForm.content" type="textarea" :maxlength="500" :autosize="{minRows: 5,maxRows: 5}" placeholder="请填写考核评语"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<i-button type="primary" @click="doPfAudit">确定</i-button>
				<i-button @click="checkCommentModal=false">返回</i-button>
			</div>
		</Modal>
		<!-- 考核点评弹窗结束 -->

	</Row>
</template>
<script>
	// import OilPage from '../../components/page/page.vue'
	import { pfReviewDoBatchPfReview, pfReviewDoPfReview, pfReviewListItemPage, pfReviewListWorkflow, pfReviewListPage, employeeSelect, modelSelect } from '../../components/axios/performanceManagement.js'
	import { formData } from "../../../assets/js/common.js";
	export default {
		name: 'performanceReview',
		data() {
			return {
				formDatas: { //  列表查询数据
					pageNum: 1,
					pageSize: 10,
					modelId: '',
					employeeId: '',
					indexTime: '',
					status: ''
				},
				table2Form: { //弹出分页
					pageNum: 1,
					pageSize: 10,
				},
				showSizer1: true,
				dataCount: 0, //列表总条数
				pageSizeOpt: [10, 20, 50],
				total2: 0,
				pageSizeOpt2: [10, 20, 50],
				showSizer2: true,
				models: [],
				employees: [],
				total1: 0,
				batchThoughModal: false,
				valueDetailModal: false,
				processModal: false,
				checkCommentModal: false,
				selectIds: [],
				countTime: '',
				totalScore: '',
				valueDetailId: '',
				pfForm: {
					pfLevel: '',
					content: '',
					pfApplyId: ''
				},
				currentPage:1,
				formRoles: {
					pfLevel: [{
						required: true, message: '请选择考核等级', trigger: 'change'
					}],
					content: [{
						required: true, message: '请填写考核评语', trigger: 'blur'
					}]
				},
				checkselect: [{
					label: 'A',
					value: '0'
				}, {
					label: 'B',
					value: '1'
				}, {
					label: 'C',
					value: '2'
				}, {
					label: 'D',
					value: '3'
				}, {
					label: 'E',
					value: '4'
				}],
				columns1: [{
					type: 'selection',
					title: '选择',
					align: 'center',
					width: 50
				}, {
					title: '姓名',
					key: 'employeeName',
					align: 'center',
					width: 80
				}, {
					title: '所在部门',
					key: 'orgWname',
					align: 'center',
					minWidth: 200
				}, {
					title: '考核周期',
					key: 'indexDate',
					align: 'center',
					width: 100
				}, {
					title: '考核模板',
					key: 'modelName',
					align: 'center',
					minWidth: 200
				}, {
					title: '职级',
					key: 'rankName',
					align: 'center',
					width: 100
				}, {
					title: '同级排名',
					key: 'levelRank',
					align: 'center',
					width: 100
				}, {
					title: '部门排名',
					key: 'deptRank',
					align: 'center',
					width: 100
				}, {
					title: '考核分值',
					key: 'totalScore',
					align: 'center',
					width: 100
				}, {
					title: '分值明细',
					key: 'valueDetail',
					align: 'center',
					width: 100,
					render: (h, params) => {
						return h('div', [
							h('a', {
								style: {

								},
								on: {
									click: () => {
										this.table2Form.pageNum=1
										this.table2Form.pageSize=10
										this.$refs.pager.currentPage = 1;
										this.valueDetailId = params.row.id
										this.countTime = params.row.countDate
										this.totalScore = params.row.totalScore
										this.getListItemPage()
									}
								},
							}, '查看')
						])
					}
				}, {
					title: '审核状态',
					key: 'statusDesc',
					align: 'center',
					width: 120
				}, {
					title: '审核流程',
					key: 'process',
					align: 'center',
					width: 100,
					render: (h, params) => {
						return h('div', [
							h('a', {
								style: {

								},
								on: {
									click: () => {
										this.getProcessList(params)
									}
								},
							}, '查看')
						])
					}
				}, {
					title: '操作',
					key: 'operation',
					align: 'center',
					width: 100,
					fixed: 'right',
					render: (h, params) => {
						return h('div', [
							h('a', {
								style: {

								},
								on: {
									click: () => {
										this.checkCommentModal = true
										this.pfForm.pfLevel = ''
										this.pfForm.content = ''
										this.pfForm.pfApplyId = params.row.id
									}
								},
							}, '考核点评')
						])
					}
				}],
				tableData1: [],
				columns2: [{
					title: '考核指标',
					key: 'pfIndexName',
					align: 'center',
					width: 150
				}, {
					title: '分级方案',
					key: 'pfGradeTypeDesc',
					align: 'center',
					minWidth: 150
				}, {
					title: '实际达成',
					key: 'actualValue',
					align: 'center',
					width: 100
				}, {
					title: '所达级别',
					key: 'detailLevel',
					align: 'center',
					width: 100
				}, {
					title: '分值',
					key: 'detailScore',
					align: 'center',
					width: 80
				}, {
					title: '所占权重（%）',
					key: 'weight',
					align: 'center',
					width: 120
				}, {
					title: '权重分值',
					key: 'weightScore',
					align: 'center',
					width: 100
				}],
				tableData2: [],
				columns3: [{
					title: '序号',
					key: 'cycle',
					align: 'center',
					width: 80,
					render: (h, params) => {
						return h('div', [
							h('span', {
								domProps: {
									innerHTML: params.row._rowKey
								}
							})
						])
					}
				}, {
					title: '评定人',
					key: 'auditor',
					align: 'center',
					width: 100
				}, {
					title: '评定时间',
					key: 'auditTime',
					align: 'center',
					width: 250
				}, {
					title: '考核等级',
					key: 'pfLevelDesc',
					align: 'center',
					width: 100
				}, {
					title: '评语',
					key: 'content',
					align: 'center',
					minWidth: 250
				}],
				tableData3: []
			}
		},
		created() {
			this.getModelData()
			this.getEmployeeData()
			this.getListPage()
		},
		methods: {
			//考核模板下拉列表
			getModelData() {
				modelSelect().then(res => {
					this.models = res.response
				})
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
			onSearch() {
				this.formDatas.pageNum = 1;
				this.formDatas.pageSize = 10;
				this.getListPage();
			},
			//列表查询
			getListPage() {
				this.$Spin.show()
				let form = {
					modelId: this.formDatas.modelId ? this.formDatas.modelId : '',
					employeeId: this.formDatas.employeeId ? this.formDatas.employeeId : '',
					indexTime: this.formDatas.indexTime == '' ? '' : this.formDatas.indexTime.getTime(),
					status: this.formDatas.status,
					pageNum: this.formDatas.pageNum,
					pageSize: this.formDatas.pageSize
				}
				pfReviewListPage(form).then(res => {
					this.tableData1 = res.response.list
					this.dataCount = res.response.total
					this.$Spin.hide()
				})
			},
			//分值明细列表
			getListItemPage() {
				this.$Spin.show()
				let form = {
					applyId: this.valueDetailId,
					pageNum: this.table2Form.pageNum,
					pageSize: this.table2Form.pageSize
				}
				pfReviewListItemPage(form).then(res => {
					this.tableData2 = res.response.list
					this.tableData2.map(item => {
						item.weight = item.weight * 100
					})
					this.total2 = res.response.total
					this.valueDetailModal = true
					this.$Spin.hide()
				})
			},
			changePageNum(current) {
				this.formDatas.pageNum = current;
				this.getListPage();
			},
			// 监听修改显示条数
			changePageSize(size) {
				this.formDatas.pageSize = size;
				this.getListPage();
			},
			changePageNum2(current) {
				this.table2Form.pageNum=current;				
				this.formDatas.pageNum = current;
				this.getListItemPage();
			},
			// 监听修改显示条数
			changePageSize2(size) {
				this.formDatas.pageSize = size;
				this.getListItemPage();
			},
			//分页
			// pageChange1 (page, pageSize) {
			// 	if(page) {
			// 		this.pageNum1 = page
			// 	}
			// 	if(pageSize) {
			// 		this.pageSize1 = pageSize
			// 	}
			// 	this.getListPage()
			// },
			pageChange2(page, pageSize) {
				if (page) {
					this.pageNum2 = page
				}
				if (pageSize) {
					this.pageSize2 = pageSize
				}
				this.getListItemPage()
			},
			//重置
			reset() {
				this.formDatas = {
					pageNum: 1,
					pageSize: 10,
					modelId: '',
					employeeId: '',
					indexTime: '',
					status: ''
				}
			},

			clear() {
				this.searchForm.employeeId = ''
				this.searchForm.modelId = ''
				this.searchForm.indexTime = ''
				this.searchForm.status = -1
			},
			//多选
			selectChange(selection) {
				let ids = selection.map(item => {
					return item.id
				})
				this.selectIds = ids
			},
			//审核信息列表
			getProcessList(data) {
				this.$Spin.show()
				let form = {
					pfApplyId: data.row.id
				}
				pfReviewListWorkflow(form).then(res => {
					this.tableData3 = res.response
					this.processModal = true
					this.$Spin.hide()
				})
			},
			//考核点评
			doPfAudit() {
				this.$refs.pfForm.validate(valid => {
					if (valid) {
						let form = {
							pfApplyId: this.pfForm.pfApplyId,
							content: this.pfForm.content,
							pfLevel: this.pfForm.pfLevel
						}
						pfReviewDoPfReview(form).then(res => {
							this.getListPage()
							this.checkCommentModal = false
						})
					}
				})
			},
			//批量通过
			batchThrough() {
				if (this.selectIds.length > 0) {
					this.batchThoughModal = true
				} else {
					this.$Message.warning('请勾选数据');
				}
			},
			doPfAuditBatch() {
				let form = {
					pfApplyIds: this.selectIds.join(",")
				}
				pfReviewDoBatchPfReview(form).then(res => {
					this.getListPage()
				})
				this.batchThoughModal = false
			}
		}

	}
</script>