<style lang="less" scoped>
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;模板管理
      </Row>
    </Col>
    <tab-header :tab-index="2"></tab-header>
    <Col span="24" class-name="search-form">
      <Form ref="formItem" :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="模板类型:">
              <Input v-model="formItem.type" class="search-input" placeholder="请输入短信类型"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="模板内容:">
              <Input v-model="formItem.content" class="search-input" placeholder="请输入模板内容"></Input>
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
          <Button type="primary" class="search-btn" @click="addTemplet">新增模板</Button>
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
  </Row>
</template>
<script>
import TabHeader from "./tabHeader.vue";
import OilPage from "../../components/page/page";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formData, formatStamp, formatTime } from '../../../assets/js/common.js';
import {
  getUsersmstemplateListPage,
  getUsersmsgatewayEnum,
  getUsersmstemplateListStatus,
  getUsersmstemplateDelete
} from "../../components/axios/crm.js";
export default {
  name: "templet",
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      formItem: {
        type: '',
        content: ''
      },
      gatewayEnum: [],
      tableData: [],
      columns: [
        {
          key: "name",
          title: "模板类型",
          minWidth: 80
        },
        {
          key: "content",
          title: "模板内容",
          minWidth: 400
        },
        {
          key: "gateway",
          title: "短信通道",
          minWidth: 120,
          render: (h, data) => {
            return h("span", this.getNameNume(data.row.gateway));
          }
        },
        {
          key: "createTime",
          title: "创建时间",
          minWidth: 120,
          render: (h, data) => {
            return h("span", {}, timeStampChange.format(data.row.createTime));
          }
        },
        {
          key: "status",
          title: "状态",
          minWidth: 80,
          render: (h, data) => {
            let status = "";
            if (data.row.status === 0) {
              status = "禁用";
            } else {
              status = "启用";
            }
            return h("span", {}, status);
          }
        },
         {
          key: "type",
          title: "模板属性",
          minWidth: 80,
          render: (h, data) => {
            let typeTwo = "私有";
            if(data.row.type == 1)
            {
              typeTwo = "公共";
            }
            return h("span", {}, typeTwo);
          }
        },
        {
          title: "操作",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#0f51bf",
                    cursor: "pointer",
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.editData(data);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#0f51bf",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.isStatus(data);
                    }
                  }
                },
                `${data.row.status === 1 ? "禁用" : "启用"}`
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    TabHeader,
    OilPage
  },
  methods: {
    addTemplet() {
      this.$router.push({
        name: "addTemplet",
        query: {
          addOrEdit: 1
        }
      });
    },
    // 编辑
    editData(data) {
      console.log("data", data)
       let typeTwo = "2";
      if(data.row.type == 1)
      {
        typeTwo = "1";
      }
      this.$router.push({
        name: "addTemplet",
        query: {
          addOrEdit: 2,
          name: data.row.name,
          content: data.row.content,
          gateway: data.row.gateway,
          type: typeTwo,
          id: data.row.id
        }
      });
    },
    isStatus(data) {
      let that = this
      //  this.$Spin.show();
      let status = 0
      let temt = "禁用"
      if (data.row.status === 0) {
        temt = "启用"
        status = 1
      }
      let params = {
        id: data.row.id,
        status: status
      };

      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定" + temt + "吗？</p>",
        onOk: () => {
          getUsersmstemplateDelete(params).then(resp => {
            if (resp.status == 200) {
              this.getlist();
            } else {
              this.$Message.warning(resp.data.message);
              console.log(resp.data.message);
            }
          });
        },
        onCancel: () => {}
      });
    },
      findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getlist();
    },
    getlist() {
      let that = this
      this.$Spin.show()
       let params = {
        name: this.formItem.type || '',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        content: this.formItem.content || '',
        sort: ''
      }
      getUsersmstemplateListPage(formData(params)).then(resp => {
        that.$Spin.hide()
        if (resp.status == 200) {
          let data = resp.response.list;
          that.tableData = data;
          that.total = resp.response.total;
        } else {
          this.$Message.warning(resp.data.message);
          console.log(resp.data.message);
        }
      });
    },
    reset() {
      this.formItem = {}
    },
    // 监听分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page
      }
      if (pageSize) {
        this.pageSize = pageSize
      }
      this.getlist()
    },
    // 获取枚举列表
    getlistEnum() {
      let that = this
      this.$Spin.show()
      getUsersmsgatewayEnum().then(resp => {
        that.$Spin.hide()
        if (resp.status == 200) {
          that.gatewayEnum = resp.response
        }
      });
    },
    // 通过id获取name
    getNameNume(id) {
      let temt = "无"
      for (let i = 0; i < this.gatewayEnum.length; i++) {
        if (this.gatewayEnum[i].value === id) {
          temt = this.gatewayEnum[i].desc
          break
        }
      }
      return temt
    }
  },
  created() {
    this.getlist()
    this.getlistEnum()
  }
};
</script>
