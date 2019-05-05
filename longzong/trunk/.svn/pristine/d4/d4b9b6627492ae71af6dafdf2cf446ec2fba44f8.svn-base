<style lang="less" scoped>
@import "../taskplant/taskplant.less";
/*
我的任务达标统计,任务详情
*/
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
       <!--{{tempName}}-->
       <router-link to="/mytaskTotalOne" class="link-css" v-if="mytaskTotalOne">任务达标统计</router-link>
      <router-link to="/mytaskTotal" class="link-css" v-if="mytaskTotal">我的任务达标统计</router-link>
      <router-link to="/departmentTaskReach" class="link-css" v-if="departmentTaskReach" > 部门任务达标统计</router-link>
      <span  v-if="departmentTaskReach"> &nbsp;&nbsp;>>&nbsp;&nbsp;</span>
      <router-link to="/personalTaskReach" class="link-css" v-if="personalTaskReach" >个人任务达标统计</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp; 
      <a @click="goto" class="link-css">任务详情</a>
    </Row>
    </Col>
    <Col span="24" class="plant-content">
    <div class="unit">
      <div class="unit_title">
        <span>任务信息</span>
      </div>
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">姓名</div>
          <div class="unit_s_right">{{taskDetail.executorName}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">所在部门</div>
          <div class="unit_s_right no-right-border">{{taskDetail.deptment}}</div>
        </div>
      </div>
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">任务名称</div>
          <div class="unit_s_right">{{taskDetail.taskName}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">任务类型</div>
          <div class="unit_s_right no-right-border">{{taskDetail.taskTypeEnum}}</div>
        </div>
      </div>
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">标准频率</div>
          <div class="unit_s_right">{{taskDetail.frequency}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">是否达标</div>
          <div class="unit_s_right no-right-border">{{taskDetail.isUpStandardEnum}}</div>
        </div>
      </div>
    </div>
    <Row>
      <Col class="text-align-center height-50 font-size1" span="24">发布情况</Col>
      <Col class="text-align-center" span="24">
      <Table class="tableCommon" :loading='loading' :columns="columns" :data="tableData"></Table>
      </Col>
      <Col span="24" class="sliver-color">
      <Col span="21" class="text-align-center border-left height-50">有效发布次数汇总</Col>
      <Col span="3" class="text-align-center border-right height-50">{{taskDetail.effectiveCount}}</Col>
      </Col>

      <Col v-show="taskDetail.isUpStandardEnum !== '达标'" span="24" class="height-50 margin-top20">
      <p style="font-size: 18px;color: red">相关说明：{{taskDetail.explainDetail?taskDetail.explainDetail:'无相关内容'}}</p>
      </Col>

      <Col span="24" class="text-align-center height-50 margin-top20">
      <Button type="primary" class=" width-px200" @click="returnTotal">返回</Button>
      </Col>
    </Row>
    </Col>
  </Row>
</template>
<script>
import { getDetail } from "../unitmangement/api/mytaskReach.js";
import { formData } from "../../../assets/js/common.js";
export default {
  data() {
    return {
      tempName: "",
      taskDetail: "",
      columns: [
        {
          title: "日期",
          key: "createTime"
        },
        {
          title: "任务名称",
          key: "taskName"
        },
        {
          title: "最晚发布时间",
          key: "checkTime"
        },
        {
          title: "实际发布时间",
          key: "realTime"
        },
        {
          title: "任务发布人",
          key: "publisherName"
        },
        {
          title: "任务责任人",
          key: "executorName"
        },
        {
          title: "是否有效",
          key: "isEffectiveEnum"
        },
        {
          title: "无效原因",
          key: "invalidReason"
        }
      ],
      tableData: [],
      loading: false,
      mytaskTotalOne: false,
      mytaskTotal: false,
      departmentTaskReach: false,
      personalTaskReach: false
    };
  },
  created() {
    let id = this.$route.query.id;
    this.tempName = this.$route.query.name;
    this.initData(id);
    this.backPre();
  },
  methods: {
    goto() {
      window.reload();
    },
    backPre() {
      if (this.tempName == "任务达标统计") {
        this.mytaskTotalOne = true;
        this.mytaskTotal = false;
        this.departmentTaskReach = false;
        this.personalTaskReach = false;
      } else if (this.tempName == "我的任务达标统计") {
        this.mytaskTotalOne = false;
        this.mytaskTotal = true;
        this.departmentTaskReach = false;
        this.personalTaskReach = false;
      } else {
        this.mytaskTotalOne = false;
        this.mytaskTotal = false;
        this.departmentTaskReach = true;
        this.personalTaskReach = true;
      }
    },
    initData(id) {
      this.loading = true;
      let params = {
        id: id
      };
      getDetail(formData(params))
        .then(res => {
          this.taskDetail = res.response;
          this.tableData = res.response.reportPublicRecordQueryVOList;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    returnTotal() {
      var type = this.$route.query.type;
      if (type == 1) {
        this.$router.push({ name: "mytaskTotalOne" });
      } else if (type == 2) {
        this.$router.push({ name: "mytaskTotal" });
      } else {
        this.$router.push({ name: "personalTaskReach" });
      }
    }
  }
};
</script>