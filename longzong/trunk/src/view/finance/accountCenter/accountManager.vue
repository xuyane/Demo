<style lang="less" scoped>
.font-c-blue {
  color: #145edb;
}

.font-14 {
  font-size: 14px;
}

.my-account-out .my-customer-top {
  padding-left: 15px !important;
}

.mar-top-20 {
  margin-top: 20px;
}

.btn-text {
  text-align: right;
  padding: 30px 0px 0px 0;
  span {
    margin-left: 20px;
  }
  i {
    font-style: normal;
  }
}

.my-account-conter {
  background: #fff;
}

.p-text {
  text-align: center;
}

.mar-left-36 {
  margin-left: 36px;
}

.margin-bottom-20 {
  margin-bottom: 20px;
}

.file-box {
  position: relative;
  width: 340px;
}

.txt {
  height: 36px;
  border: 1px solid #605f5f;
  width: 180px;
  padding-left: 10px;
  margin-left: 14px;
}

.btn {
  background-color: #fff;
  border: 1px solid #605f5f;
  height: 36px;
  width: 66px;
}

.file {
  position: absolute;
  top: 0;
  right: 80px;
  height: 36px;
  opacity: 0;
  width: 260px;
  cursor: pointer;
}

.delete {
  position: absolute;
  color: red;
  top: 5px;
  right: 80px;
  font-size: 16px;
}
</style>


<template>
  <Row class="my-account-out">
    <Col span="24" class="search-form">
    <Form ref="addForm" :label-width="100">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="支付方式:">
          <Select class="form-select" v-model="value1">
            <Option v-for="item in payStyle" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <Row>
          <Col span="7">
          <Select class="search-input" v-model="value2">
            <Option v-for="item in timeList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          </Col>
          <Col span="17">
          <DatePicker type="daterange" v-model="value3" class="search-input" placeholder="请选择"></DatePicker>
          </Col>
        </Row>
        </Col>
        <Col span="7">
        <FormItem label="账号:">
          <Input class="search-input" v-model="value4"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="到账金额:">
          <Col span="11">
          <Input v-model="value5" class="search-input" placeholder="最小金额" @on-blur="validatePrice"></Input>
          </Col>
          <Col span="2" class="text-center">--</Col>
          <Col span="11">
          <Input v-model="value6" class="search-input" placeholder="最大金额" @on-blur="validatePrice1"></Input>
          </Col>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="交易流水号:">
          <Input class="search-input" v-model="value7"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="来源(户名):">
          <Input class="search-input" v-model="value8"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="24" class="mar-top-20 text-right margin-bottom-20">
        <Button type="primary" @click="query(1)">查询</Button>
        <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Row>
    </Form>

    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <Row>
        <Col class="btn-container" span="12">
        <Button type="primary" class="search-btn" @click="addAccount">新增</Button>
        <Button type="primary" class="search-btn" @click="openMoreImportModal">批量导入</Button>
        <Button :loading = "loadExport" type="primary" class="search-btn" @click="exportExcle">导出</Button>
        <Button type="error" class="search-btn" @click="moreDeleteData">批量删除</Button>
        </Col>
        <Col span="12" class="text-right font-14"> 到账总金额：
        <span class="font-c-blue mar-r-10">{{formatPrice(this.value11)}}</span>
        退款总金额:
        <span class="font-c-blue">{{formatPrice(this.value10)}}</span>
        </Col>
      </Row>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="handleRowChange">

      </Table>
      <div class="page-con">
        <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
        <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-sizer show-elevator :page-size-opts="pageSizeOpt"
          @on-change="changePageNum" @on-page-size-change="changePageSize" class="pull-right" />
      </div>
    </Row>
    </Col>

    <Modal v-model="showMoreImportModal" title="到账导入" width="690" @on-visible-change="switchVisible('import')">
      <Row type="flex" justify="space-between">
        <Col span="24">
        <Row type="flex" justify="space-between">
          <Col span="3">
          <div style="line-height:34px;">请选择模版：</div>
          </Col>
          <Col span="12">
          <Select class="form-select" v-model="values" :label-width="120">
            <Option v-for="item in payList" :value="item.value" :key="item.value" label="">{{item.label}}</Option>
          </Select>
          </Col>
          <Col span="8" style="margin-left:15px;">
          <div style="line-height:34px;">
            <a href="javascript:void(0)" @click="handleUpload">模板下载</a>
          </div>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="mar-top-20 ">
        <div class="file-box">
          <span class="mar-left-36">附件：</span>
          <input type='text' name='textfield' id='textfield' class='txt' v-model="values1" />
          <input type="file" name="fileField" class="file" @change="beforeUpload($event)" id="headExcel" size="28" />
          <label class="delete" @click="clearAttach" v-show="showDelete">
            <Icon type="md-close" />
          </label>
        </div>

        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="fileImport">导入</Button>
        <Button type="primary" @click="clear">重置</Button>
        <Button style="margin-left:8px;" @click="importCancel">返回</Button>
      </div>
    </Modal>
    <Modal v-model="showRefoundModal" title="退款(多打款)" width="490" @on-visible-change="switchVisible('refund')">
      <Row type="flex" justify="space-between">
        <Form :label-width="120" ref="form" :model="formValidate" :rules="formRule">
          <Col span="22">
          <FormItem label="剩余到账金额:">
            <Input class="search-input " v-model="vale1" disabled></Input>
          </FormItem>
          </Col>
          <Col span="22">
          <FormItem label="认账金额:">
            <Input class="search-input" v-model="vale2" disabled></Input>
          </FormItem>
          </Col>
          <Col span="22">
          <FormItem label="本次退款金额:" prop="vale3">
            <Input class="search-input" v-model="formValidate.vale3"></Input>
          </FormItem>
          </Col>
          <Col span="22">
          <FormItem label="退款原因:" prop="vale4">
            <Input v-model="formValidate.vale4" type="textarea" :rows="4" />
          </FormItem>
          </Col>
        </Form>
      </Row>
      <div slot="footer" span="24" class="mar-top-20 text-c">
        <Button type="primary" @click="doRefound('form')">确定</Button>
        <Button style="margin-left:8px;" @click="reCancel">返回</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import axios from "axios";
import topAccount from "./accountTop.vue";
import { getAccountManager } from "../../components/axios/finance.js";
import { formatThousandPrice } from "../../../assets/js/common.js";
export default {
  name: "myAccountIndex",
  components: {
    topAccount
  },
  data() {
    const validatePrice = (rule, value, callback) => {
      let reg = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/;
      if (reg.test(value)) {
        callback();
      } else {
        if (value == 0 && value !== "") {
          callback();
        } else {
          callback(new Error("请输入数字，小数后只能有两位"));
        }
      }
    };
    return {
      tab: 1,
      loadExport: false,
      addForm: {},
      timeList: [
        {
          value: "0",
          label: "到账时间"
        },
        {
          value: "1",
          label: "导入时间"
        }
      ],
      payStyle: [],
      payList: [],
      columns: [
        {
          type: "selection",
          align: "center",
          minWidth: 40
        },
        {
          key: "id",
          title: "序号",
          align: "center",
          minWidth: 70
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
          key: "accountNo",
          align: "center",
          title: "账号",
          minWidth: 180
        },
        {
          key: "transferFrom",
          align: "center",
          title: "来源(户名)",
          minWidth: 180
        },
        {
          key: "note",
          align: "center",
          title: "备注",
          minWidth: 200,
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.note.length > 12
                  ? params.row.note.slice(0, 12) + "..."
                  : params.row.note,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.note
                )
              ]
            );
          }
        },
        {
          key: "totalAmout",
          align: "center",
          title: "到账金额",
          minWidth: 80,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.totalAmout)
              )
            ]);
          }
        },
        {
          key: "refundAmount",
          align: "center",
          title: "退款金额",
          minWidth: 80,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.refundAmount)
              )
            ]);
          }
        },
        {
          key: "recognableAmount",
          align: "center",
          title: "可认账金额",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.recognableAmount)
              )
            ]);
          }
        },
        {
          key: "transferTime",
          align: "center",
          title: "到账时间",
          minWidth: 150
        },
        {
          key: "createTime",
          align: "center",
          title: "导入时间",
          minWidth: 150
        },
        {
          key: "creatorName",
          align: "center",
          title: "导入人",
          minWidth: 80
        },
        {
          title: "操作",
          align: "center",
          minWidth: 150,
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
                      this.openRefoundModal(data); //退款事件
                    }
                  }
                },
                "退款"
              ),
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
                      this.nextDetails(data);
                    }
                  }
                },
                "查看"
              ),
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
                      this.deleteData(data);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [],
      showSizer: true,
      dataCount: 0,
      pageSize: 10,
      pageNum: 1,
      pageSizeOpt: [10, 15, 20, 40, 50, 100],
      value1: "",
      value2: "0",
      value3: [],
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: "",
      value10: "",
      value11: "",
      refundAmount: "",
      formValidate: {
        vale3: "",
        vale4: ""
      },
      formRule: {
        vale3: [{ validator: validatePrice, trigger: "blur" }],
        vale4: [
          { required: true, message: "请输入退款原因", trigger: "blur change" },
          {
            type: "string",
            min: 1,
            max: 50,
            message: "退款原因字数不能超过50个字",
            trigger: "blur change"
          }
        ]
      },
      showDeleteModal: false,
      showRefoundModal: false,
      showMoreDeleteModal: false,
      showMoreImportModal: false,
      showDelete: false,
      vale1: "",
      vale2: "",
      selectRow: [],
      ids: [],
      status: 0,
      values: "",
      totalAmout: "",
      states: "",
      dataRow: "",
      values1: "",
      file: ""
    };
  },
  created() {
    this.getCurrentMonthFirst();
    this.getCurrentMonthLast();
    this.query();
    this.accountTransfer();
    this.payTypeEnum();
    this.payLists();
  },
  methods: {
    formatPrice(num) {
      return formatThousandPrice(num);
    },
    validatePrice() {
      if (isNaN(Number(this.value5))) {
        this.value5 = "";
      }
    },
    validatePrice1() {
      if (isNaN(Number(this.value6))) {
        this.value6 = "";
      }
    },
    getCurrentMonthFirst() {
      let date = new Date();
      let month = date.getMonth();
      let monthFirstDay = new Date(date.getFullYear(), month, 1);
      this.value3[0] = new Date(monthFirstDay);
    },
    getCurrentMonthLast() {
      let date = new Date();
      let nextMonth = date.getMonth() + 1;
      let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      let oneDay = 1000 * 60 * 60 * 24;
      this.value3[1] = new Date(nextMonthFirstDay - oneDay);
    },

    payLists() {
      let that = this;
      axios({
        url: "/finance/common/selectBankAndThirdPay",
        method: "get",
        params: {
          timestamp: new Date().getTime()
        }
      })
        .then(resp => {
          if (resp.data.status == "200") {
            const payList = resp.data.response.filter(item => {
              if (
                item.value != "120006" &&
                item.value != "120100" &&
                item.value != "120005"
              ) {
                return item;
              }
            });

            that.payList = payList.map(obj => {
              return {
                value: obj.value,
                label: obj.desc
              };
            });
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
          type: "PayTypeEnum",
          timestamp: new Date().getTime()
        }
      })
        .then(resp => {
          if (resp.data.status == "200") {
            that.payStyle = resp.data.response.map(item => {
              return {
                value: item.value,
                label: item.desc
              };
            });
          } else {
            // that.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {
          this.$Message.warning(err.message);
        });
    },
    nextDetails(data) {
      //操作中的查看事件
      this.$router.push({
        name: "accountDetail",
        query: {
          id: data.row.id,
          tab: this.tab
        }
      });
    },
    addAccount() {
      //新增
      this.$router.push({
        name: "addAccount"
      });
    },
    reset() {
      this.value1 = "";
      this.value2 = "0";
      this.getCurrentMonthFirst();
      this.getCurrentMonthLast();
      this.value4 = "";
      this.value5 = "";
      this.value6 = "";
      this.value7 = "";
      this.value8 = "";
    },
    //打开退款弹窗
    openRefoundModal(data) {
      //点击退款事件
      let that = this;
      that.dataRow = data.row;
      axios({
        url: "/finance/account_transfer/refund_info",
        method: "get",
        params: {
          transferId: data.row.id,
          timestamp: new Date().getTime()
        }
      })
        .then(resp => {
          if (resp.data.message == "OK" || resp.data.status == "200") {
            that.vale1 = resp.data.response.totalAmout;
            that.vale2 = resp.data.response.accountAmount;
            // this.refundAmount = resp.data.response.refundAmount;
            that.formValidate.vale3 = resp.data.response.refundAmount;
            that.formValidate.vale4 = "";
          } else {
            that.$Message.warning(resp.message);
          }
        })
        .catch(err => {
          this.$Message.warning(err.message);
        });

      this.showRefoundModal = true;
    },

    openMoreDeleteModal() {
      this.showMoreDeleteModal = true;
    },
    openMoreImportModal() {
      this.showMoreImportModal = true;
    },
    reCancel() {
      this.showRefoundModal = false;
    },
    moCancel() {
      this.showMoreDeleteModal = false;
    },
    importCancel() {
      this.showMoreImportModal = false;
    },
    switchVisible(para) {
      if (para == "import") {
        this.values = "";
        this.values1 = "";
      } else if (para == "refund") {
        this.$refs.form.resetFields();
      }
    },
    moreDeleteData() {
      let that = this;
      if (this.selectRow.length === 0) {
        this.$Message.warning("请勾选数据");
      } else {
        this.ids = this.selectRow.map(v => {
          return parseInt(v.id);
        });
        let form = "ids[]=" + this.ids;
        this.$Modal.confirm({
          title: "批量删除提示",
          content: "<p>请确定是否删除勾选数据？</p>",
          onOk: () => {
            axios({
              url: "/finance/account_transfer/delete",
              method: "post",
              data: form
            })
              .then(resp => {
                if (resp.data.status == "200") {
                  that.$Message.success("批量删除成功");
                  that.query();
                } else {
                  that.$Message.warning(resp.data.message);
                }
              })
              .catch(err => {
                this.$Message.warning(err.message);
              });
          },
          onCancel: () => {}
        });
      }
    },
    deleteData(data) {
      let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定删除？",
        onOk: () => {
          let form = "ids[]=" + data.row.id;
          axios({
            url: "/finance/account_transfer/delete",
            method: "post",
            data: form
          })
            .then(resp => {
              if (resp.data.status == "200") {
                _this.query();
              } else {
                _this.$Message.warning(resp.data.message);
              }
            })
            .catch(err => {
              _this.$Message.warning(err.message);
            });
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        }
      };
      this.$Modal.confirm(config);
    },
    doRefound(name) {
      //退款中确定按钮
      let that = this;
      let form = {
        transferId: this.dataRow.id,
        note: this.formValidate.vale4,
        refundAmount: this.formValidate.vale3,
        times: new Date().getTime()
      };

      this.$refs[name].validate(valid => {
        if (valid) {
          axios({
            url: "/finance/account_transfer/refund",
            method: "get",
            params: form
          })
            .then(resp => {
              if (resp.data.status == "200") {
                that.$Message.success(resp.data.message);
                that.showRefoundModal = false;
                that.query();
                that.accountTransfer();
              } else {
                that.$Message.warning(resp.data.message);
                that.showRefoundModal = false;
              }
            })
            .catch(err => {
              this.$Message.warning(err.message);
            });
        } else {
          return;
        }
      });
    },
    clear() {
      this.values = "";
      this.values1 = "";
      this.$Message.success("重置成功");
    },
    changePageNum(current) {
      this.pageNum = current;
      this.query();
    },
    // 监听修改显示条数
    changePageSize(size) {
      this.pageSize = size;
      this.query();
    },
    handleRowChange(row) {
      this.selectRow = row;
    },
    accountTransfer() {
      //总共的数据 总额显示
      let _this = this;
      this.$Spin.show();
      if (this.value1 === "125001") {
        this.states = 125001;
      } else if (this.value1 === "125002") {
        this.states = 125002;
      } else if (this.value1 === "125003") {
        this.states = 125003;
      } else {
        this.states = 125100;
      }
      let startTime = "";
      let endTime = "";
      if (this.value3.length == 0) {
        startTime = "";
        endTime = "";
      } else {
        if (_this.value3[0] == "") {
          startTime = "";
        } else {
          startTime = new Date(_this.value3[0]).getTime();
        }
        if (_this.value3[1] == "") {
          endTime = "";
        } else {
          endTime =
            new Date(_this.value3[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
        }
      }
      let forms = {
        accountNo: _this.value4, //账号
        payType: _this.value1 == -1 ? null : _this.value1, //支付类型
        timeStatus: _this.value2, //时间类型，0是到账时间 1是导入时间
        totalAmoutMax: _this.value6, //到账总金额最大值
        totalAmoutMin: _this.value5, //到账总金额最小值
        transferFrom: _this.value8, //付款来源
        transferNo: _this.value7, //交易流水号
        transferStartTime: startTime, //到账开始时间
        transferEndTime: endTime, //到账结束时间
        timestamp: new Date().getTime()
      };

      let that = this;
      this.$Spin.show();
      axios({
        url: "/finance/account_transfer/list_total_page",
        method: "get",
        params: forms
      })
        .then(resp => {
          _this.value10 = resp.data.response.sumRefundAmt;
          _this.value11 = resp.data.response.sumTransferAccountAmt;
          this.$Spin.hide();
        })
        .catch(err => {
          this.$Spin.hide();
        });
    },

    query(da) {
      //查询数据
      if (da) {
        this.pageNum = 1;
        this.accountTransfer();
      }
      let _this = this;
      _this.$Spin.show();
      if (this.value1 === "125001") {
        this.states = 125001;
      } else if (this.value1 === "125002") {
        this.states = 125002;
      } else if (this.value1 === "125003") {
        this.states = 125003;
      } else {
        this.states = null;
      }
      let startTime = "";
      let endTime = "";
      if (this.value3.length == 0) {
        startTime = "";
        endTime = "";
      } else {
        if (_this.value3[0] == "") {
          startTime = "";
        } else {
          startTime = new Date(_this.value3[0]).getTime();
        }
        if (_this.value3[1] == "") {
          endTime = "";
        } else {
          endTime =
            new Date(_this.value3[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
        }
      }
      let forms = {
        accountNo: _this.value4, //账号
        pageNum: _this.pageNum, //分页页码
        pageSize: _this.pageSize, //分页大小
        payType: _this.value1 == -1 ? null : _this.value1, //支付类型
        timeStatus: _this.value2, //时间类型，0是到账时间 1是导入时间
        totalAmoutMax: _this.value6, //到账总金额最大值
        totalAmoutMin: _this.value5, //到账总金额最小值
        transferFrom: _this.value8, //付款来源
        transferNo: _this.value7, //交易流水号
        transferStartTime: startTime, //到账开始时间
        transferEndTime: endTime //到账结束时间
      };
      forms.times = new Date().getTime();
      getAccountManager(forms).then(resp => {
        if (resp.status === "200") {
          _this.tableData = resp.response.list ? resp.response.list : [];
          _this.dataCount = resp.response.total;
          _this.$Spin.hide();
          _this.accountTransfer();
        } else {
          _this.$Message.warning("无数据");
          _this.$Spin.hide();
        }
      });
      // axios({
      //   url: "/finance/account_transfer/list_page",
      //   method: "get",
      //   params: forms
      // })
      //   .then(resp => {
      //     if (resp.data.status === "200") {
      //       _this.tableData = resp.data.response.list ? resp.data.response.list : [];
      //       _this.dataCount = resp.data.response.total;
      //       _this.$Spin.hide();
      //       _this.accountTransfer();
      //     } else {
      //       _this.$Message.warning("无数据");
      //       _this.$Spin.hide();
      //     }
      //   })
      //   .catch(err => {
      //     _this.$Spin.hide();
      //   });
    },
    exportExcle() {
      // 导出 Excel 数据
      let _this = this;
      if (this.value1 === "125001") {
        this.states = 125001;
      } else if (this.value1 === "125002") {
        this.states = 125002;
      } else if (this.value1 === "125003") {
        this.states = 125003;
      } else {
        this.states = 125100;
      }
      let startTime = "";
      let endTime = "";
      if (this.value3.length == 0) {
        startTime = "";
        endTime = "";
      } else {
        if (_this.value3[0] == "") {
          startTime = "";
        } else {
          startTime = new Date(_this.value3[0]).getTime();
        }
        if (_this.value3[1] == "") {
          endTime = "";
        } else {
          endTime =
            new Date(_this.value3[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
        }
      }

      let forms = {
        accountNo: _this.value4, //账号
        payType: this.value1 == -1 ? null : this.value1, //支付类型
        timeStatus: _this.value2, //时间类型，0是到账时间 1是导入时间
        totalAmoutMax: _this.value6, //到账总金额最大值
        totalAmoutMin: _this.value5, //到账总金额最小值
        transferFrom: _this.value8, //付款来源
        transferNo: _this.value7, //交易流水号
        transferStartTime: startTime, //到账开始时间
        transferEndTime: endTime, //到账结束时间
        timestamp: new Date().getTime()
      };
      this.loadExport = true;
      axios({
        url: "/finance/account_transfer/export",
        method: "get",
        params: forms
      }).then(res => {
        if (res.data.status === "500") {
          this.$Message.warning(res.data.message);
        } else if (res.data.status === "100043") {
          /* this.$Modal.warning({
              content: '当前数据超过一万条，请分批导出'
           });*/
          this.$Modal.warning({
            render: h => {
              return h(
                "Alert",
                {
                  props: {
                    type: "warning"
                  },
                  style: {
                    "background-color": "transparent",
                    "border-color": "transparent"
                  }
                },
                "当前数据超过一万条，请分批导出"
              );
            }
          });
        } else {
          window.location.href =
            "/finance/account_transfer/export?accountNo=" +
            forms.accountNo +
            "&pageNum=" +
            this.pageNum +
            "&pageSize=" +
            this.pageSize +
            "&payType=" +
            forms.payType +
            "&sign=&timeStatus=" +
            forms.timeStatus +
            "&totalAmoutMax=" +
            forms.totalAmoutMax +
            "&totalAmoutMin=" +
            forms.totalAmoutMin +
            "&transferEndTime=" +
            forms.transferEndTime +
            "&transferFrom=" +
            forms.transferFrom +
            "&transferNo=" +
            forms.transferNo +
            "&transferStartTime=" +
            forms.transferStartTime;
        }
        this.loadExport = false;
      });
    },
    handleUpload() {
      if (this.values == "") {
        this.$Message.error('请选择所要下载模板类型')
      } else {
        let uploadUrl = "/finance/account_transfer/download_excel?code=" + this.values;
        window.location.href = uploadUrl;
      }
    },
    fileImport() {
      //文件导入
      let that = this;
      let form = document.getElementById("headExcel");
      let file = form.files[0];
      let fileFormData = new FormData();
      fileFormData.append("code", this.values);
      fileFormData.append("multipartFile", file);
      axios({
        url: "/finance/account_transfer/import",
        method: "post",
        data: fileFormData
      })
        .then(resp => {
          if (resp.data.status == "200") {
            this.$Message.success("导入成功");
            this.showMoreImportModal = false;
            this.$Spin.hide();
            that.query();
            that.accountTransfer();
          } else {
            this.$Message.success(resp.data.message);
            this.$Spin.hide();
          }
        })
        .catch(err => {
          this.$Spin.hide();
        });
    },
    beforeUpload(event) {
      this.file = event.target.files[0];
      if (this.file != undefined) {
        const extension = this.file.name.split(".")[1] === "xls";
        const extension2 = this.file.name.split(".")[1] === "xlsx";
        if (!extension && !extension2) {
          this.values1 = "";
          this.showDelete = false;
          this.$Message.warning("上传模板只能是 xls、xlsx格式!");
          return false; // 返回false不会自动上传
        } else {
          this.values1 = this.file.name;
          this.showDelete = true;
        }
      }
      return false;
    },
    clearAttach() {
      this.values1 = "";
      this.showDelete = false;
    }
  }
};
</script>
