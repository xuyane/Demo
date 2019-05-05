<style lang="less" scoped>
@import "./TemplateFile.less";
</style>

<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
         <router-link to="/TemplateFile" class="link-css"> 模板分类管理 </router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp; 
         <router-link to="/TemplateFile" class="link-css">  模板分类列表 </router-link>
      </Row>
    </i-col>
    <Col span='24'>
    <Col span='4'>
    <div class="leftree">
      <p>模板分类列表</p>
    </div>
    <Card :bordered="false">
      <div class="demo-spin-article">
        <Tree
          :data="treeData"
          :load-data="findSon"
          @on-select-change='findlist'
          empty-text=""
        ></Tree>
        <Spin
          size="large"
          fix
          v-if="spinShow"
        ></Spin>
      </div>
    </Card>
    </Col>
    <Col span='20'>
    <Card style="margin-bottom:20px">
      <div>
        <Form
          ref="formCustom"
          :model="formCustom"
          :label-width="100"
        >
          <Row
            type="flex"
            justify="space-between"
          >
            <Col span='7'>
            <FormItem label="模板分类编码:">
              <Input
                type="text"
                v-model="formCustom.code"
                placeholder="请输入模板分类编码"
              ></Input>
            </FormItem>
            </Col>
            <Col span='7'>
            <FormItem label="模板分类名称:">
              <Input
                type="text"
                v-model="formCustom.name"
                placeholder="请输入模板分类名称"
              ></Input>
            </FormItem>
            </Col>
            <Col span='7'>
            <FormItem label="状态:">
              <Select v-model="formCustom.status">
                <Option
                  v-for="item in stautsList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row
            type="flex"
            justify="space-between"
          >
            <Col span="7">
            </Col>
            <Col
              span="7"
              class="text-right"
            >
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formCustom')"
              >查询</Button>
              <Button
                @click="handleReset"
                style="margin-left: 8px"
              >重置</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
    <Card class="tablewrap">
      <Row class="btn-container">
        <Col span="24">
        <Button
          type="primary"
          class="search-btn"
          @click="addInfomationList"
        >新增模板分类</Button>
        </Col>
      </Row>
      <Row>
        <Table
          class="tableCommon"
          border
          :columns="columns"
          :data="dataTable"
        ></Table>
        <oil-page
          :total="total"
          :page-num="pageNum"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
          class="pagebox"
        ></oil-page>
      </Row>
    </Card>
    </Col>

    </Col>

    <Modal
      v-model="showAddModal"
      title="新增模板分类"
      width="600"
      @on-cancel="cancelAddModal"
    >
      <Form
        ref="addFormValidate"
        :rules="addruleValidate"
        :model="addform"
        :label-width="120"
      >
        <FormItem label="上级模板分类：">
          <span>{{informationTypeRoadName}}</span>
        </FormItem>
        <FormItem
          label="模板信息分类："
          prop='addName'
        >
          <Input v-model="addform.addName"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button
          :loading="loading1"
          class="search-btn"
          type="primary"
          @click="confirmAddModal('addFormValidate')"
        >确定</i-button>
        <i-button
          class="search-btn"
          @click="cancelAddModal"
        >取消</i-button>
      </div>
    </Modal>
    <Modal
      v-model="showEditModal"
      title="修改模板分类"
      width="560"
      @on-cancel="cancelEditModal"
    >
      <Form
        ref="editFormValidate"
        :model="editform"
        :rules="addruleValidate"
        :label-width="120"
      >
        <FormItem label="上级模板分类：">
          <span>{{editInformationTypeRoadName}}</span>
        </FormItem>
        <FormItem
          label="模板信息分类："
          prop='editName'
        >
          <Input v-model="editform.editName"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button
          :loading="loading2"
          class="search-btn"
          type="primary"
          @click="confirmEditModal('editFormValidate')"
        >确定</i-button>
        <i-button
          class="search-btn"
          @click="cancelEditModal"
        >取消</i-button>
      </div>
    </Modal>

  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../../components/page/page.vue";
import {
  TemplateList,
  TemplateListPath,
  childrenNodes,
  openNodes,
  addCheckUniqueness,
  addformOne,
  editPage,
  editCheckUniqueness,
  editOne,
  qiyongTypeOne,
  jingyongTypeOne,
  enterpeiseType
} from "../api/unitManageMent.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  components: {
    oilPage
  },
  data() {
    const validateadd = (rule, value, callback) => {
      let params = {
        name: this.addform.addName,
        parentCode: this.addform.addCode
      };
      if (this.addform.addName == "") {
        callback(new Error("请输入模板信息分类"));
      }
      addCheckUniqueness(formData(params)).then(res => {
        console.log("res", res);
        if (res.response) {
          callback();
        } else {
          callback(new Error("模板信息分类名称重复"));
        }
      });
    };
    const validateedit = (rule, value, callback) => {
      let params = {
        code: this.editform.code,
        id: this.editform.id,
        name: this.editform.editName
      };
      if (this.editform.editName == "") {
        callback(new Error("请输入模板信息分类"));
      }
      editCheckUniqueness(formData(params)).then(res => {
        console.log("res", res);
        if (res.response) {
          callback();
        } else {
          callback(new Error("模板信息分类名称重复"));
        }
      });
    };
    return {
      addruleValidate: {
        addName: [
          { required: true, validator: validateadd, trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "模板信息分类不能超过100个字符",
            trigger: "blur"
          }
        ],
        editName: [
          { required: true, validator: validateedit, trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "模板信息分类不能超过100个字符",
            trigger: "blur"
          }
        ]
      },
      restAdd: true,
      restEdit: true,
      spinShow: true,
      findSonData: "",
      treeData: [],
      code: "",
      form: {},
      editform: {
        editName: "",
        id: "",
        code: ""
      },
      addform: {
        addName: "",
        addCode: "0"
      },
      loading1: false,
      loading2: false,
      tid: "",
      tcode: "",
      addName: "",
      industryType: "",
      showAddModal: false,
      showCheckModal: false,
      showEditModal: false,
      showMoreImportModal: false,
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      total: 0,
      pageNum: 1,
      //禁用启用需要的参数
      showIsUsermodal: false,
      disableUrl: "",
      enableUrl: "",
      msgContent: "",
      cid: 0,
      cType: 0,
      stautsList: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 1,
          label: "禁用"
        },
        {
          value: 0,
          label: "启用"
        }
      ],
      values1: "",
      siteId: 1,
      informationTypeRoadName: "无",
      editInformationTypeRoadName: "无",
      formCustom: {
        name: "",
        code: "",
        status: -1,
        treeCode: ""
      },
      columns: [
        {
          title: "模板分类编码",
          key: "code",
          align: "center"
        },
        {
          title: "模板分类路径",
          key: "pathName",
          align: "center"
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          render: (h, data) => {
            let label =
              data.row.status === 0
                ? "正常"
                : data.row.status === 1 ? "禁用" : "";
            let color =
              data.row.status === 0
                ? "#9ecd3f"
                : data.row.status === 1 ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
        },
        {
          title: "创建人",
          key: "creatorName",
          align: "center",
          className: "colorblue"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          className: "colorblue"
        },
        {
          title: "操作",
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "blue",
                    textDecoration: "underline",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.editInformationList(data.row.id);
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
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      if (data.row.status == 0) {
                        // this.
                        this.jingyongType(data);
                      }
                      if (data.row.status == 1) {
                        // this.
                        this.qiyongType(data);
                      }
                    }
                  }
                },
                data.row.status == 0 ? "禁用" : "启用"
              )
            ]);
          }
        }
      ],
      dataTable: []
    };
  },
  created() {
    this.getlist();
    this.initTree();
  },
  methods: {
    // 加载树
    // Tree initTree
    initTree() {
      let that = this;
      // var params = {
      //   parentId:'',
      //   status:-1
      // }
      let code = this.code == undefined ? "" : this.code;
      let data = {
        code: code,
        status: -1
      };
      openNodes(formData(data)).then(res => {
        that.spinShow = false;
        that.treeData = res.response;
        // console.log(res);
        // let resultdata = res.response;
        // for (var i = 0; i < resultdata.length; i++) {
        //   resultdata[i].title = res.response[i].name;
        //   resultdata[i].id = res.response[i].id;
        //   if (resultdata[i].isLeaf == 0) {
        //     resultdata[i].loading = false;
        //     resultdata[i].children = [];
        //   }
        // }
        // that.treeData = resultdata;
        // console.log("resultdata", that.treeData);
      });
    },
    // 异步加载
    findSon(item, callback) {
      console.log("parentId", item.id);
      let params = {
        parentId: item.id,
        status: -1
      };
      childrenNodes(formData(params)).then(res => {
        this.spinShow = false;
        console.log(res);
        let resultdata = res.response;
        for (var i = 0; i < resultdata.length; i++) {
          resultdata[i].title = res.response[i].name;
          resultdata[i].id = res.response[i].id;
          if (resultdata[i].isLeaf == 0) {
            resultdata[i].loading = false;
            resultdata[i].children = [];
            resultdata[i].expand = true;
          }
        }
        callback(resultdata);
        console.log("resultdataSon", resultdata);
      });
    },
    //点击新增按钮，新增信息分类
    addInfomationList() {
      this.loading1 = false;
      this.showAddModal = true;
    },
    //点击查询按钮
    handleSubmit() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.getlist();
    },
    //重置信息分类列表
    handleReset() {
      this.formCustom.code = "";
      this.formCustom.name = "";
      this.formCustom.status = -1;
    },
    //编辑时获取值
    editInformationList(id) {
      console.log("id", id);
      let params = {
        informationTemplateTypeId: id
      };
      editPage(formData(params)).then(res => {
        console.log("编辑", res);
        this.editform.editName = res.response.name;
        if (res.response.parentName == "" || res.response.parentName == null) {
          this.editInformationTypeRoadName = "无";
        } else {
          this.editInformationTypeRoadName = res.response.parentName;
        }
        this.editform.id = id;
        this.editform.code = res.response.code;
      });
      this.showEditModal = true;
      this.$refs.editFormValidate.resetFields();
      this.loading2 = false;
    },
    cancelchange() {
      this.showIsUsermodal = false;
    },

    //获取分页数据
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getlist();
    },
    //点击信息分类路径返回按钮
    voidShowCheckModal() {
      this.showCheckModal = false;
    },
    //点击信息分类返回按钮
    cancelAddModal() {
      this.showAddModal = false;
      this.$refs.addFormValidate.resetFields();
      this.loading1 = false;
    },
    //点击修改信息分类返回按钮
    cancelEditModal() {
      this.showEditModal = false;
      this.$refs.editFormValidate.resetFields();
      this.loading2 = false;
    },
    //获取列表数据
    getlist() {
      let params = {
        name: this.formCustom.name,
        code: this.formCustom.code,
        status: this.formCustom.status,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        treeCode: this.formCustom.treeCode
      };
      TemplateListPath(params).then(res => {
        this.$Spin.hide();
         if(res.response === null){
              this.dataTable = [];
              this.total = 0;
          }else{
              this.dataTable = res.response.list;
              this.total = res.response.total;
          }
      });
    },
    //通过点击树的数据获取相应的表格
    findlist(data) {
      console.log("通过点击树的数据获取相应的表格", data);
      // this.formCustom.treeCode = '';
      // this.addform.addCode = '0' ;
      // if(data.length >0 ){
      this.findSonData = data;
      this.formCustom.treeCode = data[0].code;
      this.informationTypeRoadName = data[0].title;
      this.addform.addCode = data[0].code;
      //data[0].selected = !data[0].selected;
      // this
      // }else{
      //    this.informationTypeRoadName =  ""
      // }
      this.getlist();
    },

    //查看信息分类详情
    showInformationDetail(id) {
      //this.$refs.showData.initData(id);
      this.showCheckModal = true;
    },
    //编辑信息分类
    confirmEditModal(name) {
      this.loading2 = true;
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {
            id: this.editform.id,
            name: this.editform.editName
          };
          editOne(formData(params)).then(res => {
            console.log("res111", res);
            this.loading2 = false;
            this.$Message.success("编辑成功");
            this.informationTypeRoadName = this.editform.editName;
            this.editform.editName = "";
            this.showEditModal = false;
            this.code = this.addform.addCode;
            // this.informationTypeRoadName = "无";
            this.getlist();
            this.initTree();
          });
        } else {
          this.restEdit = true;
          this.showEditModal = false;
          this.loading2 = false;
        }
      });
    },
    //新增信息分类
    confirmAddModal(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.restAdd == true) {
            this.restAdd = false;
            this.loading1 = true;
            let params = {
              code: this.addform.addCode,
              name: this.addform.addName
            };
            addformOne(params).then(res => {
              this.loading1 = false;
              this.$Message.success("新增成功");
              this.addform.addName = "";
              this.showAddModal = false;
              this.code = this.addform.addCode;
              this.getlist();
              this.restAdd = true;
              this.initTree();
            });
          }
        } else {
          this.loading1 = false;
          // this.$Message.error('新增!');
          this.restAdd = true;
        }
      });
    },
    getTree(item) {
      let Data = "";
      console.log("item", item);
      if (item) {
        Data = item[0].id;
      } else {
        Data = "";
      }
      let params = {
        parentId: Data,
        status: -1
      };
      childrenNodes(formData(params)).then(res => {
        this.spinShow = false;
        console.log(res);
        let resultdata = res.response;
        let endData = JSON.parse(JSON.stringify(this.treeData));
        for (var i = 0; i < resultdata.length; i++) {
          resultdata[i].title = res.response[i].name;
          resultdata[i].id = res.response[i].id;
          if (resultdata[i].isLeaf == 0) {
            resultdata[i].loading = false;
            resultdata[i].children = [];
            resultdata[i].expand = true;
          }
        }
        let recursiveData = function(data) {
          data.forEach(list => {
            if (list.id === Data) {
              list.children = resultdata;
              return;
            } else {
              if (list.children && list.children.length) {
                recursiveData(list.children);
              }
            }
          });
        };
        if (!Data) {
          // console.log(111111,resultdata)
          endData = resultdata;
        } else {
          // console.log(22222222,endData)
          recursiveData(endData);
        }
        // callback(resultdata);
        this.treeData = endData;
        // console.log(this.treeData);
        // return resultdata;
        console.log("resultdataSon1", resultdata);
      });
    },
    importCancel() {
      this.showMoreImportModal = false;
    },
    // 禁用开始
    jingyongType(data) {
      let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定禁用吗？",
        onOk: () => {
          let form = { informationTemplateTypeId: data.row.id };
          console.log(data);
          jingyongTypeOne(formData(form)).then(res => {
            _this.$Message.success("禁用成功");
            _this.getlist();
          });
        },
        onCancel: () => {}
      };
      this.$Modal.confirm(config);
    },
    // 禁用结束
    qiyongType(data) {
      let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定启用吗？",
        onOk: () => {
          let form = { informationTemplateTypeId: data.row.id };

          qiyongTypeOne(formData(form)).then(res => {
            _this.$Message.success("启用成功");
            _this.getlist();
          });
        },
        onCancel: () => {}
      };
      this.$Modal.confirm(config);
    }
  },
  watch: {}
};
</script>
