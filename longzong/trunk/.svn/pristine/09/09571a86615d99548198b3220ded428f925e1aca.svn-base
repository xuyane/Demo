<style lang="less" scoped>
	.staticsdetail {
		margin-bottom: 15px;
		display: flex;
		justify-content: space-between;
	}

	.staticsdetail span {
		font-size: 14px;
	}

	.page {
		margin: 10px 0;
		text-align: right;
		padding-right: 18px;
	}


	.mar-b {
		margin-bottom: 20px;
	}

	.dataTotal {
		margin: 10px 0;
	}

	.dataTotal span {
		float: left;
		display: inline-block;
		width: 100px;
		text-align: center;
		padding: 5px 0;
		border: 1px solid #bbb;
		border-right: 0;

	}

	.dataTotal .title {
		background: #ebf2fe;
	}

	.dataTotal .num {
		font-weight: bolder;
	}
</style>
<template>
	<Row>

		<i-col span="24">
			<Row class-name="current-position">
				当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;部门人员提成
			</Row>
		</i-col>

		<Col span='24'>
		<Form class="search-form">
			<Row type="flex" justify="space-between">
				<Col span="7">
				<FormItem label="开始时间：" :label-width="90">
					<DatePicker type="date" placeholder="请选择开始时间" class="search-input" v-model="startTime" @on-change="changeTime()"></DatePicker>
				</FormItem>

				</Col>
				<Col span="7">
				<FormItem label="结束时间：" :label-width="90">
					<DatePicker type="date" placeholder="请选择结束时间" class="search-input" v-model="endTime" @on-change="changeTime()"></DatePicker>
				</FormItem>
				</Col>

				<Col span="7">
				<FormItem label="姓名 ： " :label-width="90">
					<Input type="text" placeholder="请输入姓名" class="search-input" v-model="adminName"></Input>
				</FormItem>
				</Col>
				<Col span="7">
				<FormItem label="部门 ： " :label-width="90">
					<Input type="text" placeholder="请输入部门" class="search-input" v-model="orgName"></Input>
				</FormItem>
				</Col>
				<Col span="7" class="text-right mar-b">
				<Button type="primary" @click="onSearch" style="margin-right:20px">查询</Button>
				<Button type="primary" @click="clear">重置</Button>
				</Col>
				<!-- <Col span="24" class="text-right mar-b">
				<Button type="primary" @click="onSearch" style="margin-right:20px">查询</Button>
				<Button type="primary" @click="clear">重置</Button>
				</Col> -->
			</Row>
		</Form>
		</Col>
		<Col span='24' class="table-con">
		<Row class="mar-b">
			<Col span="12">
			<div>
				<Button type="primary" @click="exportData" :loading="btnloading">导出</Button>
			</div>
			</Col>
			<Col span="12" style="font-size: 16px;">
			<div class="text-right">
				<span>到账总金额:
					<b class="em">{{totalInComeCount}}</b>&nbsp;&nbsp;</span>
				<span>总成本合计:
					<b class="em">{{totalCostCount}}</b>&nbsp;&nbsp;</span>
			</div>
			<div class="text-right">
				<span>认账总金额:
					<b class="em">{{ackAmountCount}}</b>&nbsp;&nbsp;</span>
			</div>
			</Col>
		</Row>
		<Table class="tableCommon" :data="tableData1" :columns="columns1" ref="table">
			<div class="page" slot="footer">
				<Page :total="dataCount" show-elevator show-total show-sizer :page-size="dataForm.pageSize" :page-size-opts="pageSizeOpt"
				 @on-change="changePageNum" @on-page-size-change="changePageSize" />
			</div>
		</Table>

		</Col>

		<!-- 明细弹窗开始 -->
		<Modal v-model="detailModal" title="明细详情" width='1233'>
			<Form class="search-form">
				<Row>
					<Col span="6">
					<FormItem label="产品分类 ： " :label-width="120">
						<Cascader v-model="productClassify" :data="protectList" class="search-input" placeholder="请选择产品分类"></Cascader>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="续入类型 ： " :label-width="120">
						<Cascader v-model="continuationClassify" :data="typeList" class="search-input" placeholder="请选择续入类型"></Cascader>
					</FormItem>
					</Col>
					<Col span="6" class="text-right">
					<Button type="primary" style="margin-right:20px" @click="onSearchItem()">查询</Button>
					<Button @click="resetItem()">重置</Button>
					</Col>

				</Row>
			</Form>
			<Table class="tableCommon" :data="tableData2" :columns="columns2" ref="table"></Table>
			<Row class="dataTotal">
				<span class="title">总和</span>
				<span style="width: 200px;">--</span>
				<span>--</span>
				<span>--</span>
				<span class="num">{{totalInCome}}</span>
				<span class="num">{{totalCost}}</span>
				<span>--</span>
				<span class="num">{{percentageRate}}</span>
				<span>--</span>
				<span class="num">{{bonusInCome}}</span>
				<span class="num" style="border: 1px solid #bbb;">{{payroll}}</span>
			</Row>
			<div class="page">
				<Page show-elevator show-total show-sizer :total="dataCount2" :page-size="dataForm2.pageSize" :page-size-opts="pageSizeOpt2"
				 @on-change="changePageNum2" @on-page-size-change="changePageSize2" />
			</div>
			<div slot="footer"></div>
		</Modal>
		<!-- 明细弹窗结束 -->



	</Row>
</template>
<script>
	import axios from 'axios';
	import { formData, formatStamp, getLastMonth, } from "../../../assets/js/common.js";
	// import { getProductTreeList, proCategoryList } from '../../components/axios/productCenter.js'
	import { pfAdminList, pfAdminListCount, pfAdminListItem, pfAdminListItemCount,proCategoryList } from '../../components/axios/performanceManagement.js';
	export default {
		name: 'personnelCommission',
		data() {
			return {
				btnloading: false,
				itemData: {},
				totalInCome: 0,
				totalCost: 0,
				percentageRate: 0,
				bonusInCome: 0,
				payroll: 0,
				ackAmountCount: 0,
				totalCostCount: 0,
				totalInComeCount: 0,
				accountTransferTimeEnd: '',
				accountTransferTimeStart: '',
				detailModal: false,
				adminName: '',
				orgName: '',
				dataCount: 0,
				dataForm: {
					pageNum: 1,
					pageSize: 10
				},
				showSizer: true,
				pageSizeOpt: [10, 20, 50],
				dataForm2: {
					pageNum: 1,
					pageSize: 10
				},
				dataCount2: 0,
				pageSizeOpt2: [10, 20, 50],
				continuationClassify: [],
				typeList: [
					{ value: '1', label: '新入' },
					{ value: '2', label: '续入' },
					{ value: '3', label: '会议' },
				],
				protectList: [],
				productClassify: [],
				startTime: "",
				endTime: "",
				columns1: [
					{
						title: '姓名',
						key: 'adminName',
						width: 150
					}, {
						title: '所在部门',
						key: 'orgName',
						width: 200
					}, {
						title: '总收入',
						key: 'totalInCome',
						Width: 150
					}, {
						title: '总成本',
						key: 'totalCost',
						width: 150
					}, {
						title: '提成收入',
						key: 'percentageInCome',
						width: 150
					}, {
						title: '奖金',
						key: 'bonusInCome',
						width: 150
					}, {
						title: '实发',
						key: 'payroll',
						Width: 150
					}, {
						title: '操作',
						minWidth: 100,
						render: (h, data) => {
							return h('div', [
								h('a', {
									style: {

									},
									on: {
										click: () => {
											this.getDetail(data)
										}
									},
								}, '查看明细')
							])
						}
					}],
				tableData1: [],
				tableData2: [],
				columns2: [
					{
						title: '姓名',
						key: 'adminName',
						width: 100
					}, {
						title: '所在部门',
						key: 'orgName',
						width: 200
					}, {
						title: '续入类型',
						key: 'typeDesc',
						Width: 100
					}, {
						title: '产品分类',
						key: 'productCategoryName',
						width: 100
					}, {
						title: '总收入',
						key: 'totalInCome',
						width: 100
					}, {
						title: '总成本',
						key: 'totalCost',
						width: 100
					}, {
						title: '提成比例',
						key: 'percentageRate',
						Width: 100
					}, {
						title: '提成收入',
						key: 'percentageInCome',
						Width: 100
					}, {
						title: '奖金比例',
						key: 'bonusRate',
						Width: 100
					}, {
						title: '奖金',
						key: 'bonusInCome',
						Width: 100
					}, {
						title: '实发',
						key: 'payroll',
						Width: 100
					},],


			}
		},
		created() {
			this.getDefTime();
			this.getPfListPage();
			this.getCategoryList();
			this.getListCount();
		},
		methods: {
			//获取上一个月时间
			getDefTime() {
				let data = getLastMonth();
				let year = data.substring(0, 4);
				let lastMonth = data.substring(5, 8);
				this.startTime = data + '-01'
				this.endTime = new Date(year, lastMonth, 0);
				var startTime = new Date(this.startTime);
				startTime.setHours(0, 0, 0);
				this.accountTransferTimeStart = startTime.getTime();
				var endTime = new Date(this.endTime);
				endTime.setHours(23, 59, 59);
				this.accountTransferTimeEnd = endTime.getTime();
			},
			//获取列表数据
			getPfListPage() {
				let form = {
					accountTransferTimeEnd: this.accountTransferTimeEnd,
					accountTransferTimeStart: this.accountTransferTimeStart,
					adminName: this.adminName,
					orgName: this.orgName,
					pageNum: this.dataForm.pageNum,
					pageSize: this.dataForm.pageSize,
					sign: ""
				}
				form.time = Math.random() * 1000
				this.$Spin.show();
				pfAdminList(form).then(res => {
					if (res.status == "200") {
						if (res.response != null) {
							this.tableData1 = res.response.list;
							this.dataCount = res.response.total;
						}
					}

					this.$Spin.hide();

				})

			},

			// 获取列表总计
			getListCount() {
				let form = {
					accountTransferTimeEnd: this.accountTransferTimeEnd,
					accountTransferTimeStart: this.accountTransferTimeStart,
					adminName: this.adminName,
					orgName: this.orgName,
					sign: ""
				}
				form.time = Math.random() * 1000
				this.$Spin.show();
				pfAdminListCount(form).then(res => {
					if (res.status == "200") {
						if (res.response != null) {
							this.ackAmountCount = res.response.ackAmountCount;
							this.totalCostCount = res.response.totalCostCount;
							this.totalInComeCount = res.response.totalInComeCount;
						}
					}

					this.$Spin.hide();

				})
			},

			// 获取产品分类列表
			getCategoryList() {
				proCategoryList({ v: Math.random() * 1000 }).then(res => {
					this.protectList = this.productDigui(res.response);
				})
			},

			productDigui(data) {
				let dgData = data.map(item => {
					if (item.children.length > 0) {
						return {
							label: item.productCategoryName,
							value: item.productCategoryCode,
							children: this.productDigui(item.children)
						};
					} else {
						return {
							label: item.productCategoryName,
							value: item.productCategoryCode,
						};
					}
				});
				return dgData;
			},

			//改变开始时间
			changeTime(time) {
				if (new Date(this.startTime).getTime() > new Date(this.endTime).getTime()) {
					this.endTime = '',
						this.$Message.error("开始时间不能大于结束时间")
				}
			},
			//查看明细
			getDetail(data) {
				this.detailModal = true;
				this.itemData = data.row;
				this.getAdminListItem();
				this.getListItemCount();

			},
			//获取明细列表
			getAdminListItem() {
				let form = {
					accountTransferTimeEnd: this.accountTransferTimeEnd,
					accountTransferTimeStart: this.accountTransferTimeStart,
					adminId: this.itemData.adminId,
					productCategoryCode: this.productClassify[this.productClassify.length - 1],
					type: this.continuationClassify[0],
					pageNum: this.dataForm2.pageNum,
					pageSize: this.dataForm2.pageSize,
					sign: ""
				}
				form.time = Math.random() * 1000
				this.$Spin.show();
				pfAdminListItem(form).then(res => {
					if (res.status == "200") {
						if (res.response != null) {
							this.dataCount2 = res.response.total;
							this.tableData2 = res.response.list;
						}
					}

					this.$Spin.hide();

				})

			},

			// 获取明细列表总计
			getListItemCount() {
				let form = {
					accountTransferTimeEnd: this.accountTransferTimeEnd,
					accountTransferTimeStart: this.accountTransferTimeStart,
					adminId: this.itemData.adminId,
					productCategoryCode: this.productClassify[this.productClassify.length - 1],
					sign: "",
					type: this.continuationClassify[0]
				}
				form.time = Math.random() * 1000
				this.$Spin.show();
				pfAdminListItemCount(form).then(res => {
					if (res.status == "200") {
						if (res.response != null) {
							this.totalInCome = res.response.totalInComeCount;
							this.totalCost = res.response.totalCostCount;
							this.percentageRate = res.response.percentageInComeCount;
							this.bonusInCome = res.response.bonusInComeCount;
							this.payroll = res.response.payrollCount;
						}
					}

					this.$Spin.hide();

				})
			},
			//查询
			onSearch() {
				this.dataForm.pageNum = 1;
				this.dataForm.pageSize = 10;
				var startTime = new Date(this.startTime);
				startTime.setHours(0, 0, 0);
				this.accountTransferTimeStart = startTime.getTime();
				var endTime = new Date(this.endTime);
				endTime.setHours(23, 59, 59);
				this.accountTransferTimeEnd = endTime.getTime();
				this.getPfListPage();
				this.getListCount();
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
			//查看详情条数
			changePageNum2(current) {
				this.dataForm2.pageNum = current;
				this.getAdminListItem();
			},
			// 监听详情修改显示条数
			changePageSize2(size) {
				this.dataForm2.pageSize = size;
				this.getAdminListItem();
			},

			//导出
			exportData() {
				if (this.dataCount >= 10000) {
					this.$Message.warning({
						content: '数据超过1万条，请分批导出',
						duration: 2
					});
				} else if (this.dataCount <= 0) {
					this.$Message.warning({
						content: '无数据',
						duration: 2
					})
				} else {
					if (this.startTime == "" || this.endTime == "") {
						this.getDefTime();
						this.exportApi();
					} else {
						var startTime = new Date(this.startTime);
						startTime.setHours(0, 0, 0);
						this.accountTransferTimeStart = startTime.getTime();
						var endTime = new Date(this.endTime);
						endTime.setHours(23, 59, 59);
						this.accountTransferTimeEnd = endTime.getTime();
						this.exportApi();
					}

				}
			},
			//导出调用
			exportApi() {
				this.btnloading = true;
				let params = {
					accountTransferTimeEnd: this.accountTransferTimeEnd,
					accountTransferTimeStart: this.accountTransferTimeStart,
					adminName: this.adminName,
					orgName: this.orgName,
					pageNum: this.dataForm.pageNum,
					pageSize: this.dataForm.pageSize,
					sign: ""
				};
				axios({
					url:"/report/percentageRate/adminListExport",
					method: "get",
					params: params
				}).then(res => {
					if (res.data.status === "500" || res.data.status === "100053") {
						this.$Message.warning(
							res.data.message ? res.data.message : ""
						);
					} else {
						
						window.location.href = '/report/percentageRate/adminListExport?accountTransferTimeEnd=' + this.accountTransferTimeEnd
							+ '&accountTransferTimeStart=' +this.accountTransferTimeStart
							+ '&adminName=' + this.adminName
							+ '&orgName=' + this.orgName
							+ '&pageNum=' + this.dataForm.pageNum
							+ '&pageSize=' + this.dataForm.pageSize;
					}
					this.btnloading = false;
				});
			},
			//重置
			clear() {
				this.getDefTime();
				this.adminName = '',
				this.orgName = ''
			},
			//明细查询
			onSearchItem() {
				this.getAdminListItem();
				this.getListItemCount();
			},
			//明细重置
			resetItem() {
				this.productClassify = [];
				this.continuationClassify = []
			}
		}

	}
</script>