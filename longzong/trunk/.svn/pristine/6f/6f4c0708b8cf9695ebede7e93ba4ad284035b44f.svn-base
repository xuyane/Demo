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
      <router-link to="/myphoneRecords" class="link-css">  我的电话记录</router-link>
     
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :label-width="120">
      <Row type="flex" justify="space-between">
        <Col span="7">
          <FormItem label="呼叫类型:">
            <Select
            v-model="callType"
            class="search-input"
          >
            <Option
              v-for="item in callTypeList"
              :value="item.value"
              :key="item.value"
            >{{ item.desc }}</Option>
          </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="呼叫状态:" >
             <Select
            v-model="callStatus"
            class="search-input"
          >
            <Option
              v-for="item in callStatusList"
              :value="item.value"
              :key="item.value"
            >{{ item.desc }}</Option>
          </Select>
          </FormItem>
        </Col>
        <Col span="7" class="text-right">
          <FormItem label="呼叫号码:" >
            <Input v-model="otherNumber" class="search-input" placeholder="请输入呼叫号码"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="查询时间段:">
          <DatePicker v-model="queryTime" format="yyyy-MM-dd" :clearable="clearData" type="daterange" placement="top-start" placeholder="请选择日期" class="search-input" @on-change="getQueryTime"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="电话号码:" prop="breedRelation">
          <Input v-model="form.otherPhone" class="search-input" placeholder="请输入电话号码"></Input>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" @click="getData">查询</Button>
        <Button @click="handleReset">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
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

import {
  getcallrecordsList,
  callRecordsDownload
} from "../unitmangement/api/mytaskReach.js";
import oilPage from "../../components/page/page.vue";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "enterpriseList",
  components: {
    oilPage
  },
  data() {
    return {
      clearData:false,
      otherNumber:'',
      callType:3,
      callStatus:3,
      callTypeList:[
        {
          value:3,
          desc:'全部'
        },
        {
          value:1,
          desc:'呼入'
        },
        {
          value:2,
          desc:'呼出'
        }
      ],
      callStatusList:[
        {
          value:3,
          desc:'全部'
        },
        {
          value:1,
          desc:'已接通'
        },
        {
          value:2,
          desc:'未接通'
        }
      ],
      total: 0,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      explainList: [],
      taskSituationList: [],
      taskCycleList: [],
      taskTypeList: [],
      queryTime: [], //查询时间段
      form: {
        otherPhone: "", //任务名称
        inTimeS:new Date(this.getCurrentMonthFirst()).setHours(0,0,0,0),
        inTimeE:new Date(this.getNowFormatDate()).setHours(23, 59, 59, 999)
      },
      columns: [
        {
          key: "changeCreateTime",
          align: "center",
          minWidth: 150,
          title: "日期"
        },
        {
          key: "extCode",
          align: "center",
          minWidth: 150,
          title: "呼叫号码"
        },
        {
          key: "otherCode",
          align: "center",
          minWidth: 150,
          title: "对方号码"
        },
        {
          key: "changeConnectTime",
          align: "center",
          minWidth: 150,
          title: "通话开始时间"
        },
        {
          key: "changeDisconnectTime",
          align: "center",
          minWidth: 150,
          title: "通话结束时间"
        },
        {
          key: "connectTimeLen",
          align: "center",
          minWidth: 150,
          title: "通话时长(单位:秒)"
        },
        {
          key: "callType",
          align: "center",
          minWidth: 150,
          title: "呼叫类型",
          render:(h,params) =>{
            console.log(params);
            let htmlOne = '';
            if(params.row.callType==1){
              htmlOne = '呼入';
            }else if(params.row.callType==2){
              htmlOne = '呼出';
            }
            return h("div",{},htmlOne);
          }
        },
        {
          key: "callStatus",
          align: "center",
          minWidth: 150,
          title: "呼叫状态",
          render:(h,params) =>{
            console.log(params);
            let htmlOne = '';
            if(params.row.callStatus==1){
              htmlOne = '已接通';
            }else if(params.row.callStatus==2){
              htmlOne = '未接通';
            }
            return h("div",{},htmlOne);
          }
        },
        {
          title: "操作",
          align: "center",
          minWidth: 350,
          render: (h, params) => {
             var html = '<audio controls><source src="'
            +params.row.fileUrl+
            '" type="audio/wav">'+
            "</audio>";
            return h("div", {
              domProps:{
                innerHTML:html
              }
            });
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    this.queryTime = [this.getCurrentMonthFirst(), this.getNowFormatDate()];
    //初始化数据
    this.getData();
    
  },
  methods: {
    //获取当前日期的第一个月
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
    //获取现在的时间
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
    //获取时间
    getQueryTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.form.inTimeS = data1.setHours(0, 0, 0, 0);
      this.form.inTimeE = data2.setHours(23, 59, 59, 999);
    },

    //获取列表数据
    getData(type) {
      var that = this;
      const start = new Date();
      // if (type == 1) {
      //   this.form.inTimeE = new Date().getTime();
      //   this.form.inTimeS = start.setTime(
      //     new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      //   );
      // }
      // let startTime = timeStampChange.format(this.form.inTimeS);
      // let endTime = timeStampChange.format(this.form.inTimeE);
      // this.queryTime.push(startTime);
      // this.queryTime.push(endTime);
      var params = {
        //employeeId: 407580,
        endTime: that.form.inTimeE || '',
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        phoneNumber: that.form.otherPhone,
        startTime: that.form.inTimeS || '',
        callType:this.callType,
        callStatus:this.callStatus,
        otherNumber:this.otherNumber
      };

      getcallrecordsList(params).then(res => {
        that.tableData = res.response.list;
        that.total = res.response.total;
      });
    },
    //获取列表分页每页显示的记录数
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getData();
    },
    //重置
    handleReset() {
       this.queryTime = [this.getCurrentMonthFirst(), this.getNowFormatDate()];
      this.form.otherPhone = "";
      let data1 = new Date(this.getCurrentMonthFirst());
      let data2 = new Date(this.getNowFormatDate());
      // this.form.inTimeS = data1.getTime();
      // this.form.inTimeE = data2.getTime();
      this.form.inTimeS = data1.setHours(0, 0, 0, 0);
      this.form.inTimeE = data2.setHours(23, 59, 59, 999);
      this.otherNumber='';
      this.callStatus = 3;
      this.callType = 3;
    },
    //获取从任务名称子组件传过来的值
    taskFunction(taskData) {
      this.form.taskName = taskData;
    }
    
  }
};
</script>
