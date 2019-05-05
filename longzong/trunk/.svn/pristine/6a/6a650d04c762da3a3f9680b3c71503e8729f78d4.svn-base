<style lang="less" scoped>
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
				当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;考核异常统计
			</Row>
		</i-col>

		<Col span='24'>
		<Form class="search-form" :model="searchForm">
			<Row type="flex" justify="space-between">
				<Col span="7">
				<FormItem label="员工 ： " :label-width="90">
					<Input type="text" placeholder="请输入人名" class="search-input" v-model="searchForm.adminName"></Input>
				</FormItem>
				</Col>
				<Col span="7">
				<!-- <FormItem label="部门：" :label-width="120">
            <bu-men @data-list="departDatas" :emptyModel='searchForm.orgIds' v-model="searchForm.orgIds"></bu-men>
          </FormItem> -->
				<FormItem label="所在部门 ： " :label-width="120">
					<!-- <Input type="text" placeholder="请选择所在部门" class="search-input" v-model="searchForm.orgIds"></Input> -->
					<bu-men @data-list="departDatas" :emptyModel='searchForm.orgIds'></bu-men>
				</FormItem>
				</Col>
				<Col span="7">
				<FormItem label="考核周期 ： " :label-width="120">
					<!-- <Select v-model="searchForm.indexTime" >
							<Option v-for="item in assessmentCycle" :value="item.value" :key="item.value"></Option>
						</Select> -->
					<DatePicker v-model="indexT" type="month" placeholder="请输入考核周期" class="search-input" @on-change="getMonthOne"></DatePicker>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex" justify="space-between">
				<Col span="7">
				<FormItem label="处理状态 ： " :label-width="90">
					<Select v-model="searchForm.excpStatus" placeholder="全部">
						<Option v-for="item in assessmentStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="7">
				<FormItem label="提报日期	 ： " :label-width="120">
					<DatePicker v-model="SelectTime" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择修改日期" class="search-input"
					 @on-change="getCreateExcpTime"></DatePicker>
				</FormItem>
				</Col>
				<Col span="7" class="text-right">
				<Button type="primary" style="margin-right:20px" @click="onSearch">查询</Button>
				<Button type="primary" @click="reset">重置</Button>
				</Col>
			</Row>
		</Form>
		</Col>
		<Col span='24' class="table-con">
		<Button type="primary" style="margin-bottom:20px" @click="batchProcessing">批量处理</Button>
		<Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange1">
		</Table>
		<!-- <Page :total="dataCount" show-elevator show-total :show-sizer="showSizer1" :page-size="formPage.pageSize"
:page-size-opts="pageSizeOpt1" @on-change="changePageNum1" @on-page-size-change="changePageSize1" /> -->
		<oil-page :total="total_one" :page-size="pageSize_one" :page-num="pageNum_one" @page-change="pageChange_one" :page-size-opts="pageSizeOpts_one"
		 :show-sizer="showSizer_one">
		</oil-page>
		</Col>

		<!-- 统计详情弹窗开始 -->
		<Modal v-model="seeModal" title="指标详情(信息发布总数)" width='1000'>
			<div slot="header">
				<p>指标详情(信息发布总数)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 统计周期：{{indexDetail.statisticCycle}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					统计对象：{{indexDetail.statisticObject}}
				</p>
			</div>
			<Form>
				<Row>
					<Col span="6">
					<FormItem label="时间 ： " :label-width="60">
						<Select v-model="seltctValue1">
							<Option v-for="item in assessmentCycle" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="状态 ： " :label-width="100">
						<Select v-model="seltctValue2">
							<Option v-for="item in assessmentCycle" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="备注 ： " :label-width="100">
						<Input type="text" v-model="seltctValue3" class="search-input"></Input>
					</FormItem>
					</Col>
					<Col span="6" class="text-right">
					<Button type="primary" style="margin-right:20px">查询</Button>
					<Button type="primary">重置</Button>
					</Col>
				</Row>
				<Row>
					<Col span="24" style="text-align:right">
					<FormItem>
						<span style="font-size:14px;">统计值：{{indexDetail.statisticValue}}</span>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<Table class="tableCommon" :data="tableData2" :columns="columns2"> </Table>
			<div style="overflow: hidden;">
				<oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer">
				</oil-page>
			</div>
			<div slot="footer">
				<i-button type="primary" @click="seeModal=false">返回</i-button>
			</div>
		</Modal>
		<!-- 统计详情弹窗结束 -->

		<!-- 操作弹窗开始 -->
		<Modal v-model="recoveryModal" title="提示信息" width='400' @on-ok="confirm">
			<div style="text-align:center;">
				<p style="font-size:14px;">您确定已经修复数据？</p>
			</div>
			<div slot="footer">
				<i-button type="primary" @click="confirm">确认</i-button>
				<i-button type="primary" @click="recoveryModal=false">返回</i-button>
			</div>
		</Modal>
		<!-- 操作弹窗结束 -->

	</Row>
</template>
<script>
	import axios from 'axios';
	import OilPage from '../../components/page/page.vue'
	import { queryPageExc, update } from "../../components/axios/performanceManagement.js";
	import { formatStamp } from "../../../assets/js/common.js"
	import buMen from '../../components/jiXiao/buMen.vue';
	export default {
		name: 'abnormalStatistics',
		components: {
			OilPage,
			buMen
		},
		data() {
			return {

				indexT: '',
				total_one: 0,
				pageSize_one: 10,
				pageNum_one: 1,
				showSizer_one: true,
				pageSizeOpts_one: [5, 10, 20, 30],
				formPage: {
					pageNum: 1,
					pageSize: 10
				},
				showSizer1: true,
				dataCount: 0, //总条数
				pageSizeOpt1: [10, 20, 50],
				SelectTime: [], // 选择的时间段
				id: [],
				ids: [],
				repairValue: [],
				repairValues: [],
				createExcpTime: ['', ''],
				createExcpTimeS: '',
				createExcpTimeE: '',
				seltctValue1: '',
				seltctValue2: '',
				seltctValue3: '',
				total: 12,
				pageNum: 1,
				pageSize: 5,
				pageSizeOpts: [5, 10, 20, 30],
				showSizer: true,
				seeModal: false,
				recoveryModal: false,
				indexDetail: {
					statisticCycle: '2018-01-01~2018-01-31',
					statisticObject: '张三',
					statisticValue: 200
				},
				departData: [],
				searchForm: {
					adminName: '',
					excpStatus: '',
					createExcpTime: [],
					orgIds: '',
					indexTime: ''
				},
				assessmentCycle: [{
					value: 'all',
					label: '2018-08'
				}],
				assessmentStatus: [{
					value: '',
					label: '全部'
				}, {
					value: '1',
					label: '已处理'
				}, {
					value: '0',
					label: '未处理'
				}],
				assessmentDate: [{
					value: 'date',
					label: '2018-07-01 2018-07-30'
				}],
				//列表字段
				columns1: [{
					type: 'selection',
					title: '选择',
					align: 'center',
					width: 50
				}, {
					title: '员工ID',
					key: 'adminId',
					width: 150
				}, {
					title: '员工姓名',
					key: 'employeeName',
					width: 150
				}, {
					title: '所在部门',
					key: 'orgName',
					minWidth: 250
				}, {
					title: '考核周期',
					key: 'indexTime',
					width: 200
				}, {
					title: '所用模板',
					key: 'modelName',
					width: 200,
					render: (h, params) => {
						return h('a', {
							style: {

							},
							on: {
								click: () => {
									this.$router.push({ name: 'assessmentTemplatedetail', query: { id: params.row.modelId } })
								}
							},
						}, params.row.modelName)
					}
				}, {
					title: '指标编号',
					key: 'pfIndexId',
					width: 250
				}, {
					title: '指标名称',
					key: 'pfIndexName',
					minWidth: 250
				}, {
					title: '分级方案',
					key: 'pfGradeType',
					minWidth: 100
				}, {
					title: '异常值',
					key: 'excpValue',
					minWidth: 100
				}, {
					title: '修复值',
					key: 'repairValue',
					minWidth: 100,
					render: (h, params) => {
						if (params.row.repairValue == "" || params.row.repairValue == null) {
							params.row.repairValue = 0
						}
						if (params.row.excpStatus == "未处理") {
							return h('i-input', {
							props: {
								value: params.row.repairValue
							},
							on: {
								"on-blur": ev => {
									this.changeData(ev, params)
								}
							}

						}, )
						} else {
							return h('span', {}, params.row.repairValue)
						}

					}
				}, {
					title: '问题描述',
					key: 'excpDesc',
					minWidth: 350
					// },{
					//   title:'统计详情',
					// 	key:'excpDesc',
					// 	minWidth:80,
					// 	render: (h, params) => {
					// 	return 	h('a', {
					// 			on: {
					// 				click: () => {
					// 					this.seeModal=true;
					// 				}
					// 			},
					// 		},'查看')
					// 	}
					//
				}, {
					title: '提报人',
					key: 'createExcpName',
					minWidth: 150
				}, {
					title: '提报时间',
					key: 'createExcpTime',
					minWidth: 200
				}, {
					title: '是否处理',
					key: 'excpStatus',
					minWidth: 100
				}, {
					title: '处理人',
					key: 'operatorName',
					minWidth: 150
				}, {
					title: '处理时间',
					key: 'operatTime',
					minWidth: 200
				}, {
					title: '操作',
					key: 'operation',
					minWidth: 150,
					render: (h, data) => {
//						console.log("test", data.row)
						if (data.row.excpStatus == "已处理") {
							return h('span', {}, '-')
						} else {
							return h('span', {
								style: {
									color: '#145edb',
									textDecoration: 'underline',
									cursor: 'pointer'
								},
								on: {
									click: () => {
										this.confirmModalBtn(data.row.id, data.row.repairValue)
									}
								},
							}, '确认修复')
						}

					}
				}],

				columns2: [{
					title: '序号',
					key: 'assessmentIndex',
					width: 80
				}, {
					title: '发生时间',
					key: 'classificationPlan',
					width: 250
				}, {
					title: '值',
					key: 'datumValue',
					width: 100
				}, {
					title: '状态',
					key: 'actuallyReach',
					width: 200
				}, {
					title: '备注',
					key: 'reachLevel',
				}],
				tableData1: [],
				tableData2: []
			}
		},

		created() {
			this.departDatas();
			this.queryPage()
		},
		methods: {
			//修改值
			changeData(data, param) {
//				console.log("列表数据data", data);
//				console.log("param", param);
				this.tableData1[param.row._index].repairValue = data.target.value;
				param.row.repairValue = data.target.value;
//				console.log("列表数据", this.tableData1);
			},
			getMonthOne(data) {
        var one = new Date(data);
//        this.searchForm.indexTime = one.getTime();
        this.searchForm.indexTime = one.setHours(0, 0, 0, 0);
//        console.log(this.searchForm.indexTime);
      },
			formatDate(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			// 部门下拉列表
			departDatas(deptLabel, deptId, deptCode) {
				this.departData = deptId ? deptId : null;
			},
			exportData() {
				window.location.href = "/report/PfAccountDetailAdmin/yxsr_export?orgIds=" + this.YXForm.orgIds + "&indexTime=" + this.YXForm.indexTime + "&adminId=" + this.YXForm.adminId;
			},
			//重置
			reset() {
				this.formPage = {
					pageNum: 1,
					pageSize: 10
				}
				this.searchForm.adminName = '';
				this.seltctValue2 = '';
				this.searchForm.excpStatus = '';
				this.searchForm.orgIds = [];
				this.SelectTime = [];
				this.SelectTime[0] = '';
				this.SelectTime[1] = '';
				this.departData = [];
				this.searchForm.indexTime = '';
				this.indexT = '';
			},
			onSearch() {
				this.pageNum_one = 1;
				this.pageSize_one = 10;
				this.queryPage();
			},
			//列表分页
			queryPage() {
        console.log('search');
        if (!this.SelectTime[0] || !this.SelectTime[1]) {
					this.createExcpTimeS = ''
					this.createExcpTimeE = ''
				} else {
					this.createExcpTimeS = formatStamp(this.SelectTime[0])
//					this.createExcpTimeE = formatStamp(this.SelectTime[1])
					this.createExcpTimeE = this.SelectTime[1].setHours(23, 59, 59, 999)
				}
				let form = {
					adminName: this.searchForm.adminName,
					createExcpTimeE: this.createExcpTimeE,
					createExcpTimeS: this.createExcpTimeS,
					excpStatus: this.searchForm.excpStatus,
					orgIds: this.departData,
					indexTime: this.searchForm.indexTime,
					pageNum: this.pageNum_one,
					pageSize: this.pageSize_one
				}
        console.log('form', form);
        queryPageExc(form).then(res => {
					/*if (!res.response.list) {
						this.tableData1 = [{ adminId: '', employeeName: '', excpDesc: '', indexTime: '', modelName: '', pfIndexName: '', repairValue: '', excpValue: '', operatorName: '', operatorTime: '' }]
					} else {
						this.tableData1 = res.response.list || [];
					}*/
          console.log('res', res);
          this.tableData1 = res.response.list || [];
					this.total_one = res.response.total;
				})

			},
			// 确认修复的弹窗
			confirmModalBtn(id, repairValue) {
				this.id = [];
				this.repairValue = [];
				this.id.push(id)
				this.repairValue.push(Number(repairValue))
				this.recoveryModal = true;
			},
			//确认修复操作
			confirm() {
				let form = {
					ids: this.id,
					repairValues: this.repairValue,
				}
				update(form).then(res => {
					this.$Message.success("修复成功！！！");
					this.queryPage();
					this.recoveryModal = false;
				})

			},

			//全选
			selectChange1(selection) {

				let ids = selection.map(item => {
					return item.id
				})
				let repairValues = selection.map(item => {
					return Number(item.repairValue)
				})
				this.ids = ids;
				this.repairValues = repairValues
				this.selection = selection
			},
			changePageNum1(current) {
				this.formPage.page = current;
				this.queryPage();
			},
			// 监听修改显示条数
			changePageSize1(size) {
				this.formPage.pageSize = size;
				this.queryPage();
			},
			//分页
			pageChange(page, pageSize) {
				if (page) {
					this.pageNum = page
				}
				if (pageSize) {
					this.pageSize = pageSize
				}
				this.queryPage()
			},
			pageChange_one(page, pageSize) {
				if (page) {
					this.pageNum_one = page
				}
				if (pageSize) {
					this.pageSize_one = pageSize
				}
				this.queryPage()
			},
			//批量处理
			batchProcessing() {
				console.log("this.ids", this.ids)
				// let form = "ids=" + this.ids
				let form = {
					ids: this.ids,
					repairValues: this.repairValues,
				}
				if (this.ids.length == 0) {
					this.$Message.error("请勾选数据");
				} else {
					update(form).then(res => {
						this.$Message.success("处理成功！！！");
						this.queryPage();
					})
				}

			},
			getCreateExcpTime(data) {//获取修改时间
				this.createExcpTimeS = formatStamp(data[0]);
				this.createExcpTimeE = formatStamp(data[1]);
			}


		}

	}
</script>
