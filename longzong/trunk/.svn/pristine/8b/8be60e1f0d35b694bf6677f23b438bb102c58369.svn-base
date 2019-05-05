<style lang="less" scoped>
  // @import '../productOpening.less';
  .clearFixH:after {
    clear: both;
    display: block;
    height: 0;
  }

  .f_card {
    margin: 20px 0;
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
      <Col span="24" class="font-s18 mar-t-20" v-show="tableShow3">认账关联详情</Col>
      <Col span="24" class="mar-t-20" v-show="tableShow3">
      <Table class="tableCommon" :data="tableData3" :columns="columns3" ref="dragTable" :stripe="true" :border="true"></Table>
      </Col>
      <Col span="24">
      <Card class="f_card">
        <span slot="title">审核信息</span>
        <Steps :current="currentStep">
          <Step v-for="(item, index) of steps" :key='index' :title="item.role" :content="item.admin"></Step>
        </Steps>
      </Card>
      </Col>
      <Col span="24" class="mar-t-20 ivu-modal-footer">
      <Button @click="goBack">返回</Button>
      <Col span="24">
      </Col>
      </Col>
    </Row>
    </Col>
  </Row>
</template>

<script>
  import axios from "axios";
  import oilPage from "../../components/page/page.vue";
  import { formData } from "../../../assets/js/common.js";
  export default {
    name: "blackList",
    components: {
      oilPage
    },
    data() {
      return {
        tableShow3: false,
        columns1: [
          {
            key: "code",
            align: "center",
            title: "合同编号",
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
            title: "合同名称"
          },
          {
            key: "partA",
            align: "center",
            title: "客户名称"
          },
          {
            key: "totalAmount",
            align: "center",
            title: "合同总金额"
          },
          {
            key: "amoutAcked",
            align: "center",
            title: "已认账金额"
          },
          {
            key: "amoutUnAck",
            align: "center",
            title: "待认账金额"
          },
          {
            key: "creatorName",
            align: "center",
            title: "业务员"
          },
          {
            key: "creatorDeptName",
            align: "center",
            title: "所在部门"
          },
          {
            key: "auditStatus",
            align: "center",
            title: "合同状态"
          }
        ],
        selectionId: [],
        tableData1: [],
        columns2: [
          // {
          //   type: 'selection',
          //   key: "_disabled",
          //   width: 60,
          //   align: 'center'
          // },
          {
            key: "id",
            align: "center",
            title: "认账ID",
            width: 90,
            render: (h, data) => {
              return h(
                "span",
                {
                  style: {
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.cancelAccount(data.row);
                    }
                  }
                },
                data.row.id
              );
            }
          },
          {
            key: "ackDate",
            align: "center",
            title: "认账时间"
          },
          {
            key: "adminName",
            align: "center",
            title: "认账人"
          },
          {
            key: "adminDeptName",
            align: "center",
            title: "所在部门"
          },
          {
            key: "totalAmount",
            align: "center",
            title: "本次认账"
          },
          {
            key: "deletedDesc",
            align: "center",
            title: "认账状态"
          }
        ],
        tableData2: [],
        columns3: [
          {
            key: "transferId",
            align: "center",
            title: "到账ID",
            minWidth: 60
          },
          {
            key: "transferTime",
            align: "center",
            title: "到账时间",
            minWidth: 120
          },
          {
            key: "transferAmount",
            align: "center",
            title: "到账金额",
            minWidth: 120
          },
          {
            key: "payTypeDesc",
            align: "center",
            title: "支付方式",
            minWidth: 120
          },
          {
            key: "accountTypeDesc",
            align: "center",
            title: "账户类型",
            minWidth: 120
          },
          {
            key: "transferNo",
            align: "center",
            title: "交易流水号",
            minWidth: 130
          },
          {
            key: "transferFrom",
            align: "center",
            title: "来源(户名)",
            minWidth: 120
          },
          {
            key: "note",
            align: "center",
            title: "备注",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "Tooltip",
                {
                  props: { placement: "top" }
                },
                [
                  params.row.note.length > 7
                    ? params.row.note.slice(0, 7) + "..."
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
            key: "ackDetailAmount",
            align: "center",
            title: "本次认账",
            minWidth: 120
          }
        ],
        myform: {
          textarea: "信息不全"
        },
        tableData3: [],
        hashID: this.$route.query.contractBaseId,
        contractNum: '',
        steps: [],
        currentStep: -1,
      };
    },
    created() {
      this.getMessage(this.hashID);
      this.tableData2.map(item => {
        if (item.status == "正常") {
          item["_checked"] = false;
          item["_disabled"] = false;
        } else {
          item["_checked"] = true;
          item["_disabled"] = true;
        }
      });
    },
    methods: {
      goheCode(contractNo) {
        let routeData = this.$router.resolve({
          name: "checkContact",
          query: {
            contractCode: contractNo
          }
        });
        window.open(routeData.href, "_blank");
      },

      getOkData(dts) {
        //查询合同认账记录
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
            });

            that.tableData2 = res.data.response;
          }
        });
      },
      getMessage(ids) {
        //根据contractBaseId 查询取消认账详情数据
        var that = this;
        axios({
          url: "/finance/accountackcontract/detailContract",
          method: "get",
          params: {
            contractBaseId: Number(ids),
            timestamp: new Date().getTime()
          }
        })
          .then(function (res) {
            if (res.data.status == 200) {
              if (res.data.response.auditStatus == 0) {
                res.data.response.auditStatus = "待审核";
              } else if (res.data.response.auditStatus == 1) {
                res.data.response.auditStatus = "审核通过";
              } else if (res.data.response.auditStatus == 2) {
                res.data.response.auditStatus = "驳回";
              }
              that.contractNum = res.data.response.code;
              that.detailProcess();
              //获取产品信息
              that.getOkData(Number(ids));
              that.tableData1.push(res.data.response);
            }
            that.$Spin.hide();
          })
          .catch(err => {
            that.$Spin.hide();
          });
      },

      //审核流程图数据
      detailProcess() {
        var that = this;
        axios({
          url: "/finance/accountackcontract/detailProcess",
          method: "get",
          params: {
            contractNo: that.contractNum,
            timestamp: new Date().getTime()
          }
        })
          .then(function (res) {
            if (res.data.status == 200) {
              that.steps = that._editProcess(JSON.parse(res.data.response));
              const currentIndex = that.steps.findIndex(item => !item.audited);
              that.currentStep = currentIndex === -1 ? that.steps.length : currentIndex;            
            }
          })
          .catch(err => {

          });
      },

      _editProcess(process) {
        let len = 0;
        for (const attr in process) {
          if (process.hasOwnProperty(attr)) len++;
        }

        const steps = [process.start];
        for (let a = 0; a < len; a++) {
          if (steps[a] && steps[a].hasOwnProperty('nexts')) {
            if (steps[a].nexts) {
              const attr = steps[a].nexts[0].id;
              if (process[attr]) {
                steps.push(process[attr]);
              }
            }
          }
        }

        return steps.concat({
          role: '取消认账成功',
          admin: '系统自动'
        });
      },

      selection(selection) {
        this.selectionId = [];
        selection.map(item => {
          this.selectionId.push(item.id);
        });
      },
      goBack() {
        this.$router.push({
          name: "confirmcontractList"
        });
      },
      cancelAccount(data) {
        //合同认账记录查看
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
        });
        this.tableShow3 = true;
        this.tableData3 = [data];
      }
    }
  };
</script>