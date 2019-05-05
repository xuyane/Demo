<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户
      </Row>
    </Col>
    <tab-header :tab-index="5"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="用户来源:">
              <Select v-model="formItem.regSource" class="form-select" clearable placeholder="请选择用户来源">
                <Option v-for="item in customerSource" :value="item.value" :key="item.value">{{ item.desc }}</Option>
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
                clearable
                remote
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
               <Select
                v-model="formItem.memberId"
                ref="input2"
                class="search-input"
                filterable
                clearable
                remote
                :remote-method="remoteMethod2"
                :loading="loading">
                <Option v-for="(option, index) in options2" :value="option.id" :key="index"><{{option.id}}>{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="用户名:">
              <Input v-model="formItem.userName" clearable class="search-input" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="绑定手机:">
              <Input v-model="formItem.phone" clearable @on-keyup="keyUp" class="search-input" placeholder="请输入绑定手机"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="注册时间:">
              <DatePicker v-model="regTime" @on-change="dateChange" type="daterange" clearable  :options="dateType" split-panels placeholder="请选择注册时间" class="search-input"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="分配时间:">
              <DatePicker v-model="distributionTime" @on-change="dateChange" type="daterange"  clearable :options="dateType" split-panels placeholder="请选择分配时间" class="search-input"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="到期时间:">
              <DatePicker
                v-model="time"
                type="daterange"
                :options="dateType"
                placement="bottom-end"
                class="search-input"
                clearable
                placeholder="请选择到期时间">
              </DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row type='flex' justify='space-between'>
          <Col span="7">
            <FormItem label="登录时间:">
              <DatePicker
                v-model="time4"
                type="daterange"
                :options="dateType"
                clearable
                class="search-input"
                placeholder="请选择到期时间">
              </DatePicker>
            </FormItem>
          </Col>
           <Col span="7" offset='1'>
            <!-- <FormItem label="只显示自己:">
              <RadioGroup v-model="formItem.isQuerySelf">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </FormItem> -->
            <!-- <CheckboxGroup v-model="formItem.isQuerySelf" on-change='isQuerySelfevent'> -->
                <Checkbox v-model="formItem.isQuerySelf"  @on-change='isQuerySelfevent'>只显示自己</Checkbox>
            <!-- </CheckboxGroup> -->
          </Col>
          <Col span="7" class="text-right">
            <FormItem>
              <Button type="primary" @click="findListPage">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <!-- <table-header :num1="num1" :num2="num2" :num3="num3" :total-price="totalPrice"></table-header> -->
      <Row class-name="table-con">
        <table-user :data-list="tableData"></table-user>
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
import { getUserType, getUserResource, getUserList,getAdminList,memberSelectList } from '../../../components/axios/crm.js'
import { formData, formatStamp, formatTime, formatType } from '../../../../assets/js/common.js'
import OilPage from '../../../components/page/page.vue'
import TableUser from './tableUser.vue'
import TabHeader from './tabHeader.vue'
// import TableHeader from './tableHeader.vue'
import SelectDepartment from '../../../components/crm/departMent.vue'
export default {
  name: 'testUser',
  data() {
    return {
      num1: 100,
      num2: 100,
      num3: 100,
      totalPrice: 1000,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      options1:[],
      options2:[],
      loading:false,
      departId:'',
      formItem: {
        adminId: '',
        userName: '',
        phone: '',
        memberId: '',
        regSource: '',
        isQuerySelf:true
      },
      type: 4,
      time: [],
      time4:[],
      regTime: [],
      distributionTime: [],
      customerSource: [],
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
      tableData: []
    }
  },
  components: {
    OilPage,
    TableUser,
    TabHeader,
    // TableHeader
    SelectDepartment
  },
  created () {
    this.getUserResource()
    this.getListPage()
  },
  methods: {
    isQuerySelfevent(){
      this.findListPage()
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
    keyUp() {
      this.formItem.phone = this.formItem.phone.replace(/[^\d]/g,'')
    },
    //获取所在部门部门树
    getDepData (deptLabel,deptId,deptCode){
      this.departId = deptId ? deptId:'';
    },
    // 获取公司名称下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          memberName: query.replace(/\<.*?\>/g,''),
          isQuerySelf:this.formItem.isQuerySelf==true?1:0,
          isNotRlAdmin:1
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
      findListPage(){
      this.formItem.memberName=this.$refs.input2.query;
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    // 获取列表
    getListPage () {
      
       this.$Spin.show();
      let distributionTimeS = formatStamp(this.distributionTime[0]); 
      let distributionTimeE = formatStamp( this.distributionTime[1])+ 3600 * 1000 * 24 - 1000; 
      let regTimeStart  = formatStamp(this.regTime[0]);
      let regTimeEnd = formatStamp(this.regTime[1])+ 3600 * 1000 * 24 - 1000; 
      let startTime  = formatStamp(this.time[0]);
      let endTime =formatStamp(this.time[1])+ 3600 * 1000 * 24 - 1000; 
      let loginTimeStart  = formatStamp(this.time4[0]);
      let loginTimeEnd =formatStamp(this.time4[1])+24*60*60*1000-1000; 
      let params = {
        distributionTimeS:distributionTimeS || '',
        distributionTimeE:distributionTimeE || '',
        regTimeStart:regTimeStart || '',
        regTimeEnd:regTimeEnd || '',
        startTime:startTime || '',
        endTime:endTime || '',
        loginTimeStart:loginTimeStart || '',
        loginTimeEnd:loginTimeEnd || '',
        type: this.type,
        pageNum: this.pageNum,  
        pageSize: this.pageSize,
        userName:this.formItem.userName,
         isQuerySelf:this.formItem.isQuerySelf==true?1:0,
        mobile:this.formItem.phone,
        regSource:formatType(this.formItem.regSource),
        memberName:this.formItem.memberName?this.formItem.memberName.replace(/\<.*?\>/g,''):'',
        memberId:this.formItem.memberId || '',
        adminDeptId:this.departId,
        adminId:this.formItem.adminId || ''
      }
      // Object.assign(params, this.formItem)
      getUserList(formData(params)).then(res => {
        this.$Spin.hide()
        this.tableData = res.response.list
        this.total = res.response.total
      })
    },
    // 重置
    reset() {
      this.$refs.input1.query = ''
      this.$refs.input2.query = ''
      this.formItem.userName =''
      this.formItem.phone =''
      this.formItem.regSource = ''
      this.formItem.memberId = ''
      this.departId =''
      this.formItem.adminId = ''
      this.distributionTime = []
      this.distributionTime[0]=''
      this.distributionTime[1]=''
      this.regTime = []
      this.regTime[0] = ''
      this.regTime[1] = ''
      this.time = []
      this.time[0]=''
      this.time[1]=''
      this.time4 = []
      this.time4[0]=''
      this.time4[1]=''
    },
    // 获取用户类型
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
  }
}
</script>
