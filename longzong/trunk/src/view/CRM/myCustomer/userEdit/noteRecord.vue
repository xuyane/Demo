<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户
      </Row>
    </Col>
    <tab-header :tab-index="6"></tab-header>
    <Col span="24" style="background: #fff;padding: 0 20px;">
      <Table class="tableCommon mar-t-20"
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
    </Col>
  </Row>
</template>
<script>
import TabHeader from './tabHeader'
import OilPage from '../../../components/page/page.vue';
import timeStampChange from "../../../../assets/js/timestamp_change.js";
import dial from '@/assets/js/linkDial.js';
import { formData, formatStamp, formatTime } from '../../../../assets/js/common.js';
import {
  getUsersmstemplateListStatus,
  getUsersmstemplateList,
  getUsersmssendSave,
  getUsersmssendList
} from "../../../components/axios/crm.js";
export default {
  data () {
    return {
      userId: window.localStorage.getItem('lzUserId'),
      memberId: window.localStorage.getItem('lzMemberId'),
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData: [],
      findlistmsg: {},
      messageTypes: [{}],
      columns: [
        {
          key: 'templateId',
          title: '短信类型',
          minWidth: 120,
          render: (h, data) => {
            return h('span', {
              style: {
                color: '#2066dc',
                cursor: 'pointer'
              }
            }, this.getName(data.row.templateId))
          }
        },
        {
          key: 'content',
          title: '短信内容',
          minWidth: 360
        },
        {
          key: 'mobile',
          title: '短信接收号码',
          minWidth: 120,
          render:(h,data)=>{
            return h('a',{
              on:{
                click:()=>{
                  this.onDial(data.row.mobile)
                }
              }
            },data.row.mobile)
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
        {
          key: 'status',
          title: '结果',
          width: 120,
          render: (h, data) => {
            if(data.row.status === 1)
            {
              return h('span', {
                style: {
                   marginRight: "8px",
                        color: "#222"
                }
              }, '成功')
            }
            else{
                return h('div', [
                  h('span', {
                    style: {
                      color: "red",
                      marginRight: "8px"
                    }
                  }, '失败'),
                  h('span', {
                    style: {
                      color: '#0f51bf',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.isResend(data)
                      }
                    }
                  },  `重发`)
                ])
            }
          }
        }
      ]
    }
  },
  components: {
    TabHeader,
    OilPage
  },
  methods: {
    // 获取列表
    getListPage(data) {
      let that = this;
      this.$Spin.show();
      let params = {
        // userId: this.userId,
        memberId: this.memberId,
        order: 'asc',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
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
     // 可用禁用
    isResend (data){
      let that = this;
      //  this.$Spin.show();
      let params= {
          id:data.row.id,
          mobile: data.row.mobile,
          gateway: data.row.gateway,
          type:1,
          isResend:1,
          status:1,
          isSend:1,
          templateId: data.row.templateId,
          content: data.row.content
        }

         this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定重发吗？</p>",
        onOk: () => {
         
         getUsersmssendSave(params).then(resp => {
           // that.$Spin.hide();
            if (resp.status == 200) {
               this.getlist();
            }
          });


        },
        onCancel: () => {}
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
     getlist() {
      let that = this;
      this.$Spin.show();
      getUsersmstemplateListStatus().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.messageTypes = data;
          console.log('messageType', that.messageTypes)
        }
      });
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
    //呼出
    onDial(phone){
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
      });
    }
  },
  created(){
     // this.$Spin.show();
     this.getlist();
    this.findlistmsg.pageSize = 10;
    this.findlistmsg.pageNum = 1;
    // this.getstatus();
    this.getListPage(this.findlistmsg);
  }
}
</script>
