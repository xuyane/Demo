<style lang="less" scoped>
.font-c-blue {
  color: #145edb;
}
.font-14 {
  font-size: 14px;
}
.my-customer-top {
  padding-left: 15px !important;
}
.btn-text {
  text-align: right;
  span {
    margin-left: 20px;
  }
  i {
    font-style: normal;
  }
}
.refound-title {
  font-size: 16px;
  color: rgb(0, 0, 0);
}
</style>

<template>
  <Row class="my-association-out">
    <Col span="24" class="search-form">
    <Form ref="addForm" :label-width="100" class="my-account-conter">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="支付方式:">
          <Col span="12">
          <Select class="search-input" @on-change="onchange" v-model="params.payType" placeholder="请选择">
            <Option v-for="item in payStyle" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          </Col>
          <Col span="12">
          <Select class="search-input" v-model="params.accountType" placeholder="请选择">
            <Option v-for="item in bankList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          </Col>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="到账时间:">
          <DatePicker v-model="dateRange" type="daterange" class="search-input" placeholder="请选择到账时间"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="认账状态:">
          <Select class="form-select" v-model="params.status" placeholder="请选择">
            <Option v-for="item in payStatus" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="到账金额:">
          <Col span="11">
          <Input class="search-input" v-model="params.totalAmoutStart" placeholder="最小金额" @on-blur="validatePrice"></Input>
          </Col>
          <Col span="2" class="text-center">--</Col>
          <Col span="11">
          <Input class="search-input" v-model="params.totalAmoutEnd" placeholder="最大金额" @on-blur="validatePrice1"></Input>
          </Col>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="交易流水号:">
          <Input class="search-input" v-model="params.transferNo"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="付款来源:">
          <Input class="search-input" v-model="params.transferFrom"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="合同编号:">
          <Input class="search-input" v-model="params.contractNo"></Input>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" @click="searchList">查询</Button>
        <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <Row class="btn-text">
        <Col span="24" class="text-right font-14 mar-b-10 table-text">
        <span>到账总金额：</span><i class="font-c-blue mar-r-10">{{formatPrice(this.totalAmout)}}</i>
        <span>退款总金额：</span><i class="font-c-blue mar-r-10">{{formatPrice(this.totalRefundAmt)}}</i>
        <span>已认账：</span><i class="font-c-blue mar-r-10">{{formatPrice(this.ackTotalAmt)}}</i>
        <span>未认账：</span><i class="font-c-blue">{{formatPrice(this.notAckTotalAmt)}}</i>
        </Col>
      </Row>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
      </Table>
      <div class="page-con">
        <span>第{{params.pageNum}}页 / 共{{Math.ceil(dataCount / params.pageSize)}}页 每页{{params.pageSize}}条 共{{dataCount}}条</span>
        <Page :total="dataCount" :current="params.pageNum" :page-size="params.pageSize" show-sizer show-elevator :page-size-opts="pageSizeOpt" @on-change="changePageNum" @on-page-size-change="changePageSize" class="pull-right" />
      </div>
    </Row>
    </Col>
    <Col span="24" class="mar-t-20">
    <Row class-name="table-con" v-show="showContractDetail">
      <span class="refound-title">合同信息</span>
      <Table class="tableCommon mar-top-20" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true">
      </Table>
    </Row>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";
import topAccount from "./accountTop.vue";
import { formatThousandPrice } from "../../../assets/js/common.js"
export default {
  name: "myAccountIndex",
  components: {
    topAccount
  },
  data() {
    return {
      tab: 2,
      payStyle: [],
      thirdList: [],
      bankLists: [],
      cashList: [
        {
          value: "125002",
          label: "现金"
        }
      ],
      bankList: [],
      payStatus: [],
      columns: [
        {
          key: "transferId",
          title: "到账ID",
          align: "center",
          minWidth: 70,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.getInfo(data.row.transferId)
                    }
                  }
                },
                data.row.transferId
              )
            ]);
          }
        },
        {
          key: "payTypeDesc",
          align: "center",
          title: "支付方式",
          minWidth: 100
        },
        {
          key: "transferNo",
          align: "center",
          title: "交易流水号",
          minWidth: 180
        },
        {
          key: "accountTypeDesc",
          align: "center",
          title: "账户类型",
          minWidth: 80
        },
        {
          key: "transferTime",
          align: "center",
          title: "到账时间",
          minWidth: 160
        },
        {
          key: "transferFrom",
          align: "center",
          title: "来源(户名)",
          minWidth: 200
        },
        {
          key: "note",
          align: "center",
          title: "备注",
          minWidth: 160,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "accountNo",
          align: "center",
          title: "打款账号",
          minWidth: 160
        },
        {
          key: "totalAmout",
          align: "center",
          title: "到账金额",
          minWidth: 80,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                },
              }, formatThousandPrice(data.row.totalAmout))
            ])
          }
        },
        {
          key: "totalRefundAmt",
          align: "center",
          title: "退款金额",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.goRefoundDetail(data);
                    }
                  }
                },
                formatThousandPrice(data.row.totalRefundAmt)
              )
            ]);
          }
        },
        {
          key: "ackTotalAmt",
          align: "center",
          title: "已认账金额",
          minWidth: 100,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                },
              }, formatThousandPrice(data.row.ackTotalAmt))
            ])
          }
        },
        {
          key: "notAckTotalAmt",
          align: "center",
          title: "未认账金额",
          minWidth: 100,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                },
              }, formatThousandPrice(data.row.notAckTotalAmt))
            ])
          }
        }
      ],
      tableData: [],
      columns1: [
        {
          key: "contractNo",
          title: "合同编号",
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.goheCode(data.row.contractNo);
                    }
                  }
                },
                data.row.contractNo
              )
            ]);
          }
        },
        {
          key: "contractName",
          align: "center",
          title: "合同名称"
        },
        {
          key: "customerName",
          align: "center",
          title: "客户名称",
        },
        {
          key: "totalAmt",
          align: "center",
          title: "合同总金额",
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                },
              }, formatThousandPrice(data.row.totalAmt))
            ])
          }
        },
        {
          key: "statusDesc",
          align: "center",
          title: "合同状态"
        },
        {
          key: "curAccountPayableAmt",
          align: "center",
          title: "当前到账认账金额",
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                },
              }, formatThousandPrice(data.row.curAccountPayableAmt))
            ])
          }
        },
        {
          key: "salesman",
          align: "center",
          title: "业务员",
        },
        {
          key: "departName",
          align: "center",
          title: "所在部门",
        }
      ],
      showContractDetail: false,
      tableData1: [],
      showSizer: true,
      dataCount: 0,
      pageSizeOpt: [10,15,20,40,50,100],
      params: {
        contractNo: "", //合同号
        pageNum: 1, //分页页码
        pageSize: 10, //分页大小
        payType: "", //支付类型
        accountType: "",
        status: "", //认账状态
        totalAmoutEnd: "", //到账总金额最大值
        totalAmoutStart: "", //到账总金额最小值
        transferFrom: "", //付款来源
        transferNo: "", //交易流水号
        transferStartTime: "", //到账开始时间
        transferEndTime: "" //到账结束时间
      },
      dateRange: [],
      totalAmout: "",
      totalRefundAmt: "",
      ackTotalAmt: "",
      notAckTotalAmt: "",
      states: "",
      status: "",
      dataRow: {}
    };
  },
  watch: {
    tableData1() {
      this.$nextTick(() => {
        let scrollMain = document.getElementsByClassName("Main")[0];
        let scrollHeight = scrollMain.scrollHeight;
        scrollMain.scrollTop = scrollHeight;
      })
    }
  },
  created() {
    this.getCurrentMonth();
    this.payTypeEnum();
    this.totalAccount();
    this.EbankTypeEnum();
    this.ThirdPayTypeEnum();
    this.AckStatusEnum();
    this.query();
    this.onchange();
  },
  methods: {
    formatPrice(num) {
      return formatThousandPrice(num)
    },
    validatePrice() {
      if (isNaN(Number(this.params.totalAmoutStart))) {
        this.params.totalAmoutStart = "";
      }
    },
    validatePrice1() {
      if (isNaN(Number(this.params.totalAmoutEnd))) {
        this.params.totalAmoutEnd = "";
      }
    },
    getCurrentMonth() {
      let date = new Date();
      date.setDate(1);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setHours(0);
      let date1 = new Date();
      let nextMonth = date1.getMonth() + 1;
      let nextMonthFirstDay = new Date(date1.getFullYear(), nextMonth, 1);
      let oneDay = 1000 * 60 * 60 * 24;
      this.dateRange = [date,new Date(nextMonthFirstDay - oneDay)]
      this.params.transferStartTime = new Date(this.dateRange[0]).getTime();
      this.params.transferEndTime = new Date(this.dateRange[1]).getTime();
    },
    searchList() {
      this.changePageNum(1)
    },
    reset() {
      this.params = {
        contractNo: "", //合同号
        pageNum: 1, //分页页码
        pageSize: 10, //分页大小
        payType: "", //支付类型
        accountType: "",
        status: "", //认账状态
        totalAmoutEnd: "", //到账总金额最大值
        totalAmoutStart: "", //到账总金额最小值
        transferFrom: "", //付款来源
        transferNo: "", //交易流水号
        transferStartTime: "", //到账开始时间
        transferEndTime: "" //到账结束时间

      }
      this.getCurrentMonth();
      this.showContractDetail = false;
      this.params.transferStartTime = new Date(this.dateRange[0]).getTime();
      this.params.transferEndTime = new Date(this.dateRange[1]).getTime();
    },
    goRefoundDetail(data) {
      let route = this.$router.resolve({
        name: "accountDetail",
        query: {
          id: data.row.transferId,
          tab: this.tab
        }
      });
      window.open(route.href, '_blank');
    },
    AckStatusEnum() {
      let that = this;
      axios({
        url: "/finance/common/select",
        method: "get",
        params: {
          type: "AckStatusEnum"
        }
      }).then(resp => {
        if (resp.data.status == "200") {
          const payStatus = resp.data.response.map(item => {
            return {
              value: item.value,
              label: item.desc
            };
          });
          that.payStatus = payStatus;
        } else {
          // that.$Message.warning(resp.data.message);
        }
      })
        .catch(err => {
          this.$Message.warning(err.message);
        });
    },
    payTypeEnum() {
      let that = this;
      axios({
        url: "/finance/common/select",
        method: "get",
        params: {
          type: "PayTypeEnum"
        }
      })
        .then(resp => {
          if (resp.data.status == "200") {
            const payStyle = resp.data.response.map(item => {
              return {
                value: item.value,
                label: item.desc
              };
            });
            that.payStyle = payStyle;
          } else {
            // that.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {
          this.$Message.warning(err.message);
        });
    },
    ThirdPayTypeEnum() {
      let that = this;
      axios({
        url: "/finance/common/select",
        method: "get",
        params: {
          type: "ThirdPayTypeEnum"
        }
      }).then(resp => {
        if (resp.data.status == "200") {
          const thirdList = resp.data.response.map(item => {
            return {
              value: item.value,
              label: item.desc
            };
          });
          that.thirdList = thirdList;
        } else {
          // that.$Message.warning(resp.data.message);
        }
      })
        .catch(err => {
          this.$Message.warning(err.message);
        });
    },
    EbankTypeEnum() {
      let that = this;
      axios({
        url: "/finance/common/select",
        method: "get",
        params: {
          type: "EbankTypeEnum"
        }
      })
        .then(resp => {
          if (resp.data.status == "200") {
            const bankLists = resp.data.response.map(item => {
              return {
                value: item.value,
                label: item.desc
              };
            });
            that.bankLists = bankLists;
          } else {
            // that.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {
          this.$Message.warning(err.message);
        });
    },
    onchange() {
      if (this.params.payType === "125002") {
        this.params.accountType = "";
        this.bankList = this.cashList;
      } else if (this.params.payType === "125003") {
        this.params.accountType = "";
        this.bankList = this.thirdList;
      } else if (this.params.payType === "125001") {
        this.params.accountType = "";
        this.bankList = this.bankLists;
      } else if (this.params.payType === "125100") {
        this.params.accountType = "125100";
        this.bankList = [{ value: "125100", label: "其他" }];
      }
    },
    getInfo(transferId) {
      axios({
        url: '/finance/account_transfer/list_relation_item_page',
        method: 'get',
        params: {
          transferId: transferId
        }
      }).then(resp => {
        if (resp.data.status == '200') {
          this.showContractDetail = true;
          this.tableData1 = resp.data.response.list ? resp.data.response.list : [];
        } else {
          // this.$Message.warning(resp.data.message)
        }
      }).catch(err => {
        this.$Message.warning(err.message)
      })
    },
    totalAccount() {
      let that = this;
      axios({
        url: "/finance/account_transfer/list_relation_total_page",
        method: "get",
        params: this.params
      })
        .then(resp => {
          if (resp.data.status == "200") {
            that.totalAmout = resp.data.response.totalAmout;
            that.totalRefundAmt = resp.data.response.totalRefundAmt;
            that.ackTotalAmt = resp.data.response.ackTotalAmt;
            that.notAckTotalAmt = resp.data.response.notAckTotalAmt;
          } else {
            // that.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {
          this.$Message.warning(err.message);
        });
    },
    query() {//查询按钮
      let that = this;
      that.$Spin.show();
      axios({
        url: "/finance/account_transfer/list_relation_page",
        method: "get",
        params: this.params
      })
        .then(resp => {
          if (resp.data.status == "200") {
            that.tableData = resp.data.response.list ? resp.data.response.list : [];
            that.dataCount = resp.data.response.total;
            that.$Spin.hide();
          } else {
            // that.$Message.warning(resp.data.message);
            that.$Spin.hide();
          }
        })
        .catch(err => {
          that.$Message.warning(err.message);
          that.$Spin.hide();
        });
    },
    changePageNum(current) {
      this.params.pageNum = current;
      this.showContractDetail = false;
      if (this.dateRange.length == 0) {
        this.params.transferStartTime = "";
        this.params.transferEndTime = "";
      } else {
        if (this.dateRange[0] == "") {
          this.params.transferStartTime = "";
        } else {
          this.params.transferStartTime = new Date(this.dateRange[0]).getTime();
        }
        if (this.dateRange[1] == "") {
          this.params.transferEndTime = "";
        } else {
          this.params.transferEndTime = new Date(this.dateRange[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
        }
      }
      this.query();
      this.totalAccount();
    },
    // 监听修改显示条数
    changePageSize(size) {
      this.params.pageSize = size;
      this.query();
    },
    goheCode(contractNo) {
      let routeData = this.$router.resolve({
        name: "waittingCheck",
        query: {
          contractCode: contractNo
        }
      });
      window.open(routeData.href, '_blank');
    },
  }
};
</script>


