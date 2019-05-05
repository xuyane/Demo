<style lang="less" scoped>
.search-input {
  height: auto;
}
.historywrap {
  .ivu-modal-body {
    padding-top: 10px !important;
  }
}
.search-btn {
  min-width: 80px;
  margin-left: 8px !important;
}
</style>
<template>
  <Modal v-model="showModal" class="historymodal" title="用户跟踪" width="1000" @on-cancel="cancel">
    <p slot="header" >
        <Row>
          <Col span="12">历史跟踪</Col>
          <Col span="12">用户跟踪</Col>
        </Row>
    </p>
    <Row>
      <Col span='12'>
        <div class="historywrap">
        <div v-if='tableData.length==0'>跟踪记录暂无数据</div>
        <div v-else>
          <div style="text-align:right"><Button type="text" size='small' @click="goedit(1)">更多>></Button></div>
          <Table
            size="small"
            class="tableCommon1 "
            :data="tableData"
            :columns="columns"
            height='140'
            ref="dragTable"
            :stripe="false"
            :border="false"
          ></Table>
        </div>
        <div v-if='callData.length==0'>通话记录暂无数据</div>
        <div v-else>
          <div style="text-align:right"><Button type="text" size='small' @click="goedit(2)">更多>></Button></div>
          <Table
            size="small"
            class="tableCommon1 "
            :data="callData"
            :columns="callcolumns"
            height='140'
            ref="callTable"
            :stripe="false"
            :border="false"
          ></Table>
        </div>
      </div>
      
      </Col>
      <Col span="12">
        <Row>
          <Form :model="formItem" ref="formValidate1" :rules="ruleValidate" :label-width="120">
            <Col span="22">
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
              <Col span="22">
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
              <Col span="22">
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
              <Col span="22">
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
              <Col span="22">
                <FormItem label="下次联系时间:" >
                  <!--  -->
                  <DatePicker type="date" v-model="formItem.nextContactTime" ></DatePicker>
                   <Checkbox v-model="formItem.isNotContact">不再联系</Checkbox>
                </FormItem>
              </Col>
            </Col>
          </Form>
          <Form :model="formItem" ref="formValidate2" :rules="ruleValidate" :label-width="120">
            <Col v-show="formItem.status === 8">
              <Col span="22">
                <FormItem label="联系人:" prop="user">
                  <Select v-model="formItem.user" class="search-input" placeholder="请选择联系人">
                    <Option v-for="item in realNames" :value="item" :key="item.id">{{ item.realName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="22">
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
              <Col span="22">
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
              <Col span="22">
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
              <Col span="22">
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
              <Col span="22">
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
              <Col span="22">
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
              <Col span="22">
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
        </Row>
        
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
      </Col>
    </Row>
    <div slot="footer">
      <Row>
        <Col span='5'><p style="visibility: hidden;"> 123</p>  </Col>
        <Col span='19'>
          <!-- <Button type="primary" ></Button> -->
          <Button type="primary" class="search-btn" @click="removeUser(1)" :loading="deleteloading[1]" >
            <span v-if="!deleteloading[1]">删除第一跟踪人</span>
            <span v-else>Loading...</span>
          </Button>
          <Button type="primary" class="search-btn" v-if='isshow'  @click="removeUser(2)" :loading="deleteloading[2]" >
            <span v-if="!deleteloading[2]">删除第二跟踪人</span>
            <span v-else>Loading...</span>
          </Button>
          <!-- <Button type="primary" class="search-btn" ></Button> -->
          <Button type="primary" class="search-btn" @click="add">新增</Button>
          <Button class="search-btn" @click="giveUpUser">放弃用户</Button>
          <Button class="search-btn" @click="addFollower" v-if="isNotAdmin&&!isshow">添加跟踪人</Button>
          <Button class="search-btn" @click="transferAdmin" v-if="isCustomer">转移跟踪人</Button>
          <Button class="search-btn" @click="cancel">返回</Button>
        </Col>
      </Row>
    </div>
  </Modal>
</template>
<script>
import {
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
  userTransferAdmin,
  userServiceLogList,
  getCallRecords,
  queryRlNextTimeInfo,
  checkExistSecondUserManager,
  removeUserManager
} from "../../../components/axios/crm.js";
import {
  formData,
  formatTime,
  formatStamp,
  formatTime2
} from "../../../../assets/js/common.js";
import { callbackify } from "util";
import dial from "@/assets/js/linkDial.js";
export default {
  props: {
    showFollowModal: Boolean,
    rowData: Object
  },
  data() {
    const validateContent = (rule, value, callback) => {
      if (value && value.trim().length < 5) {
        callback(new Error("跟踪内容至少输入5个字数"));
      } else {
        callback();
      }
    };
    return {
      deleteloading: ["", false, false],
      isshow: false,
      callData: [],
      callcolumns: [
        {
          title: "联系人",
          minWidth: 60,
          className: "colorbluer",
          // render: (h, data) => {
          //   let text = data.row.userName;

          //   if(data.row.userName == null || data.row.userName == ""){
          //     text = data.row.contactName;
          //   }

          //   return h('span', {}, text);
          // }
          render: (h, data) => {
            let text = data.row.userName;

            if (data.row.userName == null || data.row.userName == "") {
              text = data.row.contactName;
            }
            return h(
              "Tooltip",
              {
                props: {
                  placement: "top",
                  maxWidth: 400
                },
                style: {
                  display: "block",
                  color: "#2d8cf0",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              [
                h("span", text > 3 ? text.substring(0, 3) + "..." : text),
                h("div", {
                  slot: "content",
                  domProps: {
                    innerHTML: text
                  }
                })
              ]
            );
          }
        },
        {
          title: "电话号码",
          minWidth: 100,
          key: "phone",
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.onDial(data.row.phone);
                  }
                }
              },
              data.row.phone
            );
          }
        },
        {
          title: "通话开始时间",
          minWidth: 130,
          key: "connectStartTime",
          render: (h, data) => {
            let result = "-";

            if (
              data.row.connectStartTime != null &&
              data.row.connectStartTime > 0
            ) {
              result = formatTime2(data.row.connectStartTime);
            }

            return h("span", {}, result);
          }
        },
        {
          title: "通话结束时间",
          minWidth: 130,
          key: "connectEndTime",
          render: (h, data) => {
            let result = "-";

            if (
              data.row.connectEndTime != null &&
              data.row.connectEndTime > 0
            ) {
              result = formatTime2(data.row.connectEndTime);
            }

            return h("span", {}, result);
          }
        },
        {
          title: "时长",
          minWidth: 45,
          key: "connectTimeLen"
        }
      ],
      columns: [
        {
          key: "content",
          title: "跟踪内容",
          minWidth: 120,
          render: (h, data) => {
            return h(
              "Tooltip",
              { 
                props: {
                  placement: "top-start",
                  maxWidth: 400
                },
                style: {
                  display: "block",
                  color: "#2d8cf0",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              [
                h(
                  "span",
                  // {
                  //   on: {
                  //     click: () => {
                  //       // this.check(data)
                  //       this.copyText(data.row.memberName);
                  //     }
                  //   }
                  // },
                  data.row.content > 10
                    ? data.row.content.substring(0, 10) + "..."
                    : data.row.content
                ),
                h("div", {
                  slot: "content",
                  domProps: {
                    innerHTML: data.row.content
                  }
                })
              ]
            );
          }
        },
        {
          key: "status",
          title: "跟踪状态",
          minWidth: 80
        },
        {
          title: "跟踪时间",
          minWidth: 80,
          render: (h, data) => {
            return h("span", {}, formatTime(data.row.createTime));
          }
        },
        {
          key: "creatorName",
          title: "跟踪人",
          minWidth: 80
        }
      ],
      tableData: [],
      isNotAdmin: true,
      isCustomer: false,
      showTransferModal: false,
      showModal: false,
      showAddModal: false,
      loading: false,
      adminId: null,
      transferAdminId: null,
      productList: [],
      productList3: [],
      options1: [],
      options2: [],
      lineData: {},
      fileroad: "",
      productCategoryCode: "",
      productVersion: "",
      productVersionId: null,
      form: {
        attachment: ""
      },
      followTypes: [],
      followTypes2: [],
      products: [],
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
      formItem: {
        status: 0,
        isQuoted: 0,
        isProvideCard: 0,
        content: "",
        isNotContact: false
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
      allTypes: []
    };
  },
  methods: {
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
      });
    },
    goedit(a) {
      
      const {href} = this.$router.resolve({
        name: a == 1 ? "followRecord" : "callRecord"
      });
      this.$emit("hide-modal");
      window.open(href, '_blank');
    },
    formatSeconds(seconds) {
      if (seconds == null) {
        return "";
      } else if (seconds < 60) {
        return `${seconds}秒`;
      } else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
      } else {
        return `${Math.floor(seconds / 3600)}小时${Math.floor(
          (seconds - Math.floor(seconds / 3600) * 3600) / 60
        )}分${seconds % 60}秒`;
      }
    },
    getcalllist() {
      let that = this;
      this.$Spin.show();
      let params = {
        pageNum: 1,
        pageSize: 20,
        // memberId: 632186
        memberId: this.lineData.memberId
      };
       that.callData = [];
      getCallRecords(formData(params)).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200 && resp.response.pageInfo != null) {
          let data = resp.response.pageInfo.list;
          that.callData = data;
          // that.total = resp.response.pageInfo.total;
        } else {
          that.callData = [];
          // that.total = 0;
        }
      });
    },
    formatFollowType(val) {
      let desc = "";
      this.followTypes.map(item => {
        if (item.value === Number(val)) {
          desc = item.desc;
          return;
        }
      });
      return desc;
    },
    formatFollowType2(val) {
      let desc = "";
      this.followTypes2.map(item => {
        if (item.value === val) {
          desc = item.desc;
          return;
        }
      });
      return desc;
    },
    gethistorylist() {
      let params = {
        pageSize: 20,
        pageNum: 1,
        memberId: this.lineData.memberId
        // memberId: 770341
      };
      let that = this;
      that.tableData=[]
      userServiceLogList(formData(params)).then(resp => {
        if (resp.response) {
          that.tableData = resp.response.list;
          that.tableData.map(item => {
            item.createTime = formatTime(item.createTime);
            item.status = that.formatFollowType2(item.status);
          });
        }else{
          that.tableData=[]
        }
      });
    },
    cancel() {
      this.$emit("hide-modal");
      this.$refs.formValidate1.resetFields();
      this.$refs.formValidate2.resetFields();
    },
    hideAdd() {
      this.showAddModal = false;
      this.$refs.input1.query = "";
    },
    addOk() {
      let params = {
        userId: this.lineData.userId,
        newAdminId: this.adminId
      };
      if (this.adminId) {
        addNewAdmin(formData(params)).then(res => {
          this.$Message.success("新增跟踪人成功！");
          this.issecondshow();
          this.gethistorylist();
        });
      } else {
        this.$Message.warning("新增跟踪人名字必填");
      }
    },
    // 转移跟踪人
    hideTran() {
      this.showTransferModal = false;
      this.$refs.input2.query = "";
    },
    tranOk() {
      let params = {
        userId: this.lineData.userId,
        adminIdAfter: this.transferAdminId
      };
      userTransferAdmin(formData(params)).then(res => {
        this.$Message.success("转移跟踪人成功！");
      });
    },
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
    // 获取所有跟踪状态
    getAllFollowTypes() {
      queryServiceStatusList().then(res => {
        this.followTypes = res.response.filter(item => item.value >= 0);
        this.followTypes2 = res.response;
      });
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
        memberId: this.lineData.memberId
      };
      getUserById(params).then(res => {
        this.realNames = res.response.list;
      });
    },
    // 查询产品信息
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        // let data = {
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
        // let data = {
        //   productName: encodeURI(encodeURI(query))
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
      if (val) {
        this.productCategoryCode = val.productCategoryCode;
        this.productVersion = val.productVersion;
        this.productVersionId = val.productVersionId;
        let params = {
          userId: this.lineData.userId,
          productId: val.id
        };
        getUserServeice(formData(params)).then(res => {
          if (res.response) {
            this.formItem.isQuoted = res.response.isQuoted;
            this.formItem.isProvideCard = res.response.isProvideCard;
          }
        });
      }
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
    // 新增
    add() {
      console.log();
      if (this.formItem.status !== 8) {
        this.$refs.formValidate1.validate(valid => {
          if (valid) {
            let params = {
              userId: this.lineData.userId,
              // id: this.lineData.memberId,
              isQuoted: this.formItem.isQuoted,
              isProvideCard: this.formItem.isProvideCard,
              productId: this.formItem.product ? this.formItem.product.id : "",
              productName: this.formItem.product
                ? this.formItem.product.name
                : "",
              status: this.formItem.status,
              content: this.formItem.content,
              productCategoryCode: this.productCategoryCode,
              productVersion: this.productVersion,
              productVersionId: this.productVersionId,
              isNotContact: this.formItem.isNotContact == false ? 0 : 1,
              nextContactTime:
                formatStamp(this.formItem.nextContactTime) +
                  24 * 60 * 60 * 1000 -
                  1000 || ""
            };
            let that = this;
            this.$Spin.show();
            saveUserServiceLog(params).then(res => {
              that.$Spin.hide();
              this.$Message.success("新增成功！");
              if (res.response.isMainAdmin) {
                this.$emit("hide-modal1");
              } else {
                this.$emit("hide-modal");
              }
              this.$refs.formValidate1.resetFields();
              this.$refs.formValidate2.resetFields();
            });
          }
        });
      } else {
        this.$refs.formValidate2.validate(valid => {
          if (valid) {
            let params = {
              memberId: this.lineData.memberId,
              memberNameCn: this.lineData.memberNameCn,
              userId: this.lineData.userId,
              realName: this.formItem.user.realName,
              compareCompany: this.formItem.compareCompany,
              serviceTime: this.formItem.serviceTime,
              attent: this.formItem.attent,
              advantage: this.formItem.advantage.join(","),
              disadvantage: this.formItem.disadvantage.join(","),
              note: this.formItem.note,
              attachment: this.fileroad
            };
            saveUserCompare(formData(params)).then(res => {
              this.$Message.success("新增成功！");
              this.$emit("hide-modal1");
              this.$refs.formValidate1.resetFields();
              this.$refs.formValidate2.resetFields();
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
      giveUpUser(this.lineData.userId).then(resp => {
        that.$Spin.hide();
        this.$Message.success("放弃用户成功！");
        that.$emit("hide-modal");
      });
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
    },
    getqueryRlNextTimeInfo() {
      queryRlNextTimeInfo(this.lineData.userId).then(resp => {
        this.formItem.nextContactTime =
          resp.response.nextContactTime > 0
            ? formatTime(resp.response.nextContactTime)
            : "";
      });
    },
    // 第二跟踪人按钮
    issecondshow() {
      let msg = {
        userId: this.lineData.userId
      };
      checkExistSecondUserManager(msg).then(res => {
        this.isshow = res.response;
      });
    },
    // 删除跟踪人
    removeUser(type) {
      if (this.deleteloading[type] == false) {
        let msg = {
          type: type,
          userId: this.lineData.userId
        };
        let span = type == 1 ? "第一跟踪人" : "第二跟踪人";
        let that = this;
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确认删除" + span + "?</p>",
          onOk: () => {
            that.deleteloading[type] = true;
            that.$forceUpdate();
            removeUserManager(msg).then(res => {
              this.deleteloading[type] = false;
              this.$Message.success(res.message);
              this.$emit("hide-load");
            });
          },
          onCancel: () => {}
        });
      } else {
      }
    }
  },
  watch: {
    showFollowModal(newVal, oldVal) {
      this.showModal = newVal;
    },
    rowData(newVal, oldVal) {
      this.lineData = newVal;
      this.getAllAdvantage();
      this.getAllDisadvantage();
      this.getAllSevers();
      this.getAllYears();
      this.getRealNames();
      this.getAllFollowTypes();
      this.gethistorylist();
      this.getcalllist();
      this.getqueryRlNextTimeInfo();
      this.issecondshow();
    }
  },
  created() {
    this.checkIsAdminMethod();
    this.checkIsCustomerMethod();
  }
};
</script>
