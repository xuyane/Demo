<style>
</style>

<template >
  <Row class='varietybox'>
    <Col span="24">
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;规格型号管理&nbsp;&nbsp;>>&nbsp;&nbsp;规格型号列表
      </Row>
    </i-col>
    </Col>
    <Col span="24" class-name="search-form">
    <Form ref="form" :model="form" :label-width="120">
      <Row type="flex" justify="space-between">
        <Col span='7'>
        <FormItem label="规格型号名称:" :label-width="100">
          <Input type="text" v-model="form.specName" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span='7'>
        <FormItem label="状态:" :label-width="100">
          <Select v-model="form.status">
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
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
    <Col span="24">
    <Row>
      <div class="btn-container">
        <Button type="primary" class="search-btn" @click="addBreedSpec">新增</Button>
      </div>
      <Table class="tableCommon" border :columns="columns" :data="tableData"></Table>
      <div class="page-con">
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </div>
    </Row>
    </Col>
    <Modal v-model="showEditModal" class="formeditwrap" width="500" @on-cancel="cancelSubmit(0)">
      <p slot="header">修改规格型号</p>
      <Form ref="updateFormValidate" :model="updateForm" :rules="ruleUpdateValidate" :loading="loading"  :label-width="120">
        <FormItem label="规格型号名称" prop="name">
          <Input type="text" v-model="updateForm.name" class="search-input"></Input>
        </FormItem>
        <FormItem label="英文名:" prop='nameEn'>
         <Input type="text" v-model="updateForm.nameEn" class="search-input"></Input>
        </FormItem>
        <FormItem label="日文名:" prop='nameJa'>
          <Input type="text" v-model="updateForm.nameJa" class="search-input"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button :loading="loading2" class="search-btn" type="primary" @click="handleEditSubmit">确定</i-button>
        <i-button class="search-btn" @click="cancelSubmit(0)">取消</i-button>
      </div>
    </Modal>
    <Modal v-model="showAddModal" class="formeditwrap" width="500" @on-cancel="cancelSubmit(1)">
      <p slot="header">新增规格型号</p>
      <Form ref="addFormValidate" :model="addForm" :rules="ruleAddValidate" :label-width="120">
        <FormItem label="规格型号名称" prop="name">
          <Input type="text" v-model="addForm.name" class="search-input"></Input>
        </FormItem>
         <FormItem label="英文名:" prop='nameEn'>
          <Input type="text" v-model="addForm.nameEn" class="search-input"></Input>
        </FormItem>
        <FormItem label="日文名:" prop='nameJa'>
          <Input type="text" v-model="addForm.nameJa" class="search-input"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button :loading="loading1" class="search-btn" type="primary" @click="handleAddSubmit">确定</i-button>
        <i-button class="search-btn" @click="cancelSubmit(1)">取消</i-button>
      </div>
    </Modal>
    <on-or-off :msgContent="msgContent" :cid="cid" :cType="cType" :enableUrl="enableUrl" :disableUrl="disableUrl" @query="queryData" ref="showIsUseModel"></on-or-off>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import onOrOff from "../../components/cms/onOrOff.vue";
import {
  getSpecList,
  getSpecAdd,
  getSpecDetail,
  getSpecEdit,
  getBreedNameRepeat 
} from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "varietymanage",
  components: {
    oilPage,
    onOrOff
  },
  data() {
    const validatePass = (rule, value, callback) => {
      let params = {
        breedSpecId:this.tid,
        name: value
      };
      getBreedNameRepeat(formData(params)).then(res => {
        if(res.response.result){
           callback();
        }else{
          callback(new Error(res.response.message));
        }   
      });
    };
    return {
      //禁用启用需要的参数
      showIsUsermodal: false,
      loading1: false,
      loading2: false,
      disableUrl: "",
      enableUrl: "",
      msgContent: "",
      tid:0,
      cid: 0,
      cType: 0,
      showLinkModal: false,
      showAddModal: false,
      showCheckModal: false,
      showEditModal: false,
      loading: true,
      showSpecificationsModal: false,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      showEditModal: false,
      breedSpecificationStatus: "breedSpecificationStatus",
      addForm: {
        name: "",
         nameJa: "",
        nameEn: ""
      },
      updateForm: {
        name: "",
        nameJa: "",
        nameEn: "",
        id:""
      },
      form: {
        specName: "",
        status: -1
      },
      columns: [
        {
          title: "规格型号名称",
          key: "name",
          minWidth: 300
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
          key: "statusSec",
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
          key: "createTime",
          minWidth: 100
        },
        {
          title: "创建人",
          key: "creatorName",
          minWidth: 100
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.editMsg(data.row.id);
                    }
                  }
                },
                " 编辑 "
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
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
      tableData: [],
      statusList: [],
      ruleUpdateValidate: {
        name: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {
            type: "string",
            max: 40,
            message: "规格名称不能超过40个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: 'blur' }
        ],
         nameEn: [
          {
            type: "string",
            max: 100,
            message: "英文名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        nameJa: [
          {
            type: "string",
            max: 100,
            message: "日文名称不能超过100个字符",
            trigger: "blur"
          }
        ]
      },
      ruleAddValidate: {
        name: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {
            type: "string",
            max: 40,
            message: "规格名称不能超过40个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: 'blur' }
        ],
         nameEn: [
          {
            type: "string",
            max: 100,
            message: "英文名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        nameJa: [
          {
            type: "string",
            max: 100,
            message: "日文名称不能超过100个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    
    this.queryData();
    this.initStatus();
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
    //点击新增按钮
    addBreedSpec() {
      this.showAddModal = true;
    },
    //新增品种规格
    handleAddSubmit() {
      var that = this;
      this.loading1 = true;
         this.$refs.addFormValidate.validate(valid => {         
          if (valid) {
            getSpecAdd(that.addForm).then(res => {
              this.$Message.success("新增成功");
              that.showAddModal = false;
              that.loading1 = false;
              that.$refs.addFormValidate.resetFields();
              that.queryData();
            });
          }else {
            that.loading1 = false;
          }
        });
    },
    
    //新增取消按钮
    cancelSubmit(type) {
      var that = this;
      if (type == 1) {
        that.showAddModal = false;
        that.$refs.addFormValidate.resetFields();
        that.loading1 = false;
      }
      if (type == 0) {
        that.showEditModal = false;
        that.$refs.updateFormValidate.resetFields();
        that.loading2 = false;
      }
    },
    //点击编辑
    editMsg(id) {
      this.showEditModal = true;
      var that = this;
      let params = {
        breedSpecId: id
      };
      getSpecDetail(formData(params)).then(res => {
        that.updateForm = res.response;
        that.tid = id;
      });
    },
    //编辑后提交
    handleEditSubmit() {
      
      var that = this;
      this.loading2 = true;
      that.$refs.updateFormValidate.validate(valid => {
        if (valid) {
          getSpecEdit(that.updateForm).then(res => {
            that.$Message.success("修改成功");
            that.showEditModal = false;
            that.loading2 = false;
            that.updateForm.updateName = "";
            that.updateForm.nameEn = "";
            that.updateForm.nameJa = "";
            that.updateForm.id = "";
            that.tid = 0;
            that.queryData();
          });
        }else{
          that.loading2 = false;
        }
      });
    },
    //查询功能
    search() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.queryData();
    },
    //重置
    reset() {
      this.form.specName = "";
      this.form.status = -1;
    },
    //启用，禁用
    onOrOffConfig(id, type) {
      this.$refs.showIsUseModel.showModal = true;
      if (type == 0) {
        this.msgContent = "是否确认要禁用该规格型号?";
      } else if (type == 1) {
        this.msgContent = "是否确认要启用该规格型号?";
      } else {
        this.msgContent = "类型错误?";
        this.$refs.showIsUseModel.showModal = false;
      }
      this.enableUrl = "/basedata/spec/enable";
      this.disableUrl = "/basedata/spec/disable";
      this.cid = id;
      this.cType = type;
    },

    //数据列表
    queryData() {
      var that = this;
      let params = {
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        name: that.form.specName,
        status: that.form.status == -1 ? "" : that.form.status
      };
      getSpecList(formData(params)).then(res => {
        that.tableData = res.response.list;
        that.total = res.response.total;
      });
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.queryData();
    }
  }
};

</script>
