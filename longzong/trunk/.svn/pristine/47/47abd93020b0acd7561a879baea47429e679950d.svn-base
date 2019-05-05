<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;第三方接口设置
      </Row>
    </Col>
    <tab-header :tab-index="6"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="手机号码:">
               <Input v-model="formItem.title" class="search-input" placeholder="请输入手机号码"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="添加时间:">
              <DatePicker
                v-model="time"
                type="daterange"
                placeholder="请选择添加时间"
                class="search-input"></DatePicker>
            </FormItem>
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
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="addPhone">新增手机号</Button>
        </div>
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true">
        </Table>

        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
    </Col>
    <add-phone-modal
      ref="phoneModalRef"
      :showAddModal="addPhoneModal"
      @getListPage="getListPage"
      @hide-modal="hideModal">
    </add-phone-modal>
  </Row>
</template>
<script>
import TabHeader from './tabHeader.vue';
import OilPage from '../../components/page/page.vue';
import AddPhoneModal from './addPhoneModal'
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formData, formatStamp, formatTime } from '../../../assets/js/common.js';
import {
  getUsersmsgatewayList,
  getUsersmsgatewayEnum,
  getUsersmsgatewaySave,
  getUsersmsgatewayUpdate,
  getUsersmsgatewayDelete
} from "../../components/axios/crm.js";
export default {
  data() {
    return {
      addPhoneModal: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      messageTypes: [],
      findlistmsg: {},
      gatewayEnum: [],
      time: [],
      formItem: {

      },
      tableData: [],
      columns: [
        {
          key: 'mobile',
          title: '手机号码',
          minWidth: 120
        },
        {
          key: 'username',
          title: '用户名',
          minWidth: 120
        },
        {
          key: 'note',
          title: '原因',
          minWidth: 120
        },
        {
          key: 'createTime',
          title: '添加时间',
          minWidth: 100,
          render:(h,data)=>{
           return h('span',{},timeStampChange.format(data.row.createTime))
         }
        },
        {
          key: 'gateway',
          title: '第三方接口',
          minWidth: 120,
          render:(h,data)=>{
           return h('span', this.getNameNume(data.row.gateway))
         }
        },
        {
          key: 'creatorName',
          title: '操作人',
          minWidth: 100
        },
        {
          key: '',
          title: '操作',
          minWidth: 80,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer',
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.editData(data)
                  }
                }
              }, '修改'),
              h('span', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.isStatus(data)
                  }
                }
              }, '删除')
            ])
          }
        },
      ]
    }
  },
  components: {
    TabHeader,
    OilPage,
    AddPhoneModal
  },
  methods: {
    // 新增手机号
    addPhone(){
      this.addPhoneModal = true
      this.$refs.phoneModalRef.title = '新增手机号';
      this.$refs.phoneModalRef.formItem = {};
    },
    // 修改
    editData(data) {
      this.addPhoneModal = true
      this.$refs.phoneModalRef.title = '修改设置';
      this.$refs.phoneModalRef.formItem.mobile = data.row.mobile;
      this.$refs.phoneModalRef.formItem.interface = data.row.gateway;
      this.$refs.phoneModalRef.formItem.reason = data.row.note;
      this.$refs.phoneModalRef.formItem.id = data.row.id;
    },
    // 删除
    isStatus (data){
      let that = this;
      //this.$Spin.show();
      let status = 0;
      if(data.row.status === 0) {
        status= 1;
      }
      let params= {
        id: data.row.id,
        status: status
      }
      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定删除吗？</p>",
        onOk: () => {
          getUsersmsgatewayDelete(params).then(resp => {
        //  that.$Spin.hide();
          if (resp.status == 200) {
            this.getListPage(this.findlistmsg);
          }
        });


        },
        onCancel: () => {}
      })
    },
    findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    getListPage() {
      let that = this;
      this.$Spin.show();
      let mobile = this.formItem.title;
      if(mobile === undefined)
      {
        mobile = "";
      }
      let startTime = this.time[0];
      let endTime =  this.time[1];
      if(this.time.length <= 0 || startTime === undefined || startTime === "")
      {
        startTime ="";
        endTime ="";
      }
      else{
        startTime=formatStamp(this.time[0]);
        endTime=formatStamp(this.time[1]);
      }
      let params = {
        mobile: mobile,
        order: 'asc',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: startTime,
        endTime: endTime,
        sort: ''
      }
      getUsersmsgatewayList(formData(params)).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response.list;
          that.tableData = data;
          that.total = resp.response.total;
        }
      });
    },
    hideModal() {
      this.addPhoneModal = false;
      this.getListPage()
    },
    // 重置
    reset() {
      this.time = [];
      this.formItem={};
    },
     // 获取枚举列表
    getlistEnum() {
      let that = this;
      this.$Spin.show();
      getUsersmsgatewayEnum().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.gatewayEnum = data;
        }
      });
    },
     // 通过id获取name
     getNameNume(id) {
       let temt = '无';
       for(let i = 0; i < this.gatewayEnum.length; i ++) {
         if (this.gatewayEnum[i].value === id) {
           temt = this.gatewayEnum[i].desc;
           break;
         }
       }
       return temt;
     },
    // 监听分页
    pageChange (page, pageSize) {
      if (page) {
        this.pageNum = page;
        this.findlistmsg.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
        this.findlistmsg.pageSize = pageSize;
      }
      this.getListPage();
    },
  },
  created(){
    // this.$Spin.show();
    this.getlistEnum();
    this.findlistmsg.pageSize = 10;
    this.findlistmsg.pageNum = 1;
    // this.getstatus();
    this.getListPage();
  }
}
</script>
