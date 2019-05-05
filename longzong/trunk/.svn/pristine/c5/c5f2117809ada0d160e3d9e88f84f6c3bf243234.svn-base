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
		height: 500px;
	}

	.callback {
		text-align: center;
		margin-bottom: 20px;

	}

	.largePageSty{
		height: 622px;
		overflow-y: auto;
	}
</style>
<template>
	<Row>
		<i-col span="24">

			<Row class-name="current-position">
				当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;角色管理&nbsp;&nbsp;>>&nbsp;&nbsp;账号分配
			</Row>

			<Row>
				<card class="background-card">
					<p class="account-title">分配角色：{{roleName}}</p>

					<Col span="12">
					<div class="unit">
						<div class="unit-title">
							<p>待选区</p>
						</div>
						<div class="unit-content">
							<Form ref="leftform" :model="leftForm" :label-width="65">

								<Row>
									<Col span="8">
									<FormItem label="部门:">
										<Input v-model="leftForm.orgName" class="search-input" readonly @on-focus="getDeptTreeLeft" placeholder="请选择部门">
										<Button slot="append" @click="clearDeptTreeLeft">X</Button>
										</Input>
									</FormItem>
									</Col>
									<Col span="8">
									<FormItem label="姓名:">
										<Input v-model="leftForm.name" class="search-input"></Input>
									</FormItem>
									</Col>
									<!--	<Col span="7">
										<FormItem label="职位：">
											<Select v-model="leftForm.position" class="form-select">
												<Option v-for="item in leftForm.positionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
											</Select>
										</FormItem>
									</Col> -->
								</Row>

								<Row class="aggregate-btn">
									<Col span="12">
									<Button type="primary" style="margin-left:20px;" @click="saveAddRoleUserList">添加</Button>
									</Col>
									<Col span="11" class="text-right">
									<Button type="primary" @click="searchEmployeePage">查询</Button>
									</Col>
								</Row>

								<Row class-name="table-con">
									<Col span="24" :class="largePage">
									<Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange1">
										<tr v-for="item in tableData1">
											<td>{{item.loginName}}</td>
											<td>{{item.name}}</td>
											<td>{{item.orgName}}</td>
											<td>{{item.position}}</td>
										</tr>
									</Table>
									</Col>
									<oil-page :total="total" :page-size="pageSize" :page-num="pageNum" @page-change="pageChange" :page-size-opts="pageSizeOpts"
									 :show-sizer="showSizer" class="pagebox">
									</oil-page>
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
						<div class="unit-content">
							<Form ref="rightform" :model="rightForm" :label-width="65">

								<Row>
									<Col span="8">
									<FormItem label="部门:">
										<Input v-model="rightForm.orgName" class="search-input" readonly @on-focus="getDeptTreeRight" placeholder="请选择部门">
										<Button slot="append" @click="clearDeptTreeRight">X</Button>
										</Input>
									</FormItem>
									</Col>
									<Col span="8">
									<FormItem label="姓名:">
										<Input v-model="rightForm.employeeName" class="search-input"></Input>
									</FormItem>
									</Col>
								</Row>

								<Row class="aggregate-btn">
									<Col span="11">
									<Button type="primary" style="margin-left:20px;" @click="saveDeleteRoleUserList">删除 </Button>
									</Col>
									<Col span="10" class="text-right">
									<Button type="primary" @click="searchRoleRelEmployeeList">查询</Button>
									</Col>
									 <Col span="3" class="text-center">
										<span>共{{total1}}条记录</span>
										<!-- <Button type="error" @click="deleteData">一键删除</Button> -->
									</Col>
								</Row>

								<Row class-name="table-con">
									<Col span="24">
									<Table class="tableCommon" :data="tableData2" :columns="columns2" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange2">
										<tr v-for="item in tableData2">
											<td>{{item.loginName}}</td>
											<td>{{item.employeeName}}</td>
											<td>{{item.orgName}}</td>
											<td>{{item.position}}</td>
										</tr>
									</Table>
									</Col>
									
								</Row>
							</Form>
						</div>
					</div>
					</Col>
					<Col span='24' class="callback">
					<Button type="primary" @click="backtorole">返回</Button>
					</Col>
				</card>
			</Row>
		</i-col>
		<Modal v-model="deptModelLeft" title="请选择部门" :footer-hide="true">
			<div class="overflow-auto" style="max-height: 300px;">
				<Tree ref="treeLeft" :data="deptListLeft" @on-select-change='getOrgIdLeft'></Tree>
			</div>
		</Modal>
		<Modal v-model="deptModelRight" title="请选择部门" :footer-hide="true">
			<div class="overflow-auto" style="max-height: 300px;">
				<Tree ref="treeRight" :data="deptListRight" @on-select-change='getOrgIdRight'></Tree>
			</div>
		</Modal>
	</Row>
</template>
<script>
	import OilPage from "../../components/page/page.vue";
	import { queryEmployeePage, queryRoleRelEmployeeList, deleteRoleUser, deleteRoleUserList, addRoleUserList, deptTree } from "../../components/axios/EAC.js";
	import { formData } from "../../../assets/js/common.js";
	export default {
		name: 'accountAssignment',
		components: {
			OilPage
		},
		data() {
			return {
				roleId: '',
				roleName: '',
				selectAddUserIds: '',
				selectDeleteUserIds: '',
				total: 0,
				total1:0,
				pageNum: 1,
				pageSize: 10,
				showSizer: true,
				pageSizeOpts: [5, 10, 20, 30,200],
				ruleleftForm: [],
				deptModelLeft: false,
				deptListLeft: [],
				leftForm: {
					value:'',
					// orgId: '',
					orgName: '',
					name: '',
					position: '',
					positionList: [{
						label: '全部',
						value: ''
					}, {
						label: '营销总监',
						value: ''
					}, {
						label: '营销经理',
						value: ''
					}, {
						label: '营销员',
						value: ''
					}, {
						label: '编辑总监',
						value: ''
					}, {
						label: '编辑经理',
						value: ''
					}, {
						label: '普通编辑',
						value: ''
					}]
				},
				columns1: [{
					type: 'selection',
					title: '选择',
					align: 'center',
					width: 50
				}, {
					title: '用户名',
					key: 'loginName',
					align: 'center',
					width: 120
				}, {
					title: '姓名',
					key: 'name',
					align: 'center',
					width: 150
				}, {
					title: '所属部门',
					key: 'orgName',
					align: 'center',
					width: 180
				}, {
					title: '职位',
					key: 'position',
					align: 'center',
					minWidth: 200
				}],
				tableData1: [{
					loginName: '',
					name: '',
					orgName: '',
					position: ''
				}],
				deptModelRight: false,
				deptListRight: [],
				rightForm: {
					// orgId: '',
					value:'',
					orgName: '',
					employeeName: ''
				},
				columns2: [{
					type: 'selection',
					title: '选择',
					align: 'center',
					width: 50
				}, {
					title: '用户名',
					key: 'loginName',
					align: 'center',
					width: 100
				}, {
					title: '姓名',
					key: 'employeeName',
					align: 'center',
					width: 100
				}, {
					title: '所属部门',
					key: 'orgName',
					align: 'center',
					minWidth: 200
				}, {
					title: '职位',
					key: 'position',
					align: 'center',
					width: 180
				}, {
					title: '操作',
					key: 'operation',
					align: 'center',
					width: 100,
					render: (h, data) => {
						return h('a', {
							on: {
								click: () => {
									this.saveDeleteRoleUser(data.row.employeeId);
								}
							}
						}, '移除')
					}
				}],
				tableData2: [],
				isChangeSty: false
			}
		},


		computed: {
			largePage() {
				return this.isChangeSty ? 'largePageSty' : ''
			}
		},

		created() {
			// 角色信息
			let that = this;
			that.roleId = this.$route.query.id;
			that.roleName = this.$route.query.name;
			this.getEmployeePage();
			this.getRoleRelEmployeeList();
		},

		methods: {
			//递归获得部门数据
			deptDigui(data) {
				let dgData = data.map(item => {
					if (item.children && item.children.length > 0) {
						return {
							id: item.id,
							title: item.label,
							status: item.status,
							value: item.value,
							expand: true,
							children: this.deptDigui(item.children)
						}
					} else {
						return {
							id: item.id,
							title: item.label,
							status: item.status,
							value: item.value,
							children: item.children
						}
					}
				})
				return dgData
			},
			// 部门树
			getDeptTreeLeft() {
				this.deptModelLeft = true;
				deptTree().then(res => {
					console.log(res);
					let data = [];
					data = JSON.parse(res.response)
					this.deptListLeft = this.deptDigui(data);
				})
			},
			//通过点击树的数据获取相应的数据
			getOrgIdLeft(data) {
				this.deptModelLeft = false;
				// this.leftForm.orgId = data[0].id;
				this.leftForm.value = data[0].value;
				this.leftForm.orgName = data[0].title;
			},
			// 清除待选区部门树查询
			clearDeptTreeLeft() {
				// this.leftForm.orgId = ''
				this.leftForm.value = ''
				this.leftForm.orgName = ''
			},
			// 部门树
			getDeptTreeRight() {
				this.deptModelRight = true;
				deptTree().then(res => {
					console.log(res);
					let data = [];
					data = JSON.parse(res.response)
					this.deptListRight = this.deptDigui(data);
				})
			},
			//通过点击树的数据获取相应的数据
			getOrgIdRight(data) {
				this.deptModelRight = false;
				// this.rightForm.orgId = data[0].id;
				this.rightForm.value = data[0].value;
				this.rightForm.orgName = data[0].title;
			},
			// 清除已选区部门树查询
			clearDeptTreeRight() {
				// this.rightForm.orgId = ''
				this.rightForm.value = ''
				this.rightForm.orgName = ''
			},
			// 获取待选区分页列表查询
			searchEmployeePage() {
				this.pageNum = 1;
				this.getEmployeePage()
			},
			// 获取待选区分页列表
			getEmployeePage() {
				this.$Spin.show();
				let form = {
					// orgId: this.leftForm.orgId,
					orgCode:this.leftForm.value,
					employeeName: this.leftForm.name,
					position: this.leftForm.position,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				queryEmployeePage(formData(form)).then(res => {
					this.tableData1 = res.response.list;
					this.total = res.response.total;
					this.$Spin.hide();
				})
			},
			// 获取已选区分页列表查询
			searchRoleRelEmployeeList() {
				this.pageNum = 1;
				this.getRoleRelEmployeeList()
			},
			// 获取已选区分页列表
			getRoleRelEmployeeList() {
				let form = {
					roleId: this.roleId,
					employeeName: this.rightForm.employeeName,
					// orgId: this.rightForm.orgId
					orgCode : this.rightForm.value
				}
				queryRoleRelEmployeeList(formData(form)).then(res => {
					this.tableData2 = res.response;
					this.total1 = res.response.length;
					this.$Spin.hide();
				})
			},
			//批量添加角色关联用户
			saveAddRoleUserList() {
				let form = {
					roleId: this.roleId,
					userIds: this.selectAddUserIds
				}
				this.$Spin.show();
				addRoleUserList(formData(form)).then(res => {
					this.$Message.success("添加成功！！！");
					this.getRoleRelEmployeeList();
				})
			},
			//员工列表多选
			selectChange1(selection) {
				let selectAddUserIds = selection.map(item => {
					return item.id
				})
				this.selectAddUserIds = selectAddUserIds;
				this.selection = selection
			},
			// 删除角色关联的用户
			saveDeleteRoleUser(userId) {
				let form = {
					roleId: this.roleId,
					userId: userId
				}
				deleteRoleUser(formData(form)).then(res => {
					this.$Message.success("删除成功！！！");
					this.$Spin.hide();
					this.getRoleRelEmployeeList();
				})
			},
			// 批量删除角色关联的用户
			saveDeleteRoleUserList() {
				let form = {
					roleId: this.roleId,
					userIds: this.selectDeleteUserIds
				}
				deleteRoleUserList(formData(form)).then(res => {
					this.$Message.success("删除成功！！！");
					this.$Spin.hide();
					this.getRoleRelEmployeeList();
				})
			},
			//关联账号列表多选
			selectChange2(selection) {
				let selectDeleteUserIds = selection.map(item => {
					return item.employeeId
				})
				this.selectDeleteUserIds = selectDeleteUserIds;
				this.selection = selection
			},

			// 监听分页
			pageChange(page, pageSize) {
				if (page) {
					this.pageNum = page
				}
				if (pageSize) {
					this.isChangeSty = pageSize === 200;
					this.pageSize = pageSize
				}
				this.getEmployeePage()
			},
			backtorole() {
				this.$router.push({ name: 'roleQueryList' })
			}
		}
	}
</script>