<style lang="less" scoped>
	@import '../../information/taskplant/taskplant.less';
	.unit {
		border-top: 1px solid #ccc;
	}

	.table-title {
		font-size: 14px;
		margin-bottom: 20px;
	}

	.tablepp p{
		font-size: 14px;
		margin-bottom: 20px;
	}

	.new_unit {
		width: 100%;
		border-color: #bbb;
		margin-bottom: 20px;
	}

	.singular_td {
		font-size: 14px;
		color: #000;
		background: #e9eaef;
		width: 15%;
		text-align: center;
		padding: 10px;
	}

	.dobule_td {
		width: 35%;
		text-align: center;
		padding: 10px;
		background:#fff;
	}
</style>
<template>
	<Row>
		<i-col span="24">
			<Row class-name="current-position">
				当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;考核模板&nbsp;&nbsp;>>&nbsp;&nbsp;查看
			</Row>
		</i-col>

		<Col span='24'>
		<table class="new_unit" cellpadding="0" cellspacing="0" border="1" rules="all">
			<tr>
				<td class="singular_td">模版名称</td>
				<td class="dobule_td"> {{PfModelInfo.modelName}}</td>
				<td class="singular_td">模版描述</td>
				<td class="dobule_td">{{PfModelInfo.modelDesc}}</td>
			</tr>
			<tr>
				<td class="singular_td">创建时间</td>
				<td class="dobule_td">{{PfModelInfo.createrTimeDesc}}</td>
				<td class="singular_td">考核周期</td>
				<td class="dobule_td">{{PfModelInfo.indexTimeDesc}}</td>
			</tr>
			<tr>
				<td class="singular_td">状态</td>
				<td class="dobule_td">{{PfModelInfo.statusDesc}}</td>
				<td class="singular_td"></td>
				<td class="dobule_td"></td>
			</tr>
		</table>
		<!-- <grid-table class="mar-b-20" :grid-columns="gridColumns" :grid-data="PfModelInfo"></grid-table> -->
		</Col>

		<Col span='24'>
		<Row :gutter="20">
			<Col span='5'>
			<div>
				<Table class="tableCommon" :columns="columns1" :data="tableData1" stripe></Table>
			</div>
			</Col>
			<Col span='19' class="table-con">
			<Row class="tablepp">
				<Col span="8">
				<p>指标名称 : {{PfModelDetailIndexItemInfo.indexName}}</p>
				</Col>
				<Col span="8">
				<p>指标编号：{{PfModelDetailIndexItemInfo.indexNumber}}</p>
				</Col>
				<Col span="8">
				<p>统计周期 : {{PfModelDetailIndexItemInfo.indexTimeDesc}}</p>
				</Col>
				<Col span="8">
				<p>指标权重：{{PfModelDetailIndexItemInfo.indexweight}}%</p>
				</Col>
				<Col span="8">
				<p>分级方案 : {{PfModelDetailIndexItemInfo.gradePlanDesc}}</p>
				</Col>
				<Col span="24">
				<Table class="tableCommon" :columns="columns2" :data="tableData2"></Table>
				<div style="padding-top:30px;text-align:center;">
					<i-button type="primary" @click="backtoperform">返回</i-button>
				</div>
				</Col>
			</Row>
			</Col>
		</Row>
		</Col>

	</Row>
</template>
<script>
	// import GridTable from '../../components/table/gridTable.vue'
	import { PfModelGetById, PfModelDetailIndexList, PfModelDetailIndexItemList } from '../../components/axios/performanceManagement.js';
	export default {
		name: 'assessmentTemplatedetail',
		// components: {
		// 	GridTable
		// },
		data() {
			return {
				pId: 54,
				modelId: 0,
				PfModelInfo: {
					modelId: '',
					modelName: '',
					modelDesc: '',
					createrTimeDesc: '',
					indexTimeDesc: '',
					statusDesc: ''
				},
				PfModelDetailIndexItemInfo: {
					gradePlanDesc: '',
					indexName: '',
					indexNumber: '',
					indexTimeDesc: '',
					indexweight: '',
					modelIndexItemList:
						{
							itemId: '',
							level: '',
							operatTimeDesc: '',
							operatorName: '',
							score: '',
							targetMaxRange: '',
							targetMinRange: ''
						}
				},
				columns1: [{
					title: '考核指标',
					key: 'indexName',
					render: (h, params) => {
						return h('div', [
							h('a', {
								style: {
									color: this.pId == params.row.pfModelIndexId ? "#000099" : "",
									fontSize: this.pId == params.row.pfModelIndexId ? "18px" : "",
								},
								on: {
									click: () => {
										this.getPfModelDetailIndexItemList(params.row.pfModelIndexId);
									}
								},
							}, params.row.indexName),
						])
					}
				}],
				tableData1: [],
				lettest: '',
				columns2: [
					{
						title: '序号',
						key: 'indexId',
						type: "index",
						width: 80
					},
					{
						title: '级别',
						key: 'level',
					},
					{
						title: '分值',
						key: 'score',
					},
					{
						title: '目标最小范围(%)',
						key: 'targetMinRange',
						renderHeader: (h, data) => {
							if (this.PfModelDetailIndexItemInfo.gradePlanDesc == "固定值") {
								return h('div', [
									h("span", {}, "目标最小值")
								])
							} else {
								return h('div', [
									h("span", {}, "目标最小范围(%)")
								])
							}
						},
						render: (h, params) => {
							if (this.PfModelDetailIndexItemInfo.gradePlanDesc == "固定值") {
								return h('div', [
									h("span", {}, params.row.targetMinRange)
								], )
							} else {
								return h('div', [
									h("span", {}, params.row.targetMinRange * 100)
								], )
							}
						}

					},
					{
						title: '目标最大范围(%)',
						key: 'targetMaxRange',
						renderHeader: (h, data) => {
							if (this.PfModelDetailIndexItemInfo.gradePlanDesc == "固定值") {
								return h('div', [
									h("span", {}, "目标最大值")
								])
							} else {
								return h('div', [
									h("span", {}, "目标最大范围(%)")
								])
							}
						},
						render: (h, params) => {
							if (this.PfModelDetailIndexItemInfo.gradePlanDesc == "固定值") {
								return h('div', [
									h("span", {}, params.row.targetMaxRange)
								], )
							} else {
								return h('div', [
									h("span", {}, params.row.targetMaxRange * 100)
								], )
							}


						}
					},
					{
						title: '更新人',
						key: 'operatorName',
					},
					{
						title: '更新时间',
						key: 'operatTimeDesc',
					}
				],
				tableData2: [{
					indexId: '',
					level: '',
					operatTimeDesc: '',
					operatorName: '',
					score: '',
					targetMaxRange: '',
					targetMinRange: ''
				}],
				gridColumns: [
					{
						key: 'modelName',
						title: '模版名称'
					},
					{
						key: 'modelDesc',
						title: '模版描述'
					},
					{
						key: 'createrTimeDesc',
						title: '创建时间'
					},
					{
						key: 'indexTimeDesc',
						title: '考核周期'
					},
					{
						key: 'statusDesc',
						title: '状态'
					},
				]
			}
		},
		created() {
			// 模块信息信息
			let that = this;
			that.modelId = this.$route.query.id;
			this.getModelInfo();
			this.getPfModelDetailIndexList();
			// TODO（待做） 默认进来请求下下面的方法
			// this.getPfModelDetailIndexItemList(this.tableData1[0].pfModelIndexId);
		},
		methods: {
			// 头部模板信息
			getModelInfo() {
				let form = {
					modelId: this.modelId
				}
				PfModelGetById(form).then(res => {
					this.PfModelInfo.modelId = res.response.modelId
					this.PfModelInfo.modelName = res.response.modelName
					this.PfModelInfo.modelDesc = res.response.modelDesc
					this.PfModelInfo.indexTimeDesc = res.response.indexTimeDesc
					this.PfModelInfo.createrTimeDesc = res.response.createrTimeDesc
					this.PfModelInfo.statusDesc = res.response.statusDesc
				})
			},
			// 该模板下所有考核指标集合
			getPfModelDetailIndexList() {
				let form = {
					modelId: this.modelId
				}
				PfModelDetailIndexList(form).then(res => {
					this.tableData1 = res.response.voList
					if (res.response.voList.length > 0) {
						this.getPfModelDetailIndexItemList(res.response.voList[0].pfModelIndexId);
					}
				})
			},
			// 该考核指标下详情和所有分级方案
			getPfModelDetailIndexItemList(pfModelIndexId) {
				this.pId = pfModelIndexId;
				this.$Spin.show()
				let form = {
					pfModelIndexId: pfModelIndexId
				}
				PfModelDetailIndexItemList(form).then(res => {
					this.PfModelDetailIndexItemInfo.gradePlanDesc = res.response.gradePlanDesc
					this.PfModelDetailIndexItemInfo.indexName = res.response.indexName
					this.PfModelDetailIndexItemInfo.indexNumber = res.response.indexNumber
					this.PfModelDetailIndexItemInfo.indexTimeDesc = res.response.indexTimeDesc
					this.PfModelDetailIndexItemInfo.indexweight = res.response.indexweight * 100
					this.PfModelDetailIndexItemInfo.gradePlanDesc = res.response.gradePlanDesc
					this.tableData2 = res.response.modelIndexItemList;
					this.tableData2.map(item => {
						item.operatTimeDesc = item.operatTimeDesc.substring(0, 10);
					})
					this.$Spin.hide()
				})
			},
			//返回
			backtoperform() {
				this.$router.push({ name: 'checkTemplate' })
			}
		}
	}
</script>