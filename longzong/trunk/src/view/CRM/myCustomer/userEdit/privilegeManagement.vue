<style lang="less" scoped>
.product-item {
  display: inline-block;
  height: 28px;
  line-height: 24px;
  margin-bottom: 10px;
  background: #2d8cf0;
  color: #fff;
  padding: 2px 5px;
  margin-right: 10px;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户</Row>
    </Col>
    <tab-header :tab-index="8"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="所属账号:">
              <associate-Search
                @query-list="getAccount"
                :dataUrl="urlSelectList"
                ajaxType="get"
                keyword="userName"
                :extraData="extraData"
                ref="account"
                class="search-input"
              ></associate-Search>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="权限类型:">
              <Select v-model="formItem.type" class="search-input" clearable>
                <Option
                  v-for="(item,index) in powertype"
                  :key="index"
                  :value="item.value"
                >{{item.desc}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="是否过期:">
              <Select v-model="formItem.isExpire" class="search-input" clearable>
                <Option
                  v-for="(item,index) in overdue"
                  :key="index"
                  :value="item.value"
                >{{item.desc}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="当前状态:">
              <Select v-model="formItem.status" class="search-input" clearable>
                <Option
                  v-for="(item,index) in nowstatus"
                  :key="index"
                  :value="item.value"
                >{{item.desc}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="产品名称:">
              <Input type="text" class="search-input" v-model="formItem.productNameCn"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="产品分类:">
              <Cascader
                :data="productClass"
                v-model="formItem.productNameType"
                class="search-input"
                trigger="hover"
                @on-change="getproductClass"
              ></Cascader>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="开始时间:">
              <DatePicker
                class="search-input"
                v-model="formItem.startTime"
                type="date"
                placeholder="请选择日期"
                format="yyyy/MM/dd"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="到期时间:">
              <DatePicker
                class="search-input"
                v-model="formItem.endTime"
                type="date"
                placeholder="请选择日期"
                format="yyyy/MM/dd"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <FormItem>
              <Button type="primary" @click="findlist">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con" style="padding-bottom:0">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="delaypower">延期选定权限</Button>
          <Button type="primary" class="search-btn" @click="copypower">复制权限</Button>
          <Button type="primary" class="search-btn" @click="Batch('disable')">批量禁用</Button>
          <Button type="primary" class="search-btn" @click="Batch('activation')">批量激活</Button>
        </div>
        <Table
          class="tableCommon mar-t-20"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          @on-selection-change="selectedproduce"
          @on-select-cancel="cancelone"
          @on-select-all-cancel="cancelall"
          :border="true"
        ></Table>
        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
        ></oil-page>
      </Row>
      <Row
        class-name="table-con"
        v-if="hadselected && hadselected.length > 0"
        style="padding-top:0"
      >
        <span>已选权限:</span>
        <span class="product-item" v-for="(item,index) in hadselected" :key="item.id">
          {{index+1}}.{{item.productNameCn}}
          <Icon type="md-close" @click="deleteone(index)"/>
        </span>
      </Row>
    </Col>

    <Modal v-model="showdelaymodal" width="360" title="延期选定权限" @on-cancel="selectcancel">
      <div style="text-align:center">
        <span>将延期以上{{hadselected.length}}条权限至</span>
        <DatePicker type="datetime" v-model="endTime"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="selectconfirm(0)" class="search-btn">
          <span v-if="!loading">确定</span>
          <span v-else>Loading...</span>
        </Button>
        <!-- <Button type="primary"> </Button> -->
        <i-button @click="selectcancel" class="search-btn">取消</i-button>
      </div>
    </Modal>
    <Modal v-model="showcopymodal" width="400" title="权限复制" @on-cancel="selectcopycancel">
      <Form
        ref="activeformCustom"
        class-name="search-form"
        :model="activeformCustom"
        :rules="ruleInline"
        :label-width="170"
      >
        <FormItem label="请选择要复制到的账号:" prop="userId">
          <Select
            v-model="activeformCustom.userId"
            ref="input2"
            class="search-input"
            filterable
            clearable
            remote
            :remote-method="remoteMethod2"
            :loading="loading"
          >
            <Option
              v-for="(option, index) in options2"
              :value="option.id"
              :key="index"
            >{{option.userName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="请选择权限到期时间:" prop="endTime">
          <DatePicker
            clearable
            v-model="activeformCustom.endTime"
            type="datetime"
            :options="options3"
            class="search-input"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="copyloading" @click="selectcopyconfirm" class="search-btn">
          <span v-if="!copyloading">确定</span>
          <span v-else>Loading...</span>
        </Button>
        <!-- <Button type="primary"> </Button> -->
        <i-button @click="selectcopycancel" class="search-btn">取消</i-button>
      </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>
<script>
import TabHeader from "./tabHeader";
import OilPage from "../../../components/page/page.vue";
import dial from "@/assets/js/linkDial.js";
import {
  listProductTreeVOAll,
  queryProductByMemberId,
  getContractInfoList,
  disableUserProduct,
  activateUserProductById,
  userSelectList,
  delayUserProduct,
  batchDisable,
  batchActivation
} from "../../../components/axios/crm.js";
import {
  formData,
  formatStamp,
  formatTime,
  formatTime2,
  formatType
} from "../../../../assets/js/common.js";
import InvoiceInfoModal from "./invoiceInfoModal.vue";
import associateSearch from "../../../components/associateSearch/associateSearchCommon.vue";
export default {
  name: "privilegeManagement",
  data() {
    const validatesameid = (rule, value, callback) => {
      setTimeout(() => {
        var that = this;

        this.show = false;
        // if(!value){
        if (this.activeid == value) {
          callback(new Error("不能是同一个账号"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      extraPerson: "",
      urlSelectList: "crm/common/query-user-select-list",
      activeid: "",
      ruleInline: {
        userId: [
          {
            required: true,
            type: "number",
            message: "复制账号不能为空",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            type: "date",
            message: "到期时间不能为空",
            trigger: "change"
          }
        ]
      },
      activeformCustom: {},
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      endcopyTime: "",
      copyloading: false,
      loading: false,
      endTime: "",
      spinShow: false,
      hadselected: [],
      showdelaymodal: false,
      showcopymodal: false,
      productClass: [],
      invoiceInfoMsg: {},
      showInvoiceInfo: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 50, 100],
      tableData: [],
      formItem: {
        memberId: window.localStorage.getItem("lzMemberId")
      },
      extraData: {
        memberId: window.localStorage.getItem("lzMemberId")
      },
      statusType: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          title: "序号",
          width: 60,
          align: "center"
        },
        {
          key: "userName",
          title: "所属账号",
          minWidth: 120
        },
        {
          key: "productNameCn",
          title: "产品名称",
          minWidth: 100
        },
        {
          key: "productCategoryCodeName",
          title: "产品分类",
          minWidth: 160
        },
        {
          key: "type",
          title: "权限类型",
          minWidth: 120,
          render: (h, data) => {
            let statustext = "";
            this.powertype.map(item => {
              if (data.row.type == item.value) {
                statustext = item.desc;
              }
            });
            return h("span", {}, statustext);
          }
        },
        {
          key: "status",
          title: "是否过期",
          minWidth: 80,
          render: (h, data) => {
            return h("span", {}, data.row.status != 0 ? "未过期" : "过期");
          }
        },
        {
          key: "startTime",
          title: "开始时间",
          minWidth: 160,
          render: (h, data) => {
            return h(
              "span",
              data.row.startTime ? formatTime(data.row.startTime) : ""
            );
          }
        },
        {
          key: "endTime",
          title: "到期时间",
          minWidth: 160,
          render: (h, data) => {
            return h(
              "span",
              data.row.endTime ? formatTime(data.row.endTime) : ""
            );
          }
        },
        {
          key: "status",
          title: "当前状态",
          minWidth: 100,
          render: (h, data) => {
            let a = "";
            this.nowstatus.map(item => {
              if (data.row.status == item.value) {
                a = item.desc;
              }
            });
            return h("span", a);
          }
        },
        {
          title: "操作",
          minWidth: 200,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color:
                      data.row.status === 0
                        ? ""
                        : data.row.status === 1
                        ? "red"
                        : "#9ecd3f",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.isopen(data.row);
                    }
                  }
                },
                data.row.status === 0
                  ? ""
                  : data.row.status === 1
                  ? "禁用"
                  : "启用"
              )
            ]);
          }
        }
      ],
      contractAuditStatus: [],
      options2: [],
      nowstatus: [
        { desc: "过期", value: "0" },
        { desc: "激活", value: "1" },
        { desc: "禁用", value: "2" }
      ],
      powertype: [
        { desc: "试用", value: "0" },
        { desc: "正式", value: "1" },
        { desc: "免费", value: "2" }
      ],
      overdue: [{ desc: "过期", value: "1" }, { desc: "未过期", value: "2" }]
    };
  },
  components: {
    TabHeader,
    OilPage,
    InvoiceInfoModal,
    associateSearch
  },
  created() {
    this.getListPage();
    this.getallproducetype();
  },
  methods: {
    getAccount(value) {
      if (value) {
        this.formItem.userId = value.value || "";
      }
    },
    // 获取用户名称下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = true;
        this.activeformCustom.userName = query;
        setTimeout(() => {
          var data = new URLSearchParams();
          data.append("memberId", window.localStorage.getItem("lzMemberId"));
          data.append("userName", query);
          // let data = {
          //   memberId: window.localStorage.getItem("lzMemberId"),
          //   userName: query
          // };
          let that = this;
          userSelectList(data).then(res => {
            this.loading = false;
            this.options2 = res.response;
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    isopen(data) {
      let msg =
        data.status === 1
          ? "<p>是否确定禁用该条权限?</p>"
          : "<p>是否确定启用该条权限?</p>";
      this.$Modal.confirm({
        title: "提示",
        content: msg,
        onOk: () => {
          if (data.status === 1) {
            this.spinShow = true;
            disableUserProduct(data.id + "?id=" + data.id).then(res => {
              this.spinShow = false;
              this.$Message.success("禁用成功");
              this.getListPage();
            });
          } else {
            let a = {
              id: data.id
            };
            this.spinShow = true;
            activateUserProductById(a).then(res => {
              this.spinShow = false;
              this.$Message.success("启用成功");
              this.getListPage();
            });
          }
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        }
      });
    },
    // 获取列表数据
    getListPage() {
      let params = { ...this.formItem };

      params.status =
        this.formItem.status === undefined ? "" : this.formItem.status;
      params.auditStatus =
        this.formItem.auditStatus === undefined
          ? ""
          : this.formItem.auditStatus;
      params.pageSize = this.pageSize;
      params.pageNum = this.pageNum;
      params.type = this.formItem.type || "";
      params.isExpire = this.formItem.isExpire || "";
      params.startTime = params.startTime ? params.startTime.getTime() : "";
      params.endTime = params.endTime
        ? params.endTime.getTime() + 1000 * (60 * 60 * 24 - 1)
        : "";

      queryProductByMemberId(formData(params)).then(res => {
        this.tableData = res.response.list;
        this.total = res.response.total;
        this.$Spin.hide();
        this.tableData = res.response.list;
        this.total = res.response.total;
        this.tableData.map(item => {
          for (var i = 0; i < this.hadselected.length; i++) {
            if (this.hadselected[i].id == item.id) {
              item._checked = true;
            }
          }
        });
      });
    },
    // 获取产品分类
    getallproducetype() {
      var that = this;
      listProductTreeVOAll().then(resp => {
        that.productClass = this.breedDigui(resp.response);
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
      this.formItem.productCategoryCode = value[value.length - 1];
    },
    findlist() {
      this.pageSize = 10;
      this.pageNum = 1;
      this.getListPage();
    },
    // 重置
    reset() {
      this.formItem = {
        memberId: window.localStorage.getItem("lzMemberId"),
        productCategoryCode: ""
      };

      this.$refs.account.model = [];
    },
    cancelall(data, row) {
      this.hadselected = this.test(this.hadselected, this.tableData);
    },
    cancelone(data, row) {
      var a;
      this.hadselected.map((item, index) => {
        if (item.id == row.id) {
          a = index;
        }
      });
      this.hadselected.splice(a, 1);
    },
    //数组合并去重
    mergeArray(arr1, arr2) {
      var _arr = new Array();
      for (var i = 0; i < arr1.length; i++) {
        _arr.push(arr1[i]);
      }
      for (var i = 0; i < arr2.length; i++) {
        var flag = true;
        for (var j = 0; j < arr1.length; j++) {
          if (arr2[i].id == arr1[j].id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          _arr.push(arr2[i]);
        }
      }
      return _arr;
    },
    test(arr1, arr2) {
      var arr3 = [];
      for (var i = 0; i < arr1.length; i++) {
        var flag = true;
        for (var j = 0; j < arr2.length; j++) {
          if (arr1[i].id == arr2[j].id) flag = false;
        }
        if (flag) {
          arr3.push(arr1[i]);
        }
      }
      return arr3;
    },
    deleteone(index) {
      let obj = JSON.parse(JSON.stringify(this.hadselected[index]));
      this.tableData.map(item => {
        for (var i = 0; i < this.hadselected.length; i++) {
          if (this.hadselected[i].id == item.id) {
            item._checked = true;
          }
        }
      });
      this.tableData.map(item => {
        if (item.id == obj.id) {
          item._checked = false;
        }
      });
      this.hadselected.splice(index, 1);
      this.tableData = this.tableData.slice(0);
    },
    // 勾选产品
    selectedproduce(data) {
      if (this.hadselected == []) {
        this.hadselected = data;
      } else {
        this.hadselected = this.mergeArray(this.hadselected, data);
      }
    },
    selectcopyconfirm() {
      this.$refs.activeformCustom.validate(valid => {
        if (valid) {
          this.selectconfirm(1);
        }
      });
    },
    selectconfirm(val) {
      if (val) {
        if (this.copyloading) {
          return;
        }
      } else {
        if (this.loading) {
          return;
        }
        if (!this.endTime) {
          this.$Message.warning("延期时间必填");
          return;
        }
      }

      let firstlist = this.hadselected[0];
      let nowtime = new Date().getTime();
      let msg = {};
      let a = true;
      this.hadselected.map(item => {
        if (
          item.productCategoryCode.slice(0, 3) !=
          firstlist.productCategoryCode.slice(0, 3)
        ) {
          a = false;
        }
      });
      if (val) {
        msg.endTime = formatStamp(this.activeformCustom.endTime);
        for (var i = 0; i < this.hadselected.length; i++) {
          if (a) {
            if (firstlist.productCategoryCode.slice(0, 3) == "001" || firstlist.productCategoryCode == "002002" || firstlist.productCategoryCode == "002003") {
              if (msg.endTime - nowtime > 14 * 24 * 60 * 60 * 1000) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "最大延期天数为14天"
                );
                return;
              } else if (msg.endTime - nowtime < 0) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "延期时间必须大于结束时间"
                );
                return;
              }
            } else if (firstlist.productCategoryCode == "002001") {
              if (msg.endTime - nowtime > 7 * 24 * 60 * 60 * 1000) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "最大延期天数为7天"
                );
                return;
              } else if (msg.endTime - nowtime < 0) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "延期时间必须大于结束时间"
                );
                return;
              }
            }
          } else {
            if (
              this.hadselected[i].productCategoryCode.slice(0, 3) == "002" ||
              this.hadselected[i].productCategoryCode.slice(0, 3) == "001"
            ) {
              if (
                this.hadselected[i].productCategoryCode == "002001"
              ) {
                if (msg.endTime - nowtime > 7 * 24 * 60 * 60 * 1000) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "最大延期天数为7天"
                  );
                  return;
                }
              } else if (msg.endTime - nowtime < 0) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "延期时间必须大于结束时间"
                );
                return;
              }
            } else {
              this.$Message.warning(
                i +
                  1 +
                  "." +
                  this.hadselected[i].productNameCn +
                  "产品分类不能延期"
              );
              return;
            }
          }
        }
      } else {
        msg.endTime = formatStamp(this.endTime);
        for (var i = 0; i < this.hadselected.length; i++) {
          if (a) {
            if (firstlist.productCategoryCode.slice(0, 3) == "001" || firstlist.productCategoryCode == "002002" || firstlist.productCategoryCode == "002003") {
              if (this.hadselected[i].status == "0") {
                if (msg.endTime - nowtime > 14 * 24 * 60 * 60 * 1000) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "最大延期天数为14天"
                  );
                  return;
                } else if (msg.endTime - nowtime < 0) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "延期时间必须大于结束时间"
                  );
                  return;
                }
              } else {
                if (
                  msg.endTime - this.hadselected[i].endTime >
                  14 * 24 * 60 * 60 * 1000
                ) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "最大延期天数为14天"
                  );
                  return;
                } else if (msg.endTime - this.hadselected[i].endTime < 0) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "延期时间必须大于结束时间"
                  );
                  return;
                }
              }
            } else if (firstlist.productCategoryCode == "002001") {
              if (this.hadselected[i].status == "0") {
                if (msg.endTime - nowtime > 7 * 24 * 60 * 60 * 1000) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "最大延期天数为7天"
                  );
                  return;
                } else if (msg.endTime - nowtime < 0) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "延期时间必须大于结束时间"
                  );
                  return;
                }
              } else {
                if (
                  msg.endTime - this.hadselected[i].endTime >
                  7 * 24 * 60 * 60 * 1000
                ) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "最大延期天数为7天"
                  );
                  return;
                } else if (msg.endTime - this.hadselected[i].endTime < 0) {
                  this.$Message.warning(
                    i +
                      1 +
                      "." +
                      this.hadselected[i].productNameCn +
                      "延期时间必须大于结束时间"
                  );
                  return;
                }
              }
            }
          } else {
            if (
              this.hadselected[i].productCategoryCode.slice(0, 3) == "002" ||
              this.hadselected[i].productCategoryCode.slice(0, 3) == "001"
            ) {
            } else {
              this.$Message.warning(
                i +
                  1 +
                  "." +
                  this.hadselected[i].productNameCn +
                  "产品分类不能延期"
              );
              return;
            }
            if (this.hadselected[i].status == "0") {
              if (msg.endTime - nowtime > 7 * 24 * 60 * 60 * 1000) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "最大延期天数为7天"
                );
                return;
              } else if (msg.endTime - nowtime < 0) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "延期时间必须大于结束时间"
                );
                return;
              }
            } else {
              if (
                msg.endTime - this.hadselected[i].endTime >
                7 * 24 * 60 * 60 * 1000
              ) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "最大延期天数为7天"
                );
                return;
              } else if (msg.endTime - this.hadselected[i].endTime < 0) {
                this.$Message.warning(
                  i +
                    1 +
                    "." +
                    this.hadselected[i].productNameCn +
                    "延期时间必须大于结束时间"
                );
                return;
              }
            }
          }
        }
      }
      let list = this.hadselected.map(item => {
        if (val) {
          return {
            userId: this.activeformCustom.userId,
            id: item.id,
            endTime: msg.endTime
          };
        } else {
          return {
            id: item.id,
            endTime: msg.endTime
          };
        }
      });
      if (val) {
        this.copyloading = true;
      } else {
        this.loading = true;
      }

      delayUserProduct(list).then(res => {
        if (val) {
          this.copyloading = false;
          this.showcopymodal = false;
        } else {
          this.loading = false;
          this.showdelaymodal = false;
        }

        this.$Message.success(res.message);
        this.hadselected = [];
        this.getListPage();
      });
    },
    selectcopycancel() {
      this.showcopymodal = false;
      this.copyloading = false;
      this.$forceUpdate();
    },
    selectcancel() {
      this.loading = false;
      this.showdelaymodal = false;
      this.$forceUpdate();
    },
    // 复制权限
    copypower() {
      if (this.hadselected.length == 0) {
        this.$Message.warning("至少勾选一条权限。");
        return;
      } else {
        this.showcopymodal = true;
      }
    },
    // 延期按钮
    delaypower() {
      if (this.hadselected.length == 0) {
        this.$Message.warning("至少勾选一条权限。");
        return;
      }

      this.showdelaymodal = true;
    },
    // 查看
    check(data) {
      this.$router.push({
        name: "checkContact",
        query: {
          contractCode: data.row.contractCode,
          bussinessId: data.row.id
        }
      });
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
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
    },
    // 批量禁用 / 激活
    Batch(type) {
      if (this.hadselected.length === 0) {
        this.$Message.warning("至少勾选一条权限。");
        return;
      }

      let ids = [];

      this.hadselected.forEach(x => {
        ids.push(x.id);
      });

      let params = {
        ids: ids.toString()
      };

      if (type === "disable") {
        batchDisable(formData(params)).then(res => {
          this.$Message.success("批量禁用成功");
          this.hadselected = [];
          this.getListPage();
        });
      } else {
        batchActivation(params).then(res => {
          this.$Message.success("批量激活成功");
          this.hadselected = [];
          this.getListPage();
        });
      }
    }
  }
};
</script>
