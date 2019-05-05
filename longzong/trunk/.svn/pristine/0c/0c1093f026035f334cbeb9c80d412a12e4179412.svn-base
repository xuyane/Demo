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
          <Col span="12">跟踪记录</Col>
          <Col span="12">通话记录</Col>
        </Row>
    </p>
    <Row>
      <Col span='12'>
        <div class="historywrap">
        <div v-if='tableData.length==0'>跟踪记录暂无数据</div>
        <div v-else>
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
      </div>
      
      </Col>
      <Col span="12">
        <div class="historywrap">
          <div v-if='callData.length==0'>通话记录暂无数据</div>
          <div v-else>
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
    </Row>
    <div slot="footer">
      <Row>
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
} from "../../components/axios/crm.js";
import {
  formData,
  formatTime,
  formatStamp,
  formatTime2
} from "../../../assets/js/common.js";
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
    // 获取所有跟踪状态
    getAllFollowTypes() {
      queryServiceStatusList().then(res => {
        this.followTypes = res.response.filter(item => item.value >= 0);
        this.followTypes2 = res.response;
      });
    },
    getcalllist() {
      let that = this;
      this.$Spin.show();
      let params = {
        pageNum: 1,
        pageSize: 20,
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
    },
    hideAdd() {
      this.showAddModal = false;
      this.$refs.input1.query = "";
    }
  },
  watch: {
    showFollowModal(newVal, oldVal) {
      this.showModal = newVal;
    },
    rowData(newVal, oldVal) {
      this.lineData = newVal;
      this.gethistorylist();
      this.getcalllist();
      this.getAllFollowTypes();
    }
  }
};
</script>
