<template lang="html">
  <div class="list">
    <!-- 联系人信息弹窗 -->
    <Modal v-model="cantactModalVisible" title="信息联系人" class-name="verModal">
      <div class="warp" >
        <div class="unit_title">
          <span>信息单元</span>
        </div>
        <div class="unit_content">
          <div class="unit_content_left">
              <div class="unit_s_left">信息单元编码：</div>
              <div class="unit_s_right">{{unitCode}}</div>
          </div>
          <div class="unit_content_left no_line">
              <div class="unit_s_left">信息单元名称：</div>
              <div class="unit_s_right no-right-border">{{unitName}}</div>
          </div>
        </div>
      </div>
      <div class="warp" >
        <div class="unit_title" style='border-bottom: none;'>
          <span>联系人列表</span>
        </div>
        <Table class="tableCommon" :columns="tableColumns" :data="tableData"></Table>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </div>
      <div slot="footer">
        <i-button type="primary" @click="hideModal">返回</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import oilPage from "../../../components/page/page.vue";
import { contactModal } from "../../unitmangement/api/infoDiffusion";
import { formData } from "../../../../assets/js/common.js";
import dial from '@/assets/js/linkDial.js';

export default {
  components: {
    oilPage
  },
  data() {
    return {
      cantactModalVisible: false,
      unitCode: "",
      unitName: "",
      tableData: [],
      pageSizeOpts: [5, 10, 20],
      showSizer: true,
      pageSize: 5,
      pageNum: 1,
      total: 0,
      tableColumns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          key: "sex",
          title: "性别",
          render: (h, data) => {
            let label =
              data.row.sex === 0 ? "男性" : data.row.sex === 1 ? "女性" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        },
        {
          title: "部门",
          key: "department"
        },
        {
          title: "职位",
          key: "position"
        },
        {
          title: "联系电话号码",
          key: "phone",
          render: (h, params) => {
            let that = this;
            if(params.row.phone.indexOf(",")>0){
              var arrayStr = params.row.phone.split(',');
              return h('div',arrayStr.map(function(item,index){
                console.log('ceshi',item);
                return h('p', {
                    style:{
                      disPlay:'block',
                      cursor:'pointer',
                      color:'#2d8cf0'
                    },
                    on: {
                      click: () => {
                        that.onDial(item);
                      }
                    },
                  }, arrayStr.length-1==index ? item+'' : item+',')
              }))
            }else{
              if(params.row.phone){
                return h('div', [
                  // h('span',params.row.mobile),
                  h('a', {
                    style:{
                      // paddingLeft:'5px'
                    },
                    on: {
                      click: () => {
                        this.call(params.row.phone);
                      }
                    },
                  }, params.row.phone),
                ])
              }
            }
          }
        },
        {
          title: "手机号码",
          key: "mobile",
          render: (h, params) => {
            let that = this;
            if(params.row.mobile.indexOf(",")>0){
              var arrayStr = params.row.mobile.split(',');
              return h('div',arrayStr.map(function(item,index){
                console.log('ceshi',item);
                return h('p', {
                    style:{
                      disPlay:'block',
                      cursor:'pointer',
                      color:'#2d8cf0'
                    },
                    on: {
                      click: () => {
                        that.call(item);
                      }
                    },
                  }, arrayStr.length-1==index ? item+'' : item+',')
              }))
            }else{
              if(params.row.mobile){
                return h('div', [
                  // h('span',params.row.mobile),
                  h('a', {
                    style:{
                      // paddingLeft:'5px'
                    },
                    on: {
                      click: () => {
                        this.call(params.row.mobile);
                      }
                    },
                  }, params.row.mobile),
                ])
              }
            }
          }
        },
        {
          title: "所在公司",
          key: "enterpriseName"
        }
      ]
    };
  },
  methods: {
    call(data) {
      if (!data) return;
      dial(data);
    },
    showModal() {
      this.cantactModalVisible = true;
    },
    showContactInfo(row) {
      var that = this;
      that.unitCode = row.informationUnitCode;
      that.unitName = row.informationUnitName;
      that.showData(row);
    },
    showData(row) {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        taskId: row.taskId
      };
      contactModal(params).then(res => {
        if (res.response.list.length) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        }
      });
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.showData();
    },
    hideModal() {
      this.cantactModalVisible = false;
    }
  }
};
</script>

<style scoped>
.warp .unit_title span {
  height: 43px;
  width: 100%;
  padding-left: 10px;
  background: #ebf2fe;
  border: 1px solid #bbbbbb;
  display: block;
  color: #000000;
  font-size: 18px;
  line-height: 43px;
}
.unit_content {
  height: 59px;
  line-height: 59px;
  margin-bottom: 20px;
  border-left: 1px solid #bbbbbb;
  border-right: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
}
.unit_content .unit_content_left {
  height: 59px;
  float: left;
  width: 50%;
}
.unit_content .no_line {
  border-right: none;
}
.unit_content .unit_s_left,
.unit_content .unit_s_right {
  font-size: 14px;
  width: 38%;
  color: #000000;
  height: 58px;
  line-height: 59px;
  text-align: center;
  border-right: 1px solid #bbbbbb;
  float: left;
  background: #e9eaef;
}
.unit_content .unit_s_right {
  width: 62%;
}
.unit_content .no-right-border {
  border-right: 0;
}
</style>
