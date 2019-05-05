<style lang="less" scoped>
.border-bottom1 {
  border-bottom: 1px solid #bbb;
}
.font-size14 {
  font-size: 14px;
}
.em {
  display: inline-block;
  padding: 0 30px;
  margin: 0;
  font-style: normal;
  color: #4280e8;
}
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/mytaskTotalOne" class="link-css"> 任务达标统计</router-link>
        <!-- 当前位置：信息发布管理&nbsp;&nbsp;>>&nbsp;&nbsp;任务达标统计 -->
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :label-width="120">
        <Row type="flex" justify="space-between">
          <Col span="7">
          <FormItem label="任务名称:">
            <Input v-model="form.taskName" placeholder="请输入任务名称" class="search-input" @on-change="getData"></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem label="任务类型:">
            <Select v-model="form.taskType" class="form-select">
              <Option v-for="item in taskTypeList" :value="item.value" :key="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem label="任务周期:">
            <Select v-model="form.taskCycle" class="form-select">
              <Option v-for="item in taskCycleList" :value="item.value" :key="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
          <FormItem label="达标情况:">
            <Select v-model="form.isUpStandard" class="form-select">
              <Option v-for="item in taskSituationList" :value="item.value" :key="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem label="相关说明:">
            <Select v-model="form.explain" class="form-select">
              <Option v-for="item in explainList" :value="item.desc" :key="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem label="查询时间段:">
            <DatePicker :clearable="clearData" v-model="queryTime" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择日期" class="search-input" @on-change="getQueryTime"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="24" class="text-right mar-b-10">
          <Button type="primary" @click="search">查询</Button>
          <Button @click="handleReset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24" class="text-right">
      达标:<em class="em">{{countForm.isStandrad}}</em> 达标率：<em class="em">{{isStandradRate}}</em>
      未达标:<em class="em">{{countForm.unStandrad}}</em> 未达标率:<em class="em">{{unStandradRate}}</em>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <Table class="tableCommon" :loading='loading' :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
        </Table>
        <div class="page-con">
          <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
        </div>
      </Row>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import oilPage from "../../components/page/page.vue";
import {
  getTaskCountList,
  getCount,
  getTaskcycle,
  getTaskmark,
  getTasktype,
  getTaskexplain
} from "../unitmangement/api/mytaskReach.js";
import { formData } from "../../../assets/js/common";
export default {
  name: "enterpriseList",
  components: {
    associateSearch,
    oilPage
  },
  data() {
    return {
      clearData:false,
      countForm: {
        isStandrad: "",
        unStandrad: ""
      },
      isStandradRate: "",
      unStandradRate: "",
      total: 0,
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      explainList: [],
      taskSituationList: [],
      taskCycleList: [],
      taskTypeList: [],
      queryTime: [],
      form: {
        taskName: "",
        taskType: -1,
        taskCycle: -1,
        isUpStandard: -1,
        explain: "全部",
        inTimeS: "",
        inTimeE: ""
      },
      columns: [
        {
          key: "taskDate",
          align: "center",
          title: "日期"
        },
        {
          key: "taskName",
          align: "center",
          title: "任务名称",
          width: 300
        },
        {
          key: "taskTypeEnum",
          align: "center",
          title: "任务类型"
        },
        {
          key: "frequency",
          align: "center",
          title: "标准频率"
        },
        {
          key: "checkTime",
          align: "center",
          title: "标准发布时间"
        },
        {
          key: "isUpStandard",
          align: "center",
          title: "是否达标",
          render: (h, data) => {
            let label =
              data.row.isUpStandard === 0
                ? "达标"
                : data.row.isUpStandard === 1
                  ? "未达标"
                  : "";
            let color =
              data.row.isUpStandard === 0
                ? "#9ecd3f"
                : data.row.isUpStandard === 1
                  ? "red"
                  : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
        },
        {
          key: "explanation",
          align: "center",
          title: "相关说明"
        },
        {
          title: "操作",
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "blue",
                    textDecoration: "underline",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      if (data.row.taskType == 0) {
                        this.$router.push({
                          path: "/mytaskReach",
                          query: {
                            id: data.row.id,
                            name: "任务达标统计",
                            type: 1
                          }
                        });
                      } else if (data.row.taskType == 1) {
                        this.$router.push({
                          path: "/mytaskCollection",
                          query: {
                            id: data.row.id,
                            name: "任务达标统计",
                            type: 1
                          }
                        });
                      }
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      tableData: [],
      loading: false
    };
  },
  created() {
    this.queryTime = [this.getCurrentMonthFirst(), this.getNowFormatDate()];
    this.getTasktype();
    this.getTaskmark();
    this.getTaskcycle();
    this.getTaskexplain();
    this.getTaskCount();
    this.getData();
  },
  methods: {
    getCurrentMonthFirst() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = "01";
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getQueryTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.form.inTimeS = data1.setHours(0, 0, 0, 0);
      this.form.inTimeE = data2.setHours(23, 59, 59, 999);
    },
    getTasktype() {
      let params = {};
      getTasktype(params).then(res => {
        this.taskTypeList = res.response;
        this.form.taskType = -1;
      });
    },
    getTaskmark() {
      let params = {};
      getTaskmark(params).then(res => {
        this.taskSituationList = res.response;
        this.form.isUpStandard = -1;
      });
    },
    getTaskcycle() {
      let params = {};
      getTaskcycle(params).then(res => {
        this.taskCycleList = res.response;
        this.form.taskCycle = -1;
      });
    },
    getTaskexplain() {
      let params = {};
      getTaskexplain(params).then(res => {
        this.explainList = res.response;
        this.form.explain = "全部";
      });
    },
    getTaskCount() {
      let params = {
        startTime: this.form.inTimeS,
        endTime: this.form.inTimeE
      };
      let that = this;
      getCount(formData(params)).then(res => {
        that.countForm = res.response;
        that.unStandradRate = that.percentNum(
          that.countForm.unStandrad,
          that.countForm.total
        );
        that.isStandradRate = that.percentNum(
          that.countForm.isStandrad,
          that.countForm.total
        );
      });
    },
    percentNum(num, num2) {
      if (num == 0 || num2 == 0) {
        return "0%";
      } else {
        return Math.round((num / num2) * 10000) / 100.0 + "%"; //小数点后两位百分比
      }
    },
    getData() {
      var that = this;
      that.loading = true;
      var params = {
        endTime: that.form.inTimeE,
        explanation: that.form.explain,
        isUpStandard: that.form.isUpStandard,
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        startTime: that.form.inTimeS,
        taskCycle: that.form.taskCycle,
        taskName: that.form.taskName,
        taskType: that.form.taskType,
        executorId: 0,
        executorIds: [],
        order: "",
        sign: "",
        sort: "",
        taskId: 0,
        time: ""
      };
      getTaskCountList(params)
        .then(res => {
          that.tableData = res.response.list;
          that.total = res.response.total;
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getData();
    },
    search() {
      this.pageNum = 1;
      this.getTaskCount();
      this.getData();
      
    },
    handleReset() {
      this.form.taskName = "";
      this.form.taskType = -1;
      this.form.taskCycle = -1;
      this.form.isUpStandard = -1;
      this.form.explain = "全部";
      this.queryTime = [this.getCurrentMonthFirst(), this.getNowFormatDate()];
      let data1 = new Date(this.getCurrentMonthFirst());
      let data2 = new Date(this.getNowFormatDate());
      this.form.inTimeS = data1.getTime();
      this.form.inTimeE = data2.getTime();
      this.getData();
    }
  }
};
</script>
