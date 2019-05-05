<style lang="less" scoped>
@import "../callLog.less";
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;客户数配置
      </Row>
    </Col>
    
    <Col span="24">
        <Row class-name="table-con">
            <div class="btn-container">
                <Button type="primary" class="search-btn" @click="addClick" >新增配置</Button>
            </div>
            <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="handleRowChange">
            </Table>
            <div class="page-con">
                <span>第{{page.pageNum}}页 / 共{{page.pages}}页   每页{{page.pageSize}}条   共{{page.total}}条</span>
                <Page :total="page.total" :page-size="page.pageSize" show-elevator class="pull-right" show-sizer @on-change="getpages" @on-page-size-change="getPageSize"></Page>
            </div>
        </Row>
    </Col>
    <add-customer-modal :showAddModal="showAddModal" @query = "search" @hide-add-modal="hideAddModal" ></add-customer-modal>
    <edit-customer-modal   :showEditModal="showEditModal" @query = "search" @hide-edit-modal="hideEditModal" :editData="editData" ref="editModal" ></edit-customer-modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>

<script>
import axios from "axios";
import addCustomerModal from "./addCustomerConfig.vue";
import editCustomerModal from "./editCustomerConfig.vue";
import {
  listCustomer,
  activateeCustomerLimit,
  forbiddeneCustomerLimit
} from "../../../components/axios/crm.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  name: "myTable",
  components: {
    addCustomerModal,
    editCustomerModal
  },
  data() {
    return {
      spinShow:false,
      showAddModal: false,
      showEditModal: false,
      editData: {}, // 选中数据
      selectRow: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        type: 2
      },
      total: 10,
      columns: [
        {
          key: "createTime",
          align: "center",
          title: "创建时间"
        },
        {
          key: "deptName",
          align: "center",
          title: "范围"
        },
        {
          key: "adminName",
          align: "center",
          title: "业务员"
        },
        {
          key: "num",
          align: "center",
          title: "客户数范围"
        },
        {
          key: "creatorName",
          align: "center",
          title: "设置人"
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          render: (h, data) => {
            var wordcolor=data.row.status==1?'red':'#9ecd3f'
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "#145edb",
                    // textDecoration: "underline",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.updateCustomerConfig(data);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: wordcolor,
                    marginRight: "8px",
                    // textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.onOrOffConfig(data.row.id, data.row.status);
                    }
                  }
                },
                data.row.status == 1 ? "禁用" : "激活"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    let defaultData = {
      pageNum: 1,
      pageSize: 10
    };
    this.getData(defaultData);
  },
  methods: {
    remove(index) {
      this.tableData.splice(index, 1);
    },
    addSms() {
      this.$router.push({
        name: "addSms"
      });
    },
    doCancel() {
      this.$Message.info("Clicked cancel");
    },
    handleRowChange(row) {
      this.selectRow = row;
    },
    getData(data) {
      let that = this;
      var params = new URLSearchParams();
      params.append("pageNum", data.pageNum);
      params.append("pageSize", data.pageSize);
      // axios
      //   .post("/crm/sysconfiglimit/listCustomer", params)
      //   .then(function(res) {
      //     that.tableData = res.data.response.list;
      //     that.page.pageNum = res.data.response.pageNum;
      //     that.page.pageSize = res.data.response.pageSize;
      //     that.page.total = res.data.response.total;
      //     that.page.pages = res.data.response.pages;
      //   });
      this.spinShow=true
      listCustomer(params).then(res => {
        that.spinShow=false;
        that.tableData = res.response.list;
        that.page.pageNum = res.response.pageNum;
        that.page.pageSize = res.response.pageSize;
        that.page.total = res.response.total;
        that.page.pages = res.response.pages;
      });
    },
    getpages(data) {
      let that = this;
      this.page.pageNum = data;
      this.getData(this.page);
    },
    getPageSize(pageSize) {
      let that = this;
      this.page.pageSize = pageSize;
      this.getData(this.page);
    },
    search() {
      this.getData(this.page);
    },
    addClick() {
      // 打开新增弹窗

      this.showAddModal = true;
    },
    hideAddModal() {
      // 隐藏新增弹窗
      this.showAddModal = false;
    },
    updateCustomerConfig(data) {
      // 打开修改弹窗
      this.showEditModal = true;
      this.editData = data.row;
      this.$refs.editModal.setForm(this.editData);
    },
    hideEditModal() {
      // 隐藏修改弹窗
      this.showEditModal = false;
      //this.query()
    },
    onOrOffConfig(id, type) {
      let that = this;
      var contentInfo =
        type == 0 ? "确定要激活该客户数配置吗?" : "确定要禁用该客户数配置吗?";
      this.$Modal.confirm({
        title: "提示",
        content: contentInfo,
        onOk: () => {
          var params = new URLSearchParams();
          params.append("id", id);
          if (type == 0) {
            // axios
            //   .post("/crm/sysconfiglimit/activateeCustomerLimit", params)
            //   .then(function(res) {
            //     if (res.data.status == 200) {
            //       that.$Message.info({
            //         content: "激活成功",
            //         duration: 3
            //       });
            //       that.search();
            //     } else {
            //       that.$Message.warning(res.data.message);
            //     }
            //   });
            activateeCustomerLimit(params).then(res => {
              that.$Message.info({
                content: "激活成功",
                duration: 3
              });
              that.search();
            });
          }
          if (type == 1) {
            // axios
            //   .post("/crm/sysconfiglimit/forbiddeneCustomerLimit", params)
            //   .then(function(res) {
            //     if (res.data.status == 200) {
            //       that.$Message.info({
            //         content: "禁用成功",
            //         duration: 3
            //       });
            //       that.search();
            //     } else {
            //       that.$Message.warning(res.data.message);
            //     }
            //   });
            forbiddeneCustomerLimit(params).then(res => {
              that.$Message.info({
                content: "禁用成功",
                duration: 3
              });
              that.search();
            });
          }
        },
        onCancel: () => {
          // this.$Message.info("取消操作");
        }
      });
    }
  }
};
</script>
