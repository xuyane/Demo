<style lang="less" scoped>
@import "../css/varietyCategoryManagement.less";
</style>

<template>
  <Row class='varietyCategoryManagementBox'>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;品种类别管理 &nbsp;&nbsp;>>&nbsp;&nbsp; 品种类别列表
      </Row>
    </i-col>
    <Col span='24'>
    <Row :gutter="20">
      <Col span='4'>
      <div class='leftree'>
        <p>品种类别列表</p>
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
            <Col>
            <Row>
              <Col span='8'>
              <FormItem label="品种类别编码:">
                <Input type="text" class="search-input" v-model="formCustom.code"></Input>
              </FormItem>
              </Col>
              <Col span='8'>
              <FormItem label="品种类别名称:">
                <Input type="text" class="search-input" v-model="formCustom.name"></Input>
              </FormItem>
              </Col>
              <Col span='8'>
                 <FormItem label="状态:">
          <Select v-model="formCustom.status">
            <Option
              v-for="item in statusList"
              :value="item.value"
              :key="item.value"
            >{{ item.desc }}</Option>
          </Select>
        </FormItem>
              </FormItem>
              </Col>
            </Row>
            </Col>
            <Col>
            <Row type="flex" justify="space-between">
              <Col span="7">
              </Col>
              <Col span="7" class="text-right">
              <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
              <Button @click="handleReset" style="margin-left: 8px">重置</Button>
              </Col>
            </Row>
            </Col>
          </Form>
        </div>
      </Card>
      <Card class="tablewrap">
        <Row :gutter="16" class="btn-container">
          <Col span="4">
          <Button type="primary" class="search-btn" @click="addBreedList">新增品种类别</Button>
          </Col>
        </Row>
        <Row>
          <Table class="tableCommon" border :columns="columns" :data="dataTable"></Table>
          <div class="page-con">
            <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
          </div>
        </Row>
      </Card>
      </Col>
    </Row>
    </Col>
    <Modal v-model="showAddModal" title="新增品种类别" width="600" @on-cancel="cancelAddModal">
      <Form ref="addFormValidate" :model="addform" :rules="addRules" :label-width="120">
        <FormItem label="上级品种类别:">
          {{breedTypeRoadName}}
        </FormItem>
        <FormItem label="品种类别名称:" prop='name'>
          <Input v-model="addform.name"></Input>
        </FormItem>
        <FormItem label="行业类型:" prop='industryTypeId'>
          <associate-Search ref="childAddData" @query-list="industryTypeFunction" :dataUrl="url"></associate-Search>
        </FormItem>
        <FormItem label="英文名:" prop='nameEn'>
          <Input v-model="addform.nameEn"></Input>
        </FormItem>
        <FormItem label="日文名:" prop='nameJa'>
          <Input v-model="addform.nameJa"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="confirmAddModal('addform')" class=".margin-right-30">确定</i-button>
        <i-button @click="cancelAddModal">取消</i-button>
      </div>
    </Modal>
    <Modal v-model="showEditModal" title="修改品种类别" width="560" @on-cancel="cancelEditModal">
      <Form ref="editFormValidate" :model="editform" :rules="editRules" :label-width="120">
        <FormItem label="上级品种类别：">
          <span>{{breedTypeParentRoadName}}</span>
        </FormItem>
        <FormItem label="品种类别编码：">
          <span>{{editform.code}}</span>
        </FormItem>
        <FormItem label="品种类别名称：" prop='name'>
          <Input v-model="editform.name" placeholder="请输入品种类别名称"></Input>
        </FormItem>
        <FormItem label="行业类型:" prop='industryTypeId'>
          <associate-Search @query-list="industryTypeFunction" :dataValue="industryTypeValue" :dataUrl="url" ref="childEditData"></associate-Search>
        </FormItem>
        <FormItem label="英文名:" prop='nameEn'>
          <Input v-model="editform.nameEn"></Input>
        </FormItem>
        <FormItem label="日文名:" prop='nameJa'>
          <Input v-model="editform.nameJa"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="confirmEditModal('editform')">确定</i-button>
        <i-button @click="cancelEditModal">取消</i-button>
      </div>
    </Modal>
    <Modal v-model="showCheckModal" title="查看品种类别" width="560">
      <Form ref="checkModal" :model="form" :label-width="200">
        <FormItem label="品种类别编码:">
          <!-- v-if='form.superior' -->
          <span>{{form.code}}</span>
        </FormItem>
        <FormItem label="品种类别路径:">
          <span>{{form.breedTypeRoadName}}</span>
        </FormItem>
        <FormItem label="行业类型:">
          <span>{{form.industryTypes}}</span>
        </FormItem>
        <FormItem label="英文名:">
          <span>{{form.nameEn}}</span>
        </FormItem>
        <FormItem label="日文名:">
          <span>{{form.nameJa}}</span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="voidShowCheckModal">返回</Button>
      </div>
    </Modal>
    <on-or-off :msgContent="msgContent" :cid="cid" :cType="cType" :enableUrl="enableUrl" :disableUrl="disableUrl" @query="handleSubmit('formCustom')" ref="showIsUseModel"></on-or-off>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import onOrOff from "../../components/cms/onOrOff.vue";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import { getUniqueRepeat } from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "varietymanagement",
  components: {
    oilPage,
    onOrOff,
    associateSearch
  },
  data() {
    const validatePassAdd = (rule, value, callback) => {
      let params = {
        id: "",
        code: this.selectCondition.treeCode,
        name: value
      };
      getUniqueRepeat(formData(params)).then(res => {
        if (res.response.result) {
          callback();
        } else {
          callback(new Error(res.response.message));
        }
      });
    };
    const validatePassEdit = (rule, value, callback) => {
      let params = {
        code: this.selectCondition.treeCode,
        id: this.tid,
        name: value
      };
      getUniqueRepeat(formData(params)).then(res => {
        if (res.response.result) {
          callback();
        } else {
          callback(new Error(res.response.message));
        }
      });
    };
    const validatePassIndustry = (rule, value, callback) => {
      var industryTypeId = this.industryTypeValue;
      if (!industryTypeId) {
        callback("行业类型为空或数据不匹配");
      } else {
        callback();
      }
    };
    return {
      treeData: [],
      industryData: "", //行业类型
      industryTypeValue: "",
      url: "/basedata/select/industry_type", //行业类型的api
      form: {
        code: "",
        breedTypeRoadName: "",
        industryTypes: "",
        nameEn: "",
        nameJa: ""
      },
      editform: {},
      addform: {
        name: "",
        industryTypeValue: "",
        nameEn: "",
        nameJa: ""
      },
      loading1: false,
      loading2: false,
      tid: "",
      tcode: "",
      breedTypeStatus: "breedTypeStatus",
      breedTypeRoadName: "",
      breedTypeParentRoadName: "",
      industryType: "",
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
      cid: 0,
      cType: 0,
      statusList:[],
      formCustom: {
        code: "",
        name: "",
        status: -1
      },
      editRules: {
        name: [
          { required: true, message: "请输入品种类别名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "品种类别名称不能超过100个字符",
            trigger: "blur"
          },
          { validator: validatePassEdit, trigger: "change" }
        ],
        industryTypeId: [
          { required: true, validator: validatePassIndustry, trigger: "blur" }
        ],
        nameEn: [
          {
            type: "string",
            max: 100,
            message: "品种类别英文名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        nameJa: [
          {
            type: "string",
            max: 100,
            message: "品种类别日文名称不能超过100个字符",
            trigger: "blur"
          }
        ]
      },
      addRules: {
        name: [
          { required: true, message: "请输入品种类别名称", trigger: "change" },
          {
            type: "string",
            max: 100,
            message: "品种类别名称不能超过100个字符",
            trigger: "blur"
          },
          { validator: validatePassAdd, trigger: "change" }
        ],
        industryTypeId: [
          { required: true, validator: validatePassIndustry, trigger: "change" }
        ],
        nameEn: [
          {
            type: "string",
            max: 100,
            message: "品种类别英文名称不能超过100个字符",
            trigger: "change"
          }
        ],
        nameJa: [
          {
            type: "string",
            max: 100,
            message: "品种类别日文名称不能超过100个字符",
            trigger: "change"
          }
        ]
      },
      columns: [
        {
          title: "品种类别编号",
          key: "code",
          minWidth: 150,
          align: "center"
        },
        {
          title: "品种类别路径",
          key: "breedTypeRoadName",
          align: "center",
          minWidth: 250,
          className: "colorblue",
          render: (h, data) => {
            return h(
              "a",
              {
                style: {
                  "text-align": "left",
                  width: "100%",
                  display: "block"
                },
                on: {
                  click: () => {
                    this.breedTypeUrl(data.row.id);
                  }
                }
              },
              data.row.breedTypeRoadName
            );
          }
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
          title: "行业类型",
          align: "center",
          minWidth: 100,
          key: "industryTypes"
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.status === 0
                ? "正常"
                : data.row.status === 1
                  ? "禁用"
                  : "";
            let color =
              data.row.status === 0
                ? "#9ecd3f"
                : data.row.status === 1
                  ? "red"
                  : "";
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
          title: "创建时间",
          align: "center",
          minWidth: 150,
          key: "createTime"
        },
        {
          title: "创建人",
          align: "center",
          minWidth: 100,
          key: "createName"
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
                      this.editBreedList(
                        data.row.id,
                        data.row.breedTypeParentRoadName
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
      selectCondition: {
        treeCode: "",
        treeName: "",
        order: "asc",
        pageNum: 1,
        pageSize: 10,
        parentCode: "",
        parentId: "",
        sort: "",
        status: ""
      }
    };
  },
  created() {
    this.initStatus();
    this.getlist(this.selectCondition);
    this.initTree();
  },
  methods: {
    //初始化状态
    initStatus() {
      var that = this;
      axios({
        url: "/basedata/enum/query-all-breedType-status",
        method: "get",
        data: {}
      }).then(function(resp) {
        let obj = {
          value: -1,
          desc: "全部"
        };
        that.statusList.push(obj);
        let list = resp.data.response;
        for (let i = 0; i < list.length; i++) {
          let objList = {};
          objList.value = list[i].value;
          objList.desc = list[i].desc;
          that.statusList.push(objList);
        }
      });
    },
    //点击新增按钮，新增品种列表
    addBreedList() {
      this.showAddModal = true;
      this.upBreedType();
    },
    //获取上级品种类别
    upBreedType() {
      var code = this.selectCondition.treeCode;
      var name = this.selectCondition.treeName;
      var that = this;
      if (code != "") {
        let params = {
          code: code,
          name: name
        };
        axios({
          url: "/basedata/breedType/roadname",
          method: "post",
          data: params
        }).then(function(res) {
          if (res.data.status == 200) {
            that.breedTypeRoadName = res.data.response.breedTypeRoadName;
          } else {
            that.$Message.error(resp.data.message);
            that.showAddModal = false;
          }
        });
      } else {
        that.breedTypeRoadName = "无";
      }
    },
    //点击查询按钮
    handleSubmit(name) {
      let that = this;
      that.selectCondition.code = that.formCustom.code;
      that.selectCondition.name = that.formCustom.name;
      that.selectCondition.pageNum = 1;//that.pageNum;
      that.selectCondition.pageSize = 10;//that.pageSize;
      that.pageNum = 1;
      that.pageSize = 10;
      that.getlist(that.selectCondition);
    },
    //重置品种列表
    handleReset() {
      this.formCustom.code = "";
      this.formCustom.name = "";
this.formCustom.status = -1;
    },
    //编辑时获取值
    editBreedList(id, breedTypeParentRoadName) {
      this.$refs.editFormValidate.resetFields();
      this.$refs.childEditData.model = "";
      var that = this;
      if (!breedTypeParentRoadName) {
        that.breedTypeParentRoadName = "无";
      } else {
        that.breedTypeParentRoadName = breedTypeParentRoadName;
      }
      var params = new URLSearchParams();
      params.append("id", id);
      axios.post("/basedata/breedType/detail", params).then(function(res) {
        if (res.data.status == 200) {
          that.editform = res.data.response;
          that.editform.status = res.data.response.status;
          that.editform.version = res.data.response.version;
          that.tid = id;
          that.industryTypeValue = that.editform.industryTypeId;
          that.tcode = that.selectCondition.treeCode;
          that.$refs.childEditData.getData(that.editform.industryTypes);
        } else {
          that.$Message.warning(res.data.message);
        }
      });
      this.showEditModal = true;
    },
    //激活 禁用该企业
    onOrOffConfig(id, type) {
      this.$refs.showIsUseModel.showModal = true;
      if (type == 0) {
        this.msgContent = "是否确认要禁用该品种类别?";
      } else if (type == 1) {
        this.msgContent = "是否确认要启用该品种类别?";
      } else {
        this.msgContent = "类型错误?";
        this.$refs.showIsUseModel.showModal = false;
      }
      this.enableUrl = "/basedata/breedType/enable";
      this.disableUrl = "/basedata/breedType/disable";
      this.cid = id;
      this.cType = type;
    },
    cancelchange() {
      this.showIsUsermodal = false;
    },

    //获取品种类别路径
    breedTypeUrl(id) {
      this.showCheckModal = true;
      var params = new URLSearchParams();
      params.append("id", id);
      var that = this;
      axios.post("/basedata/breedType/detail", params).then(function(res) {
        if (res.data.status == 200) {
          that.form = res.data.response;
          // that.$refs.childData.getData(that.form.industryTypes)
        } else {
          that.$Message.warning(res.data.message);
        }
      });
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
    //点击品种类别路径返回按钮
    voidShowCheckModal() {
      this.showCheckModal = false;
    },
    //点击新增品种返回按钮
    cancelAddModal() {
      this.industryTypeValue = "";
      this.industryDataLabel = "";
      this.$refs.addFormValidate.resetFields();
      this.loading1 = false;
      this.$refs.childAddData.model = "";
      this.$refs.childAddData.itemList = [];
      this.showAddModal = false;
    },
    //点击修改品种返回按钮
    cancelEditModal() {
      this.showEditModal = false;
      this.$refs.childEditData.model = "";
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
      if (selectCondition.status == -1) {
        selectCondition.status = "";
      } else {
        selectCondition.status = this.formCustom.status == -1 ? "" : this.formCustom.status;
      }
      axios({
        url: "/basedata/breedType/list",
        method: "post",
        data: selectCondition
      }).then(function(resp) {
        if (resp.data.status == 200) {
          var data = resp.data.response.list;
          for (var i = 0; i < resp.data.response.list.length; i++) {
            data[i].createTime = timeStampChange.format(
              resp.data.response.list[i].createTime
            );
          }
          that.total = resp.data.response.total;
          that.dataTable = data;
        } else {
          that.dataTable = [];
        }
      });
    },
    //通过点击树的数据获取相应的表格
    findlist(data) {
      this.selectCondition = data[0];
      //this.selectCondition.treeCode = this.selectCondition.code;
      //this.selectCondition.treeName = this.selectCondition.name;
      if (this.selectCondition.code) {
        this.selectCondition.treeCode = this.selectCondition.code;
      }
      if (this.selectCondition.name) {
        this.selectCondition.treeName = this.selectCondition.name;
      }
      delete this.selectCondition["code"];
      delete this.selectCondition["name"];
      this.selectCondition.pageNum = 1;
      this.selectCondition.pageSize = 10;
      this.getlist(this.selectCondition);
    },
    //初始化树的数据
    initTree(item, callback) {
      var that = this;
      axios({
        url: "/basedata/breedType/tree",
        method: "post",
        data: {
          id: "",
          isLeaf: 0,
          name: "",
          parentId: 0,
          sign: ""
        }
      }).then(function(resp) {
        if (resp.data.status == 200) {
          let resultdata = resp.data.response;
          for (var i = 0; i < resultdata.length; i++) {
            resultdata[i].title = resp.data.response[i].name;
            resultdata[i].id = resp.data.response[i].id;
            if (resultdata[i].isLeaf == 1) {
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
    //获取树的数据
    findSon(item, callback) {
      var that = this;
      axios({
        url: "/basedata/breedType/tree",
        method: "post",
        data: {
          //code: item.code,
          id: item.id,
          isLeaf: 0,
          name: "",
          parentId: 0,
          sign: ""
        }
      }).then(function(resp) {
        if (resp.data.status == 200) {
          let resultdata = resp.data.response;
          for (var i = 0; i < resultdata.length; i++) {
            resultdata[i].title = resp.data.response[i].name;
            resultdata[i].id = resp.data.response[i].id;
            if (resultdata[i].isLeaf == 1) {
              (resultdata[i].loading = false), (resultdata[i].children = []);
            } else {
              continue;
            }
          }
          const data = resultdata;
          callback(resultdata);
        } else {
          callback([]);
          that.$Message.error(resp.data.message);
        }
      });
    },
    //编辑品种类别
    confirmEditModal(name) {
      var that = this;
      if (that.$refs.childEditData.itemList.length > 0) {
        that.editform.industryTypeId =
          that.$refs.childEditData.itemList[0].value;
      }
      if (that.$refs.childEditData.itemList.length > 0) {
        that.editform.industryTypeId =
          that.$refs.childEditData.itemList[0].value;
      }
      that.$refs.editFormValidate.validate(valid => {
        if (valid) {
          if (!this.loading2) {
            this.loading2 = true;
            axios({
              url: "/basedata/breedType/edit",
              method: "post",
              data: that.editform
            }).then(function(resp) {
              that.showEditModal = false;
              if (resp.data.status == 200) {
                that.$Message.success("修改成功");
                that.$refs.childEditData.model = "";

                that.tid = 0;
                that.industryTypeValue = "";
                that.industryDataLabel = "";
                that.$refs.editFormValidate.resetFields();
                that.handleSubmit();
                that.initTree();
              } else {
                that.$Message.error(resp.data.message);
              }
              that.loading2 = false;
            });
          }
        }
      });
    },
    //新增品种类别
    confirmAddModal(name) {
      var that = this;
      if (this.industryData) {
        this.addform.industryTypeId =
          that.industryData.value == undefined ? "" : that.industryData.value;
      }
      this.addform.code = that.selectCondition.treeCode;
      this.$refs["addFormValidate"].validate(valid => {
        if (valid) {
          if (!that.loading1) {
            that.loading1 = true;
            axios({
              url: "/basedata/breedType/add",
              method: "post",
              data: that.addform
            }).then(function(resp) {
              that.showAddModal = false;
              if (resp.data.status == 200) {
                that.$Message.success("新增成功");
                that.$refs.addFormValidate.resetFields();
                that.$refs.childAddData.model = "";
                that.$refs.childAddData.itemList = [];
                that.industryTypeValue = "";
                that.industryDataLabel = "";

                that.handleSubmit();
                that.initTree();
              } else {
                that.$Message.error(resp.data.message);
              }
              that.loading1 = false;
            });
          }
        }
      });
    },
    //行业类型模糊搜索
    industryTypeFunction(industryData) {
      if (industryData) {
        this.industryData = industryData;
        this.industryDataLabel = industryData.label;
        this.industryTypeValue = industryData.value;
      }
    }
  }
};
</script>
