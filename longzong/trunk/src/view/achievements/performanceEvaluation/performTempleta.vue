<style lang="less" scoped>
@import '../../information/taskplant/taskplant.less';
.unit{
	border-top:1px solid #ccc;
}
.table-title{
	font-size: 14px;
	margin-bottom: 20px;
}
.tablepp P{
	margin-bottom: 20px;
	font-size: 14px;
}
</style>
<template>
<Row>
	<i-col span="24">
		<Row class-name="current-position">
			当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的绩效&nbsp;&nbsp;>>&nbsp;&nbsp;考核模板
		</Row>
	</i-col>

	<Col span='24'>
		<Card style="margin-bottom:20px">                                     
			<div class="unit">
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">模版名称</div>
						<div class="unit_s_right">编辑-一段</div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left">模版描述</div>
						<div class="unit_s_right no-right-border">面向编辑一段人员的考核标准</div>
					</div>
				</div>
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">创建时间</div>
						<div class="unit_s_right">2019-01-01</div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left">考核周期</div>
						<div class="unit_s_right no-right-border">月/年</div>
					</div>
				</div>
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">状态</div>
						<div class="unit_s_right">启用</div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left"> </div>
						<div class="unit_s_right no-right-border"></div>
					</div>	
				</div>
			</div>
		</Card>
	</Col>

	<Col span='24'>
		<Row :gutter="20">

			<Col span='5'>
				<div><Table class="tableCommon" :columns="columns1" :data="tableData1" stripe='false'></Table></div>			
			</Col>

			<Col span='19' class="table-con">	
				<Row class="tablepp">
					<Col span="8">
						<p>指标名称 : 信息发布总条数</p>
					</Col>
					<Col span="8">
						<p>指标编号：JX-M-XXFB001</p>
					</Col>
					<Col span="8">
						<p>统计周期 : 月</p>
					</Col>
					<Col span="8">
						<p>指标权重：10%</p>
					</Col>
					<Col span="8">
						<p>分级方案 : 值/百分比</p>
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
export default {
	name:'performTempleta',
	components:{

	},
	data(){
		return{
			columns1:[{
				title:'考核指标',
				key:'assessmentIndex',
				render: (h, params) => {
				return h('div', [
					h('a', {
						on: {
							click: () => {
								
							}
						},
					}, params.row.assessmentIndex),
				])
				}
			}],
			tableData1:[{
				assessmentIndex:'信息发布总条数（JX-M-XXFB001）'
			},{
				assessmentIndex:'信息发布总条数（JX-M-XXFB001）'
			},{
				assessmentIndex:'信息发布总条数（JX-M-XXFB001）'
			},{
				assessmentIndex:'信息发布总条数（JX-M-XXFB001）'
			},{
				assessmentIndex:'信息发布总条数（JX-M-XXFB001）'
			},{
				assessmentIndex:'信息发布总条数（JX-M-XXFB001）'
			}],
			columns2:[{
				title:'序号',
				key:'number',
				width:80
			},{
				title:'级别',
				key:'level',
			},{
				title:'分值',
				key:'golab',
			},{
				title:'目标最小范围(%)',
				key:'min',
			},{
				title:'目标最大范围(%)',
				key:'max',
			},{
				title:'更新人',
				key:'refleshman',
			},{
				title:'更新时间',
				key:'refleshtime',
			}],
			tableData2:[{
				number:1,
				level:'A',
				golab:90,
				min:90,
				max:100,
				refleshman:'吴非',
				refleshtime:'2019-01-01'
			}]
		}
	},
	methods:{
		backtoperform(){
			this.$router.push({name:'performanceEvaluation'})
		}
	}
}
</script>


