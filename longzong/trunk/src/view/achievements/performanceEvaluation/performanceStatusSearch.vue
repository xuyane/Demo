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
				<Button type="primary" style="margin-right:20px" @click="StatusSearch">查询</Button>
				</Col>
			</Row>
		</Form>
		</Col>
	</Row>
</template>

<script>
	import { querymyPf } from "../../components/axios/performanceManagement.js";
	import { formData, formatStamp, getLastMonth } from "../../../assets/js/common.js";
	export default {
		name: 'performanceStatusSearch',
		data() {
			return {
				seltctValue1: '',
				indexTime: 0 //考核周期
			}
		},
		created() {
			this.seltctValue1 = getLastMonth()
			// this.indexTime = formatStamp(getLastMonth() + "-01 00:00:00")
			var data = new Date(this.seltctValue1);
			data.setDate(1);
			data.setHours(0);
			data.setSeconds(0);
			data.setMinutes(0);
			this.indexTime = data.getTime();
			this.StatusSearch();
		},
		methods: {
			// 获取考核月份
			getMonth(date) {
				if(date){
					var data = new Date(date);
					data.setDate(1);
					data.setHours(0);
					data.setSeconds(0);
					data.setMinutes(0);
					this.indexTime = data.getTime();
					this.StatusSearch();
				}
			
			},
			StatusSearch() {
				this.$Spin.show();
				let form = {
					indexTime: this.indexTime
				}
				form.times = new Date().getTime();
				querymyPf(form).then(res => {
					
					this.$Spin.hide();
					if (res.response.status == '草稿') {
						this.$router.push({ name: 'performanceEvaluation', query: { indexTime: this.indexTime } })
					} else {
						this.$router.push({ name: 'myAchievementshanded', query: { indexTime: this.indexTime } })
					}
				})

			}
		}
	}
</script>

<style lang="less" scoped>
</style>