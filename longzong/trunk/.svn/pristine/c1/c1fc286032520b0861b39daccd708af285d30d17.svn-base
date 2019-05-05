<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;发送记录
      </Row>
    </Col>
    <tab-header :tab-index="3"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="短信类型:">
              <Select v-model="formItem.messageType" class="form-select" placeholder="请选择短信类型">
                <Option value="0">无</Option>
                <Option v-for="item in messageTypes" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="发送时间:">
              <DatePicker
                v-model="time"
                type="daterange"
                placeholder="请选择发送时间"
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
  </Row>
</template>
<script>
import TabHeader from './tabHeader.vue';
import OilPage from '../../components/page/page.vue';
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formData, formatStamp, formatTime } from '../../../assets/js/common.js';
import {
  getUsersmsgatewayEnum,
   getUsersmstemplateListStatus,
  getUsersmstemplateList,
  getUsersmssendList
} from "../../components/axios/crm.js";
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      messageTypes: [{}],
      messageTypesTwo: [{}],
       gatewayEnum: [],
      findlistmsg: {},
      time: [],
      formItem: {

      },
      tableData: [],
      columns: [
        {
          key: 'templateId',
          title: '短信类型',
          minWidth: 120,
          render: (h, data) => {
            return h("span", this.getName(data.row.templateId))
          }
        },
        {
          key: 'content',
          title: '短信内容',
          minWidth: 320
        },
        {
          key: 'userName',
          title: '接收人',
          minWidth: 120
        },
        {
          key: 'mobile',
          title: '接受号码',
          minWidth: 120
        },
        {
          key: 'gateway',
          title: '通道',
          minWidth: 120,
          render:(h,data)=>{
           return h('span', this.getNameNume(data.row.gateway))
         }
        },
        {
          key: 'status',
          title: '发送状态',
          minWidth: 120,
          render: (h, data) => {
            let status = ''
            if(data.row.isSend === 0)
            {
              status = '待发送'
            }
            else
            {
              if(data.row.status === 0) {
                  status = '发送失败'
                }
              else {
                  status = '发送成功'
                }
            }
            
            return h('span', {}, status)
          }
        },
        {
          key: 'sendTime',
          title: '发送时间',
          minWidth: 160,
          render:(h,data)=>{
           return h('span',{},timeStampChange.format(data.row.sendTime))
         }
        },
      ]
    }
  },
  components: {
    TabHeader,
    OilPage
  },
  methods: {
    findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    getListPage(data) {
      let that = this;
       this.$Spin.show();
       let templateId = this.formItem.messageType;
       if(templateId === undefined){
          templateId="";
       }
       else if(templateId === "0"){
         templateId=0;
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
        templateId: templateId,
        order: 'asc',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: startTime,
        endTime: endTime,
        sort: ''
      }
      getUsersmssendList(formData(params)).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response.list;
          that.tableData = data;
          that.total = resp.response.total;
        }
      });
    },
    // 重置
    reset() {
      this.time = [];
      this.formItem={};
    },
    getlist() {
      let that = this;
      this.$Spin.show();
      getUsersmstemplateListStatus().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.messageTypes = data;
        }
      });
     },
     // 通过id获取name
     getName(id) {
       let temt = '无';
       for(let i = 0; i < this.messageTypes.length; i ++) {
         if (this.messageTypes[i].id === id) {
           temt = this.messageTypes[i].name;
           break;
         }
       }
       return temt;
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
      this.getListPage(this.findlistmsg);
    },
  },
  created(){
     // this.$Spin.show();
    this.getlist();
    this.getlistEnum();
    this.findlistmsg.pageSize = 10;
    this.findlistmsg.pageNum = 1;
    // this.getstatus();
    this.getListPage(this.findlistmsg);
  }
}
</script>
