<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户
      </Row>
    </Col>
    <tab-header :tab-index="1"></tab-header>
    <Col span="24" class-name="search-form">
      <Form ref="userForm" :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="用户类型:">
              <Select v-model="formItem.userType" clearable  class="search-input" placeholder="请选择用户类型">
                <Option v-for="item in customerType" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="业务员部门:">
              <select-department @data-list="getDepData" :emptyModel='departId'></select-department>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="业务员:">
              <Select
                v-model="formItem.adminId"
                ref="input1"
                class="search-input"
                filterable
                remote
                clearable
                :remote-method="remoteMethod1"
                :loading="loading">
                <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="公司名称:">
              <!-- <Input v-model="formItem.memberName" class="search-input" placeholder="请输入公司名称"></Input> -->
              <Select
                v-model="formItem.memberId"
                ref="input2"
                class="search-input"
                filterable
                clearable
                remote
                :remote-method="remoteMethod2"
                :loading="loading">
                <Option v-for="(option, index) in options2" :value="option.id" :key="index"> <{{option.id}}>{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="用户名:">
              <Input clearable v-model="formItem.userName" class="search-input" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="绑定手机:">
              <Input clearable @on-keyup="keyUp" v-model="formItem.phone" class="search-input" placeholder="请输入绑定手机"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="注册时间:">
              <DatePicker clearable v-model="time1" @on-change="dateChange" type="daterange" :options="dateType" split-panels placeholder="选择注册时间" class="search-input"></DatePicker>            
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="分配时间:">
              <DatePicker clearable v-model="time2" @on-change="dateChange" type="daterange" :options="dateType" split-panels placeholder="请选择分配时间" class="search-input"></DatePicker>
            </FormItem>
          </Col>
         <Col span="7">
            <FormItem label="跟踪日期:">
              <DatePicker
                v-model="time3"
                type="daterange"
                :options="dateType"
                placement="bottom-end"
                placeholder="请选择追踪日期"
                class="search-input">
              </DatePicker>
            </FormItem>
          </Col>
          </Row>
          <Row type="flex" justify="space-between">
           <Col span="7">
            <FormItem label="用户来源:">
              <Select v-model="formItem.regSource" class="form-select" clearable  placeholder="请选择用户来源">
                <Option v-for="item in customerSource" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="登录时间:">
              <DatePicker
                v-model="time4"
                type="daterange"
                :options="dateType"
                placeholder="请选择登录时间"
                class="search-input">
              </DatePicker>
            </FormItem>
          </Col>
          <!-- <Col span="7" offset='1'> -->
            <!-- <FormItem label="只显示自己:">
              <RadioGroup v-model="formItem.isQuerySelf">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </FormItem> -->
            <!-- <CheckboxGroup v-model="formItem.isQuerySelf" on-change='isQuerySelfevent'> -->
                <!-- <Checkbox v-model="formItem.isQuerySelf"  @on-change='isQuerySelfevent'>只显示自己</Checkbox> -->
            <!-- </CheckboxGroup> -->
          <!-- </Col> -->
          <Col span="7">
          <Checkbox v-model="formItem.isQuerySelf"  @on-change='isQuerySelfevent'>只显示自己</Checkbox>
            <FormItem class="text-right">
              <Button type="primary" @click="searchList">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <table-header :num1="userCount" :num2="formalUserCount" :num3="intentionUserCount" :total-price="totalAmount"></table-header>
      <Row class-name="table-con">
        <table-user :data-list="tableData" @get-list="getListPage"></table-user>
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
import {
  getUserType,
  getUserResource,
  getAllUser,
  getUserList,
  getAdminList,
  memberSelectList } from '../../../components/axios/crm.js'
import { formData, formatStamp, formatTime, formatType } from '../../../../assets/js/common.js'
import OilPage from '../../../components/page/page.vue'
import TableUser from './tableUser.vue'
import TabHeader from './tabHeader.vue'
import TableHeader from './tableHeader.vue'
import SelectDepartment from '../../../components/crm/departMent.vue'
export default {
  name: 'allUser',
  data() {
    return {
      userCount: 0,
      formalUserCount: 0,
      intentionUserCount: 0,
      totalAmount: 0,
      tabIndex: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      options1:[],
      options2:[],
      departId:'',
      loading:false,
      formItem: {
        userName:'',
        phone:'',
        regSource:'',
        userType:'',
        memberName:'',
        adminId:'',
        isQuerySelf:true
      },
      time1: [],
      time2: [],
      time3: [],
      time4: [],
      dateType: {
        shortcuts: [
          {
            value: () => {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime())
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              return [start, end]
            },
            text: '最近一天'
          },
          {
            value: () => {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime())
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              return [start, end]
            },
            text: '近三天'
          },
          {
            value: () => {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime())
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            },
            text: '近一周'
          },
          {
            value: () => {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime())
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              return [start, end]
            },
            text: '近半个月'
          },
          {
            value: () => {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime())
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            },
            text: '近一个月'
          },
          {
            value: () => {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime())
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            },
            text: '近三个月'
          },
          {
            value: () => {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime())
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 183)
              return [start, end]
            },
            text: '近半年'
          },
          {
            value: () => {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime())
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
              return [start, end]
            },
            text: '近一年'
          }
        ]
      },
      customerType: [],
      customerSource: [],
      tableData: []
    }
  },
  components: {
    OilPage,
    TableUser,
    TabHeader,
    TableHeader,
    SelectDepartment
  },
  created () {
    this.getUserType()
    this.getUserResource()
    // this.getAllUserData()
    this.getListPage();
  },
  methods: {
    isQuerySelfevent(){
      this.searchList()
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
    // 获取所在部门部门树
    getDepData (deptLabel,deptId,deptCode){
      this.departId = deptId ? deptId:'';
    },
    // 获取公司名称下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          isNotRlAdmin:1,
          isQuerySelf:this.formItem.isQuerySelf==true?1:0,
          memberName: query.replace(/\<.*?\>/g,'')
        }
         setTimeout(() => {
          this.loading = false;
          memberSelectList(params).then(res => {
            this.options2 = res.response;
          });
        }, 200);
      } else {
        this.options2 = []
      }
    },
    // 查询
    searchList() {
      this.formItem.memberName=this.$refs.input2.query;
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage()
      // this.getAllUserData()
    },
    keyUp() {
      this.formItem.phone = this.formItem.phone.replace(/[^\d]/g,'')
    },
    // 获取列表
    getListPage () {
      this.$Spin.show()
      let distributionTimeS = formatStamp(this.time2[0]); 
      let distributionTimeE = formatStamp( this.time2[1])+24*60*60*1000-1000; 
      let regTimeStart  = formatStamp(this.time1[0]);
      let regTimeEnd = formatStamp(this.time1[1])+24*60*60*1000-1000; 
      let serviceStartTime  = formatStamp(this.time3[0]);
      let serviceEndTime = formatStamp(this.time3[1])+24*60*60*1000-1000; 
      let loginTimeStart = formatStamp(this.time4[0]);
      let loginTimeEnd = formatStamp(this.time4[1])+24*60*60*1000-1000;
      //  console.log('查询的',this.formItem.userType);
      let params = {
        distributionTimeS: distributionTimeS || '',
        distributionTimeE: distributionTimeE || '',
        regTimeStart: regTimeStart || '',
        regTimeEnd: regTimeEnd || '',
        serviceStartTime: serviceStartTime || '',
        serviceEndTime: serviceEndTime || '',
        loginTimeStart:loginTimeStart || '',
        loginTimeEnd : loginTimeEnd || '',
        userName: this.formItem.userName,
        mobile: this.formItem.phone,
        isQuerySelf:this.formItem.isQuerySelf==true?1:0,
        regSource: formatType(this.formItem.regSource),
        userType: formatType(this.formItem.userType),
        memberName:this.formItem.memberName?this.formItem.memberName.replace(/\<.*?\>/g,'') : '',
        memberId: this.formItem.memberId || '',   
        adminDeptId: this.departId,
        adminId: this.formItem.adminId || '',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      // Object.assign(params, this.formItem)
      getUserList(formData(params)).then(res => {
        this.$Spin.hide()
        //console.log(res)
        this.tableData = res.response.list
        this.total = res.response.total
      })
    },
    // 获取汇总
    getAllUserData () {
      let distributionTimeS = formatStamp(this.time2[0]); 
      let distributionTimeE = formatStamp( this.time2[1]); 
      let regTimeStart  = formatStamp(this.time1[0]);
      let regTimeEnd = formatStamp(this.time1[1]); 
      let serviceStartTime  = formatStamp(this.time3[0]);
      let serviceEndTime = formatStamp(this.time3[1]); 
      let loginTimeStart = formatStamp(this.time4[0]);
      let loginTimeEnd = formatStamp(this.time4[1])+24*60*60*1000-1000;
      let params = {
        distributionTimeS: distributionTimeS || '',
        distributionTimeE: distributionTimeE || '',
        regTimeStart: regTimeStart || '',
        regTimeEnd: regTimeEnd || '',
        serviceStartTime: serviceStartTime || '',
        serviceEndTime: serviceEndTime || '',
        loginTimeStart:loginTimeStart || '',
        loginTimeEnd : loginTimeEnd || '',
        userName: this.formItem.userName,
        mobile: this.formItem.phone,
        regSource: formatType(this.formItem.regSource),
        userType: formatType(this.formItem.userType),
        memberId: this.formItem.memberId || '',   
        adminDeptId: this.departId,
        adminId: this.formItem.adminId || '',
        // pageNum: this.pageNum,
        // pageSize: this.pageSize,
      }
      getAllUser(formData(params)).then(res => {
        //console.log(res)
        this.userCount = res.response.userCount
        this.formalUserCount = res.response.formalUserCount
        this.intentionUserCount = res.response.intentionUserCount
        this.totalAmount = res.response.totalAmount
      })
    },
    // 重置
    reset() {
      this.$refs.input1.query = ''
      this.$refs.input2.query = ''
      this.formItem.userType = '';
      this.formItem.userName = '';
      this.formItem.phone = '';
      this.formItem.regSource = '';
      this.formItem.memberName = '';
      this.formItem.memberId='';
      this.formItem.adminId = '';
      this.departId = '';
      this.time1 = [];
      this.time2 = [];
      this.time3 = [];
      this.time4 = [];
      this.time1[0] = '';
      this.time1[1] = '';
      this.time2[0] = '';
      this.time2[1] = '';
      this.time3[0] = '';
      this.time3[1] = '';
      this.time4[0] = '';
      this.time4[1] = '';
      // console.log('重置的',this.formItem.userType)
    },
    // 获取用户类型
    getUserType() {
      getUserType().then(res => {
        this.customerType = res.response
      })
    },
    // 获取用户来源
    getUserResource() {
      getUserResource().then(res => {
        this.customerSource = res.response
      })
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getListPage()
    },
    // 监听时间选择器
    dateChange() {

    }
  },
    //修改列表页的meta值，false时再次进入页面会重新请求数据。
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
       this.getListPage();// ajax获取数据方法
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
  }
}
</script>
