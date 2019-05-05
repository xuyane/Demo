<style lang="less" scoped>
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户</Row>
    </Col>
    <tab-header :tab-index="4"></tab-header>
    <Col span="24" class-name="search-form">
      <Form ref="searchForm" :model="searchForm" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="跟踪状态:">
              <Select v-model="searchForm.followType" class="search-input" placeholder="请选择跟踪状态">
                <Option
                  v-for="item in allTypes"
                  :value="item.value"
                  :key="item.value"
                >{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="跟踪内容:">
              <Input
                v-model="searchForm.content"
                class="search-textarea"
                type="textarea"
                :rows="1"
                placeholder="请输入跟踪内容"
              ></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="跟踪日期:">
              <DatePicker
                clearable
                v-model="searchForm.time"
                type="daterange"
                split-panels
                format="yyyy/MM/dd"
                @on-change='selecttime'
                placeholder="选择跟踪日期"
                class="search-input"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="24" class="text-right">
            <FormItem>
              <Button type="primary" @click="getListPage">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24" style="background: #fff;padding: 0 20px;">
      <Table
        class="tableCommon mar-t-20"
        :data="tableData"
        :columns="columns"
        ref="dragTable"
        :stripe="true"
        :border="true"
      ></Table>
      <oil-page
        :total="total"
        :page-size="pageSize"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"
      ></oil-page>
    </Col>
    <Col span="12" class-name="search-form">
      <Form :model="formItem" ref="formValidate1" :rules="ruleValidate" :label-width="120">
        <Col span="13">
          <FormItem label="跟踪状态:" prop="status">
            <Select v-model="formItem.status" placeholder="请选择跟踪状态">
              <Option
                v-for="item in followTypes"
                :value="item.value"
                :key="item.value"
              >{{ item.desc }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col v-show="formItem.status !== 8">
          <Col span="13">
            <FormItem label="产品:" prop="product">
              <Select
                v-model="formItem.product"
                ref="productInput"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod"
                :loading="loading"
                @on-change="onChange"
              >
                <Option
                  v-for="(option, index) in productList"
                  :value="option"
                  :key="index"
                >{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="13">
            <Col span="12">
              <FormItem label="是否报价:">
                <Select v-model="formItem.isQuoted" placeholder="是否报价">
                  <Option
                    v-for="item in flags"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.desc }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="是否提供卡号:">
                <Select v-model="formItem.isProvideCard" placeholder="是否提供卡号">
                  <Option
                    v-for="item in flags"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.desc }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Col>
          <Col span="13">
            <FormItem label="跟踪内容:" prop="content">
              <Input
                v-model="formItem.content"
                class="search-textarea"
                type="textarea"
                :rows="4"
                placeholder="请输入跟踪内容"
              ></Input>
            </FormItem>
          </Col>
        </Col>
      </Form>
      <Form :model="formItem" ref="formValidate2" :rules="ruleValidate" :label-width="120">
        <Col v-show="formItem.status === 8">
          <Col span="13">
            <FormItem label="联系人:" prop="user">
              <Select v-model="formItem.user" class="search-input" placeholder="请选择联系人">
                <Option v-for="item in realNames" :value="item" :key="item.id">{{ item.realName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="13">
            <FormItem label="对标服务商:" prop="compareCompany">
              <Select v-model="formItem.compareCompany" class="search-input" placeholder="请选择对标服务商">
                <Option
                  v-for="item in compareCompanys"
                  :value="item.value"
                  :key="item.value"
                >{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="13">
            <FormItem label="服务期限:" prop="serviceTime">
              <Select v-model="formItem.serviceTime" class="search-input" placeholder="请选择服务期限">
                <Option
                  v-for="item in serviceTimes"
                  :value="item.value"
                  :key="item.value"
                >{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="13">
            <FormItem label="关注产品:" prop="attent">
              <Select
                v-model="formItem.attent"
                ref="productInput"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod3"
                :loading="loading"
              >
                <Option
                  v-for="(option, index) in productList3"
                  :value="option.id"
                  :key="index"
                >{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="13">
            <FormItem label="优点:" prop="advantage" class="selectBox">
              <Select
                v-model="formItem.advantage"
                multiple
                class="search-input"
                placeholder="请选择优点"
              >
                <Option
                  v-for="item in advantages"
                  :value="item.value"
                  :key="item.value"
                >{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="13">
            <FormItem label="缺点:" prop="disadvantage" class="selectBox">
              <Select
                v-model="formItem.disadvantage"
                multiple
                class="search-input"
                placeholder="请选择缺点"
              >
                <Option
                  v-for="item in disadvantages"
                  :value="item.value"
                  :key="item.value"
                >{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="13">
            <FormItem label="备注:" prop="note">
              <Input
                v-model="formItem.note"
                class="search-textarea"
                type="textarea"
                :rows="4"
                placeholder="请输入备注"
              ></Input>
            </FormItem>
          </Col>
          <Col span="13">
            <FormItem label="附件:">
              <Upload
                :before-upload="handleUpload"
                :data="form"
                :on-success="uploadSuccess"
                :on-remove="removeUrl"
                :max-size="20480"
                action="/crm/usercompare/upload"
              >
                <Button icon="ios-cloud-upload-outline">上传附件</Button>
              </Upload>
            </FormItem>
          </Col>
        </Col>
      </Form>
      <Col span="14" class="text-center mar-b-20">
        <Button type="primary" class="search-btn" @click="add">新增</Button>
        <Button class="search-btn" @click="giveUpUser">放弃用户</Button>
        <Button class="search-btn" @click="addFollower" v-if="isNotAdmin">添加跟踪人</Button>
        <Button class="search-btn" @click="transferAdmin" v-if="isCustomer">转移跟踪人</Button>
        <!-- <Button class="search-btn" @click="cancel">返回</Button> -->
      </Col>
    </Col>
    <Modal v-model="showAddModal" title="添加用户跟踪人" @on-cancel="hideAdd" @on-ok="addOk">
      <Select
        v-model="adminId"
        ref="input1"
        class="search-input"
        filterable
        remote
        :remote-method="remoteMethod1"
        :loading="loading"
        placeholder="请输入跟踪人"
      >
        <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.name}}</Option>
      </Select>
    </Modal>
    <Modal v-model="showTransferModal" title="转移用户跟踪人" @on-cancel="hideTran" @on-ok="tranOk">
      <Select
        v-model="transferAdminId"
        ref="input2"
        class="search-input"
        filterable
        remote
        :remote-method="remoteMethod2"
        :loading="loading"
        placeholder="请输入跟踪人"
      >
        <Option v-for="(option, index) in options2" :value="option.id" :key="index">{{option.name}}</Option>
      </Select>
    </Modal>
  </Row>
</template>
<script>
import TabHeader from "./tabHeader";
import oilPage from "../../../components/page/page.vue";
import timeStampChange from "../../../../assets/js/timestamp_change.js";
import {
  formData,
  formatType,
  formatStamp
} from "../../../../assets/js/common.js";
import {
  userServiceLogList,
  getAdminList,
  saveUserServiceLog,
  giveUpUser,
  addNewAdmin,
  queryProductSelectList,
  getUserServeice,
  getAllAdvantage,
  getAllDisadvantage,
  getAllSevers,
  getAllYears,
  saveUserCompare,
  getUserById,
  queryServiceStatusList,
  checkIsAdmin,
  checkIsCustomer,
  userTransferAdmin
} from "../../../components/axios/crm.js";
export default {
  data() {
    const validateContent = (rule, value, callback) => {
      if (value && value.trim().length < 5) {
        callback(new Error("跟踪内容至少输入5个字数"));
      } else {
        callback();
      }
    };
    return {
      isNotAdmin: true,
      isCustomer: false,
      showTransferModal: false,
      total: 0,
      pageSize: 5,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      showAddModal: false,
      loading: false,
      adminId: null,
      transferAdminId: null,
      productList: [],
      productList3: [],
      tableData: [],
      fileroad: "",
      form: {
        attachment: ""
      },
      formItem: {
        status: 0,
        isQuoted: 0,
        isProvideCard: 0,
        content: ""
      },
      searchForm: {
        time: []
      },
      ruleValidate: {
        status: [
          {
            required: true,
            type: "number",
            message: "请选择跟踪状态",
            trigger: "change"
          }
        ],
        product: [
          {
            required: false,
            type: "object",
            message: "请输入产品",
            trigger: "change"
          }
        ],
        content: [
          { required: true, message: "请输入跟踪内容", trigger: "blur" },
          { validator: validateContent, trigger: "change" }
        ],
        user: [
          {
            required: true,
            type: "object",
            message: "请选择联系人",
            trigger: "change"
          }
        ],
        compareCompany: [
          { required: true, message: "请选择对标服务商", trigger: "change" }
        ],
        serviceTime: [
          { required: true, message: "请选择服务期限", trigger: "change" }
        ],
        attent: [
          {
            required: true,
            type: "number",
            message: "请输入关注产品",
            trigger: "change"
          }
        ],
        advantage: [
          {
            required: true,
            type: "array",
            message: "请选择优点",
            trigger: "change"
          }
        ],
        disadvantage: [
          {
            required: true,
            type: "array",
            message: "请选择缺点",
            trigger: "change"
          }
        ],
        note: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      disadvantages: [],
      advantages: [],
      compareCompanys: [],
      serviceTimes: [],
      companyList: [],
      realNames: [],
      options1: [],
      options2: [],
      followTypes: [],
      allTypes: [],
      flags: [
        {
          value: 1,
          desc: "是"
        },
        {
          value: 0,
          desc: "否"
        }
      ],
      memberId: window.localStorage.getItem("lzMemberId"),
      userId: window.localStorage.getItem("lzUserId"),
      memberNameCn: window.localStorage.getItem("memberNameCn"),
      columns: [
        {
          key: "productName",
          title: "产品",
          minWidth: 160
        },
        {
          key: "content",
          title: "跟踪内容",
          minWidth: 300
        },
        {
          key: "status",
          title: "跟踪状态",
          minWidth: 100,
          render: (h, data) => {
            return h("span", this.formatFollowType(data.row.status));
          }
        },
        {
          key: "isQuoted",
          title: "是否报价",
          minWidth: 100,
          render: (h, data) => {
            return h("span", data.row.isQuoted === 1 ? "是" : "否");
          }
        },
        {
          key: "isProvideCard",
          title: "是否提供银行卡号",
          minWidth: 140,
          render: (h, data) => {
            return h("span", data.row.isProvideCard === 1 ? "是" : "否");
          }
        },
        {
          title: "跟踪时间",
          minWidth: 160,
          render: (h, data) => {
            return h("span", {}, timeStampChange.format(data.row.createTime));
          }
        },
        {
          key: "creatorName",
          title: "跟踪人",
          minWidth: 120
        }
      ]
    };
  },
  components: {
    TabHeader,
    oilPage
  },
  methods: {
    selecttime(data) {
      this.searchForm.createTimeStart = data[0];
      this.searchForm.createTimeEnd = data[1];
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
    },
    // 获取所有跟踪状态
    getAllFollowTypes() {
      queryServiceStatusList().then(res => {
        this.allTypes = res.response;
        this.followTypes = res.response.filter(item => item.value >= 0);
      });
    },
    formatFollowType(val) {
      let desc = "";
      this.allTypes.map(item => {
        if (item.value === val) {
          desc = item.desc;
          return;
        }
      });
      return desc;
    },
    getListPage() {
      let that = this;
      this.$Spin.show();
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        status: formatType(this.searchForm.followType),
        content: this.searchForm.content || "",
        createTimeStart: this.searchForm.createTimeStart
          ? this.searchForm.createTimeStart || ""
          : "",
        createTimeEnd: this.searchForm.createTimeEnd
          ? this.searchForm.createTimeEnd || ""
          : "",
        memberId: window.localStorage.getItem("lzMemberId")
      };
      userServiceLogList(formData(params)).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200 && resp.response != null) {
          let data = resp.response.list;
          that.tableData = data;
          that.total = resp.response.total;
        } else {
          that.tableData = [];
          that.total = 0;
        }
      });
    },
    reset() {
      this.searchForm = {};
    },
    hideAdd() {
      (this.showAddModal = false), (this.$refs.input1.query = "");
    },
    addOk() {
      let params = {
        userId: this.userId,
        newAdminId: this.adminId
      };
      addNewAdmin(formData(params)).then(res => {
        this.$Message.success("新增跟踪人成功！");
      });
    },
    // 转移跟踪人
    hideTran() {
      this.showTransferModal = false;
      this.$refs.input2.query = "";
    },
    tranOk() {
      if (!this.transferAdminId) {
        this.$Message.warning("跟踪人必填");
        return false;
      } else {
        let params = {
          userId: this.userId,
          adminIdAfter: this.transferAdminId
        };
        userTransferAdmin(formData(params)).then(res => {
          this.$Message.success("转移跟踪人成功！");
        });
      }
    },
    // 新增
    add() {
      let that = this;
      if (this.formItem.status !== 8) {
        this.$refs.formValidate1.validate(valid => {
          if (valid) {
            let params = {
              userId: that.userId,
              isQuoted: that.formItem.isQuoted,
              isProvideCard: that.formItem.isProvideCard,
              productId: that.formItem.product ? that.formItem.product.id : "",
              productName: that.formItem.product
                ? that.formItem.product.name
                : "",
              status: that.formItem.status,
              content: that.formItem.content,
              productCategoryCode: that.formItem.product
                ? that.formItem.product.productCategoryCode
                : "",
              productVersion: that.formItem.product
                ? that.formItem.product.productVersion
                : "",
              productVersionId: that.formItem.product
                ? that.formItem.product.productVersionId
                : ""
            };
            that.$Spin.show();
            saveUserServiceLog(params).then(res => {
              that.$Spin.hide();
              that.$Message.success("新增成功！");
              that.getListPage();
              that.$refs.formValidate1.resetFields();
              that.$refs.formValidate2.resetFields();
            });
          }
        });
      } else {
        that.$refs.formValidate2.validate(valid => {
          if (valid) {
            let params = {
              memberId: that.memberId,
              memberNameCn: that.memberNameCn,
              userId: that.userId,
              realName: that.formItem.user.realName,
              compareCompany: that.formItem.compareCompany,
              serviceTime: that.formItem.serviceTime,
              attent: that.formItem.attent,
              advantage: that.formItem.advantage.join(","),
              disadvantage: that.formItem.disadvantage.join(","),
              note: that.formItem.note,
              attachment: that.fileroad
            };
            saveUserCompare(formData(params)).then(res => {
              that.$Message.success("新增成功！");
              that.$refs.formValidate1.resetFields();
              that.$refs.formValidate2.resetFields();
            });
          }
        });
      }
    },
    // 添加跟踪人
    addFollower() {
      this.showAddModal = true;
    },
    // 转移跟踪人
    transferAdmin() {
      this.showTransferModal = true;
    },
    // 放弃用户
    giveUpUser() {
      let that = this;
      this.$Spin.show();

      //TODO 要换接口
      giveUpUser(that.userId).then(resp => {
        that.$Spin.hide();
        that.$emit("hide-modal");

        if (resp.status == 200) {
          this.$Message.success("放弃用户成功！");
        } else {
          this.$Message.success("放弃用户失败！");
        }
      });
    },
    // cancel() {
    //   this.$refs.formValidate1.resetFields()
    //   this.$refs.formValidate2.resetFields()
    // },
    //上传文件
    handleUpload(file) {
      if (this.fileroad) {
        this.$Message.warning("只能上传一个文件");
        return false;
      } else {
        this.form.attachment = file;
      }
    },
    // 上传成功后调用
    uploadSuccess(res) {
      this.fileroad = res.response;
    },
    // 点击上传成功后的文件地址
    getUrl(data) {},
    //点击删除文件地址
    removeUrl(file, fileList) {
      this.fileroad = "";
    },
    // 获取所有优点
    getAllAdvantage() {
      getAllAdvantage().then(res => {
        this.advantages = res.response.list;
      });
    },
    // 获取所有缺点
    getAllDisadvantage() {
      getAllDisadvantage().then(res => {
        this.disadvantages = res.response.list;
      });
    },
    // 获取所有服务商
    getAllSevers() {
      getAllSevers().then(res => {
        this.compareCompanys = res.response.list;
      });
    },
    // 获取所有年限
    getAllYears() {
      getAllYears().then(res => {
        this.serviceTimes = res.response.list;
      });
    },
    // 获取联系人
    getRealNames() {
      let params = {
        memberId: this.memberId
      };
      getUserById(params).then(res => {
        this.realNames = res.response.list;
      });
    },
    // 查询产品信息
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        // let params = {
        //   productName: encodeURI(encodeURI(query))
        // };
        var data = new URLSearchParams();
        data.append("productName", query);
        setTimeout(() => {
          this.loading = false;
          queryProductSelectList(data).then(res => {
            this.productList = res.response;
          });
        }, 200);
      } else {
        this.productList = [];
      }
    },
    // 查询产品信息
    remoteMethod3(query) {
      if (query !== "") {
        this.loading = true;
        // let params = {
        //   productName: query
        // };
        var data = new URLSearchParams();
        data.append("productName", query);
        setTimeout(() => {
          this.loading = false;
          queryProductSelectList(data).then(res => {
            this.productList3 = res.response;
          });
        }, 200);
      } else {
        this.productList = [];
      }
    },

    onChange(val) {
      let params = {
        userId: this.userId,
        productId: val.id
      };
      getUserServeice(formData(params)).then(res => {
        if (res.response) {
          this.formItem.isQuoted = res.response.isQuoted;
          this.formItem.isProvideCard = res.response.isProvideCard;
        }
      });
    },

    // 业务员下拉搜索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          adminName: query
        };
        setTimeout(() => {
          this.loading = false;
          getAdminList(params).then(res => {
            this.options1 = res.response;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // 业务员下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          adminName: query
        };
        setTimeout(() => {
          this.loading = false;
          getAdminList(params).then(res => {
            this.options2 = res.response;
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    // 判断是否是业务员
    checkIsAdminMethod() {
      checkIsAdmin().then(res => {
        if (res.response == true) {
          this.isNotAdmin = false;
        }
      });
    },
    // 判断是否是客服
    checkIsCustomerMethod() {
      checkIsCustomer().then(res => {
        this.isCustomer = res.response;
      });
    }
  },

  created() {
    this.getListPage();
    this.getAllAdvantage();
    this.getAllDisadvantage();
    this.getAllSevers();
    this.getAllYears();
    this.getRealNames();
    this.getAllFollowTypes();
    this.checkIsAdminMethod();
    this.checkIsCustomerMethod();
  }
};
</script>
