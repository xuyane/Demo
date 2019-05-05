<style scoped>
  @import "../../CMS/informationSort/informationsort.less";
</style>

<template>
  <Row class="informationsortbox">
    <i-col span="24">
      <Row class-name="current-position">
        <!-- 网站管理&nbsp;&nbsp;>>&nbsp;&nbsp;网站模板管理&nbsp;&nbsp;>>&nbsp;&nbsp;网站模板列表 -->
        当前位置：
        <router-link to="/plantIndex" class="link-css">网站管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/websiteManagementTemplate" class="link-css">网站模板管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/websiteManagementTemplate" class="link-css">网站模板列表</router-link>
  </Row>
  </i-col>
  <Col span="24">
  <Row :gutter="20">
    <Col span="4">
    <div class="leftree">
      <p>网站模板分类</p>
    </div>
    <Card :bordered="false">
      <div>
        <Tree :data="treeData" @on-select-change="findlist" @on-toggle-expand="findExpand" :load-data="loadTree"></Tree>
      </div>
    </Card>
    </Col>
    <Col span="20">
    <Card style="margin-bottom:20px">
      <div>
        <Form ref="params" :model="params" class="search-form">
          <Row type="flex" justify="space-between">
            <Col span="7">
            <FormItem label="网站模板名称 ： " :label-width="120">
              <Input type="text" class="search-input" v-model="params.templateName" placeholder="请输入网站模板名称" />
            </FormItem>
            </Col>
            <Col span="7">
            <FormItem label="状态 ： " :label-width="120">
              <Select v-model="params.status" placeholder="全部">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="7" class="text-right">
            <Button type="primary" style="margin-right:20px" @click="search1">查询</Button>
            <Button @click="handleReset">重置</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
    <Card class="tablewrap">
      <Row class="btn-container">
        <Col span="24">
        <Button type="primary" class="search-btn" @click="templateAddbtn">新增</Button>
        </Col>
      </Row>
      <Row>
        <Table class="tableCommon" border :columns="columns" :data="dataTable"></Table>
        <oil-page :total="total" :page-num="params.pageNum" :page-size="params.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"></oil-page>
      </Row>
    </Card>
    </Col>
  </Row>
  </Col>

  <on-or-off :msgContent="msgContent" :cid="cid" :cType="cType" :enableUrl="enableUrl" :disableUrl="disableUrl" @query="search1"
    @clear="clearData('formCustom')" ref="showIsUseModel"></on-or-off>
  </Row>
</template>
<script>
  import axios from "axios";
  import oilPage from "../../components/page/page.vue";
  import onOrOff from "../../components/cms/onOrOff.vue";
  import {
    websiteChildrenNodes,
    websiteNodesOpen,
    websiteTemplateList,
    websiteTemplateDisable,
    websiteTemplateEnable
  } from "../../components/axios/website.js";
  import { formatTime2, formData } from "../../../assets/js/common.js";
  import {
    deleteMenu,
    deletePermissionList,
    deleteRoleList,
    deleteWorkBench
  } from "../../components/axios/EAC";
  export default {
    name: "varietymanagement",
    components: {
      oilPage,
      onOrOff
    },
    data() {
      return {
        treeData: [],
        params: {
          templateName: "",
          expand: "",
          status: -1,
          pageNum: 1,
          pageSize: 10
        },
        templateTypeName: "",
        showAddModal: false,
        showCheckModal: false,
        showEditModal: false,
        pageSizeOpts: [10, 20, 50, 100, 200],
        showSizer: true,
        pageSize: 10,
        total: 0,
        pageNum: 1,
        //禁用启用需要的参数
        showIsUsermodal: false,
        disableUrl: "",
        enableUrl: "",
        msgContent: "",
        changePre: "",
        cid: 0,
        cType: 0,
        statusList: [
          {
            value: "-1",
            label: "全部"
          },
          {
            value: "0",
            label: "正常"
          },
          {
            value: "1",
            label: "禁用"
          }
        ],
        informationTypeParentRoadName: "",
        values1: "",
        informationTypeRoadName: "",
        formCustom: {
          name: ""
        },
        columns: [
          {
            title: "网站模板名称",
            key: "templateName",
            align: "center",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "a",
                {
                  attrs: {
                    target: "_blank",
                    href:
                      "https://templates4tpl.oilchem.net/" +
                      params.row.templateFileName +
                      "?debug=1"
                  },
                  style: {
                    color: "blue",
                    textDecoration: "underline"
                  }
                },
                params.row.templateName
              );
            }
          },
          {
            title: "网站模板分类",
            key: "templateTypeName",
            align: "center",
            minWidth: 400
          },
          {
            title: "网站文件名称",
            key: "templateFileName",
            align: "center",
            minWidth: 200
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
              const statusEle = {
                "0": "正常",
                "1": "禁用"
              };
              const result = statusEle[params.row.status]
                ? statusEle[params.row.status]
                : "";
              if (result == "正常") {
                return h(
                  "div",
                  {
                    style: {
                      color: "rgb(158, 205, 63)"
                    }
                  },
                  result
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  result
                );
              }
            }
          },
          {
            title: "创建人",
            key: "creatorName",
            align: "center",
            minWidth: 100
          },
          {
            title: "创建时间",
            key: "createTime",
            align: "center",
            minWidth: 150,
            render: (h, params) => {
              const result = params.row.createTime
                ? formatTime2(params.row.createTime)
                : "";
              return h("div", {}, result);
            }
          },
          {
            title: "操作",
            key: "operation",
            align: "center",
            fixed: "right",
            minWidth: 100,
            render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.onOrOffConfig(params.row.id, params.row.status);
                      }
                    }
                  },
                  params.row.status == 0 ? "禁用" : "启用"
                ),

                h(
                  "a",
                  {
                    style: {
                      marginLeft: "20px"
                    },
                    on: {
                      click: () => {
                        this.editModel(params);
                      }
                    }
                  },
                  "编辑"
                )
              ]);
            }
          }
        ],
        dataTable: [],
        treeType: 0
      };
    },
    mounted() {
      const session = JSON.parse(
        window.sessionStorage.getItem("websiteManagementTemplateList")
      );
      if (session) {
        this.params.templateName = session.templateName;
        this.params.status = session.status;
        this.params.pageNum = session.pageNum;
        this.params.pageSize = session.pageSize;
      }
      this.initTree();
      this.tableList();
    },
    methods: {
      editModel(params) {
        // this.$router.push({
        //   name: "editWebsiteTemplate",
        //   query: {
        //     id: params.row.id
        //   }
        // });
        if (!this.params.expand) {
          this.params.expand = this.$route.query.isExpand;
        }
        this.setHistorySession(() => {
          let { href } = this.$router.resolve({
            path: `/editWebsiteTemplate?id=${params.row.id}&treeCode=${
              this.params.treeCode == undefined ? "" : this.params.treeCode
              }&expand=${this.params.expand == undefined ? "" : this.params.expand}`
          });
          window.open(href, "_blank");
        });
      },
      loadTree(item, callback) {
        let params = {
          parentId: item.value,
          status: 0
        };
        websiteChildrenNodes(formData(params)).then(res => {
          let data = res.response.map(item => {
            if (item.isLeaf == 0) {
              return {
                code: item.code,
                value: item.id,
                title: item.name,
                loading: false,
                children: [],
                pathName: item.pathName
              };
            } else {
              return {
                code: item.code,
                value: item.id,
                title: item.name,
                pathName: item.pathName
              };
            }
          });
          callback(data);
        });
      },
      search1() {
        this.params.pageNum = 1;
        this.params.pageSize = 10;
        this.tableList();
      },

      tableList() {
        if (!this.params.treeCode) {
          this.params.treeCode = this.$route.query.code;
        }
        this.params = {
          templateName:
            this.params.templateName == undefined ? "" : this.params.templateName,
          status: this.params.status == undefined ? -1 : this.params.status,
          treeCode: this.params.treeCode,
          expand: this.params.expand,
          pageNum: this.params.pageNum,
          pageSize: this.params.pageSize
        };
        console.log("params", this.params);
        websiteTemplateList(this.params).then(res => {
          if (res.response && res.response.list) {
            this.dataTable = res.response.list;
            this.total = res.response.total;
          } else {
            this.$Message.error(res.message);
          }
          if (window.sessionStorage.getItem("websiteManagementTemplateList")) {
            //          console.log('clear');
            window.sessionStorage.removeItem("websiteManagementTemplateList");
          }
        });
      },

      //新增网站模板
      templateAddbtn() {
        let that = this;
        let expand = this.params.expand;
        if (expand === "") {
          expand = this.$route.query.isExpand;
        }
        // this.addSiteModal = true;
        if (this.params.treeCode) {
          this.setHistorySession(() => {
            this.$router.push({
              name: "addWebsiteTemplate",
              query: {
                treeCode: that.params.treeCode,
                expand: expand
              }
            });
          });
        } else {
          this.$Message.warning("请选择网站模板分类");
        }
      },

      //重置信息分类列表
      handleReset() {
        this.params = {
          treeId: this.params.treeId,
          treeCode: this.params.treeCode,
          templateName: "",
          status: -1,
          pageNum: 1,
          pageSize: 10
        };
      },

      //激活 禁用该企业
      onOrOffConfig(id, type) {
        this.$refs.showIsUseModel.showModal = true;
        if (type == 0) {
          this.msgContent = "是否确认要禁用该网站模板?";
        } else if (type == 1) {
          this.msgContent = "是否确认要启用该网站模板?";
        } else {
          this.msgContent = "类型错误?";
          this.$refs.showIsUseModel.showModal = false;
        }
        this.enableUrl = "/website/template/enable";
        this.disableUrl = "/website/template/disable";
        this.cid = id;
        this.cType = type;
      },
      cancelchange() {
        this.showIsUsermodal = false;
      },

      //获取分页数据
      pageChange(page, pageSize) {
        if (page) {
          //this.selectCondition.pageNum = page;
          this.params.pageNum = page;
        }
        if (pageSize) {
          //this.selectCondition.pageSize = pageSize;
          this.params.pageSize = pageSize;
        }
        this.tableList();
      },
      append(data) {
        const children = data.children || [];
        children.push({
          title: "appended node",
          expand: true
        });
        this.$set(data, "children", children);
      },

      //初始化树的数据
      initTree() {
        let code =
          this.$route.query.code == undefined ? "" : this.$route.query.code;
        let isExpand =
          this.$route.query.isExpand == undefined
            ? ""
            : this.$route.query.isExpand;
        let data = {
          code: code,
          isExpand: isExpand,
          status: 0
        };
        websiteNodesOpen(formData(data)).then(res => {
          this.treeData = res.response;
        });
      },
      //通过点击树的数据获取相应的表格
      findlist(treeNode) {
        this.treeArr = treeNode[0];
        if (this.treeArr) {
          this.changePre = this.treeArr.pathName;
          this.templateTypeName = this.treeArr.title;
          this.params.expand = this.treeArr.expand ? treeNode[0].expand : null;
          this.params.treeCode = this.treeArr.code ? treeNode[0].code : null;
          this.params.treeId = this.treeArr.value ? treeNode[0].value : null;
        }
        this.search1();
      },
      findExpand(treeNode) {
        this.params.expand = treeNode.expand;
      },
      setHistorySession(cb) {
        const websiteManagementTemplateList = { ...this.params };
        window.sessionStorage.setItem(
          "websiteManagementTemplateList",
          JSON.stringify(websiteManagementTemplateList)
        );
        if (cb) cb();
      }
    }
  };
</script>