<style lang="less" scoped>
	.background-card {
		overflow: hidden;
	}

	.account-title {
		font-size: 16px;
		margin-bottom: 20px;
	}

	.unit1 {
		border-top: 1px solid #D7D7D7;
		border-right: 1px solid #D7D7D7;
		border-bottom: 1px solid #D7D7D7;
		margin-bottom: 20px;
	}

	.unit1 .unit-title {
		text-align: center;
		background: #EBF1FD;
		padding: 12px 0;
		font-size: 16px;
		margin-bottom: 20px;
	}

	.unit {
		border: 1px solid #D7D7D7;
		margin-bottom: 20px;
	}

	.unit .unit-title {
		text-align: center;
		background: #EBF1FD;
		padding: 12px 0;
		font-size: 16px;
		margin-bottom: 20px;
	}

	.unit-content {
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 20px;
	}

	.callback {
		text-align: center;
		margin-bottom: 20px;

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
				当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;考核模板&nbsp;&nbsp;>>&nbsp;&nbsp;人员分配
			</Row>

			<Row>
				<card class="background-card">
					<p class="account-title">模板：{{PfModelInfo.modelName}}</p>

					<Col span="12">
					<div class="unit">
						<div class="unit-title">
							<p>待选区</p>
						</div>
						<div class="unit-content ">
							<Form ref="modelListForm" :model="modelListForm">
								<Row>
									<Col span="8">
									<FormItem label="职称" :label-width="80">
										<Input v-model="modelListForm.positionTitle" class="search-input"></Input>
									</FormItem>
									</Col>
									<Col span="8">
									<FormItem label="职级:" :label-width="80">
										<Input v-model="modelListForm.positionLevel" class="search-input"></Input>
									</FormItem>
									</Col>
								</Row>
								<Row style="margin-bottom:20px;">
									<Col span="24" class="text-right">
									<Button type="primary" style="margin-right:15px;" @click="getSearch()">查询</Button>
									<Button @click="clearModelListForm()">重置</Button>
									</Col>
								</Row>

								<Row style="margin-bottom:10px;">
									<Col span="24">
									<Button type="primary" @click="savePfModelPositionOperate()">添加</Button>
									</Col>
								</Row>

								<Row>
									<Col span="24">
									<Table class="tableCommon" :data="tableData1" :columns="columns1" :stripe="true" :border="true" @on-selection-change="selectChange1">
										<tr v-for="item in tableData1">
											<td>{{item.name}}</td>
											<td>{{item.path}}</td>
											<td>{{item.creater}}</td>
											<td>{{item.creatTime}}</td>
										</tr>
										<div class="page" slot="footer">
											<Page :total="dataCount" show-elevator show-total :show-sizer="showSizer" :page-size="formPage.pageSize" :page-size-opts="pageSizeOpt1"
											 @on-change="changePageNum" @on-page-size-change="changePageSize" />
										</div>
									</Table>
									</Col>
								</Row>

							</Form>
						</div>
					</div>
					</Col>

					<Col span="12">
					<div class="unit1">
						<div class="unit-title">
							<p>已选区</p>
						</div>
						<div class="unit-content" style="padding-top:108px">

							<Row>
								<Col span="24">
								<Button type="primary" style="margin-bottom:10px;" @click="PfModelPositionOperateDeleteSubmit()">删除</Button>
								</Col>
							</Row>

							<Row>
								<Col span="24">
								<Table class="tableCommon" :data="tableData2" :columns="columns2" :stripe="true" :border="true" @on-selection-change="selectChange2">
									<tr v-for="item in tableData2">
										<td>{{item.name}}</td>
										<td>{{item.path}}</td>
										<td>{{item.creater}}</td>
										<td>{{item.creatTime}}</td>
									</tr>
									<div class="page" slot="footer">
										<Page :total="total2" show-elevator show-total :show-sizer="showSizer2" :page-size="formMain.pageSize" :page-size-opts="pageSizeOpt2"
										 @on-change="changePageNum2" @on-page-size-change="changePageSize2" />
									</div>
								</Table>
								</Col>
							</Row>

						</div>
					</div>
					</Col>
					<Col span='24' class="callback">
					<Button type="primary" @click="backtorole">返回</Button>
					</Col>
				</card>
			</Row>
		</i-col>
	</Row>
</template>
<script>
	import axios from 'axios'
	import { PfModelGetById, PfModelPositionListPage, PfModelSelectedPositionListPage, PfModelPositionOperate, PfModelPositionOperateDelete } from '../../components/axios/performanceManagement.js';
	import { formData } from "../../../assets/js/common.js";
	export default {
		name: 'staffing',
		data() {
			return {
				formPage: {
					pageNum: 1,
					pageSize: 10
				},
				dataCount: 0,
				pageSizeOpt1: [10, 20, 50],
				showSizer: true,
				formMain: {
					pageNum: 1,
					pageSize: 10
				},
				total2: 0,
				pageSizeOpt2: [10, 20, 50],
				showSizer2: true,
				modelListForm: {
					positionLevel: '',
					positionTitle: ''
				},
				PfModelInfo: {
					modelName: ''
				},
				ruleleftForm: [],
				columns1: [{
					type: 'selection',
					title: '选择',
					align: 'center',
					width: 50
				}, {
					title: '职称',
					key: 'positionTitle'
				}, {
					title: '职级',
					key: 'positionLevel',
					width: 80
				}, {
					title: '职等',
					key: 'positionRank'
				}, {
					title: '状态',
					key: 'positionStatusDesc',
					width: 80
				}],
				tableData1: [{
					positionId: '',
					positionTitle: '',
					positionLevel: '',
					positionRank: '',
					positionStatusDesc: ''
				}],
				columns2: [{
					type: 'selection',
					title: '选择',
					align: 'center',
					width: 50
				}, {
					title: '职称',
					key: 'positionTitle'
				}, {
					title: '职级',
					key: 'positionLevel',
					width: 80
				}, {
					title: '职等',
					key: 'positionRank'
				}, {
					title: '操作',
					key: 'operation',
					width: 80,
					render: (h, data) => {
						return h('a', {
							on: {
								click: () => {
									this.PfModelPositionDeleteSingle(data.row.positionId)
								}
							}
						}, '删除')
					}
				}],
				tableData2: [{
					positionId: '',
					positionTitle: '',
					positionLevel: '',
					positionRank: ''
				}],
			}
		},
		created() {
			let that = this;
			that.modelId = this.$route.query.id;
			this.getModelInfo();
			this.getPfModelSelectedPositionListPage();
			this.getPfModelPositionListPage();
		},
		methods: {
			// 头部模板信息
			getModelInfo() {
				let form = {
					modelId: this.modelId
				}
				PfModelGetById(form).then(res => {
					this.PfModelInfo.modelName = res.response.modelName
				})
			},
			//查询按钮
			getSearch() {
				this.formPage.pageNum = 1
				this.formPage.pageSize = 10
				this.getPfModelPositionListPage()
			},
			//待选区分页列表
			getPfModelPositionListPage() {
				let form = {
					positionLevel: this.modelListForm.positionLevel,
					positionTitle: this.modelListForm.positionTitle,
					pageNum: this.formPage.pageNum,
					pageSize: this.formPage.pageSize
				}
				PfModelPositionListPage(form).then(res => {
					this.tableData1 = res.response.list
					this.dataCount = res.response.total
				})
			},
			//查询条件清空
			clearModelListForm() {
				this.modelListForm.positionLevel = '',
					this.modelListForm.positionTitle = '',
					this.formPage.pageNum = 1
				this.formPage.pageSize = 10
			},
			//已选区分页列表
			getPfModelSelectedPositionListPage() {
				let form = {
					modelId: this.modelId,
					pageNum: this.formMain.pageNum,
					pageSize: this.formMain.pageSize
				}
				PfModelSelectedPositionListPage(form).then(res => {
					this.tableData2 = res.response.list
					this.total2 = res.response.total
				})
			},
			//待选区分页监听
			changePageNum(current) {
				this.formPage.pageNum = current;
				this.getPfModelPositionListPage();
			},
			// 待选区监听修改显示条数
			changePageSize(size) {
				this.formPage.pageSize = size;
				this.getPfModelPositionListPage();
			},
			//已选区分页监听
			changePageNum2(current) {
				this.formMain.pageNum = current;
				this.getPfModelSelectedPositionListPage();
			},
			// 已选区监听修改显示条数
			changePageSize2(size) {
				this.formMain.pageSize = size;
				this.getPfModelSelectedPositionListPage();
			},
			// 批量添加模板关联人员
			savePfModelPositionOperate() {
				if (this.positionIds == undefined || this.positionIds.length == 0) {
					this.$Message.error("请选勾选数据")
				} else {
					let form = {
						modelId: this.modelId,
						"positionIds[]": this.positionIds
					}
					PfModelPositionOperate(formData(form)).then(res => {
						this.$Message.success("添加成功！");
						this.$Spin.hide();
						this.getPfModelSelectedPositionListPage();
						this.getPfModelPositionListPage();
						this.positionIds=[];
					})
				}

			},
			// 待选区列表多选
			selectChange1(selection) {
				this.positionIds=[];
				let positionIds = selection.map(item => {
					return item.positionId
				})
				this.positionIds = positionIds;
				this.selection = selection
			},
			// 批量删除已关联人员
			PfModelPositionOperateDeleteSubmit() {
				if(this.positionIds2 == undefined || this.positionIds2.length == 0){
					this.$Message.error("请先勾选数据")
				}else{
					let form = {
					modelId: this.modelId,
					"positionIds[]": this.positionIds2
				}
		
				PfModelPositionOperateDelete(formData(form)).then(res => {
					this.$Message.success("删除成功！");
					this.positionIds2=[];
					this.$Spin.hide();
					this.getPfModelSelectedPositionListPage();
				})
				}
				
			},
			// 已选区列表多选
			selectChange2(selection) {
			
				let positionIds = selection.map(item => {
					return item.positionId
				})
				this.positionIds2 = positionIds;
				this.selection = selection
			},
			// 单个删除已关联人员
			PfModelPositionDeleteSingle(positionId) {
				let form = {
					modelId: this.modelId,
					"positionIds[]": positionId
				}
				PfModelPositionOperateDelete(formData(form)).then(res => {
					this.$Message.success("删除成功！");
					this.$Spin.hide();
					this.formMain.pageNum = 1;
					this.formMain.pageSize = 10;
					this.getPfModelSelectedPositionListPage();
				})
			},
			//返回
			backtorole() {
				this.$router.push({ name: 'checkTemplate' })
			}
		}
	}
</script>