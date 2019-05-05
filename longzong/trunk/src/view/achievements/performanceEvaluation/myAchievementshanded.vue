<style lang="less" scoped>
@import "../../information/taskplant/taskplant.less";
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

	<i-col span='24'>
		<Row class-name="current-position">
			当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的绩效&nbsp;&nbsp;
			<!-- >>&nbsp;&nbsp;个人确认 -->
		</Row>
	</i-col>

	<Col span='24'>
		<Form :label-width="90" class="search-form">
			<Row>
				<Col span="6">
					<FormItem label="考核月份 ： " >
						<DatePicker v-model="seltctValue1" type="month" placeholder="请选择月份" class="search-input" @on-change="getMonth"></DatePicker>
						<!-- <Select v-model="seltctValue1">
							<Option v-for="item in assessmentMonth" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select> -->
					</FormItem>
				</Col>
				<Col span="18" class="text-right">
					<Button type="primary" @click="querymyPfByIndexTime">查询</Button>
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
						<div class="unit_s_left">所在部门</div>
						<div class="unit_s_right no-right-border">{{userform.orgWname}}</div>
					</div>
				</div>
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">考核模板</div>
						<div class="unit_s_right "  @click="jumpToAssessment"><a>{{userform.modelName}}</a></div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left">考核分值</div>
						<div class="unit_s_right no-right-border">{{userform.totalScore}}</div>
					</div>
				</div>
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">同级排名</div>
						<div class="unit_s_right">{{userform.sameLevelOrder}}</div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left">部门排名</div>
						<div class="unit_s_right no-right-border">{{userform.sameOrgOrder}}</div>
					</div>
				</div>
				<div class="unit_content">
					<div class="unit_content_left">
						<div class="unit_s_left">考核等级</div>
						<div class="unit_s_right">{{userform.pfLevel}}</div>
					</div>
					<div class="unit_content_left no_line">
						<div class="unit_s_left">状态</div>
						<div class="unit_s_right ">{{userform.status}}</div>
					</div>
				</div>
			</div>
		</Card>
	</Col>

	<Col span='24' class="table-con">
		<p class="table-title">指标完成情况</p>
		<Table class="tableCommon" :columns="columns1" :data="tableData1"></Table>
	</Col>

	<Col span='24' class="table-con">
		<p class="table-title">考核评语</p>
		<Table class="tableCommon" :columns="columns2" :data="tableData2"></Table>
	</Col>

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
		<Form :model="practiceAchieveform" style="overflow: hidden;">
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
					<Input type="text"/>
				</FormItem>
			</Col>
			<Col span="6" class="text-right">
				<Button type="primary">查询</Button>
				<Button type="primary">重置</Button>
			</Col>
		</Form>

		<div style="text-align:right;margin-bottom:20px;">
			<p>统计值：200</p>
		</div>

		<Row>
			<Table class="tableCommon" :data="tableData3" :columns="columns3"> </Table>
			<oil-page
				:total="total"
				:page-size="pageSize"
				@page-change="pageChange"
				:page-size-opts="pageSizeOpts"
				:show-sizer="showSizer">
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
import axios from "axios";
import OilPage from "../../components/page/page.vue";
import { querymyPf } from "../../components/axios/performanceManagement.js";
import {
  formData,
  formatStamp,
  getLastMonth,
  formatTime,
  formatTime3
} from "../../../assets/js/common.js";
export default {
  name: "myAchievementshanded",
  components: {
    OilPage
  },
  data() {
    return {
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
      indexTime: 0,
      seltctValue1: "",
      total: 0,
      pageNum: 1,
      pageSize: 5,
      pageSizeOpts: [5, 10, 20, 30],
      showSizer: true,
      practiceAchieveModal: false,
      practiceAchieveform: {},
      practiceAchievestatus: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "useable",
          label: "有效"
        },
        {
          value: "unuse",
          label: "无效"
        }
      ],
      columns1: [
        {
          title: "考核指标",
          key: "pfIndexName",
          align: "center",
          minWidth: 200
        },
        {
          title: "分级方案",
          key: "pfGradeType",
          align: "center",
          minWidth: 150
        },
        {
          title: "实际达成",
          key: "actualValueStr",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.pfGradeType == "百分比") {
              let data = params.row.actualValueStr.slice(
                0,
                params.row.actualValueStr.length - 1
              );
              params.row.actualValueStr = Number(data).toFixed(2) + "%";
            }
            return h(
              "div",
              {
                on: {
                  click: () => {
                    return false;
                  }
                }
              },
              params.row.actualValueStr
            );
          }
        },
        {
          title: "所达级别",
          key: "detailLevel",
          align: "center",
          minWidth: 100
        },
        {
          title: "分值",
          key: "detailScore",
          align: "center",
          minWidth: 100
        },
        {
          title: "所占权重(%)",
          key: "weight",
          align: "center",
          minWidth: 100
        },
        {
          title: "权重分值",
          key: "weightScore",
          align: "center",
          minWidth: 100
        }
      ],
      tableData1: [],
      columns2: [
        {
          title: "序号",
          key: "actuallyReach",
          type: "index",
          align: "center",
          minWidth: 80
          // 	render: (h,data) => {
          // let showIndex = data.index;

          // return h('span',showIndex);
          // 	}
        },
        {
          title: "评定人",
          key: "auditor",
          align: "center",
          minWidth: 200
        },
        {
          title: "评定时间",
          key: "auditTime",
          align: "center",
          minWidth: 200,
          render: (h, data) => {
            return h("div", formatTime(data.row.auditTime));
          }
        },
        {
          title: "考核等级",
          key: "pfLevelDesc",
          align: "center",
          minWidth: 100
        },
        {
          title: "评语",
          key: "content",
          align: "center",
          minWidth: 300
        }
      ],
      tableData2: [],
      columns3: [
        {
          title: "序号",
          key: "number",
          align: "center",
          width: 50
        },
        {
          title: "发生时间",
          key: "time",
          align: "center",
          minWidth: 200
        },
        {
          title: "值",
          key: "value",
          align: "center",
          minWidth: 200
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          minWidth: 200
        },
        {
          title: "备注",
          key: "remarks",
          align: "center",
          minWidth: 200
        }
      ],
      tableData3: [],
      modelId: ""
    };
  },
  created() {
    if (this.$route.query.indexTime == undefined) {
      this.seltctValue1 = getLastMonth();
    } else {
      this.seltctValue1 = formatTime3(this.$route.query.indexTime);
    }
    this.indexTime = this.$route.query.indexTime;
    //this.seltctValue1 = getLastMonth()
    //this.indexTime = formatStamp(getLastMonth()+"-01 00:00:00")
    this.querymyPfByIndexTime();
  },
  methods: {
    //跳转到模板详情（查看）
    jumpToAssessment() {
      if (this.modelId) {
        this.$router.push({
          name: "assessmentTemplatedetail",
          query: { id: this.modelId }
        });
      }
    },
    // 获取考核月份
    getMonth(date) {
      if (date) {
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
      } else {
        this.$Spin.show();
        let form = {
          indexTime: this.indexTime
        };
        form.times = new Date().getTime();
        querymyPf(form).then(res => {
          if (res.response.pfApplyItemVO) {
            this.tableData1 = res.response.pfApplyItemVO;
            this.tableData1.map(item => {
              item.weight = item.weight * 100;
            });
          } else {
            this.tableData1 = [];
          }
          if (res.response.pfReviewAuditVO) {
            this.tableData2 = res.response.pfReviewAuditVO;
          } else {
            this.tableData2 = [];
          }
          this.userform.employeeName = res.response.employeeName;
          this.userform.modelName = res.response.modelName;
          this.userform.orgWname = res.response.orgWname;
          this.userform.pfLevel = res.response.pfLevel;
          this.userform.sameLevelOrder = res.response.sameLevelOrder;
          this.userform.sameOrgOrder = res.response.sameOrgOrder;
          this.userform.status = res.response.status;
          this.userform.totalScore = res.response.totalScore;
          // this.total = res.response.total;
          this.modelId = res.response.modelId;
          this.$Spin.hide();
          if (res.response.status == "草稿") {
            this.$router.push({
              name: "performanceEvaluation",
              query: { indexTime: this.indexTime }
            });
          }
        });
      }
    },
    //分页
    pageChange() {}
  }
};
</script>

