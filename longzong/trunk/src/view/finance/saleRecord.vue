<style lang="less" scoped>
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;销项票领用记录
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="票号:">
              <Input v-model="formItem.value1" class="search-input" placeholder="请输入票号"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="领用时间:">
              <DatePicker type="daterange" v-model="time" @on-change="dateChange" class="search-input" placement="bottom-end" placeholder="请选择日期"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="有无领用:">
              <Select v-model="formItem.value3" class="search-input">
                <Option v-for="item in boolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="发票抬头:">
              <Input v-model="formItem.value4" class="search-input" placeholder="请输入发票抬头"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="领用人:">
              <Input v-model="formItem.value5" class="search-input" placeholder="请输入领用人"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="申请人部门:">
               <select-department @data-list="getDepData" :emptyModel='formItem.value6'></select-department>
              <!-- <Cascader :data="departData" v-model="formItem.value6" class="search-input" placeholder="请选择部门"></Cascader> -->
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="开票金额:">
              <Col span="11">
                <Input v-model="formItem.totalAmountMin" class="search-input" placeholder="请输入金额" @on-keyup="numberInput(formItem.totalAmountMin,'min')"></Input>
              </Col>
              <Col span="2" class="text-center">--</Col>
              <Col span="11">
                <Input v-model="formItem.totalAmountMax" class="search-input" placeholder="请输入金额" @on-keyup="numberInput(formItem.totalAmountMax,'max')"></Input>
              </Col>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="申请人:">
              <Input v-model="formItem.adminName" class="search-input" placeholder="请输入申请人"></Input>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="search">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="lotUse">批量领用</Button>
          <Button type="error" class="search-btn" @click="lotCancel">批量撤销</Button>
        </div>
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true"
          @on-selection-change="selectChange">
        </Table>
        <!-- <div class="page-con">
          <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
          <Page
            :total="dataCount"
            :page-size="pageSize"
            show-sizer
            show-elevator
            :page-size-opts="pageSizeOpt"
            @on-change="changePageNum"
            @on-page-size-change="changePageSize"
            class="pull-right"/>
        </div> -->
        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
    </Col>
    <!-- 发票领用弹框 -->
    <Modal v-model="ticketModal" title="发票领用" :width="500" :mask-closable="false">
      <Row>
        <Form ref="selectModal">
          <Row type="flex" justify="space-between">
            <Col span="24">
              <FormItem label="领用人：" :label-width="100">
                <Select v-model="receiverId" filterable :remote-method="remoteMethod" @on-change="changeReceiver" label-in-value>
                  <Option v-for="item in receiverList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="领用时间：" :label-width="100">
                <!-- <DatePicker type="daterange" @on-change="dateChange" v-model="createTime" placeholder="选择时间"  placement="bottom-end" class="search-input" ></DatePicker> -->
                <DatePicker v-model="datetime" format="yyyy-MM-dd HH:mm" type="datetime"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="ticketSave">确定</i-button>
        <i-button type="default" @click="ticketModal=false;">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import axios from 'axios'
import { selectEmployeeApi } from '../components/axios/finance.js'
import { getSaleRecord } from "../components/axios/finance.js";
import OilPage from '../components/page/page.vue'
import SelectDepartment from '../components/finance/selectDepartment.vue';
import { formatThousandPrice } from "../../assets/js/common.js";
export default {
  data() {
    return {
      receiverId:'',
      receiver:"",
      ticketModal:false,
      invoiceNum:"",
      invoiceInfoId:"",
      receiverList:[],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [10,15,20,40,50,100],
      selection: [],
      time:[],
      datetime: '',
      departData: [],
      ids: [],
      departData: [],
      boolList: [
        {value: 1, label: '有'},
        {value: 0, label: '无'}
      ],
      columns: [
        {
          type: 'selection',
          minWidth: 60,
          align: 'center'
        },
        {
          key: 'invoiceNum',
          title: '票号',
          align: 'center',
          minWidth:160
        },
        {
          key: 'member',
          title: '发票抬头',
          align: 'center',
          minWidth:180
        },
        {
          key: 'invoiceTimeDesc',
          title: '开票日期',
          align: 'center',
          minWidth:100
        },
        {
          key: 'totalAmount',
          title: '开票金额',
          align: 'center',
          minWidth:100,
          render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.totalAmount))
          }
        },
        {
          key: 'adminName',
          title: '领用人',
          align: 'center',
          minWidth:100
        },
        {
          key: 'adminDeptName',
          title: '领用人所在部门',
          align: 'center',
          minWidth:120
        },
        {
          key: 'receiveTimeDes',
          title: '领用时间',
          align: 'center',
          minWidth:160
        },
        {
          title: '操作',
          minWidth:80,
          align: 'center',
          render: (h, data) => {
            return data.row.receiveStatus == 1 ? h('span', {
              style: {
                color: 'red',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.showConfirm(data)
                }
              }
            }, '撤销')
            : h('span', {
              style: {
                color: '#145edb',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.showConfirm(data)
                }
              }
            }, data.row.invoiceNum ? '领用':'-')
          }
        }
      ],
      tableData: [],
      formItem: {
        value1: '',
        startTime: null,
        endTime: null,
        value3: '',
        value4: '',
        value5: '',
        value6: [],
        totalAmountMin: '',
        totalAmountMax: '',
        adminName:''
      },
      time1:"",
      time2:"",
      MoreTicket:false
    }
  },
  components: {
    OilPage,
    SelectDepartment
  },
  created() {
    this.getDataList()
    // const date_ = new Date();
    // const year = date_.getFullYear();
    // const month = date_.getMonth() + 1;
    // this.time1 = year + '-' + month + '-01';//当月第一天
    // const day = new Date(year,month,0);
    // this.time2 = year + '-' + month + '-' + day.getDate();//当月最后一天
    // this.time = [this.time1,this.time2];
  },
  // mounted(){
  //   this.getDataList()
  // },
  watch:{
    ticketModal(val){
      if(val == false){
        this.receiverId = "";
        this.receiver = "";
      }
    }
  },
  methods: {
    //金额只允许输入数字
        numberInput(value, type) {
            if (value != "") {
                if (type == "min") {
                    this.formItem.totalAmountMin = value.replace(/[^\d.]/g,"");
                }
                if (type == "max") {
                    this.formItem.totalAmountMax = value.replace(/[^\d.]/g,"");
                }
            }
        },
    // 获取销项票领用记录列表
    getDataList(){
      let params = this.formItem;
      //(params.totalAmountMin + '-' + params.totalAmountMax)
      let form = {
        invoiceNum: params.value1 || '',        // 票号
        startReceiveTime: params.startTime || null,  // 领用开始时间
        endReceiveTime: params.endTime || null,  // 领用结束时间
        receiveStatus: params.value3,   // 有无领用
        member: params.value4 || '',            // 发票抬头
        receiveName: params.value5 || '',       // 领用人
        receiveDeptId: null,   // 领用人部门id
        receiveDeptIdList: params.value6 && params.value6.length > 0 ? params.value6  : null, // 部门id集合
        totalAmounts:  '',      // 开票金额
        totalAmountMin:params.totalAmountMin,
        totalAmountMax:params.totalAmountMax,
        adminName:params.adminName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getSaleRecord(form).then(res => {
      if(res.message == 'OK') {
        this.tableData = res.response.list
        this.total = res.response.total;
      }
    }).catch(err => {
      console.log(err)
    })
      // axios({
      //   url: '/finance/invoiceReceive/list_page',
      //   method: 'post',
      //   data: form
      // }).then(res => {
      //   console.log(res)
      //   if(res.data.message === 'OK') {
      //     this.tableData = res.data.response.list
      //     this.total = res.data.response.total
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    },
     // 获取部门列表
     getDepData (deptLabel,deptId,deptCode){
      this.formItem.value6 = deptId
    },
    // 重置
    reset () {
      this.formItem.value1 = '';
      this.formItem.value2 = ''
      this.formItem.value3 = ''
      this.formItem.value4 = ''
      this.formItem.value5 = ''
      this.formItem.value6 = [];
      this.formItem.totalAmountMin = ''
      this.formItem.totalAmountMax = ''
      this.formItem.startTime = ""
      this.formItem.endTime = ""
      this.formItem.adminName = ""
      this.time = [];
      this.pageNum = 1;
      this.pageSize = 10;
    },
    // 查询
    search () {
      this.pageNum = 1;
      this.pageSize = 10;
      this.getDataList();
    },
    changeReceiver(option){
      this.receiver = option.label ? option.label : "";
    },
    remoteMethod (st) {
      let that=this;
      axios({
        url: "/finance/common/selectEmployee",
        method: 'post',
        params:{
          name:st ? st:''
        }
      }).then(function(res){
        if(res.data.status == "200"){
            that.receiverList = JSON.parse(res.data.response);
        };
        that.$Spin.hide();
      }).catch(err => {
        that.$Spin.hide();
      });
    },
    ticketSave(){
      if(this.MoreTicket){
        let form = {
              invoiceReceiveReqVOList: []
            }
            this.selection.map(select => {
              let item = {
                receiver:this.receiver,
                receiverId:this.receiverId,
                invoiceInfoId: select.invoiceInfoId,
                invoiceNum: select.invoiceNum,
                receiveTimeDes: this.formatTime(this.datetime) + ''
              }
              form.invoiceReceiveReqVOList.push(item)
            })
            axios.post('/finance/invoiceReceive/insert', form).then(res => {
              this.ticketModal = false;
              this.$Message.success('领用成功！')
              this.getDataList()
            })
      }else{
        let form = {
              invoiceReceiveReqVOList: []
            }
            let item = {
              receiver:this.receiver,
              receiverId:this.receiverId,
              invoiceNum: this.invoiceNum,
              invoiceInfoId: this.invoiceInfoId,
              receiveTimeDes: this.formatTime(this.datetime) + ''
            }
            form.invoiceReceiveReqVOList.push(item)
            axios.post('/finance/invoiceReceive/insert', form).then(res => {
              if(res.data.message === 'OK') {
                this.ticketModal = false;
                this.$Message.success('领用成功！')
                this.getDataList()
              }
              console.log(res)
            })
      }
    },
    // 显示确认框
    showConfirm (data) {
      if(data.row.receiveStatus) {
        this.$Modal.confirm({
          title: '发票领用撤销',
          content: '确定撤销吗？',
          onOk: () => {
            let form = 'ids[]=' + data.row.id
            axios.post('/finance/invoiceReceive/delete', form).then(res => {
              if(res.data.message === 'OK') {
                this.$Message.success('撤销成功！')
                this.getDataList()
              }
            })
          },
          onCancel: () => {
            console.log('cancel')
          }
        });
      } else {
        this.datetime = new Date();
        this.invoiceNum = data.row.invoiceNum;
        this.invoiceInfoId = data.row.invoiceInfoId;
        this.MoreTicket = false;
        this.ticketModal = true;
      }
    },
    // 监听分页跳转事件
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getDataList()
    },
    selectChange (selection) {
      this.selection = selection
      console.log(selection)
    },
    // 监听日期选择
    dateChange (date) {
      this.formItem.startTime = this.formatTime(date[0]) - 8 * 1000 * 60 * 60
      this.formItem.endTime = this.formatTime(date[1]) + 16 * 1000 * 60 * 60 - 1000
      console.log(new Date(this.formItem.startTime))
      console.log(new Date(this.formItem.endTime))
    },
    // 批量领用
    lotUse () {
      if (this.selection.length > 0) {
        this.datetime = new Date();
        this.ticketModal = true;
        this.MoreTicket = true;
      } else {
        this.$Message.warning('请先勾选数据')
      }
    },
    // 批量撤销
    lotCancel () {
      if (this.selection.length > 0) {
        this.$Modal.confirm({
          title: '发票领用撤销',
          content: '确定撤销吗？',
          onOk: () => {
            this.ids = []
            this.selection.map(item => {
              this.ids.push(item.id)
            })
            let form = 'ids[]=' + this.ids
            axios.post('/finance/invoiceReceive/delete', form).then(res => {
              if(res.data.message === 'OK') {
                this.$Message.success('撤销成功！')
                this.getDataList()
              }
            })
          },
          onCancel: () => {
            console.log('cancel')
          }
        });
      } else {
        this.$Message.warning('请先勾选数据')
      }
    },
    // 转时间戳
    formatTime (date) {
      return new Date(date).getTime();
    },
    setDate(date){
      y=date.getFullYear();
      m=date.getMonth()+1;
      d=date.getDate();
      m=m<10?"0"+m:m;
      d=d<10?"0"+d:d;
      return y+"-"+m+"-"+d;
    }
  }
}
</script>
