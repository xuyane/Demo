<style lang="less" scoped>
	@import '../../information/taskplant/taskplant.less';
	.unit {
		border-top: 1px solid #ccc;
	}

	.table-title {
		font-size: 14px;
		margin-bottom: 20px;
	}
</style>
<template>
	<Row>

		<i-col span="24">
			<Row class-name="current-position">
				当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的绩效
			</Row>
		</i-col>

		<Col span='24'>
		<Form :label-width="90" class="search-form">
			<Row>
				<Col span="6">
				<FormItem label="考核月份 ： ">
					<DatePicker v-model="seltctValue1" type="month" placeholder="请选择月份" class="search-input" @on-change="getMonth"></DatePicker>
				</FormItem>
				</Col>
				<Col span="18" class="text-right">
				<Button type="primary" style="margin-right:20px" @click="querymyPfByIndexTime">查询</Button>
				<Button type="primary" style="margin-right:20px" @click="personConfirm">个人确认</Button>
				<Button type="primary" @click="abnomalHandin">异常提报</Button>
				</Col>
			</Row>
		</Form>
		</Col>

		<Col span='24'>
		<Card style="margin-bottom:20px">
			<div class="unit">
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">姓名</div>
						<div class="unit_s_right">{{userform.employeeName}}</div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left">所在部门 </div>
						<div class="unit_s_right no-right-border">{{userform.orgWname}}</div>
					</div>
				</div>
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">考核模板</div>
						<div class="unit_s_right " @click="jumpToAssessment">
							<a>{{userform.modelName}}</a>
						</div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left">状态</div>
						<div class="unit_s_right no-right-border">{{userform.status}}</div>
					</div>
				</div>
			</div>
		</Card>
		</Col>

		<Col span='24' class="table-con">
		<p class="table-title">指标完成情况</p>
		<Table class="tableCommon" :columns="columns1" :data="tableData1"></Table>
		</Col>

		<!-- 个人确认弹窗开始 -->
		<Modal v-model="personConfirmModal" title="提示信息">
			<div style="text-align:center;font-size:14px;">
				<p>请在确认无误后点击提交，提交后将无法调整。</p>
				<p>您确定要提交？</p>
			</div>
			<div slot="footer">
				<i-button type="primary" @click="jumpToUnreport">确定</i-button>
				<i-button @click="personConfirmModal=false">取消</i-button>
			</div>
		</Modal>
		<!-- 个人确认弹窗结束 -->
		<!-- 异常提报弹窗开始 -->
		<Modal v-model="abnomalHandinModal" title="异常提报（请勾选异常项）" width="900">
			<Row class="table-con">
				<Table class="tableCommon" :data="tableData2" :columns="columns2" @on-selection-change="selectChange1"></Table>
			</Row>
			<div slot="footer">
				<i-button type="primary" @click="doMyPfException">确定</i-button>
				<i-button @click="abnomalHandinModal=false">取消</i-button>
			</div>
		</Modal>
		<!-- 异常提报弹窗结束 -->

		<!-- 实际达成弹窗开始 -->
		<Modal v-model="practiceAchieveModal" title="指标详情（信息发布总数）" width="1000">
			<div class="unit">
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">统计周期</div>
						<div class="unit_s_right">2018-01-01~2018-01-31</div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left">统计对象</div>
						<div class="unit_s_right no-right-border">张三</div>
					</div>
				</div>
			</div>
			<Form style="overflow: hidden;">
				<Col span="6">
				<FormItem label="时间 ： " :label-width="60">
					<DatePicker type="daterange" split-panels placeholder="Select date"></DatePicker>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="状态 ： " :label-width="80">
					<Select v-model="practiceAchievestatus">
						<Option v-for="item in practiceAchievestatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="备注 ： " :label-width="80">
					<Input type="text" />
				</FormItem>
				</Col>
				<Col span="6" class="text-right">
				<Button type="primary">查询</Button>
				<Button type="primary">重置</Button>
				</Col>
				<div style="text-align:right;margin:20px auto;">
					<p>统计值：200</p>
				</div>
			</Form>


			<Row>
				<Table class="tableCommon" :data="tableData3" :columns="columns3"> </Table>
				<oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer">
				</oil-page>
			</Row>
			<div slot="footer">
				<i-button type="primary" @click="practiceAchieveModal=false">确定</i-button>
				<i-button @click="practiceAchieveModal=false">取消</i-button>
			</div>
		</Modal>
		<!-- 实际达成弹窗结束 -->

	</Row>
</template>
<script>
	import OilPage from "../../components/page/page.vue";
	import { querymyPf, confireMyPf, MyPfException } from "../../components/axios/performanceManagement.js";
	import { formData, formatStamp, getLastMonth, formatTime3 } from "../../../assets/js/common.js";
	export default {
		name: 'performanceEvaluation',
		components: {
			OilPage
		},
		data() {
			return {
				checkSelect: [

				],
				userform: {
					countTime: 0,
					employeeId: 0,
					employeeName: "",
					modelName: "",
					orgWname: "",
					pfLevel: "",
					sameLevelOrder: 0,
					sameOrgOrder: 0,
					status: "",
					totalScore: 0
				},
				adminId: 0,
				indexTime: 0,
				items: [
					{
						excpReason: "",
						excpValue: 0,
						pfGradeType: "",
						pfIndexId: 0,
						pfIndexName: "",
					}
				],
				modelId: 0,
				modelName: "",
				orgId: 0,
				orgWname: "",
				total: 0,
				pageNum: 1,
				pageSize: 5,
				pageSizeOpts: [5, 10, 20, 30],
				showSizer: true,
				seltctValue1: '',
				personConfirmModal: false,
				abnomalHandinModal: false,
				practiceAchieveModal: false,
				practiceAchievestatus: [{
					value: 'all',
					label: '全部'
				}, {
					value: 'useable',
					label: '有效'
				}, {
					value: 'unuse',
					label: '无效'
				}],
				columns1: [{
					title: '考核指标',
					key: 'pfIndexName',
					align: 'center',
					minWidth: 200,
				}, {
					title: '指标描述',
					key: 'indexDesc',
					align: 'center',
					minWidth: 200
				}, {
					title: '分级方案',
					key: 'pfGradeType',
					align: 'center',
					minWidth: 200,
				}, {
					title: '实际完成',
					key: 'actualValueStr',
					align: 'center',
					minWidth: 200,
					render: (h, params) => {
						if (params.row.pfGradeType == "百分比") {
							let data = params.row.actualValueStr.slice(0, params.row.actualValueStr.length - 1)
							params.row.actualValueStr = Number(data).toFixed(2) + "%";
						}
						return h('div', {
							on: {
								click: () => {
									return false
								}
							},
						}, params.row.actualValueStr)

					}

				}],
				tableData1: [],
				columns2: [{
					type: 'selection',
					title: '选择',
					align: 'center',
					width: 50
				}, {
					title: '考核指标',
					key: 'pfIndexName',
					align: 'center',
					width: 150
				}, {
					title: '指标描述',
					key: 'indexDesc',
					align: 'center',
					minWidth: 150
				}, {
					title: '分级方案',
					key: 'pfGradeType',
					align: 'center',
					width: 80
				}, {
					title: '实际完成',
					key: 'actualValueStr',
					align: 'center',
					width: 80,
					render: (h, params) => {
						if (params.row.pfGradeType == "百分比") {
							let data = params.row.actualValueStr.slice(0, params.row.actualValueStr.length - 1)
							params.row.actualValueStr = Number(data).toFixed(2) + "%";
						}
						return h('div', {
							on: {
								click: () => {
									return false
								}
							},
						}, params.row.actualValueStr)

					}
					// render: (h, data) => {
					// 	console.log("data",data)
					// 	return h("div", [
					// 		h(
					// 			"span",
					// 			// data.row.pfGradeType == "固定值" ? "是" : "ooo",
					// 			data.row.pfGradeType == "固定值" ? data.row.actualValue : (data.row.actualValue) * 100 + "%",
					// 		)
					// 	]);
					// }
				}, {
					title: '异常原因',
					key: 'excpReason',
					align: 'center',
					minWidth: 150,
					render: (h, data) => {
						return h("Input", {
							props: {
								value: this.tableData2[data.index].excpReason
							},
							on: {
								"on-change": event => {
									var value = event.target.value;
									this.tableData2[data.index].excpReason = value
									if (this.checkSelect !== []) {
										this.checkSelect.map(item => {
											if (item.pfIndexId == this.tableData2[data.index].pfIndexId) {
												item.excpReason = this.tableData2[data.index].excpReason;
											}
										})
									}


									// if (this.checkSelect[data.index] !== undefined && this.checkSelect[data.index].excpReason == '') {
									// 	this.checkSelect[data.index].excpReason = value
									// }
								}
							}
						});
					}
				}],

				tableData2: [
					{ excpReason: '' }
				],
				columns3: [{
					title: '序号',
					key: 'number',
					align: 'center',
					width: 50
				}, {

					title: '发生时间',
					key: 'time',
					align: 'center',
					minWidth: 200
				}, {
					title: '值',
					key: 'value',
					align: 'center',
					minWidth: 200
				}, {
					title: '状态',
					key: 'status',
					align: 'center',
					minWidth: 200
				}, {
					title: '备注',
					key: 'remarks',
					align: 'center',
					minWidth: 200
				}],
				tableData3: []
			}
		},
		created() {
			if (this.$route.query.indexTime == undefined) {
				this.seltctValue1 = getLastMonth()
			} else {
				this.seltctValue1 = formatTime3(Number(this.$route.query.indexTime))
			}
			this.indexTime = this.$route.query.indexTime
			//this.indexTime = formatStamp(getLastMonth()+"-01 00:00:00")
			this.querymyPfByIndexTime()
		},
		// watch:{
		// 	checkSelect:function(oldValue,newValue){

		// 	}
		// },
		methods: {

			//个人确认按钮
			personConfirm() {
				this.personConfirmModal = true;
			},
			//个人确认弹窗--确认
			jumpToUnreport() {
				this.doMyPf();
			},
			//异常提报按钮
			abnomalHandin() {
				this.abnomalHandinModal = true;
			},
			jumpToAssessment() {
				if( this.modelId){
					this.$router.push({ name: 'assessmentTemplatedetail', query: { id: this.modelId } })	
				}
			},
			// 获取考核月份
			getMonth(date) {
				if(date){
					var data = new Date(date);
					data.setDate(1);
					data.setHours(0);
					data.setSeconds(0);
					data.setMinutes(0);
					this.indexTime = data.getTime();
					this.querymyPfByIndexTime();
				}
				
			},
			//查询个人绩效
			querymyPfByIndexTime() {
				let date = new Date(this.indexTime);
				let bYear = date.getFullYear();
				let bMonth = date.getMonth() + 1;
				if (bYear < 2018 || (bYear == 2018 && bMonth < 3)) {
					this.$Message.warning("超出查询时间范围");
					this.tableData1 = [];
					this.tableData2 = [];
					return;
				} else {
					this.$Spin.show();
					let form = {
						indexTime: this.indexTime

					}
					form.times = new Date().getTime();
					
						querymyPf(form).then(res => {
						if (res.response.status !== '草稿') {
							this.$router.push({ name: 'myAchievementshanded', query: { indexTime: this.indexTime } })
						}
						if (res.response.pfApplyItemVO) {
							this.tableData1 = res.response.pfApplyItemVO;
							this.tableData2 = res.response.pfApplyItemVO;
						} else {
							this.tableData1 = [];
							this.tableData2 = [];
						}
						this.userform.employeeName = res.response.employeeName
						this.userform.modelName = res.response.modelName
						this.userform.orgWname = res.response.orgWname
						this.userform.pfLevel = res.response.pfLevel
						this.userform.sameLevelOrder = res.response.sameLevelOrder
						this.userform.sameOrgOrder = res.response.sameOrgOrder
						this.userform.status = res.response.status
						this.userform.totalScore = res.response.totalScore
						this.modelId = res.response.modelId //作为异常提报的传入参数 模板id
						this.adminId = res.response.employeeId//作为异常提报的传入参数 员工id
						this.total = res.response.total;
						this.$Spin.hide();
					})
					
				}

			},

			//我的绩效个人确认
			doMyPf() {
				let form = {
					indexTime: this.indexTime
				}
				confireMyPf(formData(form)).then(res => {
					this.personConfirmModal = false;
					this.$router.push({ name: 'myAchievementshanded', query: { indexTime: this.indexTime } })
				})
			},
			//我的绩效异常提报
			doMyPfException() {
				let show = false;
				let form = {
					adminId: this.adminId,
					indexTime: this.indexTime,
					modelId: this.modelId,
					modelName: this.userform.modelName,
					orgWname: this.userform.orgWname,
					items: this.checkSelect
				}
				MyPfException(form).then(res => {
					this.abnomalHandinModal = false;
					this.querymyPfByIndexTime();
					this.$Message.success(res.message)
				})
			},
			// table勾选框触发事件（
			selectChange1(selection) {
				this.checkSelect = []
				selection.map(item => {
					if ('excpReason' in item == false) {
						item.excpReason = ''
					}

				})
				this.checkSelect = selection;


			},
			//分页
			pageChange() {

			},



			//switch
			selectChange2() {

			},

		}
	}
</script>