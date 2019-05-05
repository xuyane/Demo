<style lang="less" scoped>
.refound-title {
  font-size: 16px;
  color: rgb(0, 0, 0);
}
.myDetails {
  background: #ffffff;
  padding: 30px 20px;
}
.infoTable {
  border: 1px solid rgb(187, 187, 187);
  border-collapse: collapse;
  width: 100%;
}
.infoTable td {
  border: 1px solid rgb(187, 187, 187);
  // width: auto;
  height: 52px;
  text-align: center;
}
.bac {
  background: #eee;
  width:300px;
}
.bac-text{
  width:calc(50%-300px);
}
.text-c {
  text-align: center;
}
.mar-top-20 {
  margin-top: 20px;
}
</style>

<template>
   <Row class="my-detail-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;到账管理&nbsp;&nbsp;>>&nbsp;&nbsp;查看
      </Row>
    </Col>
    <Col span="24" class="myDetails mar-top-20">
        <Col span="24">
            <span class="refound-title">到账信息</span>
            <Row>
                <Col span="24">
                    <table class="infoTable mar-top-20" >
                        <tr>
                            <td class="bac">支付方式</td>
                            <td>{{this.value1}}</td>
                            <td class="bac">账户类型</td>
                            <td>{{this.value2}}</td>
                        </tr>
                        <tr>
                            <td class="bac">交易流水号</td>
                            <td>{{this.value3}}</td>
                            <td class="bac">来源（支付/支付人信息）</td>
                            <td>{{this.value4}}</td>
                        </tr>
                        <tr>
                            <td class="bac">开户行</td>
                            <td>{{this.value5}}</td>
                            <td class="bac">备注</td>
                            <td>{{this.value6}}</td>
                        </tr>
                        <tr>
                            <td class="bac">打款账号</td>
                            <td>{{this.value7}}</td>
                            <td class="bac">到账时间</td>
                            <td>{{this.value8}}</td>
                        </tr>
                        <tr>
                            <td class="bac">到账金额</td>
                            <td>{{formatPrice(this.value9)}}</td>
                            <td class="bac">退款总金额</td>
                            <td>{{formatPrice(this.value10)}}</td>
                        </tr>
                        <tr>
                            <td class="bac">剩余金额</td>
                            <td>{{formatPrice(this.value11)}}</td>
                            <td class="bac"></td>
                            <td></td>
                        </tr>
                    </table>
                </Col>
            </Row>
        </Col>
        <Col span="24" class="mar-top-20">
            <span class="refound-title">退款记录</span>
            <Table class="tableCommon mar-top-20" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">

            </Table>
            <Col span="24" class="mar-top-20 text-c">
                <Button  @click="returnPage">返回</Button>
            </Col>
        </Col>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";
import { formatThousandPrice } from "../../../assets/js/common.js";

export default {
  data() {
    return {
      tab: this.$route.query.tab,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: "",
      value10: "",
      value11: "",
      columns: [
        {
          key: "id",
          title: "序号",
          align: "center"
        },
        {
          key: "refundTypeDesc",
          align: "center",
          title: "退款类型"
        },
        {
          key: "refundReason",
          align: "center",
          title: "退款原因"
        },
        {
          key: "refundAmount",
          align: "center",
          title: "退款金额",
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                },
              }, formatThousandPrice(data.row.refundAmount))
            ])
          }
        },
        {
          key: "contractNo",
          align: "center",
          title: "对应合同编号"
        },
        {
          key: "salesman",
          align: "center",
          title: "业务员"
        },
        {
          key: "departmentName",
          align: "center",
          title: "所在部门"
        },
        {
          key: "refundName",
          align: "center",
          title: "操作人"
        }
      ],
      tableData: []
    };
  },
  props: {
    showAddModal: Boolean
  },
  created() {
    this.getInfo();
  },
  methods: {
    formatPrice(num) {
      return formatThousandPrice(num)
    },
    returnPage() {
      this.$router.push({
        path: "/accountTop",
        query: {
          tab: this.tab
        }
      });
    },
    getInfo() {
      let ids = this.$route.query.id;
      let _this = this;
      axios({
        url: "/finance/account_transfer/info",
        method: "get",
        params: {
          transferId: ids
        }
      })
        .then(resp => {
          if (resp.data.status == "200") {
            console.log(resp);
            _this.value1 = resp.data.response.payTypeDesc;
            _this.value2 = resp.data.response.accountTypeDesc;
            _this.value3 = resp.data.response.transferNo;
            _this.value4 = resp.data.response.transferFrom;
            _this.value5 = resp.data.response.depositFrom;
            _this.value6 = resp.data.response.note;
            _this.value7 = resp.data.response.accountNo;
            _this.value8 = resp.data.response.transferTime;
            _this.value9 = resp.data.response.totalAmout;
            _this.value10 = resp.data.response.refundAmount;
            _this.value11 = resp.data.response.recognableAmount;
            _this.tableData = resp.data.response.refundLogList;
          } else {
            that.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {
          this.$Message.warning(err.message);
        });
    }
  }
};
</script>


