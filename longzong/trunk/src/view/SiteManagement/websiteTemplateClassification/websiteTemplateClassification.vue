<style lang="less" scoped>
  .fx-boxs {
    min-height: 40px;
    width: 84%;
    z-index: 100;
    max-height: 90px;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #f1f1f1;
    margin-bottom: 10px;
    margin-top: -5px;
    margin-left: 140px;
    border-radius: 4px;
  }

  .fx-boxs li {
    padding: 5px 15px;
  }

  .fx-box li:hover {
    background: #c1c1c1;
  }

  .read-table {
    border: 1px solid #bfbfbf;
    width: 100%;
    text-align: center;
    line-height: 50px;
    border-collapse: collapse;
  }

  .read-table td {
    border: 1px solid #bfbfbf;
  }

  .read-table .table-left {
    width: 40%;
    text-align: center; // border-right: 1px solid #BFBFBF;
    background-color: #e9eaef;
  }

  .read-table .table-right {
    width: 60%;
    text-align: left;
    padding-left: 15px;
  }

  .table-info-row a {
    color: #ff6600;
  }

  .leftree {
    line-height: 20px !important;
  }
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：
      <router-link to="/plantIndex" class="link-css">网站管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/websiteTemplateClassification" class="link-css">网站模板分类管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/websiteTemplateClassification" class="link-css">网站模板分类列表</router-link>
    </Row>
    </Col>
    <Col span="24">
    <Row :gutter="20">
      <Col span="4">
      <div class='leftree'>
        <Card :bordered="true">
          <p slot="title">网站分类模板列表</p>
          <div>
            <Tree :data="treeData" @on-select-change='findlist' @on-toggle-expand="findExpand" :load-data="loadTree"></Tree>
          </div>
        </Card>
      </div>
      </Col>
      <Col span="20">
      <Row class-name="table-con">
        <Col span="24">
        <Form :model="params" :label-width="120">
          <Row type="flex" justify="space-between">
            <Col span="7">
            <FormItem label="模板分类名称：">
              <Input v-model="params.name" class="search-input" placeholder="请输入模板分类名称"></Input>
            </FormItem>
            </Col>
            <Col span="7">
            <FormItem label="状态：">
              <Select v-model="params.status" class="search-input" placeholder="全部">
                <Option v-for="item in selectStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="7" class="text-right">
            <Button type="primary" @click="search">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
            </Col>
          </Row>
        </Form>
        </Col>
        <div style="margin-bottom:20px">
          <Button type="primary" @click="addbtn">新增</Button>
        </div>
        <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true">
        </Table>
        <oil-page :total="total" :page-num="params.pageNum" :page-size="params.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
      </Col>
    </Row>
    </Col>

    <!-- 新增弹窗开始 -->
    <Modal v-model="addSiteModal" title="新增网站模板分类">
      <Form ref="addFormValidate" :rules="addruleValidate" :model="addform" :label-width="180">
        <Row>
          <FormItem label="上级网站模板分类：">
            <span>{{changePre ? changePre : '无'}}</span>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="网站模板分类名称：" :label-width="180" prop='typeName'>
            <Input type="text" v-model="addform.typeName" placeholder="请输入名称" />
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <i-button :loading="submitAdd" type="primary" @click="addSiteFun('addFormValidate')">确定</i-button>
        <i-button @click="addSiteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 新增弹窗结束 -->

    <!-- 编辑弹窗开始 -->
    <Modal v-model="editSiteModal" title="修改网站模板分类">
      <Form ref="editFormValidate" :model="editform" :rules="addruleValidate" :label-width="180">
        <Row>
          <FormItem label="上级网站模板分类：">
            <span>{{changePre ? changePre : '无'}}</span>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="网站模板分类名称：" :label-width="180" prop='typeName1'>
            <Input type="text" v-model="editform.typeName1" placeholder="请输入名称" />
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <i-button :loading="submitEdit" type="primary" @click="editSiteFun('editFormValidate') ">确定</i-button>
        <i-button @click="editSiteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 编辑弹窗结束 -->

    <!-- 禁用弹窗开始 -->
    <Modal v-model="disableSiteModal" title="禁用网站模板分类">
      <p>是否确认禁用该条模板分类？</p>
      <div slot="footer">
        <i-button type="primary" @click="disableSiteFun">确定</i-button>
        <i-button @click="disableSiteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 禁用弹窗结束 -->
    <!-- 启用弹窗开始 -->
    <Modal v-model="enableSiteModal" title="启用网站模板分类">
      <p>是否确认启用该条模板分类？</p>
      <div slot="footer">
        <i-button type="primary" @click="enableSiteFun">确定</i-button>
        <i-button @click="enableSiteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 启用弹窗结束 -->
  </Row>
</template>
<script>
  import OilPage from "../../components/page/page.vue";
  import {
    websiteChildrenNodes,
    websiteNodesOpen,
    websitetTemplatetypeList,
    websitetTemplatetypeAdd,
    websitetTemplatetypeEdit,
    websitetTemplatetypeDisable,
    websitetTemplatetypeEnable,
    websitetTemplatetypeAddUnique,
    websitetTemplatetypeEditUnique,
    websiteTypePathByCode
  } from "../../components/axios/website.js";
  import { formatTime2, formData } from "../../../assets/js/common.js";
  import { setTimeout } from 'timers';
  export default {
    name: "websiteTemplateClassification",
    components: {
      OilPage
    },
    watch: {
      editSiteModal(newVal, oldVal) {
        if (newVal == true) {
          this.$refs["editFormValidate"].validate();
        }
      },
      addSiteModal(newVal, oldVal) {
        if (newVal == true) {
          this.$refs["addFormValidate"].resetFields();
        }
      }
    },
    data() {
      const validateadd = (rule, value, callback) => {
        let parentCode = 0;
        if (this.treeArr) {
          parentCode = this.treeArr.code;
        }
        let params = {
          parentCode: parentCode,
          name: this.addform.typeName
        };
        if (this.addform.typeName == "") {
          callback(new Error("请输入模板分类名称"));
        }
        websitetTemplatetypeAddUnique(formData(params)).then(res => {
          console.log("res", res);
          if (res.response) {
            callback();
          } else {
            callback(new Error("模板分类名称重复"));
          }
        });
      };
      const validateedit = (rule, value, callback) => {
        let params = {
          name: this.editform.typeName1,
          code: this.editCode,
          id: this.typeCode1
        };
        if (this.editform.typeName1 == "") {
          callback(new Error("请输入模板分类名称"));
        }
        websitetTemplatetypeEditUnique(formData(params)).then(res => {
          console.log("res", res);
          if (res.response) {
            callback();
          } else {
            callback(new Error("模板分类名称重复"));
          }
        });
      };
      return {
        submitAdd: false,
        submitEdit: false,
        showSizer: true,
        changePre: "",
        editCode: "",
        treeCodeNode: "",
        addruleValidate: {
          typeName: [
            { required: true, validator: validateadd, trigger: "blur" },
            {
              type: "string",
              max: 100,
              message: "网站模板分类不能超过100个字符",
              trigger: "blur"
            }
          ],
          typeName1: [
            { required: true, validator: validateedit, trigger: "blur" },
            {
              type: "string",
              max: 100,
              message: "网站模板分类不能超过100个字符",
              trigger: "blur"
            }
          ]
        },
        params: {
          treeId: "",
          treeCode: "",
          expand: "",
          name: "",
          status: "",
          pageNum: 1,
          pageSize: 10
        },
        total: 0,
        pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
        addform: {
          typeName: ""
        },
        editform: {
          typeName1: ""
        },
        templateTypeId: "",
        selectStatus: [
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
        addSiteModal: false,
        editSiteModal: false,
        disableSiteModal: false,
        enableSiteModal: false,
        tableData: [],
        treeData: [],
        columns: [
          {
            title: "网站模板分类编码",
            key: "code",
            align: "center",
            minWidth: 150
          },
          {
            title: "网站模板分类名称",
            key: "name",
            align: "center",
            minWidth: 300
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            minWidth: 50,
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
            minWidth: 100,
            render: (h, params) => {
              let operate = {};
              if (params.row.status == 0) {
                operate = h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.templateTypeId = params.row.id;
                        this.disableSiteModal = true;
                      }
                    }
                  },
                  "禁用"
                );
              } else {
                operate = h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.templateTypeId = params.row.id;
                        this.enableSiteModal = true;
                      }
                    }
                  },
                  "启用"
                );
              }
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.editform.typeName1 = params.row.name;
                        this.changePre = params.row.pahtName;
                        this.typeCode1 = params.row.id;
                        this.editCode = params.row.code;
                        this.editSiteModal = true;
                      }
                    }
                  },
                  "编辑"
                ),
                operate
              ]);
            }
          }
        ]
      };
    },
    methods: {
      loadTree(item, callback) {
        let params = {
          parentId: item.value,
          status: -1,
          treeCode: item.code
        };

        websiteChildrenNodes(formData(params)).then(res => {
          let data = res.response.map(item => {
            if (item.isLeaf == 0) {
              return {
                code: item.code,
                value: item.id,
                title: item.name,
                siteId: item.siteId,
                loading: false,
                children: [],
                pathName: item.pathName
              };
            } else {
              return {
                code: item.code,
                value: item.id,
                title: item.name,
                siteId: item.siteId,
                pathName: item.pathName
              };
            }
          });
          callback(data);
        });
      },
      channelTree() {
        let code = this.treeCodeNode == undefined ? "" : this.treeCodeNode;
        let isExpand = this.params.expand == undefined ? "" : this.params.expand;
        let data = {
          code: code,
          isExpand: isExpand,
          status: -1
        };
        websiteNodesOpen(formData(data)).then(res => {
          this.treeData = res.response
        });
      },
      findlist(treeNode) {
        this.treeArr = treeNode[0];
        console.log(this.treeArr);
        this.changePre = this.treeArr.name;
        this.params.expand = this.treeArr.expand;
        this.params.treeCode = this.treeArr.code ? this.treeArr.code : null;
        this.params.treeId = this.treeArr.value ? this.treeArr.value : null;
        this.tableList();
      },
      tableList() {
        websitetTemplatetypeList(this.params).then(res => {
          if (res.response && res.response.list) {
            this.tableData = res.response.list;
            this.total = res.response.total;
          } else {
            this.$Message.error(res.message);
          }
        });
      },
      pageChange(page, size) {
        if (size) {
          this.params.pageNum = 1;
          this.params.pageSize = size;
        } else {
          this.params.pageNum = page;
        }
        this.tableList();
      },
      addbtn() {
        var that = this;
        let code = "";
        if (this.treeArr) {
          code = this.treeArr.code;

          let params = {
            code: code
          };
          websiteTypePathByCode(formData(params)).then(res => {
            if (res.response) {
              that.changePre = res.response.pathName;
            } else {
              this.$Message.error(res.message);
            }
          });
        } else {
          this.changePre = "";
        }
        this.addSiteModal = true;
      },
      addSiteFun(name) {
        let that = this;
        let code = "";
        if (this.treeArr) {
          code = this.treeArr.code;
        }
        this.submitAdd = true;
        this.$refs[name].validate(valid => {
          if (valid) {
            websitetTemplatetypeAdd({
              status: 0,
              name: that.addform.typeName,
              code: code
            }).then(res => {
              this.addSiteModal = false;
              if (res.status == 200) {
                that.$Message.success("添加成功！");
                that.treeCodeNode = res.response.code;
                that.channelTree();
                that.tableList();
              } else {
                this.$Message.error(res.message);
              }
              setTimeout(() => {
                this.submitAdd = false;
              }, 1000)
            });
          } else {
            this.submitAdd = false;
          }
        });
      },
      editSiteFun(name) {
        this.submitEdit = true;
        let that = this;
        this.$refs[name].validate(valid => {
          if (valid) {
            websitetTemplatetypeEdit({
              name: this.editform.typeName1,
              id: this.typeCode1
            }).then(res => {
              this.editSiteModal = false;
              if (res.status == 200) {
                this.$Message.success("修改成功！");
                that.treeCodeNode = that.params.treeCode;
                this.submitEdit = false;
                this.channelTree();
                this.tableList();
              } else {
                this.$Message.error(res.message);
              }
              setTimeout(() => {
                this.submitEdit = false;
              }, 1000)
            });

          } else {
            this.submitEdit = false;
          }
        });
      },
      disableSiteFun() {
        websitetTemplatetypeDisable(
          formData({
            templateTypeId: this.templateTypeId
          })
        ).then(res => {
          this.disableSiteModal = false;
          if (res.status == 200) {
            this.$Message.success("禁用成功！");
            this.tableList();
          } else {
            this.$Message.error(res.message);
          }
        });
      },
      enableSiteFun() {
        websitetTemplatetypeEnable(
          formData({
            templateTypeId: this.templateTypeId
          })
        ).then(res => {
          this.enableSiteModal = false;
          if (res.status == 200) {
            this.$Message.success("启用成功！");
            this.tableList();
          } else {
            this.$Message.error(res.message);
          }
        });
      },
      search() {
        this.params.pageNum = 1;
        this.params.pageSize = 10;
        this.tableList();
      },
      findExpand(treeNode) {
        this.params.expand = treeNode.expand;
      },
      reset() {
        this.params = {
          name: "",
          status: "",
          treeCode: this.params.treeCode,
          treeId: this.params.treeId,
          pageNum: 1,
          pageSize: 10
        };
      }
    },
    mounted() {
      this.channelTree();
      this.tableList();
    }
  };
</script>