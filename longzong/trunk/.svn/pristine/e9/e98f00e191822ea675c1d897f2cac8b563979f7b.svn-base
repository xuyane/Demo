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
      </Row>
      <Row type="flex" justify="space-between">
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
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="handleRowChange">
      </Table>
      <div class="page-con">
        <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
        <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-sizer show-elevator :page-size-opts="pageSizeOpt"
          @on-change="changePageNum" @on-page-size-change="changePageSize" class="pull-right" />
      </div>
    </Row>
    </Col>
    <Modal v-model="showRefoundModal" title="申请退款" width="490"  @on-visible-change="switchVisible('refund')">
        <!-- @on-visible-change="switchVisible('refund')" -->
      <Row type="flex" justify="space-between">
        <Form :label-width="120"   ref="form" :model="formValidate" :rules="formRule">
          <Col span="22">
          <FormItem label="本次退款金额:" prop="vale3">
            <Input class="search-input" v-model="formValidate.vale3"></Input>

          </FormItem>
          </Col>
          <Col span="22">
          <FormItem label="退款原因:" prop="vale4">
            <Input type="textarea" :rows="4" v-model="formValidate.vale4" />
            <!-- v-model="formValidate.vale4"  -->
          </FormItem>
          </Col>
        </Form>
      </Row>
      <div slot="footer" span="24" class="mar-top-20 text-c">
        <Button type="primary"  @click="doRefound('form')" >确定</Button>
        <Button style="margin-left:8px;"  @click="reCancel" >返回</Button>
      </div>
    </Modal>
  </Row>

</template>
<script>
  import axios from "axios";
  import { checkManager } from "../components/axios/finance.js";
  import { formatThousandPrice } from "../../assets/js/common.js";
  export default {
    name: "myAccountIndex",
    data() {
      const validatePrice = (rule, value, callback) => {
        let reg = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/;
        if (reg.test(value)) {
          callback();
        } else {
          if (value == 0 && value !== "") {
            callback();
          } else {
            callback(new Error('请输入数字，小数后只能有两位'));
          }
        }
      };
      return {
        formValidate: {
          vale3: '',
          vale4: ''
        },
        formRule: {
          vale3: [
            { validator: validatePrice, trigger: 'blur' },
          ],
          vale4: [
            { required: true, message: '请输入退款原因', trigger: 'blur change' },
            { type: 'string', min: 1, max: 50, message: '退款原因字数不能超过50个字', trigger: 'blur change' }
          ]
        },
        tab: 1,
        addForm: {
        },
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
            key: "id",
            title: "序号",
            align: "center",
            minWidth: 70
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
            // key: "creatorName",
            align: "center",
            title: "操作",
            minWidth: 80,
            render: (h, data) => {
              return h("a", {
              /*  style: {
                  color: '#ccc',
                  cursor: 'not-allowed'
                },*/
                on: {
                  click: () => {
                    this.openRefoundModal(data);
                  }
                }
              }, "申请退款")
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
          vale3: '',
          vale4: ''
        },

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
      this.payTypeEnum();
    },
    methods: {
      //打开退款申请弹窗
      openRefoundModal(data) {
        this.showRefoundModal=true;
        this.dataRow = data.row;
      },
      //返回
      reCancel(){
        this.showRefoundModal=false;
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
      switchVisible(para) {
        if (para == "import") {
          this.values = "";
          this.values1 = "";
        } else if (para == "refund") {
          this.$refs.form.resetFields();
        }
      },
     doRefound(name) {//退款中确定按钮
        let that = this;
        let form = {
          transferId: this.dataRow.id,
          note: this.formValidate.vale4,
          refundAmount: this.formValidate.vale3,
          times: new Date().getTime()
        };

        this.$refs[name].validate((valid) => {
          if (valid) {
            axios({
              url: "/finance/account_transfer/refund_apply",
              method: "get",
              params: form
            }).then(resp => {
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
        })

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
      accountTransfer() {//总共的数据 总额显示
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
            endTime = new Date(_this.value3[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
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
          transferEndTime: endTime //到账结束时间
        };

        let that = this;
        this.$Spin.show();
        axios({
          url: "/finance/account_transfer/list_total_page",
          method: "get",
          params: forms
        })
          .then(resp => {
            //console.log(resp)
            _this.value10 = resp.data.response.sumRefundAmt;
            _this.value11 = resp.data.response.sumTransferAccountAmt;
            this.$Spin.hide();
          })
          .catch(err => {
            this.$Spin.hide();
          });
      },
      query(da) {//查询数据
        if (da) {
          this.pageNum = 1;
          // this.accountTransfer();
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
            endTime = new Date(_this.value3[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
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

        checkManager(forms).then(resp => {
          if (resp.status === "200") {
            _this.tableData = resp.response.list || [];
            console.log('tableData', _this.tableData);
            _this.dataCount = resp.response.total;
            _this.$Spin.hide();
            // _this.accountTransfer();
          } else {
            _this.$Message.warning("无数据");
            _this.$Spin.hide();
          }
        });
      },




      clearAttach() {
        this.values1 = "";
        this.showDelete = false;
      }
    }
  };
</script>
