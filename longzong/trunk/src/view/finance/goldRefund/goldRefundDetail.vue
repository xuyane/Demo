<style lang="less" scoped>
  .refund-detail{
    position: relative;
    .bread-crumb{
      font-size: 14px;
      i-Color: #000;
    }

    .f_card{
      margin: 20px 0;

      .infoTable {
        border: 1px solid rgb(187, 187, 187);
        border-collapse: collapse;
        width: 100%;

        td {
          border: 1px solid rgb(187, 187, 187);
          // width: auto;
          height: 52px;
          text-align: center;
          &.bac {
            background-color: #eee;
            width:300px;
          }
        }
      }


      span{
        font-size: 16px;
        color: #000;
      }
      .info_wrap{
        width: 1300px;
        margin: 0 auto;

        .checkInfo{
          margin: 30px 0;
        }

        .approval .detail{
          width: 100px;
          margin: 30px auto 0 auto;
        }
        .approval .btns{
          width: 320px;
          margin: 30px auto 0 auto;
        }
        .margin-r{
          margin-right:10px;
          border:none;
        }
      }
    }
  }
</style>

<template>
  <div class="refund-detail">
    <span class="bread-crumb">当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;到账退款详情</span>
    <Card dis-hover class="f_card">
      <span slot="title">到账信息</span>
      <Row>
        <i-Col span="24">
          <table class="infoTable" >
            <tr>
              <td class="bac">支付方式</td>
              <td>{{refundInfo.payTypeDesc}}</td>
              <td class="bac">账户类型</td>
              <td>{{refundInfo.accountTypeDesc}}</td>
            </tr>
            <tr>
              <td class="bac">交易流水号</td>
              <td>{{refundInfo.transferNo}}</td>
              <td class="bac">来源（支付/支付人信息）</td>
              <td>{{refundInfo.transferFrom}}</td>
            </tr>
            <tr>
              <td class="bac">开户行</td>
              <td>{{refundInfo.depositFrom}}</td>
              <td class="bac">备注</td>
              <td>{{refundInfo.note}}</td>
            </tr>
            <tr>
              <td class="bac">打款账号</td>
              <td>{{refundInfo.accountNo}}</td>
              <td class="bac">到账时间</td>
              <td>{{refundInfo.transferTime}}</td>
            </tr>
            <tr>
              <td class="bac">到账金额</td>
              <td>{{formatPrice(refundInfo.totalAmout)}}</td>
              <td class="bac">退款总金额</td>
              <td>{{formatPrice(refundInfo.refundAmount)}}</td>
            </tr>
          </table>
        </i-Col>
      </Row>
    </Card>

    <Card dis-hover class="f_card">
      <span slot="title">审核信息</span>
      <div class="info_wrap">
        <div class="steps">
          <Steps :current="currentStep">
            <Step v-for="(item, index) in steps" :key='index' :title="item.role" :content="item.admin" ></Step>
            <!--<Step title="退款成功" content="系统自动" ></Step>-->
          </Steps>
        </div>

        <div class="checkInfo">
          <Table :columns="columns" :data="records"></Table>
        </div>

        <div class="approval" v-if="isCheck">
          <Input type="textarea" :rows="4" placeholder="审批意见" v-model="checkNote" />
          <div class="btns">
            <ButtonGroup>
              <Button type="primary" class="margin-r" size="large" @click="checkOperate('resolve')">通过</Button>
              <Button type="error" class="margin-r" size="large" @click="checkOperate()" >驳回</Button>
              <Button size="large" @click="goBack" >返回</Button>
            </ButtonGroup>
          </div>
        </div>

        <div class="approval" v-else>
          <div class="detail">
            <Button size="large" @click="goBack">返回</Button>
          </div>
        </div>
      </div>
    </Card>

    <Spin fix v-show="showSpin"></Spin>
  </div>
</template>

<script>
  import axios from 'axios';
  import {getRefundDetail, refundOperate, getRefundRecords, getRefundProcess} from "../../components/axios/finance.js";
  import { formatThousandPrice } from "../../../assets/js/common.js";

  export default {
    name: "goldRefundDetail",
    props: ['applyId'],
    data() {
      return{
        showSpin: false,
        refundInfo: {},
        records: [],
        checkNote: '',
        columns: [
          {
            title: '审批时间',
            key: 'auditTime',
            width: 180
          },
          {
            title: '审批人',
            key: 'auditor',
            width: 180
          },
          {
            title: '审批意见',
            key: 'content'
          }
        ],

        auditProcess: {},
        currentStep: -1,
        steps: []
      }
    },
    created() {
      this.showSpin = true;
      this._initDatas();
    },
    computed: {
      isCheck() {
        return this.$route.query.type === 'check'
      }
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'goldRefund' });
      },
      formatPrice(num) {
        return formatThousandPrice(num)
      },
      checkOperate(operate) {
        const type = operate === 'resolve' ? '通过' : '驳回';

        this.$Modal.confirm({
          title: '确定' + type + '?',
          onOk: () => {
            this.showSpin = true;
            refundOperate({
              applyId: this.applyId,
              opinion: this.checkNote,
              result: operate === 'resolve' ? 1 : 0
            }).then(res => {
              this.showSpin = false;
              this.$Notice.success({
                title: type + '成功'
              });
              this.goBack();
            }).catch(err => {
              this.showSpin = false;
              // this.$Notice.error({
              //   title: type + '失败',
              //   desc: err.message
              // });
            });
          }
        })
      },

      _initDatas() {
        axios.all([
          getRefundDetail({applyId: this.applyId, v: Math.random() * 1000}),
          getRefundRecords({id: this.applyId, v: Math.random() * 1000}),
          getRefundProcess({id: this.applyId, v: Math.random() * 1000})
        ])
          .then(axios.spread((detail, records, process) => {
            if (detail.response) {
              this.refundInfo = detail.response;
//              console.log('refundInfo', this.refundInfo);
            }
            if (records.response) {
              this.records = records.response;
            }
            if (process.response) {
              this.auditProcess = process.response;
              this.editProcess();
            }
            this.showSpin = false;
          }));
      },
      editProcess() {
        const msg = this.auditProcess.taskMap;
        let len = 0;
        for (const attr in msg) {
          if (msg.hasOwnProperty(attr)) len++;
        }

        const steps = [msg.start];
        for(let a = 0; a < len; a++) {
          if(steps[a] && steps[a].hasOwnProperty('nexts')){
//            console.log('steps[a]', steps[a]);
            if (steps[a].nexts) {
//              console.log('111');
              const attr = steps[a].nexts[0].id;
              if (msg[attr]) {
                steps.push(msg[attr]);
              }
            }
          }
        }

        this.steps = steps.concat({
          role: '退款成功',
          admin: '系统自动'
        });
//        console.log('stepssss', this.steps);
        const currentIndex = this.steps.findIndex(item => !item.audited);
        this.currentStep = currentIndex === -1 ? this.steps.length : currentIndex;
//        console.log('step', this.currentStep);
      }
    }
  };
</script>
