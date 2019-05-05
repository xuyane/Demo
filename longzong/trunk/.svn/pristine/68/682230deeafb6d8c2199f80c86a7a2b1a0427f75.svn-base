<style lang="less" scoped>
.tab {
  padding: 20px 50px 0 50px;
}

.text-right {
  text-align: right;
}

.my-account-conter {
  background: #fff;
}

.font-14 {
  font-size: 14px;
}

.font-c-blue {
  color: #145edb;
}

.mrb-20 {
  margin-bottom: 20px;
}
</style>

<template>

  <Row class='varietybox'>

    <Col span="24">
    <Row class-name="current-position">
      当前位置：生产报表&nbsp;&nbsp;>>&nbsp;&nbsp;电话量统计
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form ref="form" :model="form" :label-width="120">
      <Row type="flex" justify="space-between">

        <Col span='6'>
        <FormItem label="部门:" :label-width="120">
          <Input type="text" v-model="form.modelName" class="search-input" readonly @on-focus="getBranchDataValue" placeholder="请选择部门"></Input>
        </FormItem>
        </Col>
        <Col span='6'>
        <FormItem label="姓名:" :label-width="120">
          <associatereport-Search @query-list="adminFunction" :dataUrl="urlAdmin" ref="adminRef" class="form-select"></associatereport-Search>
        </FormItem>
        </Col>
        <Col span="6" class="text-left">
        <FormItem label="呼叫类型:" :label-width="120">
          <Select v-model="form.callType">
            <Option v-for="item in callList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>


        <Col span='6'>
        <FormItem label="呼叫日期:" :label-width="120">
          <DatePicker v-model="form.dateRange" @on-change="dateChange" type="daterange" :clearable="false" split-panels
            class="search-input" placement="bottom-end" placeholder="选择统计时间范围"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="8"></Col>
        <Col span="8"></Col>
        <Col span="8" style="text-align:right;margin-bottom: 20px;">
        <Button type="primary" @click="exportReport">导出</Button>
        <Button type="primary" @click="search" style="margin-left: 8px">查询</Button>
        <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Row>
      <!-- 产业链树 -->
      <Modal v-model="BranchModel" @on-cancel="cancel" @on-ok="onOk">
        <div style="max-height: 300px;overflow: auto;">
          <Tree :data="BranchDataTree" ref="branchRef" :load-data="loadBranchData" show-checkbox @on-check-change="onCheckChange"></Tree>
        </div>
      </Modal>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con tab">
      <Col span="24 ">
      <Table class="tableCommon" border :columns="columns" :data="tableData"></Table>
      </Col>

      <div class="page-con">
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"></oil-page>
      </div>
    </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import {
  queryTelNumberPage,
  telNumberExcept
} from "../../components/axios/produceReport.js";
import { formData, formatTime } from "../../../assets/js/common.js";
import associatereportSearch from "../../components/associateSearch/associateReportSearch.vue";
import { delAbnormalLogs } from "../../components/axios/performanceManagement";
export default {
  name: "telephoneStatistics",
  components: {
    oilPage,
    associatereportSearch
  },
  data() {
    return {
      pageSizeOpts: [10, 20, 30, 50],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      urlAdmin: "/report/zxbjxxfb/queryEmpByOrgId",
      BranchDataTree: [],
      treeData: [],
      branchIds: [],
      branchTitle: [],
      BranchModel: false,
      endListTime: "",
      startListTime: "",
      callList: [
        {
          value: 0,
          desc: "全部"
        },
        {
          value: 1,
          desc: "内部"
        },
        {
          value: 2,
          desc: "外部"
        }
      ],
      form: {
        userId: "",
        type: "",
        dateRange: [],
        endTime: "",
        startTime: "",
        modelName: "",
        callType: 0
      },
      tableData: [],
      columns: [
        {
          key: "adminName",
          title: "姓名",
          align: "center"
        },
        {
          key: "orgName",
          title: "部门",
          align: "center"
        },
        {
          key: "callInTime",
          title: "呼入通时（秒）",
          align: "center",
          render(h, data) {
            return h("span", {}, data.row.callInTime || 0);
          }
        },
        {
          key: "callInTimes",
          title: "呼入通次",
          align: "center",
          render: (h, data) => {
            return h("span", {}, data.row.callInTimes || 0);
          }
        },
        {
          key: "callOutTime",
          title: "呼出通时（秒）",
          align: "center",
          render: (h, data) => {
            return h("span", {}, data.row.callOutTime || 0);
          }
        },
        {
          key: "callOutTimes",
          title: "呼出通次",
          align: "center",
          render: (h, data) => {
            return h("span", {}, data.row.callOutTimes || 0);
          }
        },
        {
          key: "totalCallTime",
          title: "通时合计（秒）",
          align: "center",
          render: (h, data) => {
            return h("span", {}, data.row.totalCallTime || 0);
          }
        },
        {
          key: "totalCallInTimes",
          title: "通次合计",
          align: "center",
          render: (h, data) => {
            return h("span", {}, data.row.totalCallInTimes || 0);
          }
        },
        {
          title: "明细",
          align: "center",
          render: (h, data) => {
            return h(
              "a",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                // style:{
                //   marginRight: "10px",
                // },
                on: {
                  click: () => {
                    this.viewDetails(data.row.adminId);
                  }
                }
              },
              "查看"
            );
          }
        }
      ]
    };
  },
  created() {
    this.initDateRange();
    this.queryData();
  },
  methods: {
    //查询功能
    search() {
      let userId = this.form.userId;
      if (!userId) {
        this.form.userName = this.$refs.adminRef.$refs.select.query;
      }
      this.pageNum = 1;
      this.pageSize = 10;
      this.queryData();
    },
    //重置
    reset() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.form.dateRange = [];
      this.form.startTime = "";
      this.form.endTime = "";
      this.form.modelName = "";
      this.$refs.adminRef.$refs.select.clearSingleSelect();
      this.form.userId = "";
      this.form.userName = "";
      this.initDateRange();
      this.branchIds = [];
      this.form.callType = 0;
    },
    //"查看"
    viewDetails(id) {
      this.$router.push({
        name: "telephoneStatisticsInfo",
        query: {
          employeeId: id,
          // callType:this.form.callType,
          startTime: this.startListTime,
          endTime: this.endListTime
        }
      });
    },
    //数据列表
    queryData() {
      var that = this;
      var callType;
      if (that.form.callType == 0) {
        callType = "";
      } else {
        callType = that.form.callType;
      }
      var params = {
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        //传日期
        callStartTime: that.form.startTime,
        callEndTime: that.form.endTime,
        //传id
        orgIds: that.branchIds,
        employeeId: that.form.userId,
        //传呼叫类型
        callType: callType,
        employeeName: that.form.userName
      };
      this.$Spin.show();
      queryTelNumberPage(params)
        .then(res => {
          if (
            res.response.telephoneStatisticsVO.list &&
            res.response.telephoneStatisticsVO.list.length > 0
          ) {
            that.tableData = res.response.telephoneStatisticsVO.list;
            that.total = res.response.telephoneStatisticsVO.total;
            that.startListTime = res.response.telNumberReqVO.callStartTime;
            that.endListTime = res.response.telNumberReqVO.callEndTime;
          } else {
            that.tableData = [];
            that.total = 0;
          }
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.queryData();
    },
    //部门树复选框选中
    onCheckChange(param) {
      this.treeData = param;
    },
    //部门树点击确定
    onOk() {
      this.form.modelName = "";
      this.branchTitle = [];
      this.branchIds = [];
      this.$refs.adminRef.$refs.select.clearSingleSelect();
      this.form.userId = "";
      this.form.userName = "";
      let branchList = this.$refs.branchRef.getCheckedNodes();
      for (let i = 0; i < branchList.length; i++) {
        this.branchTitle.push(branchList[i].title);

        this.branchIds.push(branchList[i].id);
      }

      this.form.modelName = this.branchTitle.join();
    },
    //点击取消
    cancel() {
      this.form.modelName = "";
      this.BranchModel = false;
    },
    loadBranchData() {},
    //产业链（部门树）获取焦点
    getBranchDataValue() {
      this.BranchModel = true;
      this.getBranchData();
    },
    // 获取部门信息
    getBranchData() {
      let that = this;
      // let form = {
      //   type: 2
      // }
      axios({
        url: "/report/PfCommonTree/deptTree",
        type: "get"
      }).then(function(res) {
        console.log(res);
        let dataValue = JSON.parse(res.data.response);
        that.BranchDataTree = that.branch(dataValue);
      });
    },
    //判断分支
    branch(data) {
      let dataDb = data.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            disableCheckbox: false,
            id: item.id,
            children: this.branch(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            disableCheckbox: false
          };
        }
      });
      return dataDb;
    },
    //初始化时间
    initDateRange() {
      let currentDate = new Date();
      let lastMonth = currentDate.getMonth() - 1;
      let nextMonth = currentDate.getMonth() + 1;
      let currentMonthFirstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      let nextMonthFirstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      );
      let lastMonthFirstDay = new Date(currentDate.getFullYear(), lastMonth, 1);
      let lastMonthlastDay = new Date(currentMonthFirstDay - 1);
      let currentMonthLastDay = new Date(nextMonthFirstDay - 1);
      this.form.dateRange = [currentMonthFirstDay, currentMonthLastDay];
      this.form.startTime = new Date(this.form.dateRange[0]).getTime();
      this.form.endTime = new Date(this.form.dateRange[1]).getTime();
    },
    // 监听选择日期
    dateChange(date) {
      var m1 = new Date(date[0]).getMonth() + 1;
      var m2 = new Date(date[1]).getMonth() + 1;
      if (m1 !== m2) {
        this.initDateRange();
        this.$Message.error("不能跨月选择");
      } else {
        this.form.startTime = new Date(date[0]).getTime() - 8 * 1000 * 60 * 60;
        this.form.endTime =new Date(date[1]).getTime() + 16 * 1000 * 60 * 60 - 1000;
      }
    },
    //获取从姓名传过来的值
    adminFunction(data) {
      if (data) {
        this.form.userId = data.value;
        this.form.userName = data.label;
      }
    },
    //导出
    exportReport() {
      let that = this;
      var callType;
      if (that.form.callType == 0) {
        callType = "";
      } else {
        callType = that.form.callType;
      }
      let params = {
        callStartTime: that.form.startTime,
        callEndTime: that.form.endTime,
        orgIds: that.branchIds || [],
        employeeId: that.form.userId,
        employeeName: that.form.userName || "",
        //传呼叫类型
        callType: callType
      };
      this.$Spin.show();
      telNumberExcept(formData(params)).then(res => {
        if (res.status == 200) {
          window.location.href = res.response;
        } else {
          that.$Message.warning(res.message);
        }
      });
    }
  },

  mounted() {
    // this.initDateRange();
  }
};
</script>


