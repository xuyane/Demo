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
    <tab-header-rank :tab-index="1"></tab-header-rank>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <!-- <FormItem label="到账时间:">
              <DatePicker
                v-model="time"
                type="daterange"
                placeholder="请选择到账时间"
                class="search-input"></DatePicker>
            </FormItem> -->
            <FormItem label="到账时间:">
              <DatePicker
                v-model="time"
                type="daterange"
                @on-change='selectdata'
                :options="dateTypeaccount"
                placement="bottom-start"
                class="search-input"
                placeholder="请选择到账时间">
              </DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <Col span="22">
              <FormItem label="到账大于:">
                <Input v-model="formItem.price" class="search-input" placeholder="请输入金额"></Input>
              </FormItem>
            </Col>
            <Col span="1" class="yuan">元</Col>
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
                <!-- <Col span="7">
                  <Select v-model="formItem.employeeType" class="form-select" placeholder="新员工">
                    <Option v-for="item in employeeType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                  </Select>
                </Col>
                <Col span="7">
                  <Select v-model="formItem.dateType" class="form-select" placeholder="本月">
                    <Option v-for="item in dateType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                  </Select>
                </Col> -->
                <!-- <Col span="7"> -->
                  <Select v-model="formItem.priceType" class="form-select" placeholder="到账笔数">
                    <Option v-for="item in priceType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                  </Select>
                <!-- </Col> -->
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
getAccountRank} from "../../../components/axios/crm.js"
import SelectDepartment from '../../../components/crm/departMent.vue'
import OilPage from '../../../components/page/page.vue'
export default {
  data() {
    return {
      dateTypeaccount: {
        shortcuts: [
          {
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              return [start, end]
            },
            text: '最近一天'
          },
          {
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              return [start, end]
            },
            text: '近三天'
          },
          {
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            },
            text: '近一周'
          },
          {
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              return [start, end]
            },
            text: '近半个月'
          },
          {
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            },
            text: '近一个月'
          },
          {
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            },
            text: '近三个月'
          },
          {
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 183)
              return [start, end]
            },
            text: '近半年'
          },
          {
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
              return [start, end]
            },
            text: '近一年'
          }
        ]
      },
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
      formItem: {
        price: '',
        admin: '',
        employeeType: 0,
        dateType: 0,
        priceType: 0
      },
      time2:[]
    }
  },
  created() {
    this.getListPage()
  },
  methods: {
    selectdata(value){
      this.time2=value
    },
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
      this.$Spin.show()
      // let accountTimeStart = formatStamp(this.time[0]); 
      // let accountTimeEnd = formatStamp( this.time[1]);
      let accountTimeStart = this.time2[0]; 
      let accountTimeEnd = this.time2[1];
      let params = {
        accountTimeStart:accountTimeStart || '',
        accountTimeEnd:accountTimeEnd || '',
        leastAccount: this.formItem.price ,
        // employeeType: this.formItem.employeeType ,
        // dateType: this.formItem.dateType ,
        accountMode: this.formItem.priceType ,
        adminId: this.formItem.adminId || '',
        departmentId: this.departId || '',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      getAccountRank(formData(params)).then(res =>{
        this.$Spin.hide()
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
    // 清空业务员框
    removeQuery(query){
      if(query==''){
        this.formItem.adminId = ''
      }
    },
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getListPage()
    }
  },
  components: {
    OilPage,
    TabHeaderRank,
    TableCenter,
    TableCenterTwo,
    SelectDepartment
  },
}
</script>
