<style lang="less" scoped>
// @import '../productOpening.less';
.clearFixH:after {
  clear: both;
  display: block;
  height: 0;
}
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;合同认账&nbsp;&nbsp;>>&nbsp;&nbsp;取消认账详情
    </Row>
    </Col>
    <Col span="24" class="product-opening-detail-out">
    <Row>
      <Col span="24" class="font-s18">合同信息</Col>
      <Col span="24" class="mar-t-20">
      <Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true"></Table>
      </Col>
      <Col span="24" class="font-s18 mar-t-20">合同认账记录</Col>
      <Col span="24" class="mar-t-20">
      <Table class="tableCommon" :data="tableData2" :columns="columns2" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selection"></Table>
      </Col>
      <Col span="24" class="font-s18 mar-t-20">认账关联详情</Col>
      <Col span="24" class="mar-t-20" v-show="tableShow3">
      <Table class="tableCommon" :data="tableData3" :columns="columns3" ref="dragTable" :stripe="true" :border="true"></Table>
      </Col>
      <Col span="24" class="mar-t-20 ivu-modal-footer">
      <Button type="primary" @click="cancelTicket">取消认账</Button>
      <Button @click="goBack">返回</Button>
      <Col span="24">
      <Modal v-model="modal1" title="取消认账" @on-cancel="cancel" class="myMo">

        <Form ref="myform" :model="myform" class="clearFixH">
          <Col span="24">
          <FormItem label="取消原因" class="ismust" :label-width="80">
            <Input v-model="myform.textarea" type="textarea" :rows="3" placeholder="输入原因..."></Input>
          </FormItem>
          </Col>
        </Form>
        <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button type="primary" @click="ok">确定</Button>
        </div>
      </Modal>
      </Col>
      </Col>
    </Row>
    </Col>
  </Row>
</template>

<script>
import axios from 'axios';
import oilPage from '../../components/page/page.vue';
import { formData } from '../../../assets/js/common.js';
export default {
  name: 'blackList',
  components: {
    oilPage
  },
  data() {
    return {
      tableShow3: false,
      columns1: [
        {
          key: 'code',
          align: 'center',
          title: '合同编号',
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
        }, {
          key: 'name',
          align: 'center',
          title: '合同名称'
        }, {
          key: 'partA',
          align: 'center',
          title: '客户名称'
        }, {
          key: 'totalAmount',
          align: 'center',
          title: '合同总金额'
        }, {
          key: 'amoutAcked',
          align: 'center',
          title: '已认账金额'
        }, {
          key: 'amoutUnAck',
          align: 'center',
          title: '待认账金额'
        }, {
          key: 'creatorName',
          align: 'center',
          title: '业务员'
        }, {
          key: 'creatorDeptName',
          align: 'center',
          title: '所在部门'
        }, {
          key: 'auditStatus',
          align: 'center',
          title: '合同状态'
        }
      ],
      selectionId: [],
      tableData1: [],
      modal1: false,
      columns2: [
        {
          type: 'selection',
          key: "_disabled",
          width: 60,
          align: 'center'
        }, {
          key: 'id',
          align: 'center',
          title: '认账ID',
          width: 90,
          render: (h, data) => {
            return h('span', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.cancelAccount(data.row)
                }
              }
            }, data.row.id)
          }
        }, {
          key: 'ackDate',
          align: 'center',
          title: '认账时间'
        }, {
          key: 'adminName',
          align: 'center',
          title: '认账人'
        }, {
          key: 'adminDeptName',
          align: 'center',
          title: '所在部门'
        }, {
          key: 'totalAmount',
          align: 'center',
          title: '本次认账'
        }, {
          key: 'deletedDesc',
          align: 'center',
          title: '认账状态'
        }
      ],
      tableData2: [],
      columns3: [
        {
          key: 'transferId',
          align: 'center',
          title: '到账ID',
          minWidth: 60
        }, {
          key: 'transferTime',
          align: 'center',
          title: '到账时间',
          minWidth: 120
        }, {
          key: 'transferAmount',
          align: 'center',
          title: '到账金额',
          minWidth: 120
        }, {
          key: 'payTypeDesc',
          align: 'center',
          title: '支付方式',
          minWidth: 120
        }, {
          key: 'accountTypeDesc',
          align: 'center',
          title: '账户类型',
          minWidth: 120
        }, {
          key: 'transferNo',
          align: 'center',
          title: '交易流水号',
          minWidth: 130
        }, {
          key: 'transferFrom',
          align: 'center',
          title: '来源(户名)',
          minWidth: 120
        }, {
          key: 'note',
          align: 'center',
          title: '备注',
          minWidth: 120,
          render: (h, params) => {
            return h('Tooltip', {
              props: { placement: 'top' }
            }, [
                params.row.note.length > 7 ? params.row.note.slice(0, 7) + "..." : params.row.note,
                h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.note)
              ])
          }
        }, {
          key: 'ackDetailAmount',
          align: 'center',
          title: '本次认账',
          minWidth: 120
        }
      ],
      myform: {
        textarea: "信息不全"
      },
      tableData3: [],
      hashID: this.$route.query.contractBaseId
    }
  },
  created() {
    this.getMessage(this.hashID);
    this.tableData2.map((item) => {
      if (item.status == '正常') {
        item['_checked'] = false;
        item['_disabled'] = false;
      } else {
        item['_checked'] = true;
        item['_disabled'] = true;
      }
    })
  },
  methods: {
    goheCode(contractNo) {
      let routeData = this.$router.resolve({
        name: "checkContact",
        query: {
          contractCode: contractNo
        }
      });
      window.open(routeData.href, '_blank');
    },
    //弹窗事件cancel按钮
    cancel() {
      this.modal1 = false;
    },
    //弹窗事件ok按钮
    ok() {
      //执行取消认账操作
      var offObj = {
        "contractBaseId": Number(this.hashID),
        "ids": this.selectionId.join(","),
        "refundReason": this.myform.textarea,
        timestamp: new Date().getTime()
      }
      if (offObj.refundReason == "" || offObj.refundReason == "undefined") {
        this.$Message.error("请输入取消原因");
        return false;
      }else if(String(offObj.refundReason).length>50){
        this.$Message.error("取消原因不能超过50个字符长度");
        return false;
      };
      axios({
        url: "/finance/accountackcontract/doCancelAccountAck",
        method: "post",
        data: offObj
      }).then(res => {
        if (res.data.status == "200") {
          this.$Message.success('取消认账成功！');
          this.$router.push({
            name: 'confirmcontractList'
          })
        } else {
          this.$Message.warning(res.data.message);
        }
      })
    },
    getOkData(dts) {//查询合同认账记录
      var that = this;
      axios({
        url: "/finance/accountackcontract/listAccountAcks",
        method: "get",
        params: {
          contractBaseId: dts,
          timestamp: new Date().getTime()
        }
      }).then(res => {
        if (res.data.status == "200") {
          res.data.response.forEach(function (e, v, arr) {
            if (e.deletedDesc != "正常") {

              arr[v]._disabled = true;
            } else {

              arr[v]._disabled = false;
            }

          })

          that.tableData2 = res.data.response;

        }
      })
    },
    getMessage(ids) {//根据contractBaseId 查询取消认账详情数据
      var that = this;
      axios({
        url: "/finance/accountackcontract/detailContract",
        method: 'get',
        params: {
          contractBaseId: Number(ids),
          timestamp: new Date().getTime()
        }
      }).then(function (res) {
        if (res.data.status == 200) {
          if (res.data.response.auditStatus == 0) {
            res.data.response.auditStatus = "待审核";
          } else if (res.data.response.auditStatus == 1) {
            res.data.response.auditStatus = "审核通过";
          } else if (res.data.response.auditStatus == 2) {
            res.data.response.auditStatus = "驳回";
          }
          //获取产品信息
          that.getOkData(Number(ids));

          that.tableData1.push(res.data.response);
        };
        that.$Spin.hide();
      }).catch(err => {
        that.$Spin.hide();
      });
    },
    selection(selection) {
      this.selectionId = [];
      selection.map((item) => {
        this.selectionId.push(item.id)
      });
    },
    cancelTicket() {//取消认账
      //先判断是否可以认账
      var ft = document.querySelector(".myMo .ivu-modal-footer");
      ft.style.border = "none";
      axios({
        url: "/finance/accountackcontract/judgeAccountAck",
        method: "get",
        params: {
          contractBaseId: this.hashID,
          timestamp: new Date().getTime()
        }
      }).then(res => {
        if (res.data.status == "200") {//可以执行取消认账
          //判断是否勾选
          if (this.selectionId.length === 0) {
              this.$Message.warning("请勾选数据");
              return false;
          }else{
            this.modal1 = true;
            this.myform.textarea = "信息不全";
          }
        } else {
          this.$Message.warning(res.data.message);
        }
      })
    },
    goBack() {
      this.$router.push({
        name: 'confirmcontractList'
      })
    },
    cancelAccount(data) {//合同认账记录查看
      var that = this;
      axios({
        url: "/finance/accountackcontract/listAccountAckDetails",
        method: "get",
        params: {
          accountAckId: data.id,
          timestamp: new Date().getTime()
        }
      }).then(res => {
        if (res.data.status == "200") {
          that.tableData3 = res.data.response;
        }
      })
      this.tableShow3 = true;
      this.tableData3 = [data];
    }
  }
}
</script>
