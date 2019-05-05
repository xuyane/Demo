<style lang="less" scoped>
  .yuan {
    line-height: 36px;
    margin-left: 10px;
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;用户分配
      </Row>
    </Col>
    <tab-header-rank :tab-index="3"></tab-header-rank>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="通话时间:">
              <DatePicker
                v-model="time"
                type="daterange"
                placeholder="请选择通话时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <Col span="22">
              <FormItem label="有效:">
                <Select v-model="formItem.effectiveCallType" class="form-select" placeholder="请选择">
                  <Option v-for="item in effectiveCallType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Col>
          <Col span="7">
            <FormItem label="业务员:">
              <Select
                v-model="formItem.adminId"
                ref="input1"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod1"
                 @on-query-change="removeQuery"
                :loading="loading">
                <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="7">
            <FormItem label="业务员部门:">
              <select-department @data-list="getDepData" :emptyModel='departId'></select-department>
            </FormItem>
          </Col>
          <Col span="17" class="text-right">
            <Button type="primary" @click="findListPage">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <table-center :data-list="tableDataOne" v-if="tableOne == 1"></table-center>
        <table-center-two :dataList="tableDataTwo" v-if="tableOne == 2"></table-center-two>
        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
    </Col>
  </Row>
</template>
<script>
import TabHeaderRank from './tabHeaderRank'
import TableCenter from './tableCenter'
import TableCenterTwo from './tableCenterTwo'
import { formData, formatStamp, formatTime } from "../../../../assets/js/common.js"
import {
  memberSelectList,
  getAdminList,
getCallRank} from "../../../components/axios/crm.js"
import SelectDepartment from '../../../components/crm/departMent.vue'
import OilPage from '../../../components/page/page.vue'
export default {
  data() {
    return {
      time: [],
      tableDataOne:[],
      tableDataTwo:[],
      totalAmount: 1000,
      total: 0,
      pageSize: 5,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      options1:[],
      departId:'',
      loading:false,
     tableOne: window.localStorage.getItem("longZhongCrmIsSign") || 1,
      isUserAllot:  window.localStorage.getItem("longZhongCrmIsUserAllot") || 1,
      userId: window.localStorage.getItem("longZhongCrmUserId") ||'',
      effectiveCallType: [
        {
          value: 1,
          desc: '电话数量'
        },
        {
          value: 2,
          desc: '通话时长'
        }
      ],
      formItem: {
        price: '',
        admin: '',
        employeeType: 0,
        dateType: 0,
        priceType: 0,
        effectiveCallType:0
      }
    }
  },
  created() {
    this.getListPage()
  },
  methods: {
    // 业务员下拉搜索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          adminName: query
        };
        setTimeout(() => {
          this.loading = false;
          getAdminList(params).then(res => {
            // console.log(res)
            this.options1 = res.response;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    //获取所在部门部门树
    getDepData (deptLabel,deptId,deptCode){
      this.departId = deptId ? deptId:null;
    },
     // 清空业务员框
    removeQuery(query){
      if(query==''){
        this.formItem.adminId = ''
      }
    },
    findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    // 获取列表
    getListPage () {
      this.$Spin.show()
      let params = {
        registerTimeStart:this.time[0] ? formatTime(this.time[0]) : "",
        registerTimeEnd: this.time[1] ? formatTime(this.time[1]) : "",
        effectiveCallType: this.formItem.effectiveCallType || '',
        adminId: this.formItem.adminId || '',
        departmentId: this.departId || '',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      getCallRank(formData(params)).then(res =>{
        this.$Spin.hide()
        //console.log(res)
        this.tableDataTwo = res.response.list
        this.tableDataOne = res.response.list
        this.total = res.response.total
        this.tableDataOne.map(item =>{
          item.numbers = 0
        })
      }) 
    },
    // 重置
    reset() {
      this.$refs.input1.query = ''
      this.time = []
      this.formItem = {}
      this.departId = ''
    },
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getListPage()
    },
  },
  components: {
     OilPage,
    TabHeaderRank,
    TableCenter,
    TableCenterTwo,
    SelectDepartment
  }
}
</script>
