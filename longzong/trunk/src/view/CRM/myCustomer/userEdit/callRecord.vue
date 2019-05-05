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
import TabHeader from './tabHeader';
import oilPage from '../../../components/page/page.vue';
import { formatTime2,formData } from "../../../../assets/js/common.js";
import { getCallRecords } from '../../../components/axios/crm.js'
export default {
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData: [],
      formItem: {
        pageNum: 1,
        pageSize: 10,
        memberId: window.localStorage.getItem('lzMemberId')
        // userId: window.localStorage.getItem('lzUserId')
      },
      columns: [
        {
          key: 'connectStartTime',
          title: '通话记录',
          minWidth: 180,
          render: (h, data) => {
            let result = "";

            if (data.row.connectStartTime != null && data.row.connectStartTime > 0) {
              result = formatTime2(data.row.connectStartTime);
            }

            return h("span", {}, result);
          }
        },
        {
          key: 'connectTimeLen',
          title: '时长',
          minWidth: 180,
          render: (h, data) => {
            return h('span', {}, this.formatSeconds(data.row.connectTimeLen))
          }
        },
        {
          // key: '',
          title: '主叫',
          minWidth: 180,
          render: (h, data) => {
            let text = '';

            if (data.row.callType == 1){
              if(data.row.userName == null || data.row.userName == ""){
                text = data.row.contactName+'('+data.row.phone+')';
              }else{
                text = data.row.userName+'('+data.row.phone+')';
              }
            }else if (data.row.callType == 2){
              text = data.row.employeeName+'('+data.row.extCode+')';
            }

            return h('span', {}, text);
          }
        },
        {
          // key: '',
          title: '被叫',
          minWidth: 180,
          render: (h, data) => {
            let text = '';

            if (data.row.callType == 2){
              if(data.row.userName == null || data.row.userName == ""){
                text = data.row.contactName+'('+data.row.phone+')';
              }else{
                text = data.row.userName+'('+data.row.phone+')';
              }
            }else if (data.row.callType == 1){
              text = data.row.employeeName+'('+data.row.extCode+')';
            }

            return h('span', {}, text);
          }
        },
         {
          title: "操作",
          key: "action",
          width: 350,
          // fixed: 'right',
          className: "colorbluer",
          align: "center",
          render: (h, data) => {
            var htmls =
              '<audio controls><source src="' +
              data.row.fileUrl +
              '" type="audio/wav">' +
              "</audio>";
            return h("div", {
              domProps: {
                innerHTML: htmls
              }
            });
          }
        }
        // {
        //   key: '',
        //   title: '操作',
        //   minWidth: 280,
        //   render: (h, data) => {
        //     return h('div', [
        //       h('span', {
        //         style: {
        //           marginRight: '8px',
        //           color: '#2066dc',
        //           cursor: 'pointer'
        //         }
        //       }, '下载录音'),
        //       h('span', {
        //         style: {
        //           marginRight: '8px',
        //           color: '#2066dc',
        //           cursor: 'pointer'
        //         }
        //       }, '试听录音')
        //     ])
        //   }
        // }
      ]
    }
  },
  components: {
    TabHeader,
    oilPage
  },
  created() {
    this.formItem.pageSize = 10;
    this.formItem.pageNum = 1;
    this.getListPage(this.formItem);
  },
  methods: {
    // 获取通话记录列表
    getListPage(params) {
      let that = this;
      this.$Spin.show();
      getCallRecords(formData(params)).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200 && resp.response.pageInfo != null) {
          let data = resp.response.pageInfo.list;
          that.tableData = data;
          that.total = resp.response.pageInfo.total;
        }
        else{
          that.tableData = [];
          that.total = 0;
        }
      });
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.formItem.pageNum = page;
      }

      if(pageSize) {
        this.formItem.pageSize = pageSize;
      }

      this.getListPage(this.formItem);
    },

    formatSeconds(seconds) {
      if(seconds == null){
        return "";
      }else if(seconds < 60) {
        return `${seconds}秒`;
      } else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
      } else {
        return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds - Math.floor(seconds / 3600) * 3600) / 60)}分${seconds % 60}秒`;
      }
    }
  }
}
</script>
