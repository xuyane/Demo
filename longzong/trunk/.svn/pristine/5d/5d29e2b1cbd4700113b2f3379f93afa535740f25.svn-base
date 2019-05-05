<style lang="less" scoped>
.add-modal .ivu-form-item-content {
  float: left;
  /* width: 18px; */
}
.add-modal .ivu-form-item-label {
  line-height: 30px !important;
}
.add-modal .ivu-select-selection {
  width: 120px;
  border-color: #000;
}
</style>

<template>
  <div>
    <Modal v-model="showModal" :title="title" @on-cancel="doCancel" width="750">
      <Form ref="addModal" :model="form" :rules="addRules" :label-width="80" class="search-form add-modal">
        <FormItem label="姓名" prop="name">
          <Input v-model="form.name" class="search-input"></Input>
        </FormItem>
        <div style="display: flex">
          <FormItem label="性别" prop="sex" style="flex:1">
            <Select v-model="form.sex" class="form-select">
              <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="主联系人" prop="mainRelation" style="flex:1;">
            <Select v-model="form.isMain" class="form-select" @on-change="isMainChange">
              <Option v-for="item in mainPersonList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </div>
        <FormItem label="部门" prop="department">
          <Input v-model="form.department" class="search-input"></Input>
        </FormItem>
        <FormItem label="职位" prop="position">
          <Input v-model="form.position" class="search-input"></Input>
        </FormItem>
        <FormItem label="电话" prop="phone">
          <Input v-model="form.phone" class="search-input"></Input>
        </FormItem>
        <FormItem label="手机" prop="mobile">
          <Input v-model="form.mobile" class="search-input"></Input>
        </FormItem>
        <FormItem label="传真" prop="fax">
          <Input v-model="form.fax" class="search-input"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="form.email" class="search-input"></Input>
        </FormItem>
        <FormItem label="QQ" prop="qq">
          <Input v-model="form.qq" class="search-input"></Input>
        </FormItem>
        <FormItem label="微信" prop="weChat">
          <Input v-model="form.weChat" class="search-input"></Input>
        </FormItem>
        <FormItem label="关联品种">
          <Row>
            <Col>
            <Row>
              <Col span="18" style='margin-right:20px;'>
              <associate-Search @query-list="breedNameFunction" :dataUrl="url" :mId="mId" ref="childData"></associate-Search>
              </Col>
              <Col span="4">
              <Button type="primary" @click="showselect">选择关联</Button>
              </Col>
            </Row>
            </Col>
            <Col class="hadwrap">
            <div v-for='(item, index) in  breedBreedTypeRelations' :key='item.breedId' class="selectvwrap">
              <span>{{item.breedName}}</span>
              <!-- <Icon type="ios-close-outline" size='16' color='red' @click="removeSelect(index)" /> -->
              <b class="icon-delete" @click="removeselect(index)"></b>
            </div>
            </Col>
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button :loading="loading" class="search-btn" type="primary" @click="doAdd">确定</i-button>
        <i-button class="search-btn" @click="doCancel">取消</i-button>
      </div>
    </Modal>
    <Modal v-model="showselectModal" title="选择品种" @on-cancel="cancel" width="900">
      <Form :model="form" ref="selectformRef" class="addform">
        <Row type="flex" justify="space-between">
          <Col span="7">
          <FormItem label="品种名称:" :label-width="100">
            <Input v-model="selectform.breedName" placeholder="请输入品种名称"></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
            <Button type="primary" @click="handleSubmit">搜索</Button>
            <Button @click="handleReset" style="margin-left: 20px">重置</Button>
          </FormItem>
          </Col>

        </Row>
      </Form>
      <div style="position:relative;overflow:hidden">
        <Table class="tableCommon" border ref="selection" :columns="columns" :data="dataTable" @on-selection-change="handleRowChange"></Table>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </div>
      <div slot="footer">
        <i-button :loading="loading" class="search-btn" type="primary" @click="doEdit">确定</i-button>
        <i-button class="search-btn" @click="cancel">取消</i-button>
      </div>
    </Modal>
  </div>

</template>

<script>
import axios from "axios";
import associateSearch from "../../components/cms/associateBreedSearch.vue";
import oilPage from "../../components/page/page.vue";
import {
  getBreedList,
  getRelevanceBreedList,
  checkIsMain
} from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";

export default {
  name: "addEnterpriseContactModal",
  props: {
    showAddModal: Boolean
  },
  components: {
    oilPage,
    associateSearch
  },
  data() {
    const validateIsMain = (rule, value, callback) => {
      let mId = this.isMainId;
      let rId = this.$route.query.id;
      let contactsId = this.tid == undefined ? 0 : this.tid;
      let params = {
        enterpriseId: rId,
        contactsId: contactsId,
        isMain: mId
      };
      checkIsMain(formData(params)).then(res => {
        if (res.response.result) {
          callback();
        } else {
          callback(new Error(res.response.message));
        }
      });
    };
    const validateQQ = (rule, value, callback) => {
      if (value) {
        const reg = /^[1-9][0-9]{4,9}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的QQ号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateFax = (rule, value, callback) => {
      if (value) {
        const reg = /^0\d{2,3}-?\d{7,8}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的传真号码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value) {
        const reg = /^0\d{2,3}-?\d{7,8}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的电话号码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (value) {
        const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value) {
        const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的邮箱"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      addRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "change" },
          {
            type: "string",
            max: 10,
            message: "姓名不能超过10个字符",
            trigger: "change"
          }
        ],
        department: [
          { required: true, message: "请输入部门", trigger: "change" },
          {
            type: "string",
            max: 20,
            message: "部门不能超过20个字符",
            trigger: "change"
          }
        ],
        position: [
          { required: true, message: "请输入职位", trigger: "change" },
          {
            type: "string",
            max: 20,
            message: "职位不能超过20个字符",
            trigger: "change"
          }
        ],
        mainRelation: [{ validator: validateIsMain, trigger: "change" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "change" },
          { validator: validateMobile, trigger: "change" }
        ],
        fax: [
          {
            type: "string",
            max: 100,
            message: "传真号码不能超过100个字符",
            trigger: "blur"
          },
          { validator: validateFax, trigger: "change" }
        ],
        phone: [{ validator: validatePhone, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        qq: [{ validator: validateQQ, trigger: "blur" }],
        weChat: [
          {
            type: "string",
            max: 20,
            message: "微信名称不能超过20个字符",
            trigger: "change"
          }
        ]
      },
      showselectModal: false,
      pageSizeOpts: [5, 10, 20],
      showSizer: true,
      pageSize: 5,
      pageNum: 1,
      isMainId: 0,
      mId: this.$route.query.id,
      total: 0,
      loading: false,
      loading1: false,
      enterprisePerson: "",
      title: "",
      url: "/basedata/select/enterprise_breed",
      selectRow: [],
      dataTable: [],
      showModal: false,
      isChangeOk: false, // 是否允许座机转手机可切换标知
      selectform: {
        number: 0,
        name: ""
      },
      showselectModal: false,
      contractsBreedList: [],
      targetKeys: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "品种名称",
          key: "breedName"
        },
        {
          title: "缩写",
          key: "breedShortName"
        },
        {
          title: "别名",
          key: "breedKeyword"
        }
      ],
      data: [],
      breedBreedTypeRelations: [],
      form: {
        name: "",
        department: "",
        sex: 0,
        isMain: 0,
        phone: "",
        mobile: "",
        fax: "",
        email: "",
        qq: "",
        status: 0,
        weChat: ""
      },
      mainPersonList: [
        {
          value: 0,
          name: "否"
        },
        {
          value: 1,
          name: "是"
        }
      ],
      sexList: [
        {
          value: 0,
          name: "男"
        },
        {
          value: 1,
          name: "女"
        }
      ]
    };
  },

  methods: {
    //初始化编辑数据

    initData(initId) {
      var that = this;
      var params = new URLSearchParams();
      params.append("id", initId);
      axios
        .post("/basedata/enterprise/detail_contacts", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.form = res.data.response;
            that.breedBreedTypeRelations = res.data.response.contractsBreedList;
            that.tid = initId;
            that.mId = that.$route.query.id;
          } else {
            that.$Message.warning(res.data.message);
          }
        });
    },
    //新增编辑提交联系人
    doAdd() {
      let zId = this.tid;
      var that = this;
      this.loading = true;
      that.form.enterpriseId = that.$route.query.id;
      var url = "";
      var message = "";
      if (zId) {
        url = "/basedata/enterprise/edit_relevance_contacts";
        that.form.id = zId;
        message = "修改成功";
      } else {
        url = "/basedata/enterprise/add_relevance_contacts";
        message = "新增成功";
      }
      let arr = that.breedBreedTypeRelations;
      let contractsBreedArray = [];
      for (var i = 0; i < arr.length; i++) {
        let contractsBreedObj = { breedId: arr[i].breedId };
        contractsBreedObj.breedId = arr[i].breedId;
        contractsBreedArray.push(contractsBreedObj);
      }
      that.form.contractsBreedList = contractsBreedArray;
      let form = that.form;
      //this.isMainId = that.form.isMain;
      this.$refs.addModal.validate(valid => {
        if (valid) {
          axios.post(url, form).then(function(res) {
            if (res.data.status == 200) {
              that.$Message.warning(message);
              that.$refs["addModal"].resetFields();
              that.breedBreedTypeRelations = [];
              that.showModal = false;
              that.$emit("hide-modal");
              that.loading = false;
            } else {
              that.$Message.warning(res.data.message);
              that.loading = false;
            }
          });
        } else {
          that.loading = false;
        }
      });
    },
    cancel() {
      this.showselectModal = false;
    },
    editRules() {},
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getBreedList();
    },
    isMainChange(data) {
      this.form.isMain = data;
      this.isMainId = data;
    },
    //查询功能
    handleSubmit() {
      this.pageNum = 1;
      this.pageSize = 5;
      this.getBreedList();
    },
    //获取关联品种数据
    getBreedList() {
      var that = this;
      let params = {
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        enterpriseId: that.$route.query.id,
        breedName:
          that.selectform.breedName == undefined
            ? ""
            : that.selectform.breedName
      };
      getRelevanceBreedList(formData(params)).then(res => {
        that.dataTable = res.response.list;
        that.total = res.response.total;
      });
    },
    showselect() {
      this.showselectModal = true;
      this.getBreedList();
    },
    //初始化企业类型
    initEnterpeiseType() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_type",
        method: "post",
        data: {}
      }).then(function(resp) {
        that.enterpeiseTypeList = resp.data.response;
      });
    },
    //初始化企业性质
    initEnterpeiseNature() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_nature",
        method: "post",
        data: {}
      }).then(function(resp) {
        that.enterpeiseNatureList = resp.data.response;
      });
    },
    //判断品种是否重复
    isRepeatBreed(value) {
      if (this.breedBreedTypeRelations.length > 0) {
        let breedArr = [];
        for (let j = 0; j < this.breedBreedTypeRelations.length; j++) {
          breedArr.push(this.breedBreedTypeRelations[j].breedId);
        }
        if (breedArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
    },
    //品种名称模糊搜索
    breedNameFunction(breedName) {
      var that = this;
      if (breedName) {
        if (this.isRepeatBreed(breedName.value)) {
          let breedObj = {};
          breedObj.breedId = breedName.value;
          breedObj.breedName = breedName.label;
          that.breedBreedTypeRelations.push(breedObj);
          that.$refs.childData.queryChange();
        }
      }
    },
    // 删除品种
    removeSelect(index) {
      this.breedBreedTypeRelations.splice(index, 1);
      this.$refs.childData.model = "";
    },
    //重置品种搜索
    handleReset() {
      this.$refs.selectform.resetFields();
      this.selectform.breedName = "";
    },
    //点击确定将品种回显
    doEdit() {
      let that = this;
      that.loading1 = true;
      if (that.selectRow.length > 0) {
        for (let i = 0; i < that.selectRow.length; i++) {
          let breedObj = {};
          breedObj.breedId = that.selectRow[i].breedId;
          breedObj.breedName = that.selectRow[i].breedName;
          if (that.isRepeatBreed(that.selectRow[i].breedId)) {
            that.breedBreedTypeRelations.push(breedObj);
          }
        }
        that.selectRow = [];
      }
      that.showselectModal = false;
      that.loading1 = false;
    },
    doCancel() {
      this.showModal = false;
      this.$emit("hide-modal");
      this.loading = false;
      this.$refs["addModal"].resetFields();
      this.breedBreedTypeRelations = [];
      this.form.name = "";
      his.form.department = "";
      this.form.sex = 0;
      this.form.isMain = 0;
      this.form.phone = "";
      this.form.mobile = "";
      this.form.fax = "";
      this.form.email = "";
      this.form.qq = "";
      this.form.status = 0;
      this.form.weChat = "";
    },
    // 监听选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    }
  },
  watch: {
    showAddModal(newVal, oldVal) {
      this.showModal = newVal;
      this.form.isMain = 0;
    }
  }
};
</script>
