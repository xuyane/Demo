<style scoped>
@import "./informationsort.less";

</style>

<template>
  <Row class='informationsortbox'>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置:基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;信息分类管理&nbsp;&nbsp;>>&nbsp;&nbsp;信息分类列表
      </Row>
    </i-col>
    <Col span='24'>
    <Row :gutter="20">
      <Col span='4'>
      <div class="leftree">
        <p>信息分类列表</p>
      </div>
      <Card :bordered="false">
        <div>
          <Tree :data="treeData" :load-data="findSon" @on-select-change='findlist'></Tree>
        </div>
      </Card>
      </Col>
      <Col span='20'>
      <Card style="margin-bottom:20px">
        <div>
          <Form ref="formCustom" :model="formCustom" class="search-form" :label-width="120">
            <Row>
              <Col span='8'>
              <FormItem label="信息分类编码:" prop="msgname">
                <Input type="text" class="search-input" v-model="formCustom.code"></Input>
              </FormItem>
              </Col>
              <Col span='8'>
              <FormItem label="信息分类名称:" prop="msgname">
                <Input type="text" class="search-input" v-model="formCustom.name"></Input>
              </FormItem>
              </Col>
              <Col span='8'>
              <FormItem label="状态:">
                <Select v-model="formCustom.statusSelect" class="search-input">
                  <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.desc}}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span='8' offset="16" class="formbtn">
              <FormItem>
                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                <Button @click="handleReset" style="margin-left: 8px">重置</Button>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
      <Card class="tablewrap">
        <Row class="btn-container">
          <Col span="24">
          <Button type="primary" class="search-btn" @click="addInfomationList">新增</Button>
          <Button type="primary" class="search-btn" @click="importData">导入数据</Button>
          <Button type="primary" class="search-btn" @click="exportTemplate">导出模板</Button>
          </Col>
        </Row>
        <Row>
          <Table class="tableCommon" border :columns="columns" :data="dataTable"></Table>
          <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>
        </Row>
      </Card>
      </Col>
    </Row>

    </Col>
    <Modal v-model="showAddModal" title="新增信息分类" width="600" @on-cancel="cancelAddModal">
      <Form ref="addFormValidate" :model="addform" :rules="addRule" :label-width="120">
        <FormItem label="上级信息分类：">
          <span>{{informationTypeRoadName}}</span>
        </FormItem>
        <FormItem label="信息分类名称：" prop='addName'>
          <Input v-model="addform.addName" @on-change="changeAddData"></Input>
        </FormItem>
        <FormItem label="全拼:" prop='qp'>
          <Input v-model="addform.qp"></Input>
        </FormItem>
        <FormItem label="简拼:" prop='jp'>
          <Input v-model="addform.jp"></Input>
        </FormItem>
        <FormItem label="英文名:" prop='nameEn'>
          <Input v-model="addform.nameEn"></Input>
        </FormItem>
        <FormItem label="日文名:" prop='nameJn'>
          <Input v-model="addform.nameJn"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button :loading="loading1" class="search-btn" type="primary" @click="confirmAddModal('addform')">确定</i-button>
        <i-button class="search-btn" @click="cancelAddModal">取消</i-button>
      </div>
    </Modal>
    <Modal v-model="showEditModal" title="修改信息分类" width="560" @on-cancel="cancelEditModal">
      <Form ref="editFormValidate" :model="editform" :rules="editRule" :label-width="120">
        <FormItem label="上级信息分类：">
          <span>{{informationTypeParentRoadName}}</span>
        </FormItem>
        <FormItem label="信息分类名称：" prop='editName'>
          <Input v-model="editform.editName" @on-change="changeEditData"></Input>
        </FormItem>
        <FormItem label="全拼:" prop='qp'>
          <Input v-model="editform.qp"></Input>
        </FormItem>
        <FormItem label="简拼:" prop='jp'>
          <Input v-model="editform.jp"></Input>
        </FormItem>
        <FormItem label="英文名:" prop='nameEn'>
          <Input v-model="editform.nameEn"></Input>
        </FormItem>
        <FormItem label="日文名:" prop='nameJn'>
          <Input v-model="editform.nameJn"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button :loading="loading2" class="search-btn" type="primary" @click="confirmEditModal('editform')">确定</i-button>
        <i-button class="search-btn" @click="cancelEditModal">取消</i-button>
      </div>
    </Modal>
    <Modal v-model="showCheckModal" title="查看信息分类" width="560">
      <Form ref="checkModal" :model="form" :label-width="200">
        <FormItem label="信息分类编码:">
          <span>{{form.code}}</span>
        </FormItem>
        <FormItem label="信息分类路径:">
          <span>{{form.informationTypeRoadName}}</span>
        </FormItem>
        <FormItem label="全拼:" prop='qp'>
          <span>{{form.qp}}</span>
        </FormItem>
        <FormItem label="简拼:" prop='jp'>
          <span>{{form.jp}}</span>
        </FormItem>
        <FormItem label="英文名:" prop='nameEn'>
          <span>{{form.nameEn}}</span>
        </FormItem>
        <FormItem label="日文名:" prop='nameJn'>
          <span>{{form.nameJn}}</span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button class="search-btn" type="primary" size="large" long @click="voidShowCheckModal">返回</Button>
      </div>
    </Modal>
    <!-- 导入数据弹窗 -->
    <Modal v-model="showMoreImportModal" title="导入数据" width="690">
      <Row type="flex" justify="space-between">
        <Col span="24" class="mar-top-20 ">
        <div class="file-box" style="text-align:center">
          <!-- <span class="mar-left-36">附件：</span> -->
          <input type='text' name='textfield' id='textfield' class='txt' style="display:none" v-model="values1" />
          <input type='button' class='btn' value="上传文件:" />
          <input type="file" name="fileField" class="file" id="headExcel" @change="beforeUpload($event)" size="28" />
        </div>
        </Col>
      </Row>
      <div slot="footer">
        <Button :loading="loading3" class="search-btn" type="primary" @click="fileImport">导入</Button>
        <Button class="search-btn" style="margin-left:8px;" @click="importCancel">返回</Button>
      </div>
    </Modal>
    <on-or-off :msgContent="msgContent" :cid="cid" :cType="cType" :enableUrl="enableUrl" :disableUrl="disableUrl" @query="handleSubmit('formCustom')" @clear="clearData('formCustom')" ref="showIsUseModel"></on-or-off>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import onOrOff from "../components/onOrOff.vue";
import pinyin from "../../../assets/js/Convert_Pinyin.js";
import {
  getInfomationsortRepeat,
  getInfomationsortList,
  getInfomationsortSite,
  getInfomationsortTree,
  getInfomationsortDetail,
  addInfomationsort,
  editInfomationsort,
  importInfomationsort,
  infomationsortRoad,
  statusSelect
} from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "varietymanagement",
  components: {
    oilPage,
    onOrOff
  },
  data() {
    const validatePassAdd = (rule, value, callback) => {
      let params = {
        id: "",
        code:
          this.selectCondition.treeCode === undefined
            ? ""
            : this.selectCondition.treeCode, //this.selectCondition.parentId,
        name: value,
        siteId: this.selectCondition.siteId
      };
      getInfomationsortRepeat(formData(params)).then(res => {
        if (res.response.result) {
          callback();
        } else {
          callback(new Error(res.response.message));
        }
      });
    };
    const validatePassEdit = (rule, value, callback) => {
      let params = {
        code:
          this.selectCondition.treeCode === undefined
            ? ""
            : this.selectCondition.treeCode,
        id: this.tid,
        name: value,
        siteId: this.selectCondition.siteId
      };
      getInfomationsortRepeat(formData(params)).then(res => {
        if (res.response.result) {
          callback();
        } else {
          callback(new Error(res.response.message));
        }
      });
    };
    return {
      treeData: [],
      form: {},
      editform: {},
      addform: {
        addName: ""
      },
      loading1: false,
      loading2: false,
      loading3: false,
      tid: "",
      tcode: "",
      addName: "",
      editName: "",
      industryType: "",
      showAddModal: false,
      showCheckModal: false,
      showEditModal: false,
      showMoreImportModal: false,
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
      cid: 0,
      cType: 0,
      statusList: [],
      informationTypeParentRoadName: "",
      values1: "",
      siteId: null,
      informationTypeRoadName: "",
      formCustom: {
        name: "",
        statusSelect: -1
      },
      editRule: {
        editName: [
          { required: true, message: "请输入信息分类名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "信息分类名称不能超过100个字符",
            trigger: "blur"
          },
          { validator: validatePassEdit, trigger: "blur" }
        ],
        qp: [
          {
            type: "string",
            max: 200,
            message: "全拼名称不能超过200个字符",
            trigger: "blur"
          }
        ],
        jp: [
          {
            type: "string",
            max: 50,
            message: "简拼名称不能超过50个字符",
            trigger: "blur"
          }
        ],
        nameEn: [
          {
            type: "string",
            max: 100,
            message: "英文名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        nameJn: [
          {
            type: "string",
            max: 100,
            message: "日文名称不能超过100个字符",
            trigger: "blur"
          }
        ]
      },
      addRule: {
        addName: [
          { required: true, message: "请输入信息分类名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "信息分类名称不能超过100个字符",
            trigger: "blur"
          },
          { validator: validatePassAdd, trigger: "blur" }
        ],
        qp: [
          {
            type: "string",
            max: 200,
            message: "全拼名称不能超过200个字符",
            trigger: "blur"
          }
        ],
        jp: [
          {
            type: "string",
            max: 50,
            message: "简拼名称不能超过50个字符",
            trigger: "blur"
          }
        ],
        nameEn: [
          {
            type: "string",
            max: 100,
            message: "英文名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        nameJn: [
          {
            type: "string",
            max: 100,
            message: "日文名称不能超过100个字符",
            trigger: "blur"
          }
        ]
      },
      columns: [
        {
          title: "信息分类编码",
          key: "code",
          minWidth: 150,
          align: "center"
        },
        {
          title: "信息分类名称",
          key: "name",
          minWidth: 150,
          align: "center",
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.showInformationDetail(
                      data.row.id,
                      data.row.informationTypeRoadName
                    );
                  }
                },
                style: {
                  // width: "100%",
                  display: "block"
                }
              },
              data.row.name
            );
          }
        },
        {
          title: "路径",
          key: "informationTypeRoadName",
          align: "center",
          minWidth: 300,
          className: "colorblue"
        },
        {
          title: "英文",
          key: "nameEn",
          align: "center",
          minWidth: 100
        },
        {
          title: "日文",
          key: "nameJa",
          align: "center",
          minWidth: 100
        },
        {
          title: "状态",
          align: "center",
          minWidth: 100,
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
          title: "操作",
          align: "center",
          minWidth: 100,
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
                      this.editInformationList(
                        data.row.id,
                        data.row.informationTypeParentRoadName
                      );
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
                      this.onOrOffConfig(data.row.id, data.row.status);
                    }
                  }
                },
                data.row.status == 0 ? "禁用" : "启用"
              )
            ]);
          }
        }
      ],
      dataTable: [],
      treeType: 0,
      selectCondition: {
        treeCode: "",
        treeName: "",
        order: "asc",
        statusSelect: -1,
        pageNum: 1,
        pageSize: 10,
        parentId: "",
        sort: "",
        status: "",
        siteId: 1
      }
    };
  },
  created() {
    this.initTreeData();
    this.initStatus();
    this.getlist(this.selectCondition);
    //this.initTree();
  },
  methods: {
    test() {
      this.$router.push({
        name: "authorityQuery",
        query: { permissionId: data.row.id }
      });
    },
    //初始化状态
    initStatus() {
      var that = this;
      statusSelect().then(res => {
        let obj = {
          value: -1,
          desc: "全部"
        };
        that.statusList.push(obj);
        let list = res.response;
        for (let i = 0; i < list.length; i++) {
          let objList = {};
          objList.value = list[i].value;
          objList.desc = list[i].desc;
          that.statusList.push(objList);
        }
      });
    },
    //点击新增按钮，新增信息分类
    addInfomationList() {
      var siteCode =
        this.selectCondition.siteCode == undefined
          ? ""
          : this.selectCondition.siteCode;
      var siteName =
        this.selectCondition.siteName == undefined
          ? ""
          : this.selectCondition.siteName;
      var code =
        this.selectCondition.treeCode == undefined
          ? ""
          : this.selectCondition.treeCode;
      var name =
        this.selectCondition.treeName == undefined
          ? ""
          : this.selectCondition.treeName;

      var that = this;
      let params = {
        code: code,
        name: name,
        siteCode: siteCode,
        siteName: siteName,
        siteId: this.selectCondition.siteId
      };

      infomationsortRoad(params).then(res => {
        if (res.response) {
          that.informationTypeRoadName = res.response.informationTypeRoadName;
        } else {
          that.$Message.error(resp.message);
          that.showAddModal = false;
        }
      });

      this.showAddModal = true;
    },
    //点击查询按钮
    handleSubmit(name) {
      let that = this;
      that.selectCondition.code = that.formCustom.code;
      that.selectCondition.name = that.formCustom.name;
      that.selectCondition.status = that.formCustom.statusSelect;
      this.selectCondition.pageNum = 1;
      this.selectCondition.pageSize = 10;
      that.pageNum = 1;
      that.pageSize = 10;
      that.getlist(that.selectCondition);
    },
    //重置信息分类列表
    handleReset() {
      this.formCustom.code = "";
      this.formCustom.name = "";
      this.formCustom.statusSelect = -1;
    },
    //编辑时获取值
    editInformationList(id, informationTypeParentRoadName) {
      this.$refs.editFormValidate.resetFields();
      var that = this;
      that.informationTypeParentRoadName = informationTypeParentRoadName;
      let params = {
        id: id
      };
      getInfomationsortDetail(formData(params)).then(res => {
        if (res.status == 200) {
          that.editform = res.response;
          that.editform.editName = res.response.name;
          that.tid = id;
          that.tcode = that.selectCondition.treeCode;
        } else {
          that.$Message.warning(res.message);
        }
      });
      that.showEditModal = true;
    },
    //激活 禁用该企业
    onOrOffConfig(id, type) {
      this.$refs.showIsUseModel.showModal = true;
      if (type == 0) {
        this.msgContent = "是否确认要禁用该信息分类?";
      } else if (type == 1) {
        this.msgContent = "是否确认要启用该信息分类?";
      } else {
        this.msgContent = "类型错误?";
        this.$refs.showIsUseModel.showModal = false;
      }
      this.enableUrl = "/information/informationtype/enable";
      this.disableUrl = "/information/informationtype/disable";
      this.cid = id;
      this.cType = type;
    },
    cancelchange() {
      this.showIsUsermodal = false;
    },

    //获取分页数据
    pageChange(page, pageSize) {
      if (page) {
        this.selectCondition.pageNum = page;
        this.pageNum = page;
      }
      if (pageSize) {
        this.selectCondition.pageSize = pageSize;
        this.pageSize = pageSize;
      }
      this.getlist(this.selectCondition);
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
    append(data) {
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    //获取列表数据
    getlist(selectCondition) {
      var that = this;
      that.selectCondition.pageSize = this.pageSize;
      if (selectCondition.status == "-1") {
        selectCondition.status = "";
      } else {
        selectCondition.status = this.selectCondition.status;
      }
      selectCondition.statusSelect =
        this.formCustom.statusSelect == -1 ? "" : this.formCustom.statusSelect;
      getInfomationsortList(selectCondition).then(res => {
        if (res.response) {
          that.total = res.response.total;
          that.dataTable = res.response.list;
        } else {
          that.dataTable = [];
        }
      });
    },
    //通过点击树的数据获取相应的表格
    findlist(data) {
      this.selectCondition = data[0];
      if (this.selectCondition.code) {
        this.selectCondition.treeCode = this.selectCondition.code;
      }
      if (this.selectCondition.name) {
        this.selectCondition.treeName = this.selectCondition.name;
      }
      delete this.selectCondition["code"];
      delete this.selectCondition["name"];
      this.selectCondition.pageNum = this.pageNum;
      this.selectCondition.pageSize = this.pageSize;
      this.getlist(data[0]);
    },
    initTreeData() {
      var that = this;
      getInfomationsortSite().then(resp => {
        if (resp.status == 200) {
          let resultdata = resp.response;
          for (var i = 0; i < resultdata.length; i++) {
            resultdata[i].title = resp.response[i].siteName;
            resultdata[i].id = resp.response[i].id;
            that.informationTypeRoadName = resp.response[0].siteName;
            if (resultdata[i].isLeaf == 1) {
              that.treeType = 1;
              that.siteId = resultdata[i].siteId;
              resultdata[i].loading = false;
              resultdata[i].children = [];
            } else {
              continue;
            }
          }
          const data = resultdata;
          that.treeData = data;
        } else {
          that.$Message.error(resp.data.message);
        }
      });
    },

    findSon(item, callback) {
      var that = this;
      if (this.treeType == 1) {
        item.id = 0;
      }
      let data = {
        id: item.id,
        isLeaf: 0,
        name: "",
        parentId: item.id,
        siteId: item.siteId
      };
      getInfomationsortTree(data).then(resp => {
        if (resp.status == 200) {
          that.treeType = 0;
          let resultdata = resp.response;
          for (var i = 0; i < resultdata.length; i++) {
            resultdata[i].title = resp.response[i].name;
            resultdata[i].id = resp.response[i].id;
            if (resultdata[i].isLeaf == 1) {
              (resultdata[i].loading = false), (resultdata[i].children = []);
            } else {
              continue;
            }
          }
          const data = resultdata;
          callback(data);
        } else {
          callback([]);
          that.$Message.error(resp.message);
        }
      });
    },
    //查看信息分类详情
    showInformationDetail(id, road) {
      //this.$refs.showData.initData(id);
      this.showCheckModal = true;
      var that = this;
      let params = {
        id: id
      };
      getInfomationsortDetail(formData(params)).then(res => {
        if (res.status == 200) {
          that.form = res.response;
          that.form.informationTypeRoadName = road;
        } else {
          that.$Message.warning(res.message);
        }
      });
    },
    //编辑信息分类
    confirmEditModal(name) {
      var that = this;
      that.editform.name = that.editform.editName;
      that.loading2 = true;
      this.$refs.editFormValidate.validate(valid => {
        if (valid) {
          editInfomationsort(that.editform).then(res => {
            if (res.status == 200) {
              that.$Message.success("修改成功");
              that.showEditModal = false;
              that.loading2 = false;
              that.$refs.editFormValidate.resetFields();
              that.tid = 0;
              that.handleSubmit();
              that.initTreeData();
            } else {
              that.$Message.warning(res.message);
            }
          });
        } else {
          that.loading2 = false;
        }
      });
    },
    //新增信息分类
    confirmAddModal(name) {
      editInfomationsort;
      var that = this;
      that.addform.code = this.selectCondition.treeCode;
      that.addform.name = this.addform.addName;
      that.addform.siteId = this.selectCondition.siteId;
      that.loading1 = true;
      this.$refs.addFormValidate.validate(valid => {
        if (valid) {
          addInfomationsort(that.addform).then(res => {
            if (res.status == 200) {
              that.$Message.success("新增成功");
              that.showAddModal = false;
              that.loading1 = false;
              that.$refs.addFormValidate.resetFields();
              that.handleSubmit();
              that.initTreeData();
            } else {
              that.$Message.warning(res.message);
            }
          });
        } else {
          that.loading1 = false;
        }
      });
    },
    //导入数据
    importData() {
      this.showMoreImportModal = true;
    },
    //点击选择文件
    beforeUpload(event) {
      this.file = event.target.files[0];
      this.values1 = this.file.name;
      const extension = this.file.name.split(".")[1] === "xls";
      const extension2 = this.file.name.split(".")[1] === "xlsx";
      if (!extension && !extension2) {
        this.$Message.warning("上传模板只能是 xls、xlsx格式!");
        return;
      }
      this.fileName = this.file.name;
      return false; // 返回false不会自动上传
    },
    //导入文件
    fileImport() {
      let form = document.getElementById("headExcel");
      let file = form.files[0];
      if (file == null) {
        return;
      }
      let fileFormData = new FormData();
      fileFormData.append("file", file);
      this.loading3 = true;
      axios({
        url: "/information/informationtype/import",
        method: "post",
        data: fileFormData
      })
        .then(resp => {
          if (resp.data.status == "200") {
            this.$Message.success("导入成功");
            //this.showMoreImportModal = false;
            this.loading3 = false;
            this.importCancel();
            this.getlist(this.selectCondition);
            this.initTreeData();
          } else {
            this.$Message.success(resp.data.message);
            this.loading3 = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.loading3 = false;
          this.$Spin.hide();
        });
    },
    importCancel() {
      this.showMoreImportModal = false;
      let fileTag = document.getElementById("headExcel");
      fileTag.value = "";
    },
    //导出模板
    exportTemplate() {
      //window.open("/information/informationtype/export");
      window.location.href = "/information/informationtype/export";
    },
    //获取状态从子组件传过来的值
    statusFunction(status) {
      this.form.status = status;
    },
    //转换全拼和简拼
    changeAddData() {
      this.addform.qp = pinyin.getFullChars(this.addform.addName);
      this.addform.jp = pinyin.getCamelChars(this.addform.addName);
    },

    //转换全拼和简拼
    changeEditData() {
      this.editform.qp = pinyin.getFullChars(this.editform.editName);
      this.editform.jp = pinyin.getCamelChars(this.editform.editName);
    }
  },
  watch: {
    addName() {},
    editName() {
      this.editform.qp = pinyin.getFullChars(this.editName);
      this.editform.jp = pinyin.getCamelChars(this.editName);
    }
  }
};
</script>
