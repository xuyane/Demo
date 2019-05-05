<style lang="less" scoped>
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp;合同模板
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form ref="formItem" :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="模板名称:">
              <Input clearable v-model="formItem.name" class="search-input" placeholder="请输入模板名称"></Input>
            </FormItem>
          </Col>
          <Col span="7">
           <FormItem label="产品分类:">
              <Cascader
                v-model="formItem.proclass"
                :data="productClass"
                trigger="hover"
                change-on-select
                class="search-input"
                @on-change='getproductClass'>
              </Cascader>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <FormItem>
              <Button type="primary" @click="getListPage">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="addnewTemplet">新增模板</Button>
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
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>
<script>
import {
  // getUserproductListProductTreeVO,
  getAllProductTreeVO,
  getContractTempletList,
  deleteContractTemplet,
  disabledContractTemplet,
  enableContractTemplet,
  getContractTempletInfo
} from "../../../components/axios/crm.js";
import { formData } from "../../../../assets/js/common.js";
import OilPage from "../../../components/page/page.vue";
export default {
  data() {
    return {
      spinShow:false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      formItem: {
        name: ""
      },
      productClass: [],
      tableData: [],
      columns: [
        {
          key: "name",
          title: "模板名称",
          minWidth: 160
        },
        {
          key: "productCategoryName",
          title: "产品分类",
          minWidth: 160
        },
        {
          key: "type",
          title: "是否英文模板",
          minWidth: 160,
          render: (h, data) => {
            return h("div", data.row.type === 1 ? "是" : "否");
          }
        },
        {
          key: "status",
          title: "状态",
          minWidth: 160,
          render: (h, data) => {
            return h("span", data.row.status === 1 ? "可用" : "不可用");
          }
        },
        {
          title: "操作",
          minWidth: 160,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.detail(data.row.id);
                    }
                  }
                },
                "详情"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      // this.edit(data.row.id);
                      this.$router.push({ name: "editContractTemplet",query: {id:data.row.id}});
                    }
                  }
                },
                "修改"
              ),
              h(
                "span",
                {
                  style: {
                    color:data.row.status === 1 ?"red":"#9ecd3f",
                    cursor: "pointer",
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.changeStatus(data.row);
                    }
                  }
                },
                data.row.status === 1 ? "禁用" : "启用"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.delete(data.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    OilPage
  },
  created() {
    this.getListPage();
    this.getUserproductListProductCategory();
  },
  methods: {
    getListPage() {
      let parmas = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        name: this.formItem.name || "",
        productCategoryCode: this.formItem.productCategoryCode || ""
      };
      parmas.time= new Date().getTime()
      this.spinShow=true;
      let that=this;
      getContractTempletList(parmas).then(res => {
        that.spinShow=false;
        this.tableData = res.response.list;
        this.total = res.response.total;
      });
    },
    // 启用/禁用
    changeStatus(data) {
      let that=this;
      this.$Modal.confirm({
        title: "提示信息",
        content:
          "确定" +
          (data.status === 1 ? "禁用" : "启用") +
          `【${data.name}】吗？`,
        onOk: () => {
          this.spinShow=true;
          if (data.status === 1) {
            disabledContractTemplet(data.id+'?time='+ new Date().getTime()).then(res => {
              that.spinShow=false;
              this.$Message.success("禁用成功");
              this.getListPage();
            });
          } else {
            enableContractTemplet(data.id+'?time='+ new Date().getTime()).then(res => {
              that.spinShow=false;
              this.$Message.success("启用成功");
              this.getListPage();
            });
          }
        },
        onCancel: () => {}
      });
    },
    // 详情
    detail(id) {
      this.$router.push({
        name: "templetDetail",
        query: {
          id
        }
      });
    },
    // 删除
    delete(data) {
      let that=this;
      this.$Modal.confirm({
        title: "提示信息",
        content: `确定删除【${data.name}】吗？`,
        onOk: () => {
          this.spinShow=true;;
          let params = "ids[]=" + data.id;
          deleteContractTemplet(params).then(res => {
            that.spinShow=false;
            this.$Message.success("删除成功");
            this.getListPage();
          });
        },
        onCancel: () => {}
      });
    },
    // 修改
    edit(id) {
      this.$router.push({
        name: "editContractTemplet",
        query: {
          id
        }
      });
    },
    // 重置
    reset() {
      this.formItem.name = "";
      this.formItem.proclass = [];
    },
    // 产品分类
    getUserproductListProductCategory() {
      this.spinShow=true;
      let that=this;
      getAllProductTreeVO().then(res => {
        that.spinShow=false;
        this.productClass = this.breedDigui(res.response);
      });
    },
    breedDigui(a) {
      let dgData = a.map(item => {
        if (item.children.length > 0) {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode,
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode
          };
        }
      });
      return dgData;
    },
    getproductClass(value) {
      console.log(value);
      this.formItem.productCategoryCode = value[value.length - 1];
    },
    addnewTemplet() {
      this.$router.push({
        name: "editContractTemplet"
      });
    },
    // 监听分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getListPage();
    }
  }
};
</script>
