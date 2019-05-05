<style lang="less">
@import "./myagreement.less";
.navbox {
  margin-bottom: 20px;
}
</style>
<template >
  <Row>
    <Col span="24" class="grid-table">
      <Card>
        <Row class="tablebox">
          <div class="table-title">合同编号</div>
          <table width="100%" border="0" cellspacing="0" class="tablewrap">
            <Row>
              <Col span="12" class="row" >
                <th class="th">合同编号：</th>
                <td class="td agreeaction ">{{agreement.contractCode}} <a target="_blank" :href="contractHref0">预览</a><a @click="download">下载</a>
                <a v-if="okHref==true"  target="_blank" :href="contractHref" >客户合同</a>
                </td>
              </Col>
              <Col span="12" class="row">
                <th class="th">创建时间：</th>
                <td class="td ">{{agreement.createTime}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">业务员：</th>
                <td class="td ">{{agreement.adminName}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th ">合同状态：</th>
                <td class="td ">{{agreement.contractStatus}}</td>
              </Col>
              <Col span="12" class="row" v-if="judgeStatused!=-1" >
                <th class="th ">生效时间：</th>
                <td class="td ">{{agreement.effectiveTime}}</td>
              </Col>
              <Col span="12" class="row" v-if="judgeStatused!=-1" >
                <th class="th ">归档时间：</th>
                <td class="td ">{{agreement.archivalTime }}</td>
              </Col>
              <Col span="12" class="row" v-if="judgeStatused!=-1" >
                <th class="th ">归档编号：</th>
                <td class="td ">{{agreement.archivalNo}}</td>
              </Col>
              <Col span="12" class="row" v-if="judgeStatused!=-1" >
                <th class="th "></th>
                <td class="td "></td>
              </Col>
            </Row>
          </table>
        </Row>
        <Row class="tablebox">
          <div class="table-title">基本信息</div>
          <table width="100%" border="0" cellspacing="0" class="tablewrap">
            <Row>
              <Col span="12" class="row" >
                <th class="th">甲方：</th>
                <td class="td blueword1">{{agreement.partA}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">乙方：</th>
                <td class="td blueword1">{{agreement.partB}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th ">用户名：</th>
                <td class="td blueword1">{{agreement.userName}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">法定代表人或授权人</th>
                <td class="td">{{agreement.delegateB}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th">法定代表人或授权人</th>
                <td class="td">{{agreement.delegateA}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">联系电话</th>
                <td class="td">{{agreement.phoneB}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th">联系电话</th>
                <td class="td">{{agreement.phoneA}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th"></th>
                <td class="td"></td>
              </Col>
            </Row>
          </table>
        </Row>
        <Row>
          <div class="table-title" ><span > 选购产品</span> </div>
          <Table class="tableCommon" :columns="columns1" :data="producelist"></Table>
          <Row class="discountwrap" style="border-bottom:1px solid #bbb;">
              <div v-if='discountdetial.saleStrategyName'>
                <Col span='2' class="bleft">优惠折扣</Col>
                <Col span='10' ><a>{{discountdetial.saleStrategyName}}</a></Col>
                <Col span='12' class="wordcenter">{{discountdetial.gift}}</Col>
              </div>
          </Row>
          <Row v-if='discountproduce.length>0' >
            <Col><div  style="margin-bottom:0;border-left:1px solid #bbb;border-right:1px solid #bbb;padding:10px;height:auto;color: red"><span > 优惠产品</span> </div></Col>
            <Table class="tableCommon" :columns="columns1" :data="discountproduce"></Table>
          </Row>
          <Row  style="margin-top:-1px;">
            <Col class="explain"> 合同说明：{{contractDescription}}</Col>
            <Col class="discount" > 总价<span class="redword">{{realAmount}}{{unit}} </span><span v-if='accountAmout<0'>(已加价<span v-text="Math.abs(accountAmout)"></span>{{unit}})</span><span v-else>(已优惠：{{accountAmout}}{{unit}})</span></Col>
          </Row>
          <Row v-if='gobackproduce.length>0' style="margin-bottom:34px;">
            <div class="table-title redword" ><span > 退款产品</span> </div>
            <Table class="tableCommon" :columns="columns1" :data="gobackproduce"></Table>
          </Row>
          
        </Row>
        <Row>
          <div class="table-title" >开通方式</div>
          <div class="openexplain">说明：默认“认账后开通”，如果您的用户不能及时打款，可以选择 "立即开通" 便于及时使用产品！</div>
          <RadioGroup v-model="agreement.effectiveType" >
            <Radio label="1" disabled>认账后开通</Radio>
            <Radio label="2" disabled>立即开通</Radio>
            <Radio label="3" disabled>预付合同<span v-if="appointedDate" style="margin-left:10px">指定日期：{{appointedDate}}</span></span></Radio>
            <Radio label="4" disabled>补充合同</Radio>
          </RadioGroup>
        </Row>
        <Row>
          <div class="table-title isinvoice" >需要发票</div>
          <RadioGroup v-model="agreement.isNeedInvoice">
            <Radio label="1"  disabled>是</Radio>
            <Radio label="0" disabled>否</Radio>
          </RadioGroup>
        </Row>
        <Row >
          <div class="table-title checkstep" >审核信息</div>
          <div class="" style="margin-bottom: 10px">
            <Steps :current="length">
              <Step v-for="(item,index) in stepmsg" :key='index' :title="item.role" :content="item.admin" ></Step>
            </Steps>
          </div>
          <Table class="tableCommon" :columns="columns2" :data="resulttable"></Table>
        </Row>
        <!-- <Row v-if='judgeStatus==-1'>
          <div class="table-title checkstep" >审核意见</div>
          <Input v-model="suggestion" type="textarea"  :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入审核意见" />
        </Row> -->
        <Row class="actionwrap">
            <div>
              <!-- <Button type="primary" class="search-btn" @click="showchangemodel" v-if='upload'>上传合同</Button>
              <Button type="primary" class="search-btn" @click="knowaccount" v-if='checked'>认账</Button>
              <Button type="error" class="search-btn" style="margin-left: 8px" @click="closeagreement" v-if='checked === true || upload === true'>作废</Button>
              <Button type="primary" class="search-btn" @click="passagree" v-if='checked == false'>通过</Button>
              
              <Button type="error" class="search-btn" style="margin-left: 8px"   @click="Oppositionagree">驳回</Button> -->
              <Button type="primary" class="search-btn" @click="placeOnFile" v-if="unjudgeStatus!=-1" >归档</Button>
              <Button type="primary" class="search-btn" @click="sendcontact" v-if="agreement.contractStatus=='草稿'" >提交</Button>
              <Button type="primary" class="search-btn" style="margin-left: 8px"  @click="goback">返回</Button>

              <!-- <Button  style="margin-left: 8px" class="search-btn">取消</Button> -->
            </div>
        </Row>
      </Card>
    </Col>
    <Modal
        v-model="confirmmodal"
        title="上传合同"
        @on-cancel="changecancel" width='400'>
        <Row>
          <Col span='8'>是否需要合同：</Col>
          <Col span='16'class='navbox'>
            <RadioGroup v-model="IsNeed">
              <Radio label="0" >否</Radio>
              <Radio label="1" >是</Radio>
            </RadioGroup>
          </Col>
          <Col v-if='IsNeed=="1"'>
            <Input v-model="value8" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="主要变更条款说明" class='navbox' />
              <Upload
            :before-upload = "handleUpload"
            :data = "form"
            :default-file-list = "productForm.attachList"
            :on-success = "uploadSuccess"
            :on-preview = "getUrl"
            :on-remove = "removeUrl"
            :max-size = 20*1024
            :action="filepath">
            <Button style="width:190px">
              <b class="icon-add2">+</b>
              <span>点击上传</span>
            </Button>
          </Upload>
          </Col>
        </Row>
        <div slot="footer">
          <Button @click="changecancel" style="margin-right:8px;">取消</Button>
          <Button type="primary" @click="changeconfirm" style="margin-right:8px;"> 确定</Button>
          <Button type="primary" @click="changeconfirmafter"  > 先认账后上传合同</Button>
        </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>
<script>
import axios from "axios";
import {
  queryWorkFlowInfo,
  getContractAudiIsChecked,
  getMsgByContractCode,
  getProductInfo,
  uploadContractChange, //审核页面客户上传合同,变更流程
  getContractAuditDetail, //审批详情
  closeContract, //作废
  getContractAuditResult, //通过
  querySaleStrategy, //优惠产品
  archivalContract, //归档
  getContractAuditStatus,
  getContractStatus,
  contractInfoCommit,
  contractApplyInfo,
  generateContractFileAgain
} from "../../components/axios/crm.js";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formatTime, formatTime2 } from "../../../assets/js/common.js";
export default {
  name: "waittingCheck",
  components: {},
  data() {
    return {
      appointedDate: "",
      okHref: false,
      spinShow: false,
      length: 0,
      stepmsg: [],
      upload: false,
      checked: false,
      isEquals: false,
      discountproduce: [],
      contractAuditStatus: [],
      contractStatus: [],
      gobackproduce: [],
      discountdetial: {},
      productForm: {
        tips: "",
        attachList: []
      },
      value8: "",
      filepath: "/crm/contract-info/upload_attach", //文件上传地址
      fileroad: "",

      form: {
        file: ""
      },
      confirmmodal: false,
      IsNeed: "0",
      accountAmout: "",
      realAmount: "",
      contractCode: "",
      suggestion: "",
      isinvoice: "1",
      agreementstatus: "0",
      step: 1,
      productIds: "",
      isopen: "1",
      onsale: "-500",
      contractDescription: "",
      showselectProduceModal: false,
      selectproduct: true,
      formCustom: {},
      agreement: {},
      judgeStatused: "",
      unjudgeStatus: "",
      judgeStatus: "",
      gridColumns: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 60
        },
        {
          title: "产品名称",
          key: "productNameCn",
          minWidth: 150,
          className: "colorbluer"
        },
        {
          title: "产品分类",
          key: "productCategoryCodeName",
          minWidth: 150
        },
        {
          title: "单价",
          key: "price",
          minWidth: 180,
          render: (h, data) => {
            var value = 0;
            if (Number(data.row.price) < Number(data.row.standardPrice)) {
              value = Number(data.row.standardPrice) - Number(data.row.price);
              return h("div", [
                h(
                  "div",
                  Number(data.row.price).toFixed(4) +
                    this.getunit(data.row.unit) +
                    "/" +
                    this.gettimeunit(data.row.period)
                ),
                h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "已优惠：" + value.toFixed(2) + this.getunit(data.row.unit)
                )
              ]);
            } else if (
              Number(data.row.price) > Number(data.row.standardPrice)
            ) {
              value = Number(data.row.price) - Number(data.row.standardPrice);
              return h("div", [
                h(
                  "div",
                  Number(data.row.price).toFixed(4) +
                    this.getunit(data.row.unit) +
                    "/" +
                    this.gettimeunit(data.row.period)
                ),
                h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "已加价：" + value.toFixed(2) + this.getunit(data.row.unit)
                )
              ]);
            } else {
              return h(
                "span",
                data.row.price +
                  this.getunit(data.row.unit) +
                  "/" +
                  this.gettimeunit(data.row.period)
              );
            }
          }
        },
        // {
        //   title: "参会人数",
        //   key: "personnum",
        //   minWidth: 83
        // },
        {
          title: "产品计数",
          key: "number",
          minWidth: 150,
          render: (h, data) => {
            if (
              data.row.productCategoryCode.slice(0, 3) == "001" ||
              data.row.productCategoryCode.slice(0, 3) == "003" ||
              data.row.productCategoryCode.slice(0, 3) == "006" ||
              data.row.productCategoryCode.slice(0, 3) == "007" ||
              data.row.productCategoryCode.slice(0, 3) == "004" ||
              data.row.productCategoryCode.slice(0, 3) == "008" ||
              data.row.productCategoryCode.slice(0, 3) == "009" ||
              data.row.productCategoryCode.slice(0, 3) == "010" ||
              data.row.productCategoryCode.slice(0, 3) == "011"
            ) {
              return h(
                "div",
                "服务期限" + data.row.number + this.gettimeunit(data.row.period)
              );
            } else if (
              data.row.productCategoryCodeName == "地图" ||
              data.row.productCategoryCode.slice(0, 3) == "005"
            ) {
              var a = "";
              if (data.row.productCategoryCode.slice(0, 3) == "005") {
                a = "增值数量";
              } else if (data.row.productCategoryCodeName == "地图") {
                a = "地图数量";
              }
              return h(
                "div",
                a + data.row.number + this.gettimeunit(data.row.period)
              );
            } else if (data.row.productCategoryCode.slice(0, 3) == "002") {
              var telspan = "";
              if (data.row.ubList) {
                if (data.row.ubList.length > 0) {
                  for (var i = 0; i < data.row.ubList.length; i++) {
                    telspan +=
                      "<p >" +
                      data.row.ubList[i].realName +
                      "(" +
                      data.row.ubList[i].mobile +
                      ")" +
                      "</p>";
                  }
                }
              }

              return h("div", [
                h("div", {
                  domProps: {
                    innerHTML: telspan
                  },
                  props: {
                    value: 1
                  }
                }),
                h(
                  "div",
                  "服务期限" +
                    data.row.number +
                    this.gettimeunit(data.row.period)
                )
              ]);
            }
          }
        },
        {
          title: "生效日期",
          key: "startTime",
          minWidth: 150,
          render: (h, data) => {
            return h("div", [
              h("p", timeStampChange.format(data.row.startTime))
            ]);
          }
        },
        // {
        //   title: "原合同到期日",
        //   key: "endTime",
        //   minWidth: 150,
        //   render: (h, data) => {
        //     return h("div", [h("p", timeStampChange.format(data.row.endTime))]);
        //   }
        // },
        {
          title: "小计",
          key: "subtotalStandardPrice",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "p",
                data.row.subtotalStandardPrice + this.getunit(data.row.unit)
              )
              // h(
              //   "p",
              //   {
              //     style: {
              //       color: "red"
              //     }
              //   },
              //   "已优惠：" + data.row.isonsale + "元/次"
              // )
            ]);
          }
        },
        {
          title: "洽谈价格",
          key: "subtotalPrice",
          minWidth: 150,
          render: (h, data) => {
            return h("div", [
              h("p", data.row.subtotalPrice + this.getunit(data.row.unit))
              // h(
              //   "p",
              //   {
              //     style: {
              //       color: "red"
              //     }
              //   },
              //   "已优惠：" + data.row.isonsale + "元/次"
              // )
            ]);
          }
        },
        {
          title: "价格说明",
          key: "description",
          minWidth: 250,
          render: (h, data) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    maxWidth: 600
                  },
                  style: {
                    marginLeft: "5px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  }
                },
                [
                  h(
                    "span",
                    {
                      on: {
                        click: () => {
                          // this.copyText(list);
                        }
                      }
                    },
                    data.row.description.length > 5
                      ? data.row.description.substring(0, 5) + "..."
                      : data.row.description
                  ),
                  h("div", {
                    slot: "content",
                    style: {
                      maxHeight: "400px",
                      overflow: "auto"
                    },
                    domProps: {
                      innerHTML: data.row.description
                    }
                  })
                ]
              )
            ]);
          }
        }
      ],
      producelist: [],
      columns2: [
        {
          title: "审批时间",
          key: "checktime",
          minWidth: 200,
          render: (h, data) => {
            return h("div", [
              h("span", timeStampChange.format(data.row.auditorTime))
            ]);
          }
        },
        {
          title: "审批人",
          key: "auditor",
          minWidth: 150
        },
        {
          title: "操作内容",
          key: "auditType",
          minWidth: 250,
          render: (h, data) => {
            let mess = "";
            switch (String(data.row.auditType)) {
              case "12":
              case "7":
                mess = "开通正式";
                break;
              case "16":
              case "9":
              case "6":
                mess = "认账审核";
                break;
              case "15":
              case "8":
              case "5":
                mess = "认账";
                break;
              case "14":
              case "11":
              case "4":
                mess = "合同审核";
                break;
              case "13":
              case "10":
              case "3":
              case "19":
                mess = "上传合同";
                break;
              case "2":
                mess = "已盖章";
                break;
              case "18":
                mess = "合同条款变更或者调价，请注意审核";
                break;
              case "17":
                mess = "合同条款变更或者调价，请注意审核";
                break;
              case "1":
                mess = "创建合同";
            }
            return h("span", mess);
          }
        },
        {
          title: "审批意见",
          key: "note",
          minWidth: 500
        }
      ],
      resulttable: [],
      pdfView: false,
      unit: "",
      contractHref0: ""
    };
  },
  methods: {
    //提交
    sendcontact() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否确定提交该草稿合同？</p>",
        onOk: () => {
          this.spinShow = true;
          let that = this;
          let msg = {
            id: this.$route.query.bussinessId
          };
          contractInfoCommit(msg).then(resp => {
            that.spinShow = false;
            that.$Message.info(resp.message);
            that.$router.go(-1);
          });
        },
        onCancel: () => {}
      });
    },
    // 归档
    placeOnFile() {
      let msg = {
        contractCode: this.$route.query.contractCode,
        status: 0
      };
      archivalContract(msg).then(resp => {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>归档编号：" + resp.response + "确认归档？</p>",
          onOk: () => {
            this.spinShow = true;
            let that = this;
            msg.status = 1;
            archivalContract(msg).then(resp => {
              that.spinShow = false;
              that.$Message.info(resp.message);
              that.$router.go(0);
            });
          },
          onCancel: () => {}
        });
      });
    },
    // 返回
    goback() {
      this.$router.go(-1);
    },
    //认账
    knowaccount() {
      // let msg = {
      //   bussinessId: this.$route.query.bussinessId,
      //   message: this.suggestion,
      //   pass: 1,
      //   taskId: this.$route.query.taskId
      // };
      // getContractAuditResult(msg).then(resp => {
      //   that.$Spin.hide();
      // that.$Message.info(resp.message);
      // that.$router.go(0)
      this.$router.push({
        name: "confirmContractDetail",
        query: {
          contractBaseId: this.$route.query.bussinessId
        }
      });
      // });
    },
    //通过
    passagree() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否通过该合同？</p>",
        onOk: () => {
          var that = this;
          let msg = {
            bussinessId: this.$route.query.bussinessId,
            message: this.suggestion,
            pass: 1
            // taskId: this.$route.query.taskId
          };
          this.spinShow = true;
          getContractAuditResult(msg).then(resp => {
            that.spinShow = false;
            that.$Message.info(resp.message);
            that.$router.go(-1);
          });
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    },
    // 驳回
    Oppositionagree() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否驳回该合同？</p>",
        onOk: () => {
          var that = this;
          let msg = {
            bussinessId: this.$route.query.bussinessId,
            message: this.suggestion,
            pass: 0
            // taskId: this.$route.query.taskId
          };
          this.spinShow = true;
          getContractAuditResult(msg).then(resp => {
            that.spinShow = false;
            that.$Message.info(resp.message);
            that.$router.go(0);
          });
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    },
    //作废
    closeagreement() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否作废该合同？</p>",
        onOk: () => {
          var that = this;
          let msg = {
            contractId: this.$route.query.bussinessId,
            message: this.suggestion
          };
          this.spinShow = true;
          closeContract(msg).then(resp => {
            that.spinShow = false;
            that.$Message.info(resp.message);
            that.$router.go(0);
          });
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    },
    sendmsg(data) {
      var that = this;
      this.spinShow = true;
      let msg = {
        isNeed: this.IsNeed,
        effectiveType: data,
        filePath: this.fileroad,
        contractDescription: this.value8,
        contractCode: this.$route.query.contractCode
      };
      uploadContractChange(msg).then(resp => {
        that.spinShow = false;
        that.$router.go(0);
      });
    },
    //点击上传合同
    showchangemodel() {
      this.confirmmodal = true;
    },
    //先认账后上传
    changeconfirmafter() {
      if (this.IsNeed == "1") {
        if (this.fileroad == "") {
          this.$Message.warning("请上传文件");
          return;
        }
      }
      this.sendmsg(0);
    },
    //变更确定
    changeconfirm() {
      // this.confirmmodal = false;
      if (this.IsNeed == "1") {
        if (this.fileroad == "") {
          this.$Message.warning("请上传文件");
          return;
        }
      }
      this.sendmsg(1);
    },
    // 变更取消
    changecancel() {
      this.confirmmodal = false;
    },
    //上传成功后调用
    uploadSuccess(resp) {
      this.fileroad = resp.response;
      // this.productForm.attachList.push(uploadMes)
    },
    //上传文件
    handleUpload(file) {
      // file.isModify= 1;
      // file.page=0;
      if (!this.fileroad) {
        this.form.file = file;
      } else {
        this.$Message.warning("只能上传一个文件");
        return false;
      }
    },
    //点击上传成功后的文件地址
    getUrl(data) {},
    //点击删除文件地址
    removeUrl(file, fileList) {
      this.fileroad = "";
    },
    // 预览
    preview() {},
    // 下载
    download() {
      window.location.href = "/crm/contract-info/download/" + this.contractCode;
    },
    pdfViewVue() {
      var that = this;
      this.contractCode = this.$route.query.contractCode;
      this.$Spin.show();
      axios
        .get("/crm/contract-info/preview?contractCode=" + this.contractCode)
        .then(function(response) {
          that.$Spin.hide();
          if (
            response.data.response == {} ||
            (response.data.response.type0.type == 0 &&
              response.data.response.type0.filePath ==
                "https://mfs.oilchem.net/")
          ) {
            that.getpath();
          } else {
            that.contractHref0 = response.data.response.type0.filePath;
          }
          if (response.data.response.type1 != undefined) {
            that.okHref = true;
            that.contractHref = response.data.response.type1.filePath;
          }
          if (response.data.response.type2 != undefined) {
            that.okHref = true;
            that.contractHref = response.data.response.type2.filePath;
          }
        });
    },

    getpath() {
      let msg = {
        contractCode: this.contractCode
      };
      let that = this;
      generateContractFileAgain(msg).then(resp => {
        that.contractHref0 = resp.response;
      });
    },
    downloadfile(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "excel.xlsx");

      document.body.appendChild(link);
      link.click();
    },
    agreementdetial() {},
    // 获取合同基本信息
    getMsg() {
      var that = this;
      this.contractCode = this.$route.query.contractCode;
      this.spinShow = true;
      axios
        .get(
          "/crm/contract-info/contract-info/" +
            this.contractCode +
            "?time=" +
            new Date().getTime()
        )
        .then(function(response) {
          that.spinShow = false;
          if (response.data.status == "200") {
            response.data.response.createTime = timeStampChange.format(
              response.data.response.createTime
            );
            response.data.response.archivalTime = response.data.response
              .archivalTime
              ? timeStampChange.format(response.data.response.archivalTime)
              : "";
            response.data.response.effectiveTime = timeStampChange.format(
              response.data.response.effectiveTime
            );
            // that.agreementstatus = response.data.response.contractStatus;
            // response.data.response.contractStatus = that.getStatus(
            //   response.data.response.contractStatus
            // );
            that.agreement = response.data.response;
            let statustext = "";
            if (response.data.response.status == 0) {
              statustext = that.getNameContractStatus(
                response.data.response.status
              );
            } else {
              statustext =
                that.getNameContractStatus(response.data.response.status) +
                "(" +
                that.getNameContractAuditStatus(
                  response.data.response.auditStatus
                ) +
                ")";
            }
            that.agreement.contractStatus = statustext;
            that.judgeStatused = statustext.indexOf("已归档");
            that.unjudgeStatus = statustext.indexOf("待归档");
            that.judgeStatus = statustext.indexOf("归档");

            that.agreement.isNeedInvoice = that.agreement.isNeedInvoice.toString(
              10
            );
            if (
              response.data.response.effectiveType == 0 ||
              response.data.response.effectiveType == 1 ||
              response.data.response.effectiveType == -1
            ) {
              that.agreement.effectiveType = "1";
            } else {
              that.agreement.effectiveType = response.data.response.effectiveType.toString();
            }
            if (response.data.response.effectiveType == 3) {
              that.appointedDate = formatTime2(
                response.data.response.effectiveTime
              );
            }
            that.contractDescription =
              response.data.response.description || "略";
          }
        })
        .catch(function(error) {
          // this.spinShow=false;
        });
    },
    // 获取选购产品信息
    getProduct() {
      let data = {
        contractCode: this.$route.query.contractCode
      };
      this.spinShow = true;
      let that = this;
      getProductInfo(data).then(resp => {
        that.spinShow = false;

        that.producelist = resp.response.list;
        that.unit = that.getunit(that.producelist[0].unit);
        that.realAmount = resp.response.realAmount;
        that.accountAmout = resp.response.accountAmout;
      });
    },
    // 合同状态
    getContractAuditStatusVue() {
      let that = this;
      getContractAuditStatus().then(resp => {
        if (resp.status == 200) {
          that.contractAuditStatus = resp.response;
        }
      });
    },
    // 合同状态
    getContractStatusVue() {
      let that = this;
      getContractStatus().then(resp => {
        if (resp.status == 200) {
          that.contractStatus = resp.response;
        }
      });
    },
    // 通过id获取name
    getNameContractAuditStatus(value) {
      let temt = "无";
      for (let i = 0; i < this.contractAuditStatus.length; i++) {
        if (this.contractAuditStatus[i].value === value) {
          temt = this.contractAuditStatus[i].desc;
          break;
        }
      }
      return temt;
    },
    // 通过id获取name
    getNameContractStatus(value) {
      let temt = "无";
      for (let i = 0; i < this.contractStatus.length; i++) {
        if (this.contractStatus[i].value === value) {
          temt = this.contractStatus[i].desc;
          break;
        }
      }
      return temt;
    },
    // 获取审批信息列表
    gettablemsg() {
      var msg = {
        contractCode: this.$route.query.contractCode,
        taskId: ""
      };
      this.spinShow = true;
      let that = this;
      msg.time = new Date().getTime();
      getContractAuditDetail(msg).then(resp => {
        that.spinShow = false;
        that.resulttable = resp.response.list;
      });
    },
    getsaleproduct() {
      let msg = {
        contractCode: this.$route.query.contractCode
      };
      let that = this;
      querySaleStrategy(msg).then(resp => {
        that.discountdetial = resp.response.ContractSaleStrategyDTO;
        var a = "";
        switch (that.discountdetial.type) {
          case 1:
            a = "优惠折扣：" + that.discountdetial.description + "折";
            break;
          case 2:
            a = "打包价格：" + that.discountdetial.description + that.unit;
            break;
          case 3:
            a = "赠送产品：" + that.discountdetial.description;
            break;
          case 4:
            a = "赠送期限:" + that.discountdetial.description + "月";
            break;
          case 5:
            a = "赠送礼品:" + that.discountdetial.description;
            break;
        }
        that.discountdetial.gift = a;
        that.discountproduce = resp.response.giftProductDTOs;
      });
    },
    // 获取审批信息列表
    getContractAudiIsCheckedVue() {
      var msg = {
        contractCode: this.$route.query.contractCode
      };
      this.spinShow = true;
      let that = this;
      getContractAudiIsChecked(msg).then(resp => {
        that.spinShow = false;
        that.upload = resp.response.upload;
        that.checked = resp.response.checked;
        that.isEquals = resp.response.isEquals;
      });
    },
    // 获取步骤信息
    getstepmsg() {
      let data = {
        contractCode: this.$route.query.contractCode
      };
      data.time = new Date().getTime();
      queryWorkFlowInfo(data).then(resp => {
        if (!resp.response) {
          return;
        }
        let msg = resp.response.taskMap;
        this.stepmsg[0] = msg.start;
        let that = this;
        for (var i = 0; i < this.stepmsg.length; i++) {
          Object.keys(msg).forEach(function(key) {
            if (that.stepmsg[that.stepmsg.length - 1].nexts) {
              if (that.stepmsg[that.stepmsg.length - 1].nexts) {
                if (key == that.stepmsg[that.stepmsg.length - 1].nexts[0].id) {
                  that.stepmsg.push(msg[key]);
                }
              }
            }
          });
        }
        that.stepmsg.map((item, index) => {
          if (item.admin == "" && item.adminIds == null) {
            if (item.role != "开通正式") {
              that.stepmsg.splice(index, 1);
            }
          } else {
          }
        });
      });
    },
    //获取退款产品
    getbackpro() {
      let that = this;
      contractApplyInfo(this.$route.query.contractCode).then(resp => {
        that.gobackproduce = resp.response;
      });
    },
    // 状态
    getStatus(a) {
      switch (a) {
        case "0":
          a = "待审核";
          break;
        case "1":
          a = "已生效";
          break;
        case "2":
          a = "已驳回";
          break;
        case "3":
          a = "已作废";
          break;
        case "4":
          a = "待归档";
          break;
        case "5":
          a = "已归档";
          break;
        case "6":
          a = "待认账";
          break;
        case "99":
          a = "其他";
          break;
      }
      return a;
    },
    getunit(a) {
      switch (Number(a)) {
        case 0:
          a = "人民币";
          break;
        case 1:
          a = "美元";
          break;
        case 2:
          a = "欧元";
          break;
      }
      return a;
    },
    gettimeunit(a) {
      switch (Number(a)) {
        case 0:
          a = "次";
          break;
        case 1:
          a = "月";
          break;
        case 2:
          a = "年";
          break;
        case 3:
          a = "张";
          break;
      }
      return a;
    }
  },
  watch: {
    stepmsg(newval, oldval) {
      for (var i = 0; i < newval.length; i++) {
        if (!newval[i].audited) {
          this.length = i;
          return;
        }
      }
      this.length = newval.length;
    }
  },
  created() {
    this.getMsg();
    this.getContractAuditStatusVue();
    this.getContractStatusVue();
    this.getProduct();
    this.gettablemsg();
    this.getsaleproduct();
    this.getstepmsg();
    this.getContractAudiIsCheckedVue();
    this.getbackpro();
    this.pdfViewVue();
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/myAgreement") {
      to.meta.keepAlive = true;
      to.meta.isBack = false;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  }
};
</script>
