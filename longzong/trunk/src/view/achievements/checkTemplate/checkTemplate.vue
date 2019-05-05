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
				当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;考核模板
			</Row>
		</i-col>

		<Col span='24'>
		<Form class="search-form" ref="form" :model="formDatas" :rules="ruleForm">
			<Row>
				<Col span="6">
				<FormItem label="模板名称 ： " :label-width="90">
					<Input type="text" v-model="formDatas.modelName" class="search-input" placeholder="请输入模板名称" />
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="考核周期 ： " :label-width="120">
					<Select v-model="formDatas.indexTime" class="search-input" placeholder="请选择考核周期">
						<Option value="1">月</Option>
						<Option value="2">年</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="状态 ： " :label-width="120">
					<Select v-model="formDatas.status" class="search-input" placeholder="请选择模板状态">
						<Option value="0">启用</Option>
						<Option value="1">禁用</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6" class="text-right">
				<Button type="primary" style="margin-right:20px" @click="onSearch()">查询</Button>
				<Button @click="reset()">重置</Button>
				</Col>
				<Col span='24' style="margin-bottom:20px;">
				<Button type="primary" style="margin-right:20px" @click="addtemplateModalBtn()">新增模板</Button>
				<!-- <Button type="primary">重新计算</Button> -->
				</Col>
			</Row>
		</Form>
		</Col>
		<Col span='24' class="mar-top-20">
		<Row class-name="table-con">
			<Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange1">
				<!--<tr v-for="item in tableData1">
					<td>{{item.name}}</td>
					<td>{{item.path}}</td>
					<td>{{item.creater}}</td>
					<td>{{item.creatTime}}</td>
				</tr>-->
				<div class="page" slot="footer">
					<Page :total="dataCount" show-elevator show-total show-sizer :page-size="formDatas.pageSize" :page-size-opts="pageSizeOpt"
					 @on-change="changePageNum" @on-page-size-change="changePageSize" />
				</div>
			</Table>
		</Row>
		</Col>

		<!-- 新增模板弹窗开始 -->
		<Modal v-model="addTemplateModal" title="新增" width='650'>
			<Form ref="addTemplateForm" :model="addTemplateForm" :rules="addTemplateRules">
				<FormItem label="模板名称： " prop="modelName" :label-width="120">
					<Input type="text" v-model="addTemplateForm.modelName" class="search-input" :maxlength="50" />
				</FormItem>
				<FormItem label="统计周期 ： " prop="indexTime" :label-width="120">
					<Select v-model="addTemplateForm.indexTime" class="search-input" placeholder="请选择考核周期">>
						<Option value="1">月</Option>
						<Option value="2">年</Option>
					</Select>
				</FormItem>
				<FormItem label="模板描述 ： " :label-width="120">
					<Input v-model="addTemplateForm.modelDesc" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注" :maxlength="200"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<i-button type="primary" @click="insertModel()">确定</i-button>
				<i-button @click="addTemplateModal=false">取消</i-button>
			</div>
		</Modal>
		<!-- 新增模板弹窗结束 -->

		<!-- 审核流-查看弹窗开始 -->
		<Modal v-model="readModal" width='1200'>
			<div style="text-align:center;overflow:auto;">
				<img :src="workFlowImage">
			</div>
			<div slot="footer">
				<i-button type="primary" @click="readModal=false">返回</i-button>
			</div>
		</Modal>
		<!-- 审核流-查看弹窗结束 -->

		<!-- 审核流配置弹窗开始 -->
		<Modal v-model="auditFlowModal" title="添加审核KEY" width='650'>
			<Form ref="PfModellWorkFlowInfo" :model="PfModellWorkFlowInfo" :rules="auditFlowRules" class="search-form">
				<FormItem label="审核流KEY值 : " prop="auditFlowinput1" :label-width="120" width='300'>
					<Input type="text" v-model="PfModellWorkFlowInfo.pfWorkflowKey" class="search-input" @on-blur="changeKey" />
				</FormItem>
				<FormItem label="备注： " :label-width="120">
					<Input v-model="PfModellWorkFlowInfo.note" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<i-button type="primary" @click="editWorkFlowSubmit()">确定</i-button>
				<i-button @click="ediWorkFlowCancel()">取消</i-button>
			</div>
		</Modal>
		<!-- 审核流配置弹窗结束 -->

		<!-- 编辑弹窗开始 -->
		<Modal v-model="editModal" title="编辑" width='650'>
			<Form ref="PfModelInfo" :model="PfModelInfo" :rules="editTemplateRules">
				<FormItem label="模板名称 :" prop="modelName" :label-width="120">
					<Input type="text" v-model="PfModelInfo.modelName" class="search-input" :maxlength="50" />
				</FormItem>
				<FormItem label="统计周期 :" prop="indexTime" :label-width="120">
					<Select v-model="PfModelInfo.indexTime" :placeholder="PfModelInfo.indexTimeDesc">
						<Option value="1">月</Option>
						<Option value="2">年</Option>
					</Select>
				</FormItem>
				<FormItem label="模板描述 :" :label-width="120">
					<Input type="textarea" v-model="PfModelInfo.modelDesc" :autosize="{minRows: 5,maxRows: 5}" :maxlength="200"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<i-button type="primary" @click="editModalSubmit()">确定</i-button>
				<i-button @click="editModalCancel()">取消</i-button>
			</div>
		</Modal>
		<!-- 编辑弹窗结束 -->

	</Row>
</template>
<script>
	import axios from 'axios'
	// import OilPage from '../../components/page/page.vue';
	import { formData } from "../../../assets/js/common.js";
	import { PfModelListPage, PfModelInsert, PfModelEnable, PfModelGetById, PfModelUpdate, PfModelWorkFlowGetById, PfModelWorkflowOperate } from '../../components/axios/performanceManagement.js';
	export default {
		name: 'checkTemplate',
		// components:{
		// 		OilPage
		// 		},
		computed: {
			workFlowImage() {
				return 'https://mgt.oilchem.net/mysteel/workflow/process/imageByKey?key=' + this.workFlowImg
			}
		},
		watch: {
			editModal(newVal, oldVal) {
				if (newVal == true) {
					this.$refs["PfModelInfo"].resetFields();
				}
			},
		},
		data() {
			const auditFlowinputValue = (rule, value, callback) => {
				if (this.PfModellWorkFlowInfo.pfWorkflowKey) {
					callback()
				} else {
					callback(new Error('审核流KEY值不能为空'))
				}
			};
			return {
				ikey: true,
				formDatas: {
					pageNum: 1,
					pageSize: 10,
					modelName: '',
					indexTime: '',
					status: '',
					id: ''
				},
				workFlowImg: '', //查看图片
				seltctValue1: '',
				seltctValue2: '',
				seltctValue3: '',
				addTemplateForm: {
					modelName: '',//新增模板-模板名称
					indexTime: '', //新增模板-统计周期
					modelDesc: '',    //新增模板-模板描述
				},
				addTemplateRules: {
					modelName: [
						{
							required: true,
							message: "模板名称不能为空",
							trigger: "blur"
						},
					],
					indexTime: [
						{
							required: true,
							message: "统计周期不能为空",
							trigger: "blur"
						},
					]
				},
				auditFlowRules: {
					auditFlowinput1: [
						{
							required: true,
							validator: auditFlowinputValue,
						}
					]
				},
				PfModelInfo: {
					modelId: '',
					modelName: '',
					modelDesc: '',
					indexTimeDesc: '',
					indexTime: ''
				},
				editTemplateRules: {
					modelName: [
						{
							required: true,
							message: "模板名称不能为空",
							trigger: "blur"
						},
					],
					indexTime: [
						{
							required: true,
							message: "统计周期不能为空",
							trigger: "blur"
						},
					]
				},
				PfModellWorkFlowInfo: {
					modelId: '',
					note: '',
					pfWorkflowKey: ''
				},
				dataCount: 0,
				pageSizeOpt: [10, 20, 50],
				showSizer: true,
				addTemplateModal: false,
				readModal: false,
				auditFlowModal: false,
				editModal: false,
				auditFlowRemarks: '',
				assessmentCycle: [{
					value: 'all',
					label: '请选择'
				}, {
					value: '2',
					label: '年'
				}, {
					value: '1',
					label: '月'
				}],
				assessmentStatus: [{
					value: '1',
					label: '禁用'
				}, {
					value: '0',
					label: '启用'
				}],
				addcycle: [{
					value: '1',
					label: '月度'
				}, {
					value: '2',
					label: '年度'
				}],
				editcycle: [{
					value: '1',
					label: '月度'
				}, {
					value: '2',
					label: '年度'
				}],
				columns1: [{
					title: '模板名称',
					key: 'modelName',
					align: "center",
					width: 120
				}, {
					title: '模板描述',
					key: 'modelDesc',
					align: "center",
					width: 200
				}, {
					title: '对应职级',
					key: 'positionLevel',
					align: "center",
					width: 120
				}, {
					title: '适用人员',
					key: 'positionNumber',
					align: "center",
					width: 100
				}, {
					title: '考核周期',
					key: 'indexTimeDesc',
					align: "center",
					width: 90
				}, {
					title: '状态',
					key: 'statusDesc',
					align: "center",
					width: 90
				},/* {
					title: '审核流',
					key: 'pfWorkflowKey',
					width: 90,
					align: "center",
					render: (h, params) => {
						return h('div', [
							h('a', {
								style: {

								},
								on: {
									click: () => {
										this.workFlowImg = params.row.pfWorkflowKey;
										this.readModal = true;
									}
								},
							}, params.row.pfWorkflowKey ? '查看' : ''),
						])
					}
				},*/ {
					title: '更新人',
					key: 'operatorName',
					align: 'center',
					width: 120
				}, {
					title: '更新时间',
					key: 'operatTimeDesc',
					align: 'center',
					width: 160
				}, {
					title: '操作',
					key: 'opration',
					align: 'center',
					minWidth: 400,
					render: (h, data) => {
						if (data.row.status == 0) {
							return h('div', [
								h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.$router.push({ name: 'assessmentTemplatedetail', query: { id: data.row.modelId } })
										}
									},
								}, '查看'),
								h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.editModelBtn(data.row.modelId)
										}
									},
								}, '编辑'),
								h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.$router.push({ name: 'indexConfig', query: { id: data.row.modelId } })
										}
									},
								}, '指标配置'),
								h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.$router.push({ name: 'staffing', query: { id: data.row.modelId } })
										}
									},
								}, '人员配置'),
							/*	h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.ediWorkFlowBtn(data.row.modelId);
										}
									},
								}, '审核流配置'),*/
								h('a', {
									on: {
										click: () => {
											this.updateModelStatus(data.row.modelId, data.row.status)
										}
									},

								}, '禁用')
							])
						} else {
							return h('div', [
								h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.$router.push({ name: 'assessmentTemplatedetail', query: { id: data.row.modelId } })
										}
									},
								}, '查看'),
								h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.editModelBtn(data.row.modelId)
										}
									},
								}, '编辑'),
								h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.$router.push({ name: 'indexConfig', query: { id: data.row.modelId } })
										}
									},
								}, '指标配置'),
								h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.$router.push({ name: 'staffing', query: { id: data.row.modelId } })
										}
									},
								}, '人员配置'),
								/*h('a', {
									style: {
										marginRight: '20px'
									},
									on: {
										click: () => {
											this.ediWorkFlowBtn(data.row.modelId);
										}
									},
								}, '审核流配置'),*/
								h('a', {
									on: {
										click: () => {
											this.updateModelStatus(data.row.modelId, data.row.status);
										}
									}
								}, '启用')
							])
						}

					}
				}],
				tableData1: [{
					modelName: '',
					modelDesc: '',
					positionLevel: '',
					positionNumber: '',
					indexTimeDesc: '',
					statusDesc: '',
					pfWorkflowKey: '',
					operatorName: '',
					operatTimeDesc: '',
				}],
				ruleForm: {}
			}
		},
		created() {
			this.getModelList()
		},
		methods: {
			//判断审核流
			changeKey(key) {
				let formValues = {
					processDefKey: key.target.value,
					activate: true,
					page: 1,
					pageSize: 10
				}
				axios.get("/mysteel/workflow/process/list", { params: formValues }).then(res => {
					if (res.data.data.total > 0) {
						this.ikey = true;
					} else {
						this.$Message.error("该审核流key值不存在")
						this.ikey = false;
					}

				});


			},
			onSearch() {
				this.formDatas.pageNum = 1;
				this.formDatas.pageSize = 10;
				this.getModelList();
			},
			//列表
			getModelList() {
				// let form={
				// 	modelName: this.modelListForm.modelName,
				// 	indexTime: this.modelListForm.indexTime,
				// 	status: this.modelListForm.status,
				// 	pageNum: this.pageNum,
				// 	pageSize: this.pageSize
				// }
				PfModelListPage(this.formDatas).then(res => {
					this.tableData1 = res.response.list
					this.dataCount = res.response.total
				})
			},
			//查询条件清空
			reset() {
				this.formDatas = {
					pageNum: 1,
					pageSize: 10,
					modelName: '',
					indexTime: '',
					status: '',
					id: ''
				}
			},
			clearModelListForm() {
				this.modelListForm.modelName = '',
					this.modelListForm.indexTime = '',
					this.modelListForm.status = ''
			},
			changePageNum(current) {
				this.formDatas.pageNum = current;
				this.getModelList();
			},
			// 监听修改显示条数
			changePageSize(size) {
				this.formDatas.pageSize = size;
				this.getModelList();
			},
			selectChange1() {

			},
			//新增模板
			insertModel() {
				let form = {
					modelName: this.addTemplateForm.modelName,
					indexTime: this.addTemplateForm.indexTime,
					modelDesc: this.addTemplateForm.modelDesc
				}
				PfModelInsert(form).then(res => {
					this.$Message.success("添加成功！");
					this.addTemplateModal = false;
					this.$Spin.hide();
					this.getModelList();
					this.addTemplateForm.modelName=''
					this.addTemplateForm.indexTime=''
					this.addTemplateForm.modelDesc=''
				})


			},
			//启用禁用
			updateModelStatus(id, status) {
				if (status == 1) {
					status = 0
				}
				else {
					status = 1
				}
				let form = {
					modelId: id,
					status: status
				}
				PfModelEnable(form).then(res => {
					this.getModelList();
					this.$Message.success("修改状态成功！");
					this.$Spin.hide();
				})
			},
			//修改模板弹窗
			editModelBtn(modelId) {
				this.editModal = true;
				let form = {
					modelId: modelId
				}
				form.items=new Date().getTime();
				PfModelGetById(form).then(res => {
					this.PfModelInfo.modelId = res.response.modelId
					this.PfModelInfo.modelName = res.response.modelName
					this.PfModelInfo.modelDesc = res.response.modelDesc
					this.PfModelInfo.indexTimeDesc = res.response.indexTimeDesc
					this.PfModelInfo.indexTime = res.response.indexTime
				})
			},
			// 修改模板保存
			editModalSubmit() {
				PfModelUpdate(this.PfModelInfo).then(res => {
					this.$Message.success("修改成功！");
					this.editModal = false;
					this.getModelList();
					this.$router.push({
						name: 'checkTemplate'
					})
				});
			},
			// 修改模板取消
			editModalCancel() {
				this.editModal = false
			},
			// 审核流配置弹窗
			ediWorkFlowBtn(modelId) {
				this.auditFlowModal = true;
				let form = {
					modelId: modelId
				}
				PfModelWorkFlowGetById(form).then(res => {
					this.PfModellWorkFlowInfo.modelId = res.response.modelId
					this.PfModellWorkFlowInfo.note = res.response.note
					this.PfModellWorkFlowInfo.pfWorkflowKey = res.response.pfWorkflowKey
				})
			},
			// 审核流配置保存
			editWorkFlowSubmit() {
				let that=this;
				setTimeout(function () {
					if (that.ikey) {
						PfModelWorkflowOperate(that.PfModellWorkFlowInfo).then(res => {
							that.$Message.success("修改成功！");
							that.auditFlowModal = false;
							that.getModelList();
							that.$router.push({
								name: 'checkTemplate'
							})
						});
					} else {
						that.$Message.error("请输入正确的审核流key值")
					}
				}, 1000);
				// if (this.ikey) {
				// 	PfModelWorkflowOperate(this.PfModellWorkFlowInfo).then(res => {
				// 		this.$Message.success("修改成功！");
				// 		this.auditFlowModal = false;
				// 		this.getModelList();
				// 		this.$router.push({
				// 			name: 'checkTemplate'
				// 		})
				// 	});
				// } else {
				// 	this.$Message.error("请输入正确的审核流key值")
				// }

			},
			// 审核流配置取消
			ediWorkFlowCancel() {
				this.auditFlowModal = false;
			},
			//新增模板
			addtemplateModalBtn() {
				this.addTemplateModal = true;
			}
		}

	}
</script>
