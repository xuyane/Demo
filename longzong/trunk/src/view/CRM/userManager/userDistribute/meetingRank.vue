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
    <tab-header-rank :tab-index="2"></tab-header-rank>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="会议时间:">
              <DatePicker
                v-model="time"
                type="daterange"
                placeholder="请选择会议时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <Col span="22">
              <FormItem label="会议:">
                <Select v-model="formItem.meetingType" class="form-select" placeholder="回执">
                  <Option v-for="item in meetingType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
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
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="收入排行:">
              <Row type="flex" justify="space-between">
                <Col span="7">
                  <Select v-model="formItem.employeeType" class="form-select" placeholder="新员工">
                    <Option v-for="item in employeeType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                  </Select>
                </Col>
                <Col span="7">
                  <Select v-model="formItem.dateType" class="form-select" placeholder="本月">
                    <Option v-for="item in dateType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                  </Select>
                </Col>
                <Col span="7">
                  <Select v-model="formItem.priceType" class="form-select" placeholder="到账笔数">
                    <Option v-for="item in priceType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
          </Col>
          <Col span="7">
            <Col span="22">
              <FormItem label="业务员部门:">
                <select-department @data-list="getDepData" :emptyModel='departId'></select-department>
              </FormItem>
            </Col>
          </Col>
          <Col span="7" class="text-right">
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
getMeetingRank} from "../../../components/axios/crm.js"
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
      tableOne: window.localStorage.getItem("longZhongCrmIsSign") || 1,
      isUserAllot:  window.localStorage.getItem("longZhongCrmIsUserAllot") || 1,
      userId: window.localStorage.getItem("longZhongCrmUserId") ||'',
      pageSize: 5,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      options1:[],
      departId:'',
      loading:false,
      employeeType: [
        {
          value: 1,
          desc: '新员工'
        },
        {
          value: 2,
          desc: '资深员工'
        }
      ],
      dateType: [
        {
          value: 1,
          desc: '本日'
        },
        {
          value: 2,
          desc: '本周'
        },
        {
          value: 3,
          desc: '本月'
        }
      ],
      priceType: [
        {
          value: 1,
          desc: '到账笔数'
        },
        {
          value: 2,
          desc: '到账金额'
        }
      ],
      meetingType: [
        {
          value: 1,
          desc: '回执'
        },
        {
          value: 2,
          desc: '到账金额'
        }
      ],
      formItem: {
        price: '',
        admin: '',
        employeeType: 0,
        dateType: 0,
        meetingType: 0,
        priceType:0
      }
    }
  },
  created() {
    this.getListPage()
  },
  methods: {
     // 清空业务员框
    removeQuery(query){
      if(query==''){
        this.formItem.adminId = ''
      }
    },
    //获取本地存储
    // getLocal(){
    //   let storage=window.localStorage;
    //   // this.isSign = storage.getItem("c");
    // },
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
      findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    // 获取列表
    getListPage () {
      //console.log(window.localStorage.getItem("longZhongCrmIsSign"))
      this.$Spin.show()
      let meetingTimeStart = formatStamp(this.time[0]); 
      let meetingTimeEnd = formatStamp( this.time[1]);
      let params = {
        meetingTimeStart:meetingTimeStart || '',
        meetingTimeEnd:meetingTimeEnd || '',
        leastAccount: this.formItem.price || '',
        employeeType: this.formItem.employeeType || '',
        dateType: this.formItem.dateType || '',
        meetingType: this.formItem.meetingType || '',
        adminId: this.formItem.adminId || '',
        departmentId: this.departId || '',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      getMeetingRank(formData(params)).then(res =>{
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
