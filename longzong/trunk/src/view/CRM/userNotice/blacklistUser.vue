<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;短信黑名单
      </Row>
    </Col>
    <tab-header :tab-index="5"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem1" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="公司名称:">
               <Input v-model="formItem1.title" class="search-input" placeholder="请输入公司名称"></Input>
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
          <Button type="primary" class="search-btn" @click="transfer">新增黑名单</Button>
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
    <add-blacklist-modal
      :showAddModal="showAddModal"
      @getListPage="getListPage"
      @hide-modal="hideModal">
    </add-blacklist-modal>
  </Row>
</template>
<script>
import TabHeader from './tabHeader.vue';
import OilPage from '../../components/page/page.vue';
import AddBlacklistModal from './addBlacklistModal'
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formData, formatStamp, formatTime } from '../../../assets/js/common.js';
import {
  getUsersmsblackList,
  getUsersmsblackDelete
} from "../../components/axios/crm.js";
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      showAddModal: false,
      messageTypes: [],
      findlistmsg: {},
      time: [],
      formItem1: {

      },
      tableData: [],
      columns: [
        {
          key: 'memberNameCn',
          title: '公司名称',
          minWidth: 180
        },
        {
          key: 'username',
          title: '用户名',
          minWidth: 100
        },
        {
          key: 'mobile',
          title: '手机号码',
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
          key: 'creatorName',
          title: '操作人',
          minWidth: 100
        },
        {
          title: '操作',
          minWidth: 80,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.delete(data)
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
    AddBlacklistModal
  },
  methods: {
     // 新增黑名单
    transfer(){
      this.showAddModal = true
    },
    findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    getListPage(data) {
      const that = this;
      this.$Spin.show();
      let memberNameCn = this.formItem1.title;
      if(memberNameCn === undefined)
      {
        memberNameCn = "";
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
        memberNameCn: memberNameCn,
        order: 'asc',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: startTime,
        endTime: endTime,
        sort: ''
      }
      getUsersmsblackList(formData(params)).then(resp => {
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
        this.formItem1={};
    },
    delete(data) {
        let that = this;
      //this.$Spin.show();
     
      let params= {
          id: data.row.id
        }

         this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定删除吗？</p>",
        onOk: () => {
         
          getUsersmsblackDelete(params).then(resp => {
          //  that.$Spin.hide();
            if (resp.status == 200) {
              that.getListPage(this.findlistmsg);
            }
            else{
                  this.$Message.warning(resp.data.message);
                  console.log( resp.data.message)
                }
          });


        },
        onCancel: () => {}
      });

      
    },
    hideModal() {
      this.showAddModal = false;
      //this.$router.go(0);
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
    this.findlistmsg.pageSize = 10;
    this.findlistmsg.pageNum = 1;
    // this.getstatus();
    this.getListPage(this.findlistmsg);
  }
}
</script>
