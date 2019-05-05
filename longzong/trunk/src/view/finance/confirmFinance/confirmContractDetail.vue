<style lang="less" scoped>
.clor-txt-blue {
  color: #0000ff;
}
.font-size14px {
  font-size: 14px;
}
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;合同认账&nbsp;&nbsp;>>&nbsp;&nbsp;认账详情
    </Row>
    </Col>
    <Col span="24" class="product-addAccount-detail-out">
    <Row>
      <Col span="24" class="font-s18">合同信息</Col>
      <Col span="24" class="mar-t-20">
      <Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true"></Table>
      </Col>
      <Col span="24" class="font-s18 mar-t-20">合同产品信息</Col>
      <Col span="24" class="mar-t-20">
      <Table class="tableCommon" :data="tableData2" :columns="columns2" ref="dragTable" :stripe="true" :border="true"></Table>
      </Col>
      <Col span="24" class="font-s18 mar-t-20">已认账记录</Col>
      <Col span="24" class="mar-t-20"><Button type="primary" @click="addMes">添加</Button></Col>
      <Col span="24">
      <Modal :footer-hide="true" v-model="modal4" title="请选择到账记录" width="1300">
        <Row>
          <Col span="24">
          <Form :model="form">
            <Col span="9">
            <FormItem label="到账金额:" :label-width="72">
              <Col span="8"><Input v-model="form.totalAmoutMin" placeholder="起始金额" @on-keyup="numberInput(form.totalAmoutMin,'min')"></Input></Col>
              <Col span="2" class="text-center">~</Col>
              <Col span="8"><Input v-model="form.totalAmoutMax" placeholder="结束金额" @on-keyup="numberInput(form.totalAmoutMax,'max')"></Input></Col>
            </FormItem>
            </Col>
            <Col span="11">
            <FormItem label="请选择时间段" :label-width="96">
              <DatePicker type="daterange" :value="times" @on-change="timeChange" placement="bottom" placeholder="请选择时间" style="width:88%;"></DatePicker>
            </FormItem>
            </Col>
            <Col span="4">
            <div class="clear">
              <Button class="pull-right" @click="resetForm" style="margin-left: 8px">重置</Button>
              <Button class="pull-right" type="primary" @click="search">查询</Button>
            </div>
            </Col>
          </Form>
          </Col>
          <Col span="24">
          <Col span="14">&nbsp;</Col>
          <Col span="10" class="font-size14px text-right">
          <label>合同编号：<b class="clor-txt-blue">{{contractCode}}</b></label>
          <label>合同待认账金额：<b class="clor-txt-blue">{{formatPrice(amoutUnAck)}}</b></label>
          </Col>
          </Col>
          <Col span="24" class="mar-t-20">
          <Table class="tableCommon" :data="tableDataAlert" :columns="columnsAlert" ref="dragTable" :stripe="true" :border="true"></Table>
          <oil-page :total="total" :page-num="form.pageNum" :page-size="form.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
          </Col>
        </Row>
        <Row>
          <Col span="24" class="text-center mar-t-20">
          <Button type="primary" @click="modal4=false">返回</Button>
          </Col>
        </Row>
      </Modal>
      </Col>
      <Col span="24" class="mar-t-20">
      <Table class="tableCommon" :data="tableData3" :columns="columns3" ref="dragTable" :stripe="true" :border="true"></Table>
      </Col>
      <Col span="24" class="mar-t-20 ivu-modal-footer">
      <Button @click="goBack">返回</Button>
      </Col>
    </Row>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";
import { formatThousandPrice, formatTime } from "../../../assets/js/common";
import { Message, Modal } from "iview";
import oilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import OilPage from "../../components/page/page.vue";
export default {
  name: "blackList",
  components: {
    oilPage
  },
  data() {
    return {
      dataOne: "",
      total: 12,
      pageSizeOpts: [5, 10, 20],
      showSizer: true,
      amoutUnAck: 0.0,
      tableDataAlert: [],
      columnsAlert: [
        {
          key: "transferTimeDes",
          align: "",
          title: "到账时间",
          minWidth: 150
        },
        {
          key: "totalAmout",
          align: "",
          title: "到账金额",
          minWidth: 130,
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
          key: "payTypeDes",
          align: "",
          title: "支付方式",
          minWidth: 100
        },
        {
          key: "accountTypeDes",
          align: "",
          title: "账户类型",
          minWidth: 90
        },
        {
          key: "transferNo",
          align: "",
          title: "交易流水号",
          minWidth: 180
        },
        {
          key: "transferFrom",
          align: "",
          title: "来源",
          ellipsis: true,
          tooltip: true,
          minWidth: 150
        },
        {
          key: "note",
          align: "",
          title: "备注",
          minWidth: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "sumRefund",
          align: "",
          title: "退款金额",
          minWidth: 80,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.sumRefund)
              )
            ]);
          }
        },
        {
          key: "sumAckDetail",
          align: "",
          title: "已认账金额",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.getConfirmRecord(data.row.transferId);
                    }
                  }
                },
                formatThousandPrice(data.row.sumAckDetail)
              )
            ]);
          }
        },
        {
          key: "sumSurplus",
          align: "",
          title: "可认账金额",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.sumSurplus)
              )
            ]);
          }
        },
        {
          key: "ackDetailContract",
          align: "",
          title: "本次认账",
          minWidth: 150,
          render: (h, data) => {
            if (Number(data.row.sumSurplus) == 0) {
              return h("div", "0.00");
            } else {
              // return h('div', [
              //   h('InputNumber', {
              //     class: "inTableInput",
              //     props: {
              //       value: data.row.ackDetailContract
              //     },
              //     on: {
              //       'input'(event) {
              //         data.row.ackDetailContract = event;
              //       }
              //     }
              //   }, data.row.ackDetailContract)
              // ])
              let that = this;
              // that.dataOne =
              data.row.ackDetailContract =
                data.row.sumSurplus >= that.amoutUnAck
                  ? that.amoutUnAck
                  : data.row.sumSurplus;
              return h("div", [
                h(
                  "InputNumber",
                  {
                    class: "inTableInput",
                    props: {
                      value:
                        data.row.sumSurplus >= that.amoutUnAck
                          ? that.amoutUnAck
                          : data.row.sumSurplus
                    },
                    on: {
                      input(event) {
                        //  = event;
                        data.row.ackDetailContract =
                          data.row.sumSurplus >= that.amoutUnAck
                            ? that.amoutUnAck
                            : data.row.sumSurplus;
                        data.row.ackDetailContract = event;
                      }
                    }
                  },
                  data.row.sumSurplus >= that.amoutUnAck
                    ? that.amoutUnAck
                    : data.row.sumSurplus
                )
              ]);
            }
          }
        },
        {
          align: "",
          title: "操作",
          minWidth: 60,
          render: (h, data) => {
            if (data.row.sumSurplus == 0) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "#cccccc",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "添加"
                )
              ]);
            } else {
              let that = this;
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "#145edb",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        // if (data.row.ackDetailContract > data.row.sumSurplus) {
                        //   Modal.warning({
                        //     title: '信息提示',
                        //     content: '输入金额不能大于可认账金额：<span style="color:red;">' + data.row.sumSurplus + '</span>'
                        //   });
                        //   return false;
                        // } else if (data.row.ackDetailContract <= 0) {
                        //   Modal.warning({
                        //     title: '信息提示',
                        //     content: '输入的金额不可小于或等于0'
                        //   });
                        //   return false;
                        // }
                        // this.add(data.row);
                        // if (that.dataOne > data.row.sumSurplus) {
                        //   Modal.warning({
                        //     title: '信息提示',
                        //     content: '输入金额不能大于可认账金额：<span style="color:red;">' + data.row.sumSurplus + '</span>'
                        //   });
                        //   return false;
                        // }else if(that.dataOne > that.amoutUnAck){
                        //   Modal.warning({
                        //     title: '信息提示',
                        //     content: '输入金额不能大于合同待认账金额：<span style="color:red;">' + that.amoutUnAck + '</span>'
                        //   });
                        //   return false;
                        // }else if (that.dataOne <= 0) {
                        //   Modal.warning({
                        //     title: '信息提示',
                        //     content: '输入的金额不可小于或等于0'
                        //   });
                        //   return false;
                        // }else{
                        this.add(data.row);
                        // }
                      }
                    }
                  },
                  "添加"
                )
              ]);
            }
          }
        }
      ],
      modal4: false,

      //合同编号
      contractCode: "",
      hash: null,
      vals: 0,
      tableData3: [],
      columns3: [
        {
          key: "transferTimeDes",
          align: "",
          title: "到账时间",
          minWidth: 100
        },
        {
          key: "payTypeDes",
          align: "",
          title: "支付方式",
          minWidth: 100
        },
        {
          key: "accountTypeDes",
          align: "",
          title: "账户类型",
          minWidth: 120
        },
        {
          key: "transferNo",
          align: "",
          title: "交易流水号",
          minWidth: 160
        },
        {
          key: "transferFrom",
          align: "",
          title: "来源(户名)",
          minWidth: 150
        },
        {
          key: "note",
          align: "",
          title: "备注",
          minWidth: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "totalAmout",
          align: "",
          title: "到账金额",
          minWidth: 150,
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
          key: "sumRefund",
          align: "",
          title: "退款金额",
          minWidth: 80,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.sumRefund)
              )
            ]);
          }
        },
        {
          key: "sumSurplus",
          align: "",
          title: "剩余金额",
          minWidth: 80,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.sumSurplus)
              )
            ]);
          }
        },
        {
          key: "ackDetailContract",
          align: "",
          title: "认账金额",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.ackDetailContract)
              )
            ]);
          }
        }
      ],
      columns1: [
        {
          key: "code",
          align: "center",
          title: "合同编号",
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
                      this.goheCode(data.row.code);
                    }
                  }
                },
                data.row.code
              )
            ]);
          }
        },
        {
          key: "name",
          align: "center",
          title: "合同名称",
          minWidth: 120
        },
        {
          key: "partA",
          align: "center",
          title: "客户名称",
          minWidth: 150
        },
        {
          key: "totalAmount",
          align: "center",
          title: "合同总金额",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.totalAmount)
              )
            ]);
          }
        },
        {
          key: "amoutAcked",
          align: "center",
          title: "已认账金额",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.amoutAcked)
              )
            ]);
          }
        },
        {
          key: "amoutUnAck",
          align: "center",
          title: "待认账金额",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.amoutUnAck)
              )
            ]);
          }
        },
        {
          key: "creatorName",
          align: "center",
          title: "业务员",
          minWidth: 90
        },
        {
          key: "creatorDeptName",
          align: "center",
          title: "所在部门",
          minWidth: 90
        }
      ],
      tableData1: [],
      columns2: [
        {
          key: "productNameCn",
          align: "center",
          title: "产品名称",
          minWidth: 120
        },
        {
          key: "serviceTime",
          align: "center",
          title: "服务时段",
          minWidth: 120
        },
        {
          key: "standardPrice",
          align: "center",
          title: "标准定价",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.standardPrice)
              )
            ]);
          }
        },
        {
          key: "price",
          align: "center",
          title: "实际定价",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.price)
              )
            ]);
          }
        },
        {
          key: "number",
          align: "center",
          title: "数量",
          minWidth: 80
        },
        {
          key: "productPrice",
          align: "center",
          title: "产品金额",
          minWidth: 90,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.productPrice)
              )
            ]);
          }
        }
      ],
      tableData2: [],
      times: [
        formatTime(new Date().getTime() - 24 * 60 * 60 * 1000),
        formatTime(new Date().getTime())
      ],
      form: {
        transferTimeStart: "",
        totalAmoutMax: "",
        totalAmoutMin: "",
        transferTimeEnd: "",
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    var locationHash = location.hash;
    var strLen = locationHash.indexOf("contractBaseId=") / 1 + 15;
    this.hash = Number(locationHash.slice(strLen));
    this.getJSON(Number(locationHash.slice(strLen)));
    //拿到产品信息
    this.getCodeData(this.hash);
    this.tableData2.map(item => {
      if (item.openState == "未开通") {
        item["_checked"] = false;
        item["_disabled"] = false;
      } else {
        item["_checked"] = true;
        item["_disabled"] = true;
      }
    });
  },
  methods: {
    formatPrice(num) {
      return formatThousandPrice(num);
    },
    //金额只允许输入数字
    numberInput(value, type) {
      if (value != "") {
        if (type == "min") {
          this.form.totalAmoutMin = value.replace(/[^\d.]/g, "");
        }
        if (type == "max") {
          this.form.totalAmoutMax = value.replace(/[^\d.]/g, "");
        }
      }
    },
    goheCode(contractNo) {
      let routeData = this.$router.resolve({
        name: "checkContact",
        query: {
          contractCode: contractNo
        }
      });
      window.open(routeData.href, "_blank");
    },
    //获取已认账金额列上的认账记录
    getConfirmRecord(transferId) {
      axios({
        url: "/finance/accountackcontract/listAccountTransferAckDetail",
        method: "get",
        params: { transferId: transferId }
      })
        .then(resp => {
          if (resp.data.status == "200") {
            let arr_str = resp.data.response.join(" ， ");
            Modal.info({
              title: "认账记录",
              content: arr_str,
              okText: "关闭"
            });
          } else {
            this.$Message.warning("请求出错");
          }
        })
        .catch(err => {
          this.$Message.warning(err.message);
        });
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.form.pageNum = page;
      }
      if (pageSize) {
        this.form.pageSize = pageSize;
      }
      this.getList();
    },
    //获取关联数据
    getLinkData(dat) {
      let that = this;
      axios({
        url: "/finance/accountackcontract/listAccountTransferAck",
        method: "get",
        params: {
          contratcNo: dat,
          timestamp: new Date().getTime()
        }
      })
        .then(function(res) {
          if (res.data.message == "OK" || res.data.status == "200") {
            if (res.data.response.length > 0) {
              res.data.response.forEach(function(e, v, arr) {
                arr[v]._checked = false;
              });
              that.tableData3 = res.data.response;
            } else {
              return false;
            }
          }
          that.$Spin.hide();
        })
        .catch(err => {
          that.$Spin.hide();
        });
    },
    search() {
      this.pageChange(1, 10);
    },

    //获取列表信息
    getList() {
      let that = this;
      this.$Spin.show();
      // const formatStamp = date => {
      //   return new Date(date).getTime()
      // }
      // if (this.form.transferTimeStart) {
      //   this.form.transferTimeStart = formatStamp(this.form.transferTimeStart);
      //   this.form.transferTimeEnd = formatStamp(this.form.transferTimeEnd);
      // }
      axios({
        url: "/finance/accountackcontract/listAccountTransfer",
        method: "post",
        data: formData(this.form)
      })
        .then(function(res) {
          if (res.data.status == 200) {
            if (
              res.data.response.list == null ||
              res.data.response.list.length < 1
            ) {
              that.tableDataAlert = [];
            } else {
              that.tableDataAlert = res.data.response.list;
              for (let i in res.data.response.list) {
                // that.tableDataAlert[i].ackDetailContract = res.data.response.list[i].sumSurplus;
              }
              that.total = res.data.response.total;
            }
          }
          that.$Spin.hide();
        })
        .catch(err => {
          that.$Spin.hide();
        });
    },
    //重置form表单
    resetForm() {
      this.form = {
        transferTimeStart: "",
        totalAmoutMax: "",
        totalAmoutMin: "",
        transferTimeEnd: "",
        pageNum: 1,
        pageSize: 10
      };
      this.times = [];
    },
    cancel() {
      this.$Message.info("click cancel");
    },

    //打开弹框
    addMes() {
      let dat = this.hash;
      this.times = [
        formatTime(new Date().getTime() - 24 * 60 * 60 * 1000),
        formatTime(new Date().getTime())
      ];
      this.timeChange(this.times);
      axios({
        //判断是否可以认账
        url: "/finance/accountackcontract/judgeCanAccountAck",
        method: "get",
        params: {
          contractBaseId: Number(dat)
        }
      })
        .then(res => {
          if (res.data.status == '200') {
            this.modal4 = true;
            this.contractCode = this.tableData1[0].code;
            this.search();
          } else {
            this.prompt('warning', '提示信息', res.data.message);
          }
        })
        .catch(err => {
          this.prompt("error", "提示信息", err.message);
          return false;
        });
    },
    //由合同id查询合同产品信息
    getCodeData(dat) {
      var that = this;
      axios({
        url: "/finance/contractOpen/notice",
        method: "get",
        params: {
          id: dat
        }
      })
        .then(res => {
          if (res.data.status == "200") {
            that.tableData2 = res.data.response.list[0].productRepVO;
          } else {
            this.prompt("warning", "提示信息", res.data.message);
          }
        })
        .catch(err => {
          this.prompt("error", "提示信息", err.message);
        });
    },
    //由id跳转获取数据
    getJSON(str) {
      axios({
        url: "/finance/accountackcontract/detailContract",
        method: "get",
        params: {
          contractBaseId: str,
          timestamp: new Date().getTime()
        }
      })
        .then(res => {
          if (res.data.status == "200") {
            this.getLinkData(res.data.response.code);

            this.tableData1 = [
              {
                code: res.data.response.code,
                name: res.data.response.name,
                partA: res.data.response.partA,
                totalAmount: res.data.response.totalAmount,
                amoutAcked: res.data.response.amoutAcked,
                amoutUnAck: res.data.response.amoutUnAck,
                creatorName: res.data.response.creatorName,
                creatorDeptName: res.data.response.creatorDeptName
              }
            ];
            this.amoutUnAck = res.data.response.amoutUnAck;
          } else {
            this.prompt("warning", "提示信息", res.data.message);
          }
        })
        .catch(err => {
          this.prompt("error", "提示信息", err.message);
        });
    },
    add(datas) {
      // debugger;
      // datas.ackDetailContract = this.dataOne;
      let minus = Number(this.amoutUnAck) - Number(datas.ackDetailContract);
      let _this = this;
      if (datas.ackDetailContract > datas.sumSurplus) {
        Modal.warning({
          title: "信息提示",
          content:
            '输入金额不能大于可认账金额：<span style="color:red;">' +
            data.sumSurplus +
            "</span>"
        });
      } else if (datas.ackDetailContract < 0) {
        Modal.warning({
          title: "信息提示",
          content: "输入的金额不可小于0"
        });
      } else {
        if (minus < 0) {
          Modal.info({
            title: "信息提示",
            content: "该合同认账金额已超，请调整",
            okText: "返回"
          });
        } else if (minus == 0) {
          Modal.confirm({
            title: "信息提示",
            content:
              "该合同已经完全认账，产品将自动开通。点击确认后自动开通，点击取消重新选择",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
              _this.addAccount(datas, minus);
            },
            onCancel: () => {}
          });
        } else {
          Modal.confirm({
            title: "信息提示",
            content:
              '该合同还有未认账金额<span style="color:red;">' +
              minus.toFixed(2) +
              "</span>，无法自动开通。点击确认添加认账，点击取消则重新添加。",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
              _this.addAccount(datas, minus);
            },
            onCancel: () => {}
          });
        }
      }
    },

    //添加认账
    addAccount(datas, minus) {
      let ackDetail = [
        {
          ackDetailAmount: datas.ackDetailContract,
          transferId: datas.transferId
        }
      ];
      axios({
        url: "/finance/accountackcontract/doAccountAck",
        method: "post",
        data: {
          ackDetail: ackDetail,
          contractBaseId: this.hash,
          timestamp: new Date().getTime()
        }
      })
        .then(res => {
          if (res.data.status == "200") {
            this.prompt("success", "提示信息", res.data.message);
            this.getJSON(this.hash);
            this.getCodeData(this.hash);

            //添加成功，刷新关联数据
            this.getLinkData(this.hash);

            //刷新弹框列表
            this.getList();
            if (minus == 0) {
              this.$router.push({
                name: "confirmcontractList"
              });
            }
          }
        })
        .catch(err => {
          this.prompt("error", "提示信息", err.message);
          return false;
        });
    },
    prompt(type, tit, cont) {
      const title = tit;
      const content = cont;
      switch (type) {
        case "info":
          Modal.info({
            title: title,
            content: content
          });
          break;
        case "success":
          Modal.success({
            title: title,
            content: content
          });
          break;
        case "warning":
          Modal.warning({
            title: title,
            content: content
          });
          break;
        case "error":
          Modal.error({
            title: title,
            content: content
          });
          break;
      }
    },
    //time change
    timeChange(data) {
      if (data[0] == "" || data[1] == "") {
        this.form.transferTimeStart = "";
        this.form.transferTimeEnd = "";
      } else {
        let data1 = (data[0] + " 00:00:00").toString();
        let data2 = (data[1] + " 23:59:59").toString();
        let data1_val = new Date(
          Date.parse(data1.replace(/-/g, "/"))
        ).getTime();
        let data2_val = new Date(
          Date.parse(data2.replace(/-/g, "/"))
        ).getTime();
        this.form.transferTimeStart = data1_val;
        this.form.transferTimeEnd = data2_val;
      }
    },
    goBack() {
      //返回
      this.$router.push({
        name: "confirmcontractList"
      });
    }
  },
  mounted() {
    this.timeChange(this.times);
  }
};
</script>
